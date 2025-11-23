const mongoose = require('mongoose');

const bundleSchema = new mongoose.Schema({
  network: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Network',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dataAmount: {
    type: String,
    required: true,
  },
  validity: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  customerPrice: {
    type: Number,
    required: true,
  },
  agentPrice: {
    type: Number,
    required: true,
  },
  agentProPrice: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Bundle', bundleSchema);
