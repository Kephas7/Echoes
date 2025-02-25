const pool = require('../config/db');

// Create a new order
const createOrder = async (userId, totalAmount, shippingAddress, items) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Insert the order
    const orderQuery = `
      INSERT INTO orders (user_id, total_amount, shipping_address)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const orderValues = [userId, totalAmount, shippingAddress];
    const orderResult = await client.query(orderQuery, orderValues);
    const order = orderResult.rows[0];

    // Insert order items
    for (const item of items) {
      const itemQuery = `
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES ($1, $2, $3, $4);
      `;
      const itemValues = [order.id, item.id, item.quantity, item.price];
      await client.query(itemQuery, itemValues);
    }

    await client.query('COMMIT');
    return order;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

// Get orders for a user
const getOrdersByUser = async (userId) => {
  const query = `
    SELECT o.*, json_agg(oi) AS items
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    WHERE o.user_id = $1
    GROUP BY o.id;
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

module.exports = { createOrder, getOrdersByUser };