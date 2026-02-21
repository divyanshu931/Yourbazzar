import React, { useCallback, useEffect, useState } from 'react';
import axiosInstance from '../apis/axiosInstance';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/layout_';
import ProductItem from '../components/productmap';
import { getCartFromLocalStorage, updateCartInLocalStorage } from '../utils/cartUtils'; // Ensure the path is correct

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [quantity] = useState(1); // State for quantity
  const [buttonText, setButtonText] = useState('ADD'); // State for button text

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const handleAddToCart = async () => {
    const cartItems = getCartFromLocalStorage();
    const productIndex = cartItems.findIndex(item => item.product._id === product._id);

    if (productIndex > -1) {
      // Update quantity if product already exists in cart
      cartItems[productIndex].quantity += quantity;
    } else {
      // Add new product to cart
      cartItems.push({
        product: {
          _id: product._id,
          name: product.name,
          sellerName: product.sellerName,
          price: product.price,
          mrp: product.mrp,
          discount: product.discount,
          image: product.image,
          description: product.description,
        },
        quantity
      });
    }

    updateCartInLocalStorage(cartItems);

    // Show "ADDED" for 0.5 seconds
    setButtonText('ADDED');
    setTimeout(() => {
      setButtonText('ADD');
    }, 500); // Change back to ADD after 0.5 seconds
  };

  const fetchProductDetails = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (!productId) {
        throw new Error('Product ID is missing');
      }

      const response = await axiosInstance.get(`/api/public/products/${productId}`);
      setProduct(response.data);

      const category = response.data.category;
      const relatedResponse = await axiosInstance.get(`/api/public/products?category=${category}`);
      setRelatedProducts(relatedResponse.data);

    } catch (error) {
      console.error('Error fetching product details:', error.response ? error.response.data : error.message);
      setError('Failed to fetch product details. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p className="text-dark">Product not found.</p>;
  }

  return (
    <Layout>
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
                      src={`${axiosInstance.defaults.baseURL}/${product.image}`}
                      className="d-block w-100"
                      alt={product.name}
                      style={{
                        width: '200px', // Ensure zoomed image fits within the magnifying glass
                        height: '450px',
                      }}
                    />
                    {mousePosition.x !== 0 && mousePosition.y !== 0 && (
                      <div
                        className="position-absolute border border-primary"
                        style={{
                          width: '3000px',
                          height: '3000px',
                          top: `${mousePosition.y * 100}%`,
                          left: `${mousePosition.x * 100 + 10}%`,
                          transform: 'translate(-50%, -50%)',
                          zIndex: 1000,
                          pointerEvents: 'none',
                          display: 'inline-block',
                        }}
                      >
                        <img
                          src={`${axiosInstance.defaults.baseURL}/${product.image}`}
                          className="mw-100 mh-100"
                          style={{
                            width: '2000px', // Ensure zoomed image fits within the magnifying glass
                            height: '2000px',
                            transform: 'scale(2)',
                            transformOrigin: `${mousePosition.x * 100}% ${mousePosition.y * 100}%`,
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
              <Link to={`/buy/${productId}`} className="btn btn-success me-2">
                Buy now
              </Link>
              <button className="btn btn-outline-secondary" onClick={handleAddToCart}>
                {buttonText === 'ADDED' ? (
                  <>
                    <i className="bi bi-check me-2"></i> {buttonText}
                  </>
                ) : (
                  <>
                    <i className="bi bi-plus me-2"></i> {buttonText}
                  </>
                )}
              </button>
            </div>

            <div className="mt-4">
              <h4 className="fw-bold text-dark">Customer Reviews</h4>
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
