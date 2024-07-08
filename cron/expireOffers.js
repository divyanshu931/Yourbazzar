// cron/expireOffers.js
const cron = require('node-cron');
const Offer = require('../models/offerModel');

cron.schedule('0 * * * *', async () => {
  try {
    const now = new Date();
    const expiredOffers = await Offer.updateMany(
      { expiryDate: { $lte: now }, isExpired: false },
      { isExpired: true }
    );
    console.log(`Expired offers: ${expiredOffers.nModified}`);
  } catch (error) {
    console.error('Error expiring offers:', error.message);
  }
});
