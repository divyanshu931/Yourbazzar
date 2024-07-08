const express = require('express');
const router = express.Router();
const Product = require('../models/productModel'); // adjust the path as needed

// Route to get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get the best product
router.get('/products/best', async (req, res) => {
  try {
    const bestProducts = await Product.find({ bestProduct: true });
    res.json(bestProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Export the router
module.exports = router;
