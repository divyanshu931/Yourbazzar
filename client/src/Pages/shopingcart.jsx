import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Buynow = () => {
    
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
                            {/* Slider */}
                            <div className="slider-for border rounded-3 mx-1 mb-1">
                                <div className="product1"><img src="img/d1.png" className="img-fluid rounded-3" alt="" /></div>
                                <div className="product1"><img src="img/d2.png" className="img-fluid rounded-3" alt="" /></div>
                                <div className="product1"><img src="img/d3.png" className="img-fluid rounded-3" alt="" /></div>
                                <div className="product1"><img src="img/d1.png" className="img-fluid rounded-3" alt="" /></div>
                                <div className="product1"><img src="img/d2.png" className="img-fluid rounded-3" alt="" /></div>
                                <div className="product1"><img src="img/d3.png" className="img-fluid rounded-3" alt="" /></div>
                            </div>
                            <div className="slider-nav">
                                <div className="product2 p-1"><img src="img/d1.png" className="img-fluid rounded-3 border" alt="#" /></div>
                                <div className="product2 p-1"><img src="img/d2.png" className="img-fluid rounded-3 border" alt="#" /></div>
                                <div className="product2 p-1"><img src="img/d3.png" className="img-fluid rounded-3 border" alt="#" /></div>
                                <div className="product2 p-1"><img src="img/d1.png" className="img-fluid rounded-3 border" alt="#" /></div>
                                <div className="product2 p-1"><img src="img/d2.png" className="img-fluid rounded-3 border" alt="#" /></div>
                                <div className="product2 p-1"><img src="img/d3.png" className="img-fluid rounded-3 border" alt="#" /></div>
                            </div>
                        </div>
                        <div className="bag-item-right w-100">
                            <div className="card-body pe-0 py-0">
                                <span className="badge bg-success">20% OFF</span>
                                <p className="card-text mb-0 mt-1 text-black">Parle-G Original Gluco Biscuit</p>
                                <small className="text-muted"><i className="bi bi-shop me-1"></i> Seller - Private limited</small>
                                <h4 className="card-title mt-2 text-black fw-bold">₹80.00 <small className="text-decoration-line-through text-muted fs-6 fw-light">₹100.00</small></h4>
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
                                            <div className="btn btn-light text-success minus border-0 bg-white"><i className="bi bi-dash"></i></div>
                                            <input type="text" className="form-control text-center box border-0" value="1" placeholder="" aria-label="Example text with button addon" />
                                            <div className="btn btn-light text-success plus border-0 bg-white"><i className="bi bi-plus"></i></div>
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
                    <div className="price">Rs.75</div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="text-muted">Shipping charges</div>
                    <div className="text-success free">10</div>
                </div>
                <hr className="my-3"/>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 className="mb-0 text-dark">Order Total</h6>
                        <small className="text-muted">inclusive of all taxes</small>
                    </div>
                    <div className="text-success h5">Rs.85</div>
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
                <a href="my-order.html" className="btn btn-success btn-lg w-100 shadow">Confirm & Place Order</a>
            </div>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered m-0">
                    <div className="modal-content modal-content rounded-0 border-0 vh-100">
                        <div className="modal-header">
                            <h6 className="modal-title fw-bold" id="exampleModalLabel">Variants</h6>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="btn-group osahan-btn-group w-100 d-flex flex-column" role="group" aria-label="Basic radio toggle button group">
                                <input type="radio" className="btn-check" name="btnradioq" id="btnradio1q" autoComplete="off" defaultChecked />
                                <label className="btn btn-outline-light d-flex align-items-center gap-3 rounded px-3 py-2" htmlFor="btnradio1q">
                                    <h6 className="mb-0 fw-bold">Small</h6>
                                    <span className="ms-auto fw-bold fs-6">Rs.85 <i className="bi bi-check-circle-fill ms-3"></i></span>
                                </label>
                                <input type="radio" className="btn-check" name="btnradioq" id="btnradio2q" autoComplete="off" />
                                <label className="btn btn-outline-light d-flex align-items-center gap-3 rounded mt-2 px-3 py-2" htmlFor="btnradio2q">
                                    <h6 className="mb-0 fw-bold">Medium</h6>
                                    <span className="ms-auto fw-bold fs-6">Rs.99 <i className="bi bi-check-circle-fill ms-3"></i></span>
                                </label>
                                <input type="radio" className="btn-check" name="btnradioq" id="btnradio2qq" autoComplete="off" />
                                <label className="btn btn-outline-light d-flex align-items-center gap-3 rounded mt-2 px-3 py-2" htmlFor="btnradio2qq">
                                    <h6 className="mb-0 fw-bold">Large</h6>
                                    <span className="ms-auto fw-bold fs-6">Rs.109 <i className="bi bi-check-circle-fill ms-3"></i></span>
                                </label>
                            </div>
                        </div>
                        <div className="modal-footer d-flex align-items-center justify-content-between fixed-bottom">
                            <button type="button" className="col btn btn-outline-success" data-bs-dismiss="modal">Add to Bag</button>
                            <button type="button" className="col btn btn-success" data-bs-dismiss="modal">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Buynow;
