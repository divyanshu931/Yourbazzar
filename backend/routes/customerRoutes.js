// routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/customers', customerController.getAllCustomers);
router.delete('/customers/delete/:customerId', customerController.deleteCustomer);
router.post('/customers/email/:customerId', customerController.sendEmailToCustomer);
router.post('/customers/email/all', customerController.sendEmailToAllCustomers);

module.exports = router;
