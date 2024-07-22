const express = require('express');
const { getAllCategories, createCategory, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categoryController');
const upload = require('../middlewares/multerConfig'); // Import Multer configuration

const router = express.Router();

router.get('/', getAllCategories); // Public route to get all categories
router.post('/create', upload.single('image'), createCategory); // Admin only route to create a category with image upload
router.get('/:id', getCategoryById); // Public route to get a single category by ID
router.put('/update/:id', updateCategory); // Admin only route to update a category
router.delete('/delete/:id', deleteCategory); // Admin only route to delete a category

module.exports = router;
