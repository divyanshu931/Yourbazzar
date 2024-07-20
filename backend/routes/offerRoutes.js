// routes/offerRoutes.js
const express = require('express');
const { createOffer, updateOffer, deleteOffer, getAllOffers,getOfferById } = require('../controllers/offerController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', protect, authorize('admin'), createOffer);
router.put('/update/:id', protect, authorize('admin'), updateOffer);
router.delete('/delete/:id', deleteOffer);
router.get('/:id', getOfferById);//public
router.get('/', getAllOffers); // Public route

module.exports = router;
