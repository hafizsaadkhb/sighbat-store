import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:5000/api/products'); // Adjust API endpoint
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product._id} className="border p-4 rounded bg-white">
          <h2 className="text-lg font-bold">{product.name}</h2>
          <p>{product.description}</p>
          <p className="font-bold text-blue-600">${product.price}</p>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
