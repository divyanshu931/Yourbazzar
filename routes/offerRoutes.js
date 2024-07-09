// routes/offerRoutes.js
const express = require('express');
const { createOffer, updateOffer, deleteOffer, getAllOffers } = require('../controllers/offerController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', protect, authorize('admin'), createOffer);
router.put('/update/:id', protect, authorize('admin'), updateOffer);
router.delete('/delete/:id', protect, authorize('admin'), deleteOffer);
router.get('/', getAllOffers); // Public route

module.exports = router;
