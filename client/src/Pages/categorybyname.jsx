import React, { useEffect, useState } from 'react';
import axiosInstance from '../apis/axiosInstance';
import { useParams, Link } from 'react-router-dom';
import FilterLayout from '../components/layout/filterLayout'; // Ensure correct import and casing

const Productbycategory = () => {
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
        const endpoint = categoryName ? `/api/public/products?category=${categoryName}` : '/api/public/all';
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

  // Render products or no products message
  return (
    <FilterLayout>
      <div className="container py-5">
        <div className="tab-pane fade active show" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
          {products.length === 0 ? (
            <div className="no-products-message d-flex justify-content-center align-items-center">
              <p className="text-center text-dark font-weight-bold">No products available in this category. Check back soon!</p>
            </div>
          ) : (
            products.map((product) => (
              <div className="d-flex bag-item position-relative p-3 border-bottom align-items-center fit-screen" key={product._id}>
                <div className="bag-item-left me-3">
                  <img  src={`${axiosInstance.defaults.baseURL}/${product.image}`}className="img-fluid rounded-3 border" alt={product.name} />
                </div>
                <div className="bag-item-right w-100">
                  <div className="card-body pe-0 py-0">
                    {product.name && <span className="badge bg-success">20% OFF</span>}
                    <p className="card-text mb-0 mt-1 text-black">{product.name}</p>
                    <small className="text-muted"><i className="bi bi-shop me-1"></i>  ₹{product.description}</small>
                    <h5 className="card-title mt-2 mb-0 text-black fw-bold">
                      ₹{product.price}.00 <small className="text-decoration-line-through text-muted fs-6 fw-light">₹100.00</small>
                    </h5>
                  </div>
                </div>
                <Link className="stretched-link" to={`/product-detail/${product._id}`}></Link>
              </div>
            ))
          )}
        </div>
      </div>
    </FilterLayout>
  );
};

export default Productbycategory;
