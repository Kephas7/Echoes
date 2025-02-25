const { createOrder, getOrdersByUser } = require('../models/orderModel');

// Create a new order
const createOrder = async (req, res) => {
  const { userId, totalAmount, shippingAddress, items } = req.body;

  try {
    const order = await createOrder(userId, totalAmount, shippingAddress, items);
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get orders for a user
const getOrdersByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await getOrdersByUser(userId);
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createOrder, getOrdersByUser };