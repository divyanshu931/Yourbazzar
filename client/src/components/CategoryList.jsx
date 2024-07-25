import React, { useEffect, useState } from 'react';
import axiosInstance from '../apis/axiosInstance';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Placeholder image for error handling
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = '/placeholder-image.jpg'; // Replace with your placeholder image URL
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8, // Default number of slides per row for large screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5, // Number of slides per row for tablets (medium screens)
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },{
        breakpoint: 800,
        settings: {
          slidesToShow: 3, // Number of slides per row for phones (small screens)
          slidesToScroll: 1,
        },
      },  {
        breakpoint: 768,
        settings: {
          slidesToShow: 3, // Number of slides per row for phones (small screens)
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2, // Number of slides per row for phones (small screens)
          slidesToScroll: 1,
        },
      },
    
    ],
  };



  return (
    <div className="p-3 bg-light2">
      <div className="pb-1 d-flex justify-content-between">
        <h6 className="mb-2 text-black fw-bold">Shop by category</h6>
        <Link className="text-success text-decoration-none" to="/listing">
          SEE ALL <i className="bi bi-arrow-right-circle-fill"></i>
        </Link>
      </div>
      <Slider {...sliderSettings} className="single-item selling-box">
        {categories.map((category) => (
          <div key={category._id}>
            <Link to={`/category/${category.name}`} className="text-dark text-decoration-none">
              <img
                src={`${axiosInstance.defaults.baseURL}/${category.image}`}
                alt={category.name}
                onError={handleImageError}
                style={{ width: '150px', height: '200px', objectFit: 'zoomout' }} // Set image size and maintain aspect ratio
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategoryList;
