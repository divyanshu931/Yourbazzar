const Product = require('../models/productModel');
const upload = require('../middlewares/multerConfig');
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

// Add a new product with image handling
exports.addProduct = async (req, res) => {
  try {
    // Extract form data and uploaded file path
    const { name, description, price, category, bestProduct, approved } = req.body;
   
    // Get the file path from req.file if available
    const image = req.file ? req.file.path : null;

    // Create new Product instance
    const product = new Product({
      name,
      description,
      price,
      category,
      bestProduct,
      image,
   
      approved
    });

    // Save product to database
    await product.save();

    // Respond with success message and product data
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (err) {
    // Handle errors
    console.error('Error adding product:', err);
    res.status(400).json({
      success: false,
      message: 'Failed to add product. Please try again.',
    });
  }
};
// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id});

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found or you are not authorized to delete this product.',
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


exports.updateProduct = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'price', 'category', 'bestProduct', 'image', 'approved'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({
        success: false,
        message: 'Invalid updates!',
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found or you are not authorized to update this product.',
      });
    }

    updates.forEach(update => {
      if (update === 'image' && req.file) {
        // Update image if a new file is uploaded
        product[update] = req.file.path;
      } else {
        product[update] = req.body[update];
      }
    });

    const updatedProduct = await product.save();

    res.json({
      success: true,
      data: updatedProduct,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.toggleProductApproval = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found or you are not authorized to approve/update this product.',
      });
    }

    product.approved = !product.approved;
    await product.save();

    res.json({
      success: true,
      data: product,
    });
  } catch (err) {
    console.error("Error toggling product approval:", err);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle approval status. Please try again later.',
    });
  }
};
