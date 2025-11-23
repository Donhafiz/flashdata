const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');

// @route   GET /api/user/transactions
// @desc    Get user transactions
// @access  Private
router.get('/transactions', protect, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ success: true, transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/user/stats
// @desc    Get user statistics
// @access  Private
router.get('/stats', protect, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments({ user: req.user._id });
    const completedOrders = await Order.countDocuments({ user: req.user._id, status: 'Completed' });
    const totalSpent = await Order.aggregate([
      { $match: { user: req.user._id, status: 'Completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    // Weekly sales data
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const weeklySales = await Order.aggregate([
      {
        $match: {
          user: req.user._id,
          status: 'Completed',
          createdAt: { $gte: weekAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
          amount: { $sum: '$amount' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      stats: {
        totalOrders,
        completedOrders,
        totalSpent: totalSpent[0]?.total || 0,
        weeklySales,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const { fullName, phone } = req.body;

    req.user.fullName = fullName || req.user.fullName;
    req.user.phone = phone || req.user.phone;

    await req.user.save();

    res.json({
      success: true,
      user: {
        id: req.user._id,
        fullName: req.user.fullName,
        email: req.user.email,
        phone: req.user.phone,
        role: req.user.role,
        wallet: req.user.wallet,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
