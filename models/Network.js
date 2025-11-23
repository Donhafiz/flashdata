const mongoose = require('mongoose');

const networkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['MTN', 'Telecel', 'AirtelTigo'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  logo: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Network', networkSchema);
