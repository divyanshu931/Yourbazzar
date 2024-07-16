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
    backgroundColor: '#fff3cd', // Adjusted background color
    padding: '20px 20px 0', // Adjusted padding top to 20px, remove bottom padding
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px', // Increased gap between items
    justifyContent: 'space-between', // Adjust as needed for spacing
    marginTop: '0', // Adjusted margin top to 0
    zIndex: 998, // Adjusted z-index
    position: 'relative', // Changed to sticky position
   
  };

  const itemStyle = {
    textAlign: 'center',
    borderRadius: '15px',
    overflow: 'hidden',
    backgroundColor: '#d3d3d3',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px', // Increased padding
    width: 'calc(14% - 20px)', // Adjust width to make the category items smaller
    minWidth: '100px', // Ensure a minimum width for consistent sizing
    margin: '10px', // Add margin for increased clickable area
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
          <Link to={`/category/${category.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
