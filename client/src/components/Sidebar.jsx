import React from 'react';


function Sidebar({ }) {
  
  return (
    <nav >
      <ul className="second-nav">
        <li>
          <a href="#" className="bg-success sidebar-user d-flex align-items-center py-4 px-3 border-0 mb-0">
            <img src="img/profile.jpg" className="img-fluid rounded-pill me-3" alt="Profile" />
            <div className="text-white">
              <h6 className="mb-0">Admin</h6>
              <small>+91 7419198787</small>
              <br />
              <span className="f-10 text-white-50">Version 1.32</span>
            </div>
          </a>
        </li>
        <li>
          <a href="index.html">
            <i className="bi bi-code-square me-2"></i> Splash
          </a>
        </li>
        <li>
          <a href="landing.html">
            <i className="bi bi-file-break me-2"></i> Landing
          </a>
        </li>
        <li>
          <a href="get-started.html">
            <i className="bi bi-ui-checks-grid me-2"></i> Get Started
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bi bi-lock me-2"></i> Authentication
          </a>
          <ul>
            <li><a href="signin.html">Sign In</a></li>
            <li><a href="signup.html">Sign Up</a></li>
            <li><a href="change-password.html">Change Password</a></li>
            <li><a href="verification.html">Verification</a></li>
          </ul>
        </li>
        <li>
          <a href="home.html">
            <i className="bi bi-house me-2"></i> Homepage
          </a>
        </li>
        <li>
          <a href="gift-card.html">
            <i className="bi bi-award me-2"></i> Offers
          </a>
        </li>
        <li>
          <a href="listing.html">
            <i className="bi bi-list-task me-2"></i> Listing
          </a>
        </li>
        <li>
          <a href="bag.html">
            <i className="bi bi-bag me-2"></i> Bag
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bi bi-person me-2"></i> Profile Pages
          </a>
          <ul>
            <li><a href="my-order.html">My Order</a></li>
            <li><a href="order-confirm.html">Order Confirm</a></li>
            <li><a href="order-detail.html">Order Detail</a></li>
            <li><a href="add-address.html">Add Address</a></li>
          </ul>
        </li>
        <li>
          <a href="#">
            <i className="bi bi-clipboard me-2"></i> Extra Pages
          </a>
          <ul>
            <li><a href="support.html">Support</a></li>
            <li><a href="notification.html">Notification</a></li>
            <li><a href="empty.html">Empty Cart</a></li>
          </ul>
        </li>
        <li>
          <a href="#">
            <i className="bi bi-link-45deg me-2"></i> Navigation Link Example
          </a>
          <ul>
            <li>
              <a href="#">Link Example 1</a>
              <ul>
                <li>
                  <a href="#">Link Example 1.1</a>
                  <ul>
                    <li><a href="#">Link</a></li>
                    <li><a href="#">Link</a></li>
                    <li><a href="#">Link</a></li>
                    <li><a href="#">Link</a></li>
                    <li><a href="#">Link</a></li>
                  </ul>
                </li>
                <li>
                  <a href="#">Link Example 1.2</a>
                  <ul>
                    <li><a href="#">Link</a></li>
                    <li><a href="#">Link</a></li>
                    <li><a href="#">Link</a></li>
                    <li><a href="#">Link</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li><a href="#">Link Example 2</a></li>
            <li><a href="#">Link Example 3</a></li>
            <li><a href="#">Link Example 4</a></li>
            <li data-nav-custom-content>
              <div className="custom-message">
                You can add any custom content to your navigation items. This text is just an example.
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <ul className="bottom-nav">
        <li className="email">
          <a className="text-success nav-item text-center" href="home.html" tabIndex="0" role="menuitem">
            <p className="h5 m-0">
              <i className="icofont-ui-home text-success"></i>
            </p>
            Home
          </a>
        </li>
        <li className="github">
          <a href="gift-card.html" className="nav-item text-center" tabIndex="0" role="menuitem">
            <p className="h5 m-0">
              <i className="icofont-sale-discount"></i>
            </p>
            Offer
          </a>
        </li>
        <li className="ko-fi">
          <a href="support.html" className="nav-item text-center" tabIndex="0" role="menuitem">
            <p className="h5 m-0">
              <i className="icofont-support-faq"></i>
            </p>
            Help
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
