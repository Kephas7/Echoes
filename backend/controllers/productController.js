const { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('../models/productModel');

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

// Add a new product (admin only)
const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock_quantity, category } = req.body;

    // Check if an image was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const image_url = req.file.path; // Path to the uploaded file

    const newProduct = await addProduct(name, description, price, stock_quantity, category, image_url);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a product (admin only)
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock_quantity, category } = req.body;

  try {
    // Check if the product exists
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Use the existing image URL if no new image is uploaded
    const image_url = req.file ? req.file.path : product.image_url;

    // Update the product
    const updatedProduct = await updateProduct(id, name, description, price, stock_quantity, category, image_url);
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a product (admin only)
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the product exists
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete the product
    await deleteProduct(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };