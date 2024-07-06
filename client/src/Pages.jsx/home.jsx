import React from "react"
import { Link } from "react-router-dom";

function Home() { 
    return(
        <>
<div className="alert alert-warning alert-dismissible fade show d-flex align-items-center px-3 py-2 app-box m-0 border-0" role="alert">
  <div className="d-flex align-items-center gap-3">
    <img src="img/brand.png" className="img-fluid" alt="Brand Logo" />
    <span>
      <p className="m-0 fw-bold text-dark">Use app for best experience!</p>
      <small className="text-dark-50">Available for Android & iOS</small>
    </span>
  </div>
  <span className="ms-auto me-3">
    <Link to="#" className="btn btn-sm btn-success me-3">USE APP</Link>
    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </span>
</div>

<div className="p-3 shadow-sm bg-warning danger-nav osahan-home-header sticky-top">
  <div className="font-weight-normal mb-0 d-flex align-items-center">
    <h4 className="m-0 fw-bold text-black">Your<span className="text-success">Bajaar</span></h4>
    <div className="ms-auto d-flex align-items-center">
      <a href="signin.html" className="me-3 text-dark fs-5"><i className="bi bi-person-circle"></i></a>
      <a href="bag.html" className="me-3 text-dark fs-5"><i className="bi bi-basket"></i></a>
      <a href="#" className="toggle osahan-toggle fs-4 text-dark ms-auto"><i className="bi bi-list"></i></a>
    </div>
  </div>
  <div className="input-group input-group-lg bg-white border-0 shadow-sm rounded overflow-hidden mt-3">
    <span className="input-group-text bg-white border-0"><i className="bi bi-search text-muted"></i></span>
    <input type="text" className="form-control border-0 ps-0" placeholder="Search for Products.." />
  </div>
</div>

<div className="py-3">
  <div className="px-3 d-flex justify-content-between">
    <h6 className="mb-2 text-black fw-bold">Today Offer's</h6>
    <a href="listing.html" className="text-success text-decoration-none">SEE ALL <i className="bi bi-arrow-right-circle-fill"></i></a>
  </div>
  <div className="home-cate">
    <div className="home-productc">
      <a href="listing.html"><img src="img/1.png" className="img-fluid" alt="Product 1" /></a>
    </div>
    <div className="home-productc">
      <a href="listing.html"><img src="img/2.png" className="img-fluid" alt="Product 2" /></a>
    </div>
    <div className="home-productc">
      <a href="listing.html"><img src="img/3.png" className="img-fluid" alt="Product 3" /></a>
    </div>
    <div className="home-productc">
      <a href="listing.html"><img src="img/4.png" className="img-fluid" alt="Product 4" /></a>
    </div>
    <div className="home-productc">
      <a href="listing.html"><img src="img/5.png" className="img-fluid" alt="Product 5" /></a>
    </div>
    <div className="home-productc">
      <a href="listing.html"><img src="img/6.png" className="img-fluid" alt="Product 6" /></a>
    </div>
  </div>
</div>

<div className="p-3 bg-light2">
  <div className="pb-1 d-flex justify-content-between">
    <h6 className="mb-2 text-black fw-bold">Shop by category</h6>
    <a className="text-success text-decoration-none" href="listing.html">SEE ALL <i className="bi bi-arrow-right-circle-fill"></i></a>
  </div>
  <div className="single-item selling-box">
    <div className="home-product">
      <a href="listing.html">
        <img src="img/cate/1.jpg" className="img-fluid rounded-3 mb-1" alt="..." />
        <img src="img/cate/2.jpg" className="img-fluid rounded-3" alt="..." />
      </a>
    </div>
    <div className="home-product">
      <a href="listing.html">
        <img src="img/cate/3.jpg" className="img-fluid rounded-3 mb-1" alt="..." />
        <img src="img/cate/4.jpg" className="img-fluid rounded-3" alt="..." />
      </a>
    </div>
    <div className="home-product">
      <a href="listing.html">
        <img src="img/cate/5.jpg" className="img-fluid rounded-3 mb-1" alt="..." />
        <img src="img/cate/6.jpg" className="img-fluid rounded-3" alt="..." />
      </a>
    </div>
    <div className="home-product">
      <a href="listing.html">
        <img src="img/cate/7.jpg" className="img-fluid rounded-3 mb-1" alt="..." />
        <img src="img/cate/8.jpg" className="img-fluid rounded-3" alt="..." />
      </a>
    </div>
  </div>
</div>
<div className="p-3 bg-light">
      <h6 className="mb-3 text-black fw-bold">Best selling products</h6>
      <div className="single-item selling-box">
        <div className="home-product">
          <div className="card border shadow-sm rounded-3">
            <img src="img/listing/1.jpeg" className="card-img-top rounded-3 p-3" alt="..." />
            <div className="card-body p-2 border-top">
              <p className="card-text m-0 d-flex align-items-center">Atta & Flour <i className="bi bi-arrow-right ms-auto"></i></p>
            </div>
          </div>
        </div>
        <div className="home-product">
          <div className="card border shadow-sm rounded-3">
            <img src="img/listing/2.jpeg" className="card-img-top rounded-3 p-3" alt="..." />
            <div className="card-body p-2 border-top">
              <p className="card-text m-0 d-flex align-items-center">Tea Bags <i className="bi bi-arrow-right ms-auto"></i></p>
            </div>
          </div>
        </div>
        <div className="home-product">
          <div className="card border shadow-sm rounded-3">
            <img src="img/listing/3.jpeg" className="card-img-top rounded-3 p-3" alt="..." />
            <div className="card-body p-2 border-top">
              <p className="card-text m-0 d-flex align-items-center">Rice <i className="bi bi-arrow-right ms-auto"></i></p>
            </div>
          </div>
        </div>
        <div className="home-product">
          <div className="card border shadow-sm rounded-3">
            <img src="img/listing/4.jpeg" className="card-img-top rounded-3 p-3" alt="..." />
            <div className="card-body p-2 border-top">
              <p className="card-text m-0 d-flex align-items-center">Bread <i className="bi bi-arrow-right ms-auto"></i></p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div className="border-bottom border-top px-3 d-flex align-items-center justify-content-between">
        <ul className="nav home-tabs" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Biscuits</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Rice</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Detergents</button>
          </li>
        </ul>
        <a className="text-success text-decoration-none" href="listing.html">SEE ALL <i className="bi bi-arrow-right-circle-fill"></i></a>
      </div>

      <div>
        <div className="tab-content" id="pills-tabContent">
          {/* Biscuits Tab */}
          <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
            <div className="osahan-listing">
              <div className="osahan-listing p-0 m-0 row">
                {/* Product Items */}
                <div className="text-dark col-6 px-0 border-bottom border-end position-relative">
                  <div className="list_item_gird m-0 bg-white listing-item">
                    <span className="badge bg-success m-3 position-absolute">20% OFF</span>
                    <div className="list-item-img p-4">
                      <img src="img/listing/1.jpeg" className="img-fluid p-3" alt="Product" />
                    </div>
                    <div className="tic-div px-3 pb-3">
                      <p className="mb-1 text-black">kissan Jam - Mixed Fruit,Tub</p>
                      <h6 className="card-title mt-2 mb-3 text-success fw-bold">₹80.00 <small className="text-decoration-line-through text-muted small fw-light">₹100.00</small></h6>
                      <div className="d-flex align-items-center justify-content-between gap-1">
                        <div className="size-btn">
                          <div className="input-group">
                            <a href="#" className="btn btn-light btn-sm border d-flex" data-bs-toggle="modal" data-bs-target="#exampleModala">500g <span><i className="bi bi-chevron-down small ms-2"></i></span></a>
                          </div>
                        </div>
                        <div className="quantity-btn">
                          <div className="input-group input-group-sm border rounded overflow-hidden">
                            <div className="btn btn-light text-success minus border-0 bg-white"><i className="bi bi-dash"></i></div>
                            <input type="text" className="form-control text-center box border-0" value="1" placeholder="" aria-label="Example text with button addon" />
                            <div className="btn btn-light text-success plus border-0 bg-white"><i className="bi bi-plus"></i></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a className="stretched-link" href="bag.html"></a>
                </div>
                
                {/* Repeat similar structure for other products */}
                
              </div>
            </div>
          </div>
          
          {/* Other Tabs (Rice, Detergents) */}
          {/* Add similar tab-pane structures as needed */}
          
        </div>
      </div>
    </div>
</>
);
}

export default Home;