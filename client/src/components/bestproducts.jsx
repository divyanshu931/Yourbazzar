import React, { useEffect, useState } from 'react';
import axiosInstance from '../apis/axiosInstance';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
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
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  if (loading) {
    return (
      <div className="loading-container text-center p-3">
       
        <div className="spinner-border text-black" role="status">
          <span className="visually-hidden">Loading...</span>
      
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="p-3 bg-light " >
      <h6 className="mb-3 text-black fw-bold">Best Selling Products</h6>
      <Slider {...settings} className="single-item selling-box">
        {products.map(product => (
          <Link to={`/product-detail/${product._id}`} key={product._id} className="text-decoration-none">
            <div className="home-product">
              <div className="card border shadow-sm rounded-3">
                <div className="image-container">
                  <img
                    src={product.image}
                    className="card-img-top p-3"
                    alt={product.name}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }}
                  />
                </div>
                <div className="card-body p-2 border-top">
                  <p className="card-text m-0 d-flex align-items-center" style={{ color: 'black' }}>
                    {product.name}
                    <i className="bi bi-arrow-right ms-auto" style={{ color: 'black' }}></i>
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default BestSellingProducts;
