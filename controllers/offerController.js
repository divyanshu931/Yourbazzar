// controllers/offerController.js
const Offer = require('../models/offerModel');

exports.createOffer = async (req, res) => {
  try {
    const { title, description, discount, expiryDate, imageUrl } = req.body;

    const newOffer = await Offer.create({
      title,
      description,
      discount,
      expiryDate,
      imageUrl
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

exports.updateOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, discount, expiryDate, imageUrl } = req.body;

    const updatedOffer = await Offer.findByIdAndUpdate(
      id,
      { title, description, discount, expiryDate, imageUrl },
      { new: true }
    );

    if (!updatedOffer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Offer updated successfully',
      offer: updatedOffer
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to update offer',
      error: error.message
    });
  }
};

exports.deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOffer = await Offer.findByIdAndDelete(id);

    if (!deletedOffer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Offer deleted successfully'
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to delete offer',
      error: error.message
    });
  }
};
