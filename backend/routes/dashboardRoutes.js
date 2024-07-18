// dashboardRoutes.js

const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { protect, authorize } = require('../middlewares/authMiddleware');


// Route to fetch counts
router.get('/counts', dashboardController.getCounts);

module.exports = router;
