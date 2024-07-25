import React, { useState, useEffect } from 'react';
import axiosInstance from '../apis/axiosInstance';
import { Link } from 'react-router-dom';

const ProductListing = () => {
  const [activeCategory, setActiveCategory] = useState('Dairy');
  const [categories] = useState(['Dairy', 'Cold drinks', 'Personal care', 'Home']);
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
        userId: userId,
        productId: productId,
        quantity: 1
      });
      console.log('Added to cart:', response.data);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-3 bg-light">
      <div className="border-bottom border-top px-3 d-flex align-items-center justify-content-between">
        <ul className="nav home-tabs" id="pills-tab" role="tablist">
          {categories.map((category, index) => (
            <li className="nav-item" role="presentation" key={index} style={{ position: 'relative', zIndex: 2 }}>
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
            <div className="col" key={product._id}>
              
                <div className="list_item_gird bg-white listing-item" style={{ position: 'relative', zIndex: 2 }}>
                  {product.isNew && (
                    <span className="badge bg-success text-dark m-3 position-absolute">New</span>
                  )}
                  {product.isUpcoming && (
                    <span className="badge bg-warning text-dark m-3 position-absolute">Upcoming</span>
                  )}
                  <Link to={`/product-detail/${product._id}`} className="text-decoration-none">
                  <div className="list-item-img p-4">
                  
                    <img
                   src={`${axiosInstance.defaults.baseURL}/${product.image}`}
                      className="img-fluid p-3"
                      alt={product.name}
                     
                    />
                  </div>
                  </Link>
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
                          onClick={() => addToCart('user123', product._id)}
                        >
                          <i className="bi bi-plus me-2"></i> ADD
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
             
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
