import React, { useEffect, useState } from 'react';
import axiosInstance from '../apis/axiosInstance';
import { useParams, Link } from 'react-router-dom';
import FilterLayout from '../components/layout/filterLayout'; // Ensure correct import and casing

const ProductDetailPage = () => {
  const { categoryName } = useParams(); // Get the category name from route parameters
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch products based on category if categoryName exists
        const endpoint = categoryName ? `/api/public/products?category=${categoryName}` : '/api/public/products';
        const response = await axiosInstance.get(endpoint);
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
  }, [categoryName]);

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
    <FilterLayout>
      <div className="tab-content" id="pills-tabContent">
        <div className="osahan-listing p-0 m-0 row">
          {products.map((product) => (
            <div className="text-dark col-6 px-0 border-bottom border-end position-relative" key={product.id}>
              <div className="list_item_gird m-0 bg-white listing-item">
                <span className="badge bg-warning text-dark m-3 position-absolute">10% OFF</span>
                <div className="list-item-img p-4">
                  <img src={product.image} className="img-fluid p-3" alt={product.name} />
                </div>
                <div className="tic-div px-3 pb-3">
                  <p className="mb-1 text-black">{product.name}</p>
                  <h6 className="card-title mt-2 mb-3 text-success fw-bold">
                    ₹{product.price}.00{' '}
                    <small className="text-decoration-line-through text-muted small fw-light">₹100.00</small>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between gap-1">
                    <div className="size-btn">
                      <div className="input-group">
                        {/* Add any additional elements as needed */}
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
    </FilterLayout>
  );
};

export default ProductDetailPage;
