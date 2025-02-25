const express = require('express');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const upload = require('../middleware/upload'); // Import the upload middleware
const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Admin-only routes
router.post('/', authMiddleware, adminMiddleware, upload.single('image'), createProduct); // Handle single file upload
router.put('/:id', authMiddleware, adminMiddleware, upload.single('image'), updateProduct); // Handle single file upload
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;