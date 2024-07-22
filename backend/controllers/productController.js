const Product = require('../models/productModel');

// Fetch unapproved products
exports.getUnapprovedProducts = async (req, res) => {
  try {
    const unapprovedProducts = await Product.find({ approved: false });
    res.json({
      success: true,
      data: unapprovedProducts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  const { name, description, price, category, bestProduct, image } = req.body;
  const product = new Product({
    name,
    description,
    price,
    category,
    bestProduct,
    image
  });
  try {
    await product.save();
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }
    res.json({
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update product details
exports.updateProduct = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'description', 'price', 'category', 'bestProduct', 'image', 'approved'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({
      success: false,
      message: 'Invalid updates!',
    });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    updates.forEach((update) => (product[update] = req.body[update]));
    await product.save();
    res.json({
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Toggle approval status of a product
exports.toggleProductApproval = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    product.approved = !product.approved;
    await product.save();

    res.json({
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
