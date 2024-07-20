// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// POST route to add a new admin
router.post('/add', adminController.addAdmin);

// DELETE route to delete an admin by ID
router.delete('/delete/:adminId', adminController.deleteAdmin);

// GET route to fetch all admins
router.get('/', adminController.fetchAdmins);

module.exports = router;
