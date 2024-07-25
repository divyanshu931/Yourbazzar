const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  mrp: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
  },
  bestProduct: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    required: true
  },
  approved: {
    type: Boolean,
    default: false
  },
  sellerName: {
    type: String,
    required: true
  },
  sellerId: {
    type: String,
   
  },
  discount: {
    type: Number,
    default: 0,
    min: 0
  
  }
}, {
  timestamps: true
});



module.exports = mongoose.model('Product', productSchema);
