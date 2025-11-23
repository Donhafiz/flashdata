const express = require('express');
const router = express.Router();
const paystackAPI = require('../config/paystack');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const { protect } = require('../middleware/auth');

// @route   POST /api/payment/initialize
// @desc    Initialize Paystack payment
// @access  Private
router.post('/initialize', protect, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount < 1) {
      return res.status(400).json({ success: false, message: 'Invalid amount' });
    }

    // Generate unique reference
    const reference = 'FD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);

    const response = await paystackAPI.post('/transaction/initialize', {
      email: req.user.email,
      amount: Math.round(amount * 100), // Convert to pesewas (GHS) or kobo (NGN)
      reference: reference,
      callback_url: `${process.env.FRONTEND_URL}/dashboard.html?reference=${reference}`,
      metadata: {
        userId: req.user._id.toString(),
        fullName: req.user.fullName,
        custom_fields: [
          {
            display_name: "User ID",
            variable_name: "user_id",
            value: req.user._id.toString()
          }
        ]
      },
    });

    res.json({
      success: true,
      data: {
        authorization_url: response.data.data.authorization_url,
        access_code: response.data.data.access_code,
        reference: response.data.data.reference,
        email: req.user.email,
        amount: Math.round(amount * 100),
        public_key: process.env.PAYSTACK_PUBLIC_KEY,
      },
    });
  } catch (error) {
    console.error('Paystack initialization error:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      message: error.response?.data?.message || 'Payment initialization failed' 
    });
  }
});

// @route   GET /api/payment/verify/:reference
// @desc    Verify Paystack payment
// @access  Private
router.get('/verify/:reference', protect, async (req, res) => {
  try {
    const response = await paystackAPI.get(`/transaction/verify/${req.params.reference}`);

    const paymentData = response.data.data;

    if (paymentData.status === 'success') {
      // Check if transaction already processed
      const existingTransaction = await Transaction.findOne({ reference: req.params.reference });
      
      if (existingTransaction) {
        return res.json({
          success: true,
          message: 'Payment already processed',
          wallet: req.user.wallet,
        });
      }

      const amount = paymentData.amount / 100; // Convert from pesewas/kobo

      // Verify the user
      if (paymentData.metadata.userId !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: 'Payment verification failed - user mismatch' });
      }

      // Update user wallet
      const balanceBefore = req.user.wallet;
      req.user.wallet += amount;
      await req.user.save();

      // Create transaction record
      await Transaction.create({
        user: req.user._id,
        type: 'Credit',
        amount,
        description: 'Wallet top-up via Paystack',
        reference: req.params.reference,
        status: 'Success',
        balanceBefore,
        balanceAfter: req.user.wallet,
      });

      res.json({
        success: true,
        message: 'Payment verified successfully',
        wallet: req.user.wallet,
        amount: amount,
      });
    } else {
      res.status(400).json({ 
        success: false, 
        message: `Payment ${paymentData.status}` 
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      message: error.response?.data?.message || 'Payment verification failed' 
    });
  }
});

// @route   POST /api/payment/webhook
// @desc    Paystack webhook for payment notifications
// @access  Public
router.post('/webhook', async (req, res) => {
  try {
    const hash = require('crypto')
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (hash === req.headers['x-paystack-signature']) {
      const event = req.body;

      if (event.event === 'charge.success') {
        const { reference, amount, customer, metadata } = event.data;

        // Check if already processed
        const existingTransaction = await Transaction.findOne({ reference });
        if (existingTransaction) {
          return res.sendStatus(200);
        }

        // Find user
        const user = await User.findById(metadata.userId);
        if (!user) {
          return res.sendStatus(404);
        }

        const amountInCurrency = amount / 100;
        const balanceBefore = user.wallet;

        // Update wallet
        user.wallet += amountInCurrency;
        await user.save();

        // Create transaction
        await Transaction.create({
          user: user._id,
          type: 'Credit',
          amount: amountInCurrency,
          description: 'Wallet top-up via Paystack (Webhook)',
          reference,
          status: 'Success',
          balanceBefore,
          balanceAfter: user.wallet,
        });

        console.log(`Webhook: Payment processed for user ${user.email} - GH₵${amountInCurrency}`);
      }

      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.error('Webhook error:', error);
    res.sendStatus(500);
  }
});

module.exports = router;
