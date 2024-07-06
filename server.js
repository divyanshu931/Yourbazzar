const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');
const cors = require('cors');
const User = require("./user");  // Correct import statement

const app = express();
const port = 3001;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Secret key for JWT
const jwtSecret = 'your_jwt_secret';

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'testdivyanshu2@gmail.com',
    pass: 'lxgxjziqpgavtgaj'
  }
});

// Temporary storage for user details and OTP
const tempStorage = new Map();
const otpMap = new Map();

// Generate 4-digit OTP
const generateOTP = () => {
  const secret = speakeasy.generateSecret({ length: 20 }).base32;
  const otp = speakeasy.totp({
    secret: secret,
    digits: 4, // Set to 4 digits
    step: 300 // OTP valid for 5 minutes
  });
  return { otp, secret };
};

// Endpoint to send OTP via email after first page submission
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Store user details temporarily
        tempStorage.set(email, { name, email, password });

        // Generate and send OTP via email
        const { otp, secret } = generateOTP();
        otpMap.set(email, { otp, secret });

        const mailOptions = {
          from: 'testdivyanshu2@gmail.com',
          to: email,
          subject: 'OTP for Email Verification',
          text: `Your OTP for email verification is: ${otp}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error occurred" });
    }
});

// Endpoint to verify OTP and register user
app.post("/verifyAndRegister", async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Get user details from temporary storage
        const userDetails = tempStorage.get(email);
        if (!userDetails) {
          return res.status(404).json({ message: "User details not found. Please sign up again." });
        }

        // Get OTP details from otpMap
        const otpDetails = otpMap.get(email);
        if (!otpDetails) {
          return res.status(400).json({ message: "OTP not found. Please request a new OTP." });
        }

        const verified = speakeasy.totp.verify({
          secret: otpDetails.secret,
          encoding: 'base32',
          token: otp,
          window: 1
        });

        if (!verified) {
          return res.status(400).json({ message: "Invalid OTP. Please try again." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(userDetails.password, 10);

        // Create new user in database
        const newUser = new User({
          name: userDetails.name,
          email: userDetails.email,
          password: hashedPassword
        });

        await newUser.save();

        // Clear temporary storage
        tempStorage.delete(email);
        otpMap.delete(email);

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error occurred" });
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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
