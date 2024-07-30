import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../apis/axiosInstance';
import { getCartFromLocalStorage, updateCartInLocalStorage } from '../utils/cartUtils'; // Ensure the path is correct

const ProductItem = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
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

    updateCartInLocalStorage(cartItems); // Update local storage
  };

  return (
    <div className="text-dark col-4 px-0 border-bottom border-end position-relative">
      <div className="list_item_gird m-0 bg-white listing-item">
        <Link to={`/product-detail/${product._id}`} className="text-decoration-none">
          <span className="badge bg-warning text-dark m-3 position-absolute">
            {product.discount}% OFF
          </span>
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
            <small className="text-decoration-line-through text-muted small fw-light">
              {product.mrp}
            </small>
          </h6>
          <div className="d-flex align-items-center justify-content-between gap-1">
            <div className="quantity-btn">
              <div className="input-group input-group-sm border rounded overflow-hidden">
                <div
                  className="btn btn-light text-success minus border-0 bg-white"
                  onClick={decrementQuantity}
                >
                  <i className="bi bi-dash"></i>
                </div>
                <input
                  type="text"
                  className="form-control text-center box border-0"
                  value={quantity}
                  readOnly
                />
                <div
                  className="btn btn-light text-success plus border-0 bg-white"
                  onClick={incrementQuantity}
                >
                  <i className="bi bi-plus"></i>
                </div>
              </div>
            </div>
            <div>
              <button
                className="btn btn-success btn-sm d-flex border-0"
                onClick={handleAddToCart}
              >
                <i className="bi bi-plus me-2"></i> ADD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
