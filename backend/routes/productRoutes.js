const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/multerConfig'); 

// Route to fetch unapproved products
router.get('/products/unapproved', productController.getUnapprovedProducts);

// Route to add a new product
router.post('/products', upload.single('image'), productController.addProduct);

// Route to delete a product by ID
router.delete('/products/:id', productController.deleteProduct);

// Route to update a product by ID
router.put('/products/:id', upload.single('image'), productController.updateProduct);

// Route to toggle approval of a product by ID
router.patch('/products/approve/:id', productController.toggleProductApproval);

module.exports = router;
