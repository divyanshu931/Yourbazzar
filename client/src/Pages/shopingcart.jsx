import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../apis/axiosInstance';

const Buynow = () => {
    const { productId } = useParams(); // Get productId from URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1); // State for quantity

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axiosInstance.get(`/api/public/products/${productId}`);
                setProduct(response.data);
            } catch (err) {
                console.error('Error fetching product details:', err);
                setError('Failed to fetch product details.');
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    const handleIncreaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecreaseQuantity = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1)); // Ensure quantity doesn't go below 1
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!product) {
        return <p>Product not found.</p>;
    }

    return (
        <>
            <div className="p-3 shadow-sm bg-warning danger-nav osahan-home-header sticky-top">
                <div className="font-weight-normal mb-0 d-flex align-items-center">
                    <h6 className="fw-normal mb-0 text-dark d-flex align-items-center">
                        <Link to="/home" className="text-dark me-3 fs-4"><i className="bi bi-chevron-left"></i></Link>
                        My Bag
                    </h6>
                    <div className="ms-auto d-flex align-items-center">
                        <Link to="/empty" className="me-3 text-decoration-none text-dark text-uppercase">Clear Bag</Link>
                        <a className="toggle osahan-toggle fs-4 text-dark ms-auto" href="#"><i className="bi bi-list"></i></a>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-sm my-3 p-3">
                <div className="card od-card border-0">
                    <div className="d-flex bag-item">
                        <div className="bag-item-left">
                            <img src={`${axiosInstance.defaults.baseURL}/${product.image}`} alt={product.name} className="img-fluid" />
                        </div>
                        <div className="bag-item-right w-100">
                            <div className="card-body pe-0 py-0">
                                <span className="badge bg-success">{product.discount}% OFF</span>
                                <p className="card-text mb-0 mt-1 text-black">{product.name}</p>
                                <small className="text-muted"><i className="bi bi-shop me-1"></i> Seller - {product.sellerName}</small>
                                <h4 className="card-title mt-2 text-black fw-bold">₹{product.price} <small className="text-decoration-line-through text-muted fs-6 fw-light">₹{product.mrp}</small></h4>
                                <div className="d-flex align-items-center justify-content-between gap-3">
                                    <div className="size-btn">
                                        <div className="text-muted small mb-1">Size</div>
                                        <div>
                                            <button type="button" className="btn btn-light btn-sm border d-flex" data-bs-toggle="modal" data-bs-target="#exampleModal">Large <span><i className="bi bi-chevron-down small ms-2"></i></span></button>
                                        </div>
                                    </div>
                                    <div className="quantity-btn">
                                        <div className="text-muted small mb-1">Quantity</div>
                                        <div className="input-group input-group-sm border rounded overflow-hidden">
                                            <button type="button" className="btn btn-light text-success minus border-0 bg-white" onClick={handleDecreaseQuantity}>
                                                <i className="bi bi-dash"></i>
                                            </button>
                                            <input
                                                type="text"
                                                className="form-control text-center box border-0"
                                                value={quantity}
                                                readOnly
                                            />
                                            <button type="button" className="btn btn-light text-success plus border-0 bg-white" onClick={handleIncreaseQuantity}>
                                                <i className="bi bi-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Price Summary */}
            <div className="bg-white shadow-sm mb-4 p-3">
                <h6 className="mb-3 text-black fw-bold">Price Summary</h6>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="text-muted">Product Charges</div>
                    <div className="price">₹{product.price}</div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="text-muted">Shipping charges</div>
                    <div className="text-success free">Free</div>
                </div>
                <hr className="my-3"/>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 className="mb-0 text-dark">Order Total</h6>
                        <small className="text-muted">inclusive of all taxes</small>
                    </div>
                    <div className="text-success h5">₹{product.price}</div>
                </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white shadow-sm mb-3 p-3">
                <h6 className="mb-3 text-black fw-bold">Select Delivery Address</h6>
                <div className="btn-group osahan-btn-group w-100 d-flex flex-column" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" defaultChecked />
                    <label className="btn btn-outline-light d-flex align-items-center gap-3 rounded px-3 py-2" htmlFor="btnradio1">
                        <i className="bi bi-house"></i>
                        <span className="text-start">
                            <h6 className="mb-0 fw-bold">Home</h6>
                            <div className="text-muted small text-opacity-50">SCO - 78 Omaxe Galleria, Bahadurgarh, Haryana - 124507 </div>
                        </span>
                        <i className="bi bi-check-circle-fill ms-auto"></i>
                    </label>
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
                    <label className="btn btn-outline-light d-flex align-items-center gap-3 rounded mt-2 px-3 py-2" htmlFor="btnradio2">
                        <i className="bi bi-building"></i>
                        <span className="text-start">
                            <h6 className="mb-0 fw-bold">Work</h6>
                            <div className="text-muted small text-opacity-50">Jharoda Kalan South West Delhi - 110072</div>
                        </span>
                        <i className="bi bi-check-circle-fill ms-auto"></i>
                    </label>
                </div>
                <div className="mt-3">
                    <Link to="/add-address" className="btn w-100 btn-success">+ Add New Address</Link>
                </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white shadow-sm p-3">
                <h6 className="mb-3 text-black fw-bold">Select Payment Method</h6>
                <div className="btn-group osahan-btn-group w-100 d-flex gap-3" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" className="btn-check" name="btnradioe" id="btnradio3" autoComplete="off" defaultChecked />
                    <label className="btn btn-outline-light d-flex rounded p-3 col-6" htmlFor="btnradio3">
                        <span className="text-start">
                            <i className="bi bi-credit-card fs-2"></i>
                            <h6 className="mb-0 fw-bold">Online</h6>
                            <div className="text-muted small text-opacity-50">Debit/Credit, Net banking, UPI</div>
                        </span>
                        <i className="bi bi-check-circle-fill ms-auto"></i>
                    </label>
                    <input type="radio" className="btn-check" name="btnradioe" id="btnradio4" autoComplete="off" />
                    <label className="btn btn-outline-light d-flex rounded p-3 col-6" htmlFor="btnradio4">
                        <span className="text-start">
                            <i className="bi bi-cash-coin fs-2"></i>
                            <h6 className="mb-0 fw-bold">COD</h6>
                            <div className="text-muted small text-opacity-50">Please keep exact change.</div>
                        </span>
                        <i className="bi bi-check-circle-fill ms-auto"></i>
                    </label>
                </div>
            </div>

            {/* Fixed Button */}
            <div className="osahan-footer fixed-bottom p-3">
                <Link className="btn btn-success btn-lg w-100 shadow">Confirm & Place Order</Link>
            </div>
        </>
    );
};

export default Buynow;
