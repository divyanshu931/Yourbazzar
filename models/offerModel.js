// models/offerModel.js
const mongoose = require('mongoose');
const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true,
    // TTL index for automatic deletion after expiryDate
    expires: 0 // set to 0 to delete documents exactly at `expiryDate`
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference to Product model if applicable
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
  // Add other fields as needed
});

// Optional: Middleware to perform actions before or after saving documents
// For example, sending email notifications

// Define a function to send emails
async function sendOfferExpiryEmail(email, title) {
  try {
    const mailResponse = await mailSender(
      email,
      "Offer Expiry Notification",
      `<h1>Your offer "${title}" has expired</h1>`
    );
    console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

offerSchema.pre("save", async function (next) {
  console.log("New offer document saved to database");

  // Only send an email notification when a new offer is created
  if (this.isNew) {
    await sendOfferExpiryEmail(this.email, this.title);
  }
  next();
});

module.exports = mongoose.model('Offer', offerSchema);
