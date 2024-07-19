const express = require('express');
const router = express.Router();
const { addProduct, deleteProduct, updateProduct } = require('../controllers/productController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Add a new product
router.post('/add',  addProduct);

// Delete a product
router.delete('/:id',  deleteProduct);

// Update product details
router.patch('/:id', updateProduct);

module.exports = router;
