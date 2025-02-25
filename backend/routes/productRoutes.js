const express = require('express');
const { getProducts, getProduct, createProduct } = require('../controllers/productController');
const router = express.Router();

// GET all products
router.get('/', getProducts);

// GET a single product by ID
router.get('/:id', getProduct);

// POST a new product
router.post('/', createProduct);

module.exports = router;