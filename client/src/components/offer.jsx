import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodayOffers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/public/products/offers'); // Adjust URL as per your backend API endpoint
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show loading indicator while fetching data
  }

  if (error) {
    return <p>{error}</p>; // Show error message if fetching data fails
  }

  return (
    <div className="py-3">
      <div className="px-3 d-flex justify-content-between">
        <h6 className="mb-2 text-black fw-bold">Today Offers</h6>
        <a href="listing.html" className="text-success text-decoration-none">SEE ALL <i className="bi bi-arrow-right-circle-fill"></i></a>
      </div>
      <div className="home-cate">
        {products.map(product => (
          <div key={product._id} className="home-productc">
            <a href="listing.html"><img src={product.image} className="img-fluid" alt={product.name} /></a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayOffers;
