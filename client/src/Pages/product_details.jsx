import React, { useEffect, useState } from 'react';
import axiosInstance from '../apis/axiosInstance';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/layout_';
import ProductItem from '../components/productmap';

const ProductDetailPage = () => {
  const { productId } = useParams(); // Get product ID from URL params
  const [product, setProduct] = useState(null); // State to store product details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [relatedProducts, setRelatedProducts] = useState([]); // State for related products
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // State for mouse position

  // Function to handle mouse move event for zoom effect
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 }); // Reset mouse position when leaving the image area
  };

  // Fetch product details and related products on component mount
  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true); // Set loading to true while fetching data
      setError(null); // Reset error state

      try {
        if (!productId) {
          throw new Error('Product ID is missing'); // Throw error if product ID is not available
        }

        // Fetch product details by product ID
        const response = await axiosInstance.get(`/api/public/products/${productId}`);
        setProduct(response.data); // Set product state with fetched product data

        // Fetch related products based on the same category
        const category = response.data.category; // Assuming category is part of product data
        const relatedResponse = await axiosInstance.get(`/api/public/products?category=${category}`);
        setRelatedProducts(relatedResponse.data); // Set related products state with fetched data

      } catch (error) {
        console.error('Error fetching product details:', error.response ? error.response.data : error.message);
        setError('Failed to fetch product details. Please try again later.'); // Set error message on failure
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchProductDetails(); // Invoke fetchProductDetails function
  }, [productId]); // Dependency array to re-run effect when productId changes

  // Render loading state while fetching data
  if (loading) {
    return <p>Loading...</p>;
  }

  // Render error state if there's an error fetching data
  if (error) {
    return <p>{error}</p>;
  }

  // If product is not found, render product not found message
  if (!product) {
    return <p className="text-dark">Product not found.</p>;
  }

  // Render product details and related products once loaded
  return (
    <Layout>
      <div className="container py-5">
        <div className="row">
          {/* Product Image Section */}
          <div className="col-md-6 position-relative" onMouseLeave={handleMouseLeave}>
            <div id="productImages" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  {/* Original product image with fixed size */}
          <div className="col-md-6 position-relative" onMouseLeave={handleMouseLeave}>
            <div
              id="productImages"
              className="position-relative"
              onMouseMove={handleMouseMove}
              style={{ overflow: 'hidden', cursor: 'crosshair' }}
            >
              <img
                src={`${axiosInstance.defaults.baseURL}/${product.image}`}
                className="d-block w-100"
                alt={product.name}
                style={{ width: '100%', height: 'auto', transform: 'scale(1.1)' }}
              />
              {/* Zoomed image display */}
              {mousePosition.x !== 0 && mousePosition.y !== 0 && (
                <div
                  className="position-absolute border border-primary"
                  style={{
                    width: '270px', // Adjust size of magnifying glass
                    height: '300px', // Adjust size of magnifying glass
                    top: `${mousePosition.y * 100}%`, // Adjust position based on mouse cursor
                    left: `${mousePosition.x * 100 + 10}%`, // Adjust position based on mouse cursor
                    transform: 'translate(-50%, -50%)', // Center the magnifying glass
                    zIndex: 1000, // Ensure it's above other elements
                    pointerEvents: 'none', // Ensure mouse events pass through to image
                    display: 'inline-block', // Show only when mouse is over the image
                  }}
                >
                  <img
                    src={`${axiosInstance.defaults.baseURL}/${product.image}`}
                    className="mw-100 mh-100"
                    style={{
                      transform: 'scale(2)', // Zoom factor for magnifying glass
                      transformOrigin: `${mousePosition.x * 100}% ${mousePosition.y * 100}%`, // Zoom origin based on mouse cursor
                    }}
                    alt="Zoomed"
                  />
                </div>
              )}
            </div>
          </div>
          </div>
          </div>
          </div>

    </div>      {/* Product Details Section */}
          <div className="col-md-6">
            <h1 className="display-4 m-0 fw-bold text-dark">{product.name}</h1>
            <p className="lead text-muted">{product.description}</p>
            <h3 className="text-success">₹{product.price}.00</h3>

            {/* Buttons Section */}
            <div className="d-flex align-items-center mt-3">
              {/* Use Link to navigate to the Buy Now page */}
              <Link to={`/buy/${productId}`} className="btn btn-success me-2">
                Buy now
              </Link>
              <button className="btn btn-outline-secondary">Add to cart</button>
            </div>

            {/* Customer Reviews Section (To be implemented) */}
            <div className="mt-4">
              <h4 className="fw-bold text-dark">Customer Reviews</h4>
              {/* Placeholder for customer reviews */}
              <p>No reviews yet.</p>
              <h3 className="fw-bold text-dark">Why shop from yourbajaar?</h3>
          <ul className="text-dark">
            <li>Express Delivery - Get your order delivered to your doorstep at the earliest.</li>
            <li>Best Prices & Offers - Best price destination with offers directly from the manufacturers.</li>
            <li>Wide Assortment - Choose from 500+ products across food, personal care, household & other categories.</li>
          </ul>
        </div>
            </div>
          </div>
        </div>
       
        {/* Why shop from yourbajaar Section */}
  
        {/* Related Products Section */}
        <div className="mt-5">
          <h3 className="fw-bold text-dark">Related Products</h3>
          <div className="row">
            {relatedProducts.length > 0 ? (
              relatedProducts.map(relatedProduct => (
                <ProductItem key={relatedProduct._id} product={relatedProduct} />
              ))
            ) : (
              <p>No related products found.</p>
            )}
          </div>
        </div>
     
    </Layout>
  );
};

export default ProductDetailPage;
