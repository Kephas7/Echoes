const { getAllProducts, getProductById, addProduct } = require('../models/productModel');

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a product by ID
const getProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock_quantity, category, image_url } = req.body;
    const newProduct = await addProduct(name, description, price, stock_quantity, category, image_url);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getProducts, getProduct, createProduct };