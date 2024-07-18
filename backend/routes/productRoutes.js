const express = require('express');
const router = express.Router();
const { addProduct, deleteProduct, updateProduct } = require('../controllers/productController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Add a new product
router.post('/add', protect, authorize('Admin'), addProduct);

// Delete a product
router.delete('/:id', protect, authorize('Admin'), deleteProduct);

// Update product details
router.patch('/:id', protect, authorize('Admin'), updateProduct);

module.exports = router;
