import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const response = await axios.get('http://localhost:5000/api/cart'); // Adjust API endpoint if necessary
      setCartItems(response.data);
    };
    fetchCart();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.productId} className="border p-4 rounded bg-white mb-2">
            <h2>{item.productName}</h2>
            <p>Quantity: {item.quantity}</p>
            <p>Total: ${item.totalPrice}</p>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
