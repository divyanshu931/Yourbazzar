import React, { useState, useEffect } from 'react';
import axiosInstance from '../apis/axiosInstance';
import { Link } from 'react-router-dom';

const ProductListing = () => {
  const [activeCategory, setActiveCategory] = useState('dairy');
  const [categories] = useState(['dairy', 'Cold drinks', 'Personal care', 'Home']);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get('/api/public/products', {
          params: { category: activeCategory }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [activeCategory]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const addToCart = async (userId, productId) => {
    try {
      const response = await axiosInstance.post('/api/addToCart', {
        userId: userId, // Replace with actual userId
        productId: productId,
        quantity: 1 // Example quantity, you can adjust this based on user input
      });
      console.log('Added to cart:', response.data);
      // Optionally, you can handle success messages or update UI after adding to cart
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Handle error scenarios if needed
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="border-bottom border-top px-3 d-flex align-items-center justify-content-between">
        <ul className="nav home-tabs" id="pills-tab" role="tablist">
          {categories.map((category, index) => (
            <li className="nav-item" role="presentation" key={index}>
              <button
                className={`nav-link ${activeCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="tab-content" id="pills-tabContent">
        <div className="osahan-listing p-0 m-0 row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
          {products.map((product) => (
            <div className="text-dark col" key={product._id}>
              <div className="list_item_gird bg-white listing-item">
                <span className="badge bg-warning text-dark m-3 position-absolute">10% OFF</span>
                <div className="list-item-img p-4">
                  <img
                    src={product.image}
                    className="img-fluid p-3"
                    alt={product.name}
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                </div>
                <div className="tic-div px-3 pb-3">
                  <p className="mb-1 text-black">{product.name}</p>
                  <p className="mb-2 text-muted">{product.description}</p>
                  <h6 className="card-title mt-2 mb-3 text-success fw-bold">
                    ₹{product.price}.00{' '}
                    <small className="text-decoration-line-through text-muted small fw-light">₹100.00</small>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between gap-1">
                    <div className="size-btn">
                      <div className="input-group">
                        {/* Size selection can go here */}
                      </div>
                    </div>
                    <div>
                      <button
                        className="btn btn-success btn-sm d-flex border-0"
                        onClick={() => addToCart('user123', product._id)} // Replace 'user123' with actual userId
                      >
                        <i className="bi bi-plus me-2"></i> ADD
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <Link className="stretched-link" to="/bag"></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
