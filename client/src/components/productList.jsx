import React, { useState, useEffect } from 'react';
import axiosInstance from '../apis/axiosInstance'; // Import your Axios instance

const ProductListing = () => {
  const [activeCategory, setActiveCategory] = useState('dairy'); // Default active category
  const [categories] = useState(['Cold drinks', 'Personal care', 'dairy', 'Home']); // Static top categories
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
          {categories.map((category) => (
            <li className="nav-item" role="presentation" key={category}>
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
            <div className="text-dark col-6 px-0 border-bottom border-end position-relative" key={product.category}>
              <div className="list_item_gird m-0 bg-white listing-item">
                <div className="list-item-img p-4">
                  <img src={product.image} className="img-fluid p-3" alt={product.name} />
                </div>
                <div className="tic-div px-3 pb-3">
                  <p className="mb-1 text-black">{product.name}</p>
                  <h6 className="card-title mt-2 mb-3 text-success fw-bold">
                    ₹{product.price}.00{' '}
                    <small className="text-decoration-line-through text-muted small fw-light">
                     {/* ₹{product.discountedPrice}.00*/}
                    </small>
                  </h6>
                  {/* Additional fields can be added here */}
                </div>
                <a className="stretched-link" href="bag.html"></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
