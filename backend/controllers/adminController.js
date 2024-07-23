const bcrypt = require('bcrypt');


const User = require('../models/userModel'); // Assuming User model is defined somewhere

// Controller to add a new admin
exports.addAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new User instance with hashed password
    const newAdmin = new User({
      name,
      email,
      password: hashedPassword, // Store hashed password in database
      role: 'Seller' // Hardcode role as 'Admin' when adding admin
    });

    // Save newAdmin to database
    await newAdmin.save();

    // Respond with the newly created admin user
    res.status(201).json(newAdmin);
  } catch (error) {
    console.error('Error adding seller:', error);
    res.status(500).json({ error: 'Failed to add seller. Please try again.' });
  }
};
// Controller to delete an admin by ID
exports.deleteAdmin = async (req, res) => {
  const { adminId } = req.params;

  try {
    const deletedAdmin = await User.findByIdAndDelete(adminId);

    if (!deletedAdmin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({ error: 'Failed to delete admin. Please try again.' });
  }
};

// Controller to fetch all admins
exports.fetchAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'Seller' }); // Fetch users with role 'Admin'
    res.json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ error: 'Failed to fetch admins. Please try again.' });
  }
};
