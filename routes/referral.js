const express = require('express');
const router = express.Router();
const Referral = require('../models/Referral');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// @route   GET /api/referrals
// @desc    Get user referrals
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const referrals = await Referral.find({ referrer: req.user._id })
      .populate('referred', 'fullName email createdAt')
      .sort({ createdAt: -1 });

    const totalEarnings = referrals.reduce((sum, ref) => sum + ref.earnings, 0);

    res.json({
      success: true,
      referrals,
      totalEarnings,
      referralCode: req.user.referralCode,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
