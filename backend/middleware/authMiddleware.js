const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const authMiddleware = async (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user from the database
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.id]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach the user to the request object
    req.user = user.rows[0];
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;