// const pool = require('../config/db');

// // Create new user in the database
// const createUser = async (username, email, hashedPassword) => {
//   const result = await pool.query(
//     'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
//     [username, email, hashedPassword]
//   );
//   return result.rows[0];
// };

// // Find a user by email
// const findUserByEmail = async (email) => {
//   const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
//   return result.rows[0];
// };

// module.exports = { createUser, findUserByEmail };
