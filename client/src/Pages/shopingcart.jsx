import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap'; // Assuming React Bootstrap is used for modals
import axios from 'axios';

const ShoppingCart = () => {
    const [cart, setCart] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Fetch cart data on component mount
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('/api/cart'); // Make sure the URL is correct
                setCart(response.data);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };
        fetchCart();
    }, []);

    // Handle add to cart
    const handleAddToCart = async (productId, quantity) => {
        try {
            await axios.post('/api/cart/add', { productId, quantity });
            // Optionally refetch cart data here or update local state
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    // Handle remove from cart
    const handleRemoveFromCart = async (productId) => {
        try {
            await axios.post('/api/cart/remove', { productId });
            // Optionally refetch cart data here or update local state
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    // Handle modal show
    const handleShowModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    const handleVariantSelect = (variant) => {
        // Handle variant selection logic
        // For example, you might want to add the item to the cart with selected variant
        handleAddToCart(selectedProduct._id, 1); // Add the product with quantity 1
        handleCloseModal();
    };

    if (!cart) return <div>Loading...</div>;

    return (
        <div className="bg-light pb-5 mb-5">
            {/* Header and other parts of the UI */}
            <div className="p-3 shadow-sm bg-warning danger-nav osahan-home-header sticky-top">
                <div className="font-weight-normal mb-0 d-flex align-items-center">
                    <h6 className="fw-normal mb-0 text-dark d-flex align-items-center">
                        <a className="text-dark me-3 fs-4" href="listing.html"><i className="bi bi-chevron-left"></i></a>
                        My Bag
                    </h6>
                    <div className="ms-auto d-flex align-items-center">
                        <a href="empty.html" className="me-3 text-decoration-none text-dark text-uppercase">clear bag</a>
                        <a className="toggle osahan-toggle fs-4 text-dark ms-auto" href="#"><i className="bi bi-list"></i></a>
                    </div>
                </div>
            </div>

            {/* Cart Items */}
            {cart.items.map((item) => (
                <div className="bg-white shadow-sm my-3 p-3" key={item.productId}>
                    <div className="card od-card border-0">
                        <div className="d-flex bag-item">
                            <div className="bag-item-left">
                                {/* Product image and slider can be dynamically rendered */}
                                <div className="slider-for border rounded-3 mx-1 mb-1">
                                    <img src={item.productId.image} className="img-fluid rounded-3" alt={item.productId.name} />
                                </div>
                            </div>
                            <div className="bag-item-right w-100">
                                <div className="card-body pe-0 py-0">
                                    <span className="badge bg-success">20% OFF</span>
                                    <p className="card-text mb-0 mt-1 text-black">{item.productId.name}</p>
                                    <small className="text-muted"><i className="bi bi-shop me-1"></i> Seller - Private limited</small>
                                    <h4 className="card-title mt-2 text-black fw-bold">₹{item.productId.price} <small className="text-decoration-line-through text-muted fs-6 fw-light">₹{item.productId.price * 1.2}</small></h4>
                                    <div className="d-flex align-items-center justify-content-between gap-3">
                                        <div className="size-btn">
                                            <div className="text-muted small mb-1">Size</div>
                                            <div>
                                                <button
                                                    type="button"
                                                    className="btn btn-light btn-sm border d-flex"
                                                    onClick={() => handleShowModal(item.productId)}
                                                >
                                                    Large <span><i className="bi bi-chevron-down small ms-2"></i></span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="quantity-btn">
                                            <div className="text-muted small mb-1">Quantity</div>
                                            <div className="input-group input-group-sm border rounded overflow-hidden">
                                                <div className="btn btn-light text-success minus border-0 bg-white" onClick={() => handleRemoveFromCart(item.productId._id)}><i className="bi bi-dash"></i></div>
                                                <input type="text" className="form-control text-center box border-0" defaultValue={item.quantity} placeholder="" aria-label="Example text with button addon" />
                                                <div className="btn btn-light text-success plus border-0 bg-white" onClick={() => handleAddToCart(item.productId._id, 1)}><i className="bi bi-plus"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Price Summary */}
            <div className="bg-white shadow-sm mb-4 p-3">
                <h6 className="mb-3 text-black fw-bold">Price Summary</h6>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="text-muted">Product Charges</div>
                    <div className="price">Rs.{cart.total}</div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="text-muted">Shipping charges</div>
                    <div className="text-success free">10</div>
                </div>
                <hr className="my-3" />
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 className="mb-0 text-dark">Order Total</h6>
                        <small className="text-muted">inclusive of all taxes</small>
                    </div>
                    <div className="text-success h5">Rs.{cart.total + 10}</div>
                </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white shadow-sm mb-3 p-3">
                <h6 className="mb-3 text-black fw-bold">Select Delivery Address</h6>
                <div className="btn-group osahan-btn-group w-100 d-flex flex-column" role="group" aria-label="Basic radio toggle button group">
                    {/* You can dynamically render delivery addresses here */}
                </div>
                <div className="mt-3">
                    <a href="add-address.html" className="btn w-100 btn-success">+ Add New Address</a>
                </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white shadow-sm p-3">
                <h6 className="mb-3 text-black fw-bold">Select payment Method</h6>
                <div className="btn-group osahan-btn-group w-100 d-flex gap-3" role="group" aria-label="Basic radio toggle button group">
                    {/* You can dynamically render payment methods here */}
                </div>
            </div>

            {/* Fixed Button */}
            <div className="osahan-footer fixed-bottom p-3">
                <a href="my-order.html" className="btn btn-success btn-lg w-100 shadow">Confirm & Place Order</a>
            </div>

            {/* Modal for Size/Variant Selection */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Variants</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="btn-group osahan-btn-group w-100 d-flex flex-column" role="group" aria-label="Basic radio toggle button group">
                        {/* Assuming you have a list of variants for the selected product */}
                        {selectedProduct && selectedProduct.variants.map((variant) => (
                            <div key={variant.id}>
                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="btnradioq"
                                    id={`btnradio${variant.id}`}
                                    autoComplete="off"
                                />
                                <label
                                    className="btn btn-outline-light d-flex align-items-center gap-3 rounded px-3 py-2"
                                    htmlFor={`btnradio${variant.id}`}
                                    onClick={() => handleVariantSelect(variant)}
                                >
                                    <h6 className="mb-0 fw-bold">{variant.name}</h6>
                                    <span className="ms-auto fw-bold fs-6">Rs.{variant.price} <i className="bi bi-check-circle-fill ms-3"></i></span>
                                </label>
                            </div>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex align-items-center justify-content-between">
                    <button type="button" className="col btn btn-outline-success" onClick={handleCloseModal}>Add to Bag</button>
                    <button type="button" className="col btn btn-success" onClick={handleCloseModal}>Buy Now</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ShoppingCart;
