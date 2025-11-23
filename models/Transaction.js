const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['Credit', 'Debit', 'Referral', 'Commission'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  reference: {
    type: String,
    unique: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Success', 'Failed'],
    default: 'Success',
  },
  balanceBefore: Number,
  balanceAfter: Number,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Transaction', transactionSchema);
