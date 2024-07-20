// controllers/customerController.js
const User = require('../models/userModel');

// Controller functions
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: 'Customer' });
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ message: "Failed to fetch customers. Please try again later." });
  }
};

exports.deleteCustomer = async (req, res) => {
  const { customerId } = req.params;
  try {
    await User.findByIdAndDelete(customerId);
    res.json({ message: "Customer deleted successfully!" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ message: "Failed to delete customer. Please try again later." });
  }
};

exports.sendEmailToCustomer = async (req, res) => {
  const { customerId } = req.params;
  const { subject, body } = req.body;
  try {
    // Logic to send email to customer (implement your email sending logic here)
    res.json({ message: `Email sent to customer ${customerId} successfully!` });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email. Please try again later." });
  }
};

exports.sendEmailToAllCustomers = async (req, res) => {
  const { subject, body } = req.body;
  try {
    // Logic to send email to all customers (implement your email sending logic here)
    res.json({ message: `Email sent to all customers successfully!` });
  } catch (error) {
    console.error("Error sending email to all customers:", error);
    res.status(500).json({ message: "Failed to send email to all customers. Please try again later." });
  }
};
