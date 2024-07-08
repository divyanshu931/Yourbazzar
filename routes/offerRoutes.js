// routes/offerRoutes.js
const express = require('express');
const { createOffer, updateOffer, deleteOffer } = require('../controllers/offerController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', protect, authorize('Admin'), createOffer);
router.put('/update/:id', protect, authorize('Admin'), updateOffer);
router.delete('/delete/:id', protect, authorize('Admin'), deleteOffer);

module.exports = router;
