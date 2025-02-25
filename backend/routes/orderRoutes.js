const express = require('express');
const { createOrder, getOrdersByUser } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create a new order
router.post('/', authMiddleware, createOrder);

// Get orders for a user
router.get('/user/:userId', authMiddleware, getOrdersByUser);

module.exports = router;