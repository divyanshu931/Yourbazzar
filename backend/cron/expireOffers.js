const cron = require('node-cron');
const Offer = require('../models/offerModel');

cron.schedule('0 * * * *', async () => {
  try {
    const now = new Date();
    const deletedOffers = await Offer.deleteMany({ expiryDate: { $lte: now }, isExpired: true });
    console.log(`Deleted expired offers: ${deletedOffers.deletedCount}`);
  } catch (error) {
    console.error('Error deleting expired offers:', error.message);
  }
});
