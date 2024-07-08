const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const otpRoutes = require('./routes/otpRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

// Create an Express app
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Define routes
app.use('/api/otp', otpRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
