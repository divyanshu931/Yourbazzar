// controllers/offerController.js
const Offer = require('../models/offerModel');

exports.createOffer = async (req, res) => {
  const { title, description, discount, expiryDate } = req.body;

  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    // File uploaded successfully, continue with offer creation
    const newOffer = new Offer({
      title,
      description,
      discount,
      expiryDate,
      imageUrl: req.file.path, // Store the path to the uploaded image
    });

    const savedOffer = await newOffer.save();
    res.status(201).json({
      success: true,
      message: 'Offer created successfully',
      offer: savedOffer,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to create offer',
      error: err.message,
    });
  }
};
// Update Offer
exports.updateOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, discount, expiryDate } = req.body;

    // Check if file was uploaded
    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path; // If new image is uploaded, update imageUrl
    }

    const updatedOffer = await Offer.findByIdAndUpdate(
      id,
      {
        title,
        description,
        discount,
        expiryDate,
        ...(imageUrl && { imageUrl }), // Conditionally update imageUrl if new image is uploaded
      },
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

// Delete Offer
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

// Fetch All Offers
exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find();

    res.status(200).json({
      success: true,
      offers
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch offers',
      error: error.message
    });
  }
};

//single offer
exports.getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({ success: false, message: 'Offer not found' });
    }

    // Optionally, you can check authorization here if needed
    // For example, ensure the logged-in user has permission to view this offer

    res.status(200).json({ success: true, offer });
  } catch (error) {
    console.error('Error fetching offer:', error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};