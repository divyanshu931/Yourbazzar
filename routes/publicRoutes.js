const express = require('express');
const router = express.Router();
const Product = require('../models/productModel'); // adjust the path as needed

// Route to get all by category products
router.get('/products', async (req, res) => {
  try {
    const { category } = req.query;
    let products;

    if (category) {
      products = await Product.find({ category: category });
    } else {
      products = await Product.find({});
    }

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route for searching products
router.get('/products/search', async (req, res) => {
  try {
    // Extract search parameters from query string
    const { name, category, description } = req.query;

    // Construct query object based on provided parameters
    const query = {};
    if (name) query.name = { $regex: new RegExp(name, 'i') }; // Case-insensitive regex search for name
    if (category) query.category = category; // Exact match for category
    if (description) query.description = { $regex: new RegExp(description, 'i') }; // Case-insensitive regex search for description

    // Fetch products based on the constructed query
    const products = await Product.find(query);

    res.json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Route to get the best products
router.get('/products/best', async (req, res) => {
  try {
    const bestProducts = await Product.find({ bestProduct: true });
    res.json(bestProducts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to get a product by ID

router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Export the router
module.exports = router;
