import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { getCartFromLocalStorage, updateCartInLocalStorage } from '../utils/cartUtils'; // Ensure the path is correct
import axiosInstance from '../apis/axiosInstance'; // Ensure this import is correct

const BagPage = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Check authentication status from cookies
    const userId = cookies.get('userId');
    const token = cookies.get('token');

    if (userId && token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }

    // Load cart items from local storage
    const cartItems = getCartFromLocalStorage();
    setCart(cartItems);
  }, [cookies]);

  const handleSignIn = () => {
    navigate('/signin'); // Navigate to sign-in page
  };

  const handleBackToHomepage = () => {
    navigate('/'); // Navigate to homepage
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const handleRemoveItem = (productId) => {
    // Remove item from cart
    const updatedCart = cart.filter(item => item.product._id !== productId);
    setCart(updatedCart);
    updateCartInLocalStorage(updatedCart); // Update local storage
  };

  const handleQuantityChange = (productId, delta) => {
    // Update item quantity
    const updatedCart = cart.map(item => {
      if (item.product._id === productId) {
        const newQuantity = Math.max(item.quantity + delta, 1); // Ensure quantity is at least 1
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
    updateCartInLocalStorage(updatedCart); // Update local storage
  };

  const handleClearBag = () => {
    // Clear all items from cart
    setCart([]);
    updateCartInLocalStorage([]); // Update local storage to reflect empty cart
  };

  return (
    <div>
      <div className="p-3 shadow-sm bg-warning danger-nav osahan-home-header sticky-top">
        <div className="font-weight-normal mb-0 d-flex align-items-center">
          <h6 className="fw-normal mb-0 text-dark d-flex align-items-center">
            <Link to="/home" className="text-dark me-3 fs-4"><i className="bi bi-chevron-left"></i></Link>
            My Bag
          </h6>
          <div className="ms-auto d-flex align-items-center">
            <button
              className="me-3 text-decoration-none text-dark text-uppercase btn btn-link"
              onClick={handleClearBag}
            >
              Clear Bag
            </button>
          </div>
        </div>
      </div>
      <br/>
      <div className="container  btn-lg w-100 shadow px-5">
        {cart.length > 0 ? (
          <div>
            {cart.map((item) => (
              <div key={item.product._id} className="card od-card border-0 mb-3" style={{ padding: '1rem' }}>
                <div className="d-flex bag-item">
                <div className="bag-item-left" style={{ padding: '0 1rem' }}>
  <img
    src={`${axiosInstance.defaults.baseURL}/${item.product.image}`} // Use axiosInstance base URL
    className="img-fluid rounded-3"
    alt={item.product.name}
    style={{ height: '200px', objectFit: 'cover' }} // Adjust height as needed
  />
</div>

                  <div className="bag-item-right w-100" style={{ padding: '0 1rem' }}>
                    <div className="card-body pe-0 py-0">
                      <span className="badge bg-success">{item.product.discount}% OFF</span>
                      <p className="card-text mb-0 mt-1 text-black">{item.product.name}</p>
                      <small className="text-muted"><i className="bi bi-shop me-1"></i> Seller - {item.product.sellerName}</small>
                      <h4 className="card-title mt-2 text-black fw-bold">₹{item.product.price}.00 <small className="text-decoration-line-through text-muted fs-6 fw-light">₹{item.product.mrp}.00</small></h4>
                      <div className="d-flex align-items-center justify-content-between gap-3">
                        <div className="quantity-btn">
                          <div className="text-muted small mb-1">Quantity</div>
                          <div className="input-group input-group-sm border rounded overflow-hidden">
                            <button
                              className="btn btn-light text-success minus border-0 bg-white"
                              onClick={() => handleQuantityChange(item.product._id, -1)}
                            >
                              <i className="bi bi-dash"></i>
                            </button>
                            <input
                              type="text"
                              className="form-control text-center box border-0"
                              value={item.quantity}
                              readOnly
                            />
                            <button
                              className="btn btn-light text-success plus border-0 bg-white"
                              onClick={() => handleQuantityChange(item.product._id, 1)}
                            >
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>
                        </div>
                        <div>
                          <p className="text-muted mb-1">Total: ₹{item.product.price * item.quantity}.00</p>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleRemoveItem(item.product._id)}
                          >
                            Remove
                          </button>
                        </div>
                        
                      </div>
                      
                    </div>
                    
                  </div>
                  
                </div>
           
              </div>
              
            ))}
            <h3 className="mt-4 text-center">Total Price: ₹{getTotalPrice()}.00</h3>
          
          </div>
          
        ) : (
          <>
            {authenticated ? (
              <h4>Your Bag is Empty</h4>
            ) : (
              <p className="text-muted">Please <Link to="/signin">sign in</Link> to view your items.</p>
            )}
          </>
        )}
      </div>
      <div className="osahan-footer p-3">
        {authenticated ? (
          <button className="btn btn-success btn-lg w-100 shadow px-5" onClick={handleBackToHomepage}>
            Back to Homepage
          </button>
        ) : (
          <button className="btn btn-success btn-lg w-100 shadow px-5" onClick={handleSignIn}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default BagPage;
