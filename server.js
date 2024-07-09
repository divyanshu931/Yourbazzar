const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const otpRoutes = require("./routes/otpRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const publicRoutes = require("./routes/publicRoutes");
const offerRoutes = require('./routes/offerRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

require('./cron/expireOffers'); 
const cors = require("cors");



require("dotenv").config();

// Create an Express app
const app = express();
// Allow requests from all origins
app.use(cors());

// Or allow requests from specific origins
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
// Middleware to parse JSON
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Define routes
app.use("/api/otp", otpRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/public", publicRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/categories', categoryRoutes)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
