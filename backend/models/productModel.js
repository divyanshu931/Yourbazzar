const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: 100 // Maximum length of 100 characters for the product name
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000 // Maximum length of 1000 characters for the product description
  },
  price: {
    type: Number,
    required: true,
    min: 0 // Minimum price allowed is 0 (ensures positive number)
  },
  category: {
    type: String,
    required: true,
  },
  bestProduct: {
    type: Boolean,
    default: false // Default value for bestProduct is false
  },
  image: {
    type: String,
    required: true // Image URL is required
  },
  approved: {
    type: Boolean,
    default: false // Default value for approved is false
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields to the document
});

module.exports = mongoose.model('Product', productSchema);
