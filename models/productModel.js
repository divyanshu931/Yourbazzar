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
    required: true
  },
  bestProduct: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    required: true  // Assuming you store the URL of the image
  }
  // You can add other fields as needed
});

module.exports = mongoose.model('Product', productSchema);
