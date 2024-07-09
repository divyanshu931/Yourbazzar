const express = require('express');
const { getAllCategories, createCategory, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getAllCategories); // Public route to get all categories
router.post('/create', protect, authorize('Admin'), createCategory); // Admin only route to create a category
router.get('/:id', getCategoryById); // Public route to get a single category by ID
router.put('/update/:id', protect, authorize('Admin'), updateCategory); // Admin only route to update a category
router.delete('/delete/:id', protect, authorize('Admin'), deleteCategory); // Admin only route to delete a category

module.exports = router;
