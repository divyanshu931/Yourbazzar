const Category = require('../models/categoryModel');
const upload = require('../middlewares/multerConfig');

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new category
const createCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    // File uploaded successfully, continue with category creation
    const newCategory = new Category({
      name: name,
      image: req.file.path, // Store the path to the uploaded image
      description: description
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a single category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category == null) {
      return res.status(404).json({ message: 'Cannot find category' });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a category
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category == null) {
      return res.status(404).json({ message: 'Cannot find category' });
    }

    if (req.body.image != null) {
      category.image = req.body.image;
    }
    if (req.body.description != null) {
      category.description = req.body.description;
    }

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Deleted category' });
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
};
