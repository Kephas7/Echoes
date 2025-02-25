import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const order = {
        userId: token, // Assuming the token contains the user ID
        totalAmount: totalPrice,
        shippingAddress: JSON.stringify(shippingDetails),
        items: cart,
      };

      // Send the order to the backend
      const response = await axios.post('http://localhost:5000/api/orders', order, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Clear the cart and redirect to the confirmation page
      clearCart();
      navigate('/order-confirmation');
    } catch (err) {
      console.error(err);
      alert('Failed to place order');
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <h2>Shipping Details</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={shippingDetails.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={shippingDetails.address}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={shippingDetails.city}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={shippingDetails.postalCode}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={shippingDetails.country}
          onChange={handleInputChange}
          required
        />

        <h2>Order Summary</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </li>
          ))}
        </ul>
        <h3>Total: ${totalPrice.toFixed(2)}</h3>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;