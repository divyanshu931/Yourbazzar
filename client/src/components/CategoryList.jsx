import React, { useEffect, useState } from 'react';
import axiosInstance from '../apis/axiosInstance';
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
  }, []); // Empty dependency array means this effect runs once on component mount

  const containerStyle = {
    backgroundColor: '#fff8dc',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // Adjust as needed for spacing
  };

  const itemStyle = {
    textAlign: 'center',
    borderRadius: '15px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '5px', // Reduced padding
    margin: '5px', // Reduced margin
    width: 'calc(25% - 30px)', // Adjust width to fit 4 per row (25% for 4 items)
    minWidth: '150px', // Ensure a minimum width for consistent sizing
  };

  const imageStyle = {
    maxWidth: '100%',
    maxHeight: '150px', // Adjust height as needed
    objectFit: 'cover',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px',
  };

  const nameStyle = {
    fontSize: '16px',
    color: '#000',
    marginTop: '10px',
    fontWeight: 'bold',
    padding: '10px',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      {categories.map(category => (
        <div key={category._id} style={itemStyle}>
          <Link to={`listing/${category._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <img
              src={category.image}
              alt={category.name}
              style={imageStyle}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder-image.jpg'; // Fallback image
              }}
            />
            <p style={nameStyle}>{category.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
