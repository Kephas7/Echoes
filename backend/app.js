const express = require('express');
const cors = require('cors'); // Import cors
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});