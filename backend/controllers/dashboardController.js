const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const User = require('../models/userModel'); // Adjust path to your User model
const Offer = require('../models/offerModel');

exports.getCounts = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    const categoryCount = await Category.countDocuments();
    
    // Count users based on roles
    const adminCount = await User.countDocuments({ role: 'Admin' });
    const sellerCount = await User.countDocuments({ role: 'Seller' });
    const customerCount = await User.countDocuments({ role: 'Customer' });

    const offerCount = await Offer.countDocuments();


    res.json({
      productCount,
      categoryCount,
      adminCount,
      customerCount,
      offerCount,
      sellerCount
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

