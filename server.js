const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');
const app = express();
const port = 3001;
const cors = require('cors');
const User = require("./user");  // Correct import statement

// Middleware to parse JSON bodies
app.use(express.json());

// Secret key for JWT
const jwtSecret = 'your_jwt_secret';

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'test_divyanshu@gmail.com',
    pass: 'your_email_password'
  }
});

// Generate OTP
const generateOTP = () => {
  return speakeasy.totp({
    secret: speakeasy.generateSecret({ length: 20 }).base32,
    digits: 6,
    step: 300 // OTP valid for 5 minutes
  });
};

// Map to store email and OTP temporarily (In real-world scenario, you might use a database)
const otpMap = new Map();

// Endpoint to send OTP via email
app.post("/sendOTP", async (req, res) => {
  const { email } = req.body;
  
  // Generate OTP
  const otp = generateOTP();
  
  // Save OTP with email in temporary map
  otpMap.set(email, otp);
  
  // Email content
  const mailOptions = {
    from: 'your_email@gmail.com',
    to: email,
    subject: 'OTP for Email Verification',
    text: `Your OTP for email verification is: ${otp}`
  };
  
  // Send email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// Endpoint to verify OTP
app.post("/verifyOTP", async (req, res) => {
  const { email, otp } = req.body;
  
  // Get saved OTP from map
  const savedOTP = otpMap.get(email);
  
  if (!savedOTP) {
    return res.status(400).json({ message: "OTP expired or not found. Please resend OTP." });
  }
  
  // Verify OTP
  const verified = speakeasy.totp.verify({
    secret: savedOTP.secret,
    encoding: 'base32',
    token: otp
  });
  
  if (verified) {
    // OTP verified successfully
    // You can now mark the user as verified in your database or perform other actions
    otpMap.delete(email); // Delete OTP from map after verification
    res.status(200).json({ message: "OTP verified successfully" });
  } else {
    res.status(400).json({ message: "Invalid OTP. Please try again." });
  }
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Yourbazzar', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

app.use(cors());
app.use(express.json());

// Signup endpoint
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();

        // Send OTP via email after successful signup
        const otp = generateOTP();
        otpMap.set(email, otp); // Save OTP with email in temporary map
        
        const mailOptions = {
          from: 'your_email@gmail.com',
          to: email,
          subject: 'OTP for Email Verification',
          text: `Your OTP for email verification is: ${otp}`
        };
        
        await transporter.sendMail(mailOptions);
        
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error occurred" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
