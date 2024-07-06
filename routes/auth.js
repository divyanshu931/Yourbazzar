const express = require('express');
const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy');
const User = require('../models/user');
const sendMail = require('../utils/mailer');

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;

// Temporary storage for user details and OTP
const tempStorage = new Map();
const otpMap = new Map();

// Ensure `secret` is defined and returned in generateOTP function
const generateOTP = () => {
    // Generate a secret for OTP (using base32 encoding)
    const secret = speakeasy.generateSecret({ length: 20 }).base32;

    // Generate OTP using the generated secret
    const otp = speakeasy.totp({
        secret: secret,
        digits: 4, // Set to 4 digits
        step: 300 // OTP valid for 5 minutes
    });

    console.log(`Generated OTP for secret (${secret}): ${otp}`); // Log generated OTP and secret

    return { otp, secret };
};


// Endpoint to send OTP via email after first page submission
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Store user details temporarily
        tempStorage.set(email, { name, email, password });

        // Generate and send OTP via email
        const { otp, secret } = generateOTP();
        otpMap.set(email, { otp, secret });

        await sendMail(email, 'OTP for Email Verification', `Your OTP for email verification is: ${otp}`);

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error occurred" });
    }
});

// Endpoint to verify OTP and register user
router.post("/verifyAndRegister", async (req, res) => {
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

        // Debugging: Log OTP details to console
        console.log(`Expected OTP for secret (${otpDetails.secret}): ${otpDetails.otp}, Entered OTP: ${otp}`);

        // Verify OTP
        const verified = speakeasy.totp.verify({
            secret: otpDetails.secret,
            encoding: 'base32',
            token: otp,
            window: 2// Adjust this window if necessary
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

module.exports = router;
