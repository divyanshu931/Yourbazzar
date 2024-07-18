// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Only Admin and Seller can access this route
router.get('/protected-route', protect, authorize('Admin', 'Seller'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'You have accessed a protected route',
  });
});

module.exports = router;
