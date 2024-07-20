const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Import routes
const otpRoutes = require("./routes/otpRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const publicRoutes = require("./routes/publicRoutes");
const offerRoutes = require('./routes/offerRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const cartRoutes = require('./routes/cartRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Create an Express app
const app = express();

// Allow requests from specific origins
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:4000',
    process.env.FRONTEND_URL_LOCALHOST,
    process.env.FRONTEND_URL_OTHER
];

// Configure CORS
app.use(cors({
    origin: allowedOrigins,
}));

// Middleware to parse JSON
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected ✅"))
    .catch((err) => console.log("MongoDB connection error:", err));

// Define routes
app.use("/api/otp", otpRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/public", publicRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/admins', adminRoutes); 

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
