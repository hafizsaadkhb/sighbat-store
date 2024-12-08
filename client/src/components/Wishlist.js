import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const response = await axios.get('http://localhost:5000/api/wishlist'); // Adjust API endpoint
      setWishlistItems(response.data);
    };
    fetchWishlist();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
      {wishlistItems.length > 0 ? (
        wishlistItems.map((item) => (
          <div key={item.productId} className="border p-4 rounded bg-white mb-2">
            <h2>{item.productName}</h2>
            <p>${item.price}</p>
          </div>
        ))
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;
