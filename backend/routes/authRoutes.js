// authRoutes.js
const express = require('express');
const { register, login, getUsers, deleteUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Admin-only routes
router.get('/users', authMiddleware, adminMiddleware, getUsers);
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);

module.exports = router;