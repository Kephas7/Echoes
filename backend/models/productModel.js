const pool = require('../config/db');

// Get all products
const getAllProducts = async () => {
  const result = await pool.query('SELECT * FROM products');
  return result.rows;
};

// Get a product by ID
const getProductById = async (id) => {
  const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  return result.rows[0];
};

// Add a new product
const addProduct = async (name, description, price, stock_quantity, category, image_url) => {
  const result = await pool.query(
    'INSERT INTO products (name, description, price, stock_quantity, category, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [name, description, price, stock_quantity, category, image_url]
  );
  return result.rows[0];
};

// Update a product
const updateProduct = async (id, name, description, price, stock_quantity, category, image_url) => {
  const result = await pool.query(
    'UPDATE products SET name = $1, description = $2, price = $3, stock_quantity = $4, category = $5, image_url = $6 WHERE id = $7 RETURNING *',
    [name, description, price, stock_quantity, category, image_url, id]
  );
  return result.rows[0];
};

// Delete a product
const deleteProduct = async (id) => {
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
};

module.exports = { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct };