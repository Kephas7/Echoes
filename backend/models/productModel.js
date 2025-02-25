const pool = require('../config/db');

// Get all products
const getAllProducts = async () => {
  const query = 'SELECT * FROM products;';
  const result = await pool.query(query);
  return result.rows;
};

// Get a product by ID
const getProductById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = $1;';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

// Add a new product
const addProduct = async (name, description, price, stock_quantity, category, image_url) => {
  const query = `
    INSERT INTO products (name, description, price, stock_quantity, category, image_url)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [name, description, price, stock_quantity, category, image_url];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { getAllProducts, getProductById, addProduct };