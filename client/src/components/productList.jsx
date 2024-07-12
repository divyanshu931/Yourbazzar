import React, { useState, useEffect } from 'react';
import axiosInstance from '../apis/axiosInstance'; // Import your Axios instance

const ProductListing = () => {
  const [activeCategory, setActiveCategory] = useState('Male'); // Default active category
  const [categories] = useState(['Male', 'Electronics', 'Biscuits', 'Other']); // Static top 4 categories
  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    // Function to fetch products from API based on active category
    const fetchProductsByCategory = async () => {
      setLoading(true); // Set loading state to true when starting fetch
      setError(null); // Reset any previous errors
      try {
        const response = await axiosInstance.get(`api/public/products`, {
          params: { category: activeCategory }
        });
        console.log('Fetched products:', response.data); // Log the response data for debugging
        setProducts(response.data); // Assuming response.data is structured as an array of products
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch offer details. Please try again later.'); // Set error message
      } finally {
        setLoading(false); // Set loading state to false after fetch (success or fail)
      }
    };

    fetchProductsByCategory();
  }, [activeCategory]); // Fetch products whenever active category changes

  // Function to switch categories
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  if (loading) {
    return <p>Loading...</p>; // Render loading indicator while fetching data
  }

  if (error) {
    return <p>{error}</p>; // Render error message if fetch fails
  }

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
            <div className="text-dark col-6 px-0 border-bottom border-end position-relative" key={product._id}>
              <div className="list_item_gird m-0 bg-white listing-item">
                <span className="badge bg-success m-3 position-absolute">{product.discount}</span>
                <div className="list-item-img p-4">
                  <img src={product.image} className="img-fluid p-3" alt={product.name} />
                </div>
                <div className="tic-div px-3 pb-3">
                  <p className="mb-1 text-black">{product.name}</p>
                  <h6 className="card-title mt-2 mb-3 text-success fw-bold">
                    ₹{product.price}.00{' '}
                    <small className="text-decoration-line-through text-muted small fw-light">
                      ₹{product.discountedPrice}.00
                    </small>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between gap-1">
                    <div className="size-btn">
                      <div className="input-group">
                        <a href="#" className="btn btn-light btn-sm border d-flex">
                          {product.size} <span><i className="bi bi-chevron-down small ms-2"></i></span>
                        </a>
                      </div>
                    </div>
                    <div className="quantity-btn">
                      <div className="input-group input-group-sm border rounded overflow-hidden">
                        <div className="btn btn-light text-success minus border-0 bg-white">
                          <i className="bi bi-dash"></i>
                        </div>
                        <input
                          type="text"
                          className="form-control text-center box border-0"
                          value={product.quantity}
                          placeholder=""
                          aria-label="Example text with button addon"
                        />
                        <div className="btn btn-light text-success plus border-0 bg-white">
                          <i className="bi bi-plus"></i>
                        </div>
                      </div>
                    </div>
                  </div>
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
