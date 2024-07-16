import React, { useEffect, useState } from 'react';
import axiosInstance from '../apis/axiosInstance';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/layout_';
import BestSellingProducts from '../components/bestproducts';

const ProductDetailPage = () => {
  const { productId } = useParams(); // Get the product ID from route parameters
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) {
        setError('Product ID is missing');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        console.log(`Fetching product with ID: ${productId}`);
        const response = await axiosInstance.get(`/api/public/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error.response ? error.response.data : error.message);
        setError('Failed to fetch product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 }); // Reset mouse position when leaving the image area
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Layout>
      {product ? (
        <div className="container py-5">
          <div className="row">
            <div className="col-md-6 position-relative" onMouseLeave={handleMouseLeave}>
              <div id="productImages" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div
                      className="position-relative"
                      onMouseMove={handleMouseMove}
                      style={{ overflow: 'hidden', cursor: 'crosshair' }}
                    >
                      <img
                        src={product.image}
                        className="d-block w-100"
                        alt={product.name}
                        style={{ transform: `scale(1.1)` }} // Slightly zoomed in for better hover effect
                      />
                      {mousePosition.x !== 0 && mousePosition.y !== 0 && (
                        <div
                          className="position-absolute border border-primary"
                          style={{
                            width: '100px', // Adjust size of magnifying glass
                            height: '100px', // Adjust size of magnifying glass
                            top: `${mousePosition.y * 100}%`, // Adjust position based on mouse cursor
                            left: `${mousePosition.x * 100 + 10}%`, // Adjust position based on mouse cursor
                            transform: 'translate(-50%, -50%)', // Center the magnifying glass
                            zIndex: 1000, // Ensure it's above other elements
                            pointerEvents: 'none', // Ensure mouse events pass through to image
                            display: 'inline-block', // Show only when mouse is over the image
                          }}
                        >
                          <img
                            src={product.image}
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
            <div className="col-md-6">
              <h1 className="display-4 m-0 fw-bold text-dark">{product.name}</h1>
              <p className="lead text-muted">{product.description}</p>
              <h3 className="text-success">₹{product.price}.00</h3>
              <div className="d-flex align-items-center mt-3">
                {/* You might want to remove these buttons if they are not relevant */}
              </div>
              <div className="d-flex align-items-center mt-3">
                <button className="btn btn-success me-2">Add to Cart</button>
                <button className="btn btn-outline-secondary">Buy Now</button>
              </div>
              <div className="mt-4">
                <h4 className="fw-bold text-dark">Customer Reviews</h4>
                {/* Render product reviews here */}
                <h6 className="bold text-dark">More than 10 reviews yet.</h6>
                <div className="mt-5">
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
          <div className="mt-5">
            <h3 className="fw-bold text-dark">Related Products</h3>
            
            <div className="row text-dark">
              
            No product found soon will added
            </div>
          </div>
     
        </div>
      ) : (
        <p className="text-dark">Product not found.</p>
      )}
    </Layout>
  );
};

export default ProductDetailPage;
