const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Bundle = require('../models/Bundle');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const { protect } = require('../middleware/auth');
const { calculateCommission, calculateReferralBonus } = require('../utils/commission');
const { deliverData } = require('../utils/delivery');

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { bundleId, phoneNumber } = req.body;

    const bundle = await Bundle.findById(bundleId).populate('network');
    if (!bundle || !bundle.isActive) {
      return res.status(404).json({ success: false, message: 'Bundle not found' });
    }

    // Get price based on user role
    let price;
    switch(req.user.role) {
      case 'Agent':
        price = bundle.agentPrice;
        break;
      case 'Agent Pro':
        price = bundle.agentProPrice;
        break;
      default:
        price = bundle.customerPrice;
    }

    // Check wallet balance
    if (req.user.wallet < price) {
      return res.status(400).json({ success: false, message: 'Insufficient wallet balance' });
    }

    // Calculate commission
    const commission = calculateCommission(req.user.role, bundle.price, price);

    // Create order
    const order = await Order.create({
      user: req.user._id,
      bundle: bundleId,
      network: bundle.network._id,
      phoneNumber,
      amount: price,
      commission,
    });

    // Deduct from wallet
    req.user.wallet -= price;
    await req.user.save();

    // Create transaction
    await Transaction.create({
      user: req.user._id,
      type: 'Debit',
      amount: price,
      description: `Data purchase - ${bundle.dataAmount} ${bundle.network.name}`,
      reference: order.orderNumber,
      balanceBefore: req.user.wallet + price,
      balanceAfter: req.user.wallet,
    });

    // Process delivery
    setTimeout(async () => {
      order.status = 'Processing';
      order.deliveryStatus = 'Sending';
      await order.save();

      const result = await deliverData(order);
      
      if (result.success) {
        order.status = 'Completed';
        order.deliveryStatus = 'Delivered';
        
        // Add commission to user
        if (commission > 0) {
          req.user.wallet += commission;
          req.user.totalEarnings += commission;
          await req.user.save();

          await Transaction.create({
            user: req.user._id,
            type: 'Commission',
            amount: commission,
            description: `Commission from order ${order.orderNumber}`,
            reference: `COM-${order.orderNumber}`,
          });
        }

        // Handle referral bonus
        if (req.user.referredBy) {
          const referrer = await User.findById(req.user.referredBy);
          if (referrer) {
            const bonus = calculateReferralBonus(price);
            referrer.wallet += bonus;
            referrer.totalEarnings += bonus;
            await referrer.save();

            await Transaction.create({
              user: referrer._id,
              type: 'Referral',
              amount: bonus,
              description: `Referral bonus from ${req.user.fullName}`,
              reference: `REF-${order.orderNumber}`,
            });
          }
        }
      } else {
        order.status = 'Failed';
        order.deliveryStatus = 'Failed';
        
        // Refund user
        req.user.wallet += price;
        await req.user.save();
      }
      
      await order.save();
    }, 1000);

    res.status(201).json({
      success: true,
      order: await Order.findById(order._id).populate('bundle network'),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/orders
// @desc    Get user orders
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('bundle network')
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('bundle network user');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Check if user owns the order or is admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
