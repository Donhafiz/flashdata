const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');
const Bundle = require('../models/Bundle');
const Network = require('../models/Network');
const Transaction = require('../models/Transaction');
const Announcement = require('../models/Announcement');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');

// Apply middleware to all routes
router.use(protect);
router.use(adminOnly);

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard stats
// @access  Admin
router.get('/dashboard', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { status: 'Completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const recentOrders = await Order.find()
      .populate('user bundle network')
      .sort({ createdAt: -1 })
      .limit(10);

    // Monthly sales chart
    const monthlySales = await Order.aggregate([
      {
        $match: {
          status: 'Completed',
          createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)) },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          count: { $sum: 1 },
          revenue: { $sum: '$amount' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        recentOrders,
        monthlySales,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Networks Management
router.get('/networks', async (req, res) => {
  try {
    const networks = await Network.find();
    res.json({ success: true, networks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/networks', async (req, res) => {
  try {
    const network = await Network.create(req.body);
    res.status(201).json({ success: true, network });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/networks/:id', async (req, res) => {
  try {
    const network = await Network.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, network });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Bundles Management
router.get('/bundles', async (req, res) => {
  try {
    const bundles = await Bundle.find().populate('network');
    res.json({ success: true, bundles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/bundles', async (req, res) => {
  try {
    const bundle = await Bundle.create(req.body);
    res.status(201).json({ success: true, bundle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/bundles/:id', async (req, res) => {
  try {
    const bundle = await Bundle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, bundle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/bundles/:id', async (req, res) => {
  try {
    await Bundle.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Bundle deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Users Management
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Orders Management
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user bundle network')
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Announcements Management
router.get('/announcements', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json({ success: true, announcements });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/announcements', async (req, res) => {
  try {
    const announcement = await Announcement.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json({ success: true, announcement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/announcements/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, announcement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/announcements/:id', async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Announcement deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
