const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Other'],
    required: true
  },
  bestProduct: {
    type: Boolean,
    default: false
  },
  image: {
    type: String, // assuming you will store the URL of the image
    required: true
  }
  // Add other fields as needed
});

module.exports = mongoose.model('Product', productSchema);
