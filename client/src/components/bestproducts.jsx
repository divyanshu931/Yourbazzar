import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const BestSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/public/products/best');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.'); // Set error message
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 10000,
    slidesToShow: 3, // Adjust number of products shown per slide as needed
    slidesToScroll: 2,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 1, // Set autoplay speed in milliseconds (3 seconds here)
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading indicator while fetching data
  }

  if (error) {
    return <p>{error}</p>; // Show error message if fetching data fails
  }

  return (
    <div className="p-3 bg-light">
      <h6 className="mb-3 text-black fw-bold">Best selling products</h6>
      <Slider {...settings} className="single-item selling-box">
        {products.map(product => (
          <div key={product._id} className="home-product">
            <div className="card border shadow-sm rounded-3">
              <img src={product.image} className="card-img-top rounded-3 p-3" alt={product.name} />
              <div className="card-body p-2 border-top">
                <p className="card-text m-0 d-flex align-items-center">
                  {product.name}
                  <i className="bi bi-arrow-right ms-auto"></i>
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BestSellingProducts;
