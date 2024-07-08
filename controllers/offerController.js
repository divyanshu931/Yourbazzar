// controllers/offerController.js
const Offer = require('../models/offerModel');

exports.createOffer = async (req, res) => {
  try {
    const { title, description, discount, expiryDate } = req.body;

    const newOffer = await Offer.create({
      title,
      description,
      discount,
      expiryDate
    });

    res.status(201).json({
      success: true,
      message: 'Offer created successfully',
      offer: newOffer
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to create offer',
      error: error.message
    });
  }
};
