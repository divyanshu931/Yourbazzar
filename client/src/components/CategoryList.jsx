import React, { useEffect, useState } from 'react';
import axiosInstance from '../apis/axiosInstance';
import { Link } from 'react-router-dom';

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

  const containerStyle = {
    backgroundColor: '#fff3cd',
    padding: '20px 20px 0',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px',
    justifyContent: 'space-between',
    marginTop: '0',
    zIndex: 998,
    position: 'relative',
  };

  const itemStyle = {
    textAlign: 'center',
    borderRadius: '15px',
    overflow: 'hidden',
    backgroundColor: '#d3d3d3',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: 'calc(14% - 20px)',
    minWidth: '100px',
    margin: '10px',
  };

  const imageStyle = {
    maxWidth: '100%',
    maxHeight: '150px',
    objectFit: 'cover',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px',
    display: 'block',
    margin: '0 auto', // Center the image
  };
  

  const nameStyle = {
    fontSize: '16px',
    color: '#000',
    marginTop: '10px',
    fontWeight: 'bold',
    padding: '10px',
    textAlign: 'center',
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = '/placeholder-image.jpg';
  };

  // Render loading spinner if data is still being fetched
  if (loading) {
    return (
      <div>
        <div className="spinner" style={spinnerStyle}></div>
      </div>
    );
  }

  return (
    <div className=" p-3 bg-light ">
    <h6 className="mb-3 text-black fw-bold">Categories</h6>
    
    <div style={containerStyle}>
  
      {categories.map(category => (
        <div key={category._id} style={itemStyle}>
          <Link to={`/category/${category.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <img
              src={category.image}
              alt={category.name}
              style={imageStyle}
              onError={handleImageError}
              onLoad={(e) => e.target.style.opacity = 1}
              loading="lazy"
            />
            <p style={nameStyle}>{category.name}</p>
          </Link>
        </div>
      ))}
    </div>
    </div>
  );
};

// Spinner styles
const spinnerStyle = {
  border: '8px solid #f3f3f3', // Light grey background
  borderTop: '8px solid black', // Black spinner
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  animation: 'spin 1s linear infinite',
};

// Keyframes for spinner animation
const spinnerAnimation = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

// Append spinner animation to document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = spinnerAnimation;
document.head.appendChild(styleSheet);

export default CategoryList;
