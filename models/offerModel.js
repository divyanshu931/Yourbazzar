// models/offerModel.js
const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  isExpired: {
    type: Boolean,
    default: false
  }
});

const Offer = mongoose.model('Offer', offerSchema);
module.exports = Offer;
