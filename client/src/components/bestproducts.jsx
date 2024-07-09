import React, { useEffect, useState } from 'react';
import axiosInstance from '../apis/axiosInstance';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const BestSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/api/public/products/best');
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-3 bg-light">
      <h6 className="mb-3 text-black fw-bold">Best selling products</h6>
      <Slider {...settings} className="single-item selling-box">
        {products.map(product => (
          <div key={product._id} className="home-product">
            <div className="card border shadow-sm rounded-3">
              <img
                src={product.image}
                className="card-img-top rounded-3 p-3"
                alt={product.name}
                style={{ 
                  width: '100%', 
                  height: '500px', 
                  objectFit: 'cover' 
                }}
              />
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
