const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Authentication routes

app.use('/api/auth', authRoutes);

app.use('/api/products', productRoutes);

// Root route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the backend API!');
});

// Set the port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
