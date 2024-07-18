const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100 // Optional: Limit the length of the product name
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000 // Optional: Limit the length of the description
  },
  price: {
    type: Number,
    required: true,
    min: 0 // Ensure the price is a positive number
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Clothing', 'Home', 'Books', 'Sports'], // Optional: Limit to specific categories
  },
  bestProduct: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    required: true,
   
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('Product', productSchema);
