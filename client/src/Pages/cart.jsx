import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { getCartFromLocalStorage, updateCartInLocalStorage } from '../utils/cartUtils'; // Ensure the path is correct
import axiosInstance from '../apis/axiosInstance'; // Ensure this import is correct

const BagPage = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cookies = new Cookies();
    const userId = cookies.get('userId');
    const token = cookies.get('token');

    setAuthenticated(!!userId && !!token);

    const cartItems = getCartFromLocalStorage();
    setCart(cartItems);
  }, []); // Empty dependency array to run only once

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
    const updatedCart = cart.filter(item => item.product._id !== productId);
    setCart(updatedCart);
    updateCartInLocalStorage(updatedCart); // Update local storage
  };

  const handleQuantityChange = (productId, delta) => {
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
    setCart([]);
    updateCartInLocalStorage([]); // Update local storage to reflect empty cart
  };

  return (
    <div style={{ paddingBottom: '80px' }}> {/* Adjust padding to ensure content doesn't overlap with the footer */}
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
      <main>
        {cart.length > 0 ? (
          <div>
            {cart.map(item => (
              <div key={item.product._id} className="bg-white shadow-sm mb-3 p-3 rounded">
                <div className="d-flex">
                  <div className="me-3">
                    <img
                      src={`${axiosInstance.defaults.baseURL}/${item.product.image}`} // Use axiosInstance base URL
                      className="img-fluid rounded-3"
                      alt={item.product.name}
                      style={{ height: '150px', width: '250px', objectFit: 'cover' }} // Adjust as needed
                    />
                  </div>
                  <div className="w-100">
                    <div className="card-body p-0">
                      <span className="badge bg-success">{item.product.discount}% OFF</span>
                      <p className="mb-0 mt-1 text-black">{item.product.name}</p>
                      <small className="text-muted">{item.product.description}</small>
                      <br />
                      <small className="text-muted"><i className="bi bi-shop me-1"></i> Seller - {item.product.sellerName}</small>
                      <h4 className="mt-2 text-black fw-bold">
                        ₹{item.product.price}.00
                        <small className="text-decoration-line-through text-muted fs-6 fw-light"> ₹{item.product.mrp}.00</small>
                      </h4>
                      <div className="d-flex align-items-center justify-content-between gap-3 mt-2">
                        <div>
                          <div className="text-muted small mb-1">Quantity</div>
                          <div className="input-group input-group-sm border rounded overflow-hidden">
                            <button
                              className="btn btn-light text-success border-0"
                              onClick={() => handleQuantityChange(item.product._id, -1)}
                            >
                              <i className="bi bi-dash"></i>
                            </button>
                            <input
                              type="text"
                              className="form-control text-center border-0"
                              value={item.quantity}
                              readOnly
                            />
                            <button
                              className="btn btn-light text-success border-0"
                              onClick={() => handleQuantityChange(item.product._id, 1)}
                            >
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>
                        </div>
                        <div>
                          <div className="text-muted small mb-1">Total: ₹{item.product.price * item.quantity}.00</div>
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
          </div>
        ) : (
          <div className="text-center">
            <img src="/img/empty.svg" alt="Empty Cart" style={{ width: '300px', height: '300px' }} />
            <h4 className="mt-3">Your Bag is Empty</h4>
          </div>
        )}
      </main>

      <footer className="fixed-bottom p-3 bg-light">
        {authenticated ? (
          <button className="btn btn-success btn-lg w-100 shadow px-5" onClick={handleBackToHomepage}>
            Total Price: ₹{getTotalPrice()}.00 Proceed to Checkout
          </button>
        ) : (
          <button className="btn btn-success btn-lg w-100 shadow px-5" onClick={handleSignIn}>
            Total Price: ₹{getTotalPrice()}.00 Login to Proceed
          </button>
        )}
      </footer>
    </div>
  );
};

export default BagPage;
