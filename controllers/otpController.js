// controllers/otpController.js
const otpGenerator = require('otp-generator');
const OTP = require('../models/otpModel');
const User = require('../models/userModel');

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user is already registered
    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: 'User is already registered',
      });
    }

    // Check if OTP already sent to this email
    const checkUserOtp = await OTP.findOne({ email });
    if (checkUserOtp) {
      return res.status(401).json({
        success: false,
        message: 'OTP already sent for this email',
      });
    }

    // Generate OTP
    let otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Ensure unique OTP
    let existingOTP = await OTP.findOne({ otp });
    while (existingOTP) {
      otp = otpGenerator.generate(4, {  // Use the same length as the original generation
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      existingOTP = await OTP.findOne({ otp });
    }

    // Store OTP in database
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);

    // Return success response
    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      otp,
    });

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};
