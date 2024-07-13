import React, { useEffect, useState } from 'react';
import axiosInstance from '../apis/axiosInstance';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const CategoryList = () => {
  
    const [categories, setCategories] = useState([]);
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axiosInstance.get('/api/categories');
          setCategories(response.data); // Assuming your API response returns an array of categories
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
  
      fetchCategories();
    }, []); // Emp
  // Split categories into two arrays
  const splitIndex = Math.ceil(categories.length / 2);
  const categories1 = categories.slice(0, splitIndex);
  const categories2 = categories.slice(splitIndex);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const containerStyle = {
    backgroundColor: '#fff8dc',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  };

  const itemStyle = {
    textAlign: 'center',
    borderRadius: '15px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '10px',
    padding: '10px'
  };

  const imageStyle = {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px'
  };

  const nameStyle = {
    fontSize: '16px',
    color: '#000',
    marginTop: '10px',
    fontWeight: 'bold',
    padding: '10px',
    textAlign: 'center'
  };

  const headingStyle = {
    marginBottom: '10px',
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333'
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#28a745',
    float: 'right'
  };

  return (
    <div style={containerStyle}>
      <div style={{ padding: '1px' }}><h6 style={{ marginBottom: '0.5rem', color: 'black', fontWeight: 'bold' }}>Today's Offers</h6>

        < Link to="listing.html" style={linkStyle}>
          SEE ALL <i className="bi bi-arrow-right-circle-fill"></i>
        </Link>
        </div>


      <Slider {...sliderSettings}>
        {categories1.map(category => (
          <div style={{ backgroundColor: '#fff', marginBottom: '10px', padding: '15px' }}>
            <div key={category._id} style={{ ...itemStyle, width: '200px', height: '250px' }}>
              <a href="listing.html" style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                <img
                  src={category.image}
                  alt={category.name}
                  style={{ ...imageStyle, height: '70%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-image.jpg'; // Fallback image
                  }}
                />
                <p style={{ ...nameStyle, marginBottom: '0', height: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{category.name}</p>
              </a>
            </div>
          </div>

        ))}
      </Slider>

      <Slider {...sliderSettings} style={{ marginTop: '10px' }}>
        {categories2.map(category => (
          <div style={{ backgroundColor: '#fff', marginBottom: '20px', padding: '15px' }}>
            <div key={category._id} style={{ ...itemStyle, width: '200px', height: '250px' }}>
              <Link href="listing.html" style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                <img
                  src={category.image}
                  alt={category.name}
                  style={{ ...imageStyle, height: '70%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-image.jpg'; // Fallback image
                  }}
                />
                <p style={{ ...nameStyle, marginBottom: '0', height: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{category.name}</p>
                <i className="bi bi-arrow-right ms-auto"></i>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
      </div>
  );
};

export default CategoryList;