import React, { useState, useEffect } from 'react';
import axiosInstance from '../apis/axiosInstance'; // Import your Axios instance
import { Link } from 'react-router-dom';

const ProductListing = () => {
  const [activeCategory, setActiveCategory] = useState('dairy'); // Default active category
  const [categories] = useState(['dairy', 'Cold drinks', 'Personal care', 'Home']); // Static top categories
  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors

  // Fetch products based on active category
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get('/api/public/products', {
          params: { category: activeCategory }
        });
        console.log('Fetched products:', response.data);
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

  // Handle category change
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  // Render loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Render error state
  if (error) {
    return <p>{error}</p>;
  }

  // Render products
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
        <div className="osahan-listing p-0 m-0 row">
          {products.map((product) => (
            <div className="text-dark col-3 px-0 border-bottom border-end position-relative" key={product._id}>
              <div className="list_item_gird m-0 bg-white listing-item">
                <span className="badge bg-warning text-dark m-3 position-absolute">10% OFF</span>
                <div className="list-item-img p-4">
                  <img src={product.image} className="img-fluid p-3" alt={product.name} style={{ height: '200px', objectFit: 'cover' }} />
                </div>
                <div className="tic-div px-3 pb-3">
                  <p className="mb-1 text-black">{product.name}</p>
                  <p className="mb-2 text-muted">{product.description}</p> {/* Product description */}
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
                      <Link to="/bag" className="btn btn-success btn-sm d-flex border-0">
                        <i className="bi bi-plus me-2"></i> ADD
                      </Link>
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
