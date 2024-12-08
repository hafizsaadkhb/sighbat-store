import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get('http://localhost:5000/api/orders'); // Adjust API endpoint
      setOrders(response.data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="border p-4 rounded bg-white mb-2">
            <h2>Order ID: {order._id}</h2>
            <p>Total: ${order.total}</p>
            <p>Status: {order.status}</p>
          </div>
        ))
      ) : (
        <p>You have no orders yet.</p>
      )}
    </div>
  );
};

export default OrderHistory;
