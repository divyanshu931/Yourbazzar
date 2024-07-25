// routes/offerRoutes.js
const express = require('express');
const { createOffer, updateOffer, deleteOffer, getAllOffers,getOfferById } = require('../controllers/offerController');
const upload = require('../middlewares/multerConfig'); 
const router = express.Router();

router.post('/create', upload.single('image'),createOffer);
router.put('/update/:id', upload.single('image'), updateOffer);
router.delete('/delete/:id', deleteOffer);
router.get('/:id', getOfferById);//public
router.get('/', getAllOffers); // Public route

module.exports = router;
