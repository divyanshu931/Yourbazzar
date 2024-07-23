const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const OTP = require('../models/otpModel');
const jwt = require('jsonwebtoken');

// Function to update last login time
async function updateUserLastLogin(userId) {
  try {
    const user = await User.findById(userId);
    if (user) {
      user.lastLogin = new Date();
      await user.save();
      console.log('Last login updated for user:', user.name);
    } else {
      console.error('User not found');
    }
  } catch (error) {
    console.error('Error updating last login:', error);
  }
}

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, otp } = req.body;
    // Check if all details are provided
    if (!name || !email || !password || !otp) {
      return res.status(403).json({
        success: false,
        message: 'All fields are required',
      });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }
    // Find the most recent OTP for the email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: 'The OTP is not valid',
      });
    }
    // Secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Hashing password error for ${password}: ` + error.message,
      });
    }
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: newUser,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Update last login time
    await updateUserLastLogin(user._id);

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '8h',
    });

    // Return name, email, and token in response
    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
     
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};
