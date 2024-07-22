const OTP = require('../models/otpModel');

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if OTP already sent to this email
    const checkUserOtp = await OTP.findOne({ email });
    if (checkUserOtp) {
      return res.status(401).json({
        success: false,
        message: 'OTP already sent for this email',
      });
    }

    // Generate OTP
    let otp = generateOTP(); // Function to generate OTP
    let existingOTP = await OTP.findOne({ otp });

    // Ensure unique OTP
    while (existingOTP) {
      otp = generateOTP();
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

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the most recent OTP for the email
    const latestOTP = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (!latestOTP || otp !== latestOTP.otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP',
      });
    }

    // Optionally, you can delete the OTP after successful verification
    // await OTP.deleteOne({ _id: latestOTP._id });

    return res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Helper function to generate OTP
function generateOTP() {
  const otpLength = 4; // You can adjust the length of OTP as per your requirement
  const otp = Math.random().toString().substr(2, otpLength);
  return otp;
}
