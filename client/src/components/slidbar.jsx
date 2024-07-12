import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul>
        <li>
          <Link to="index.html">
            <i className="bi bi-code-square me-2"></i> Splash
          </Link>
        </li>
        <li>
          <Link to="landing.html">
            <i className="bi bi-file-break me-2"></i> Landing
          </Link>
        </li>
        <li>
          <Link to="get-started.html">
            <i className="bi bi-ui-checks-grid me-2"></i> Get Started
          </Link>
        </li>
        <li>
          <Link to="#">
            <i className="bi bi-lock me-2"></i> Authentication
          </Link>
          <ul>
            <li>
              <Link to="signin.html">Sign In</Link>
            </li>
            <li>
              <Link to="signup.html">Sign Up</Link>
            </li>
            <li>
              <Link to="change-password.html">Change Password</Link>
            </li>
            <li>
              <Link to="verification.html">Verification</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="home.html">
            <i className="bi bi-house me-2"></i> Homepage
          </Link>
        </li>
        <li>
          <Link to="gift-card.html">
            <i className="bi bi-award me-2"></i> Offers
          </Link>
        </li>
        <li>
          <Link to="listing.html">
            <i className="bi bi-list-task me-2"></i> Listing
          </Link>
        </li>
        <li>
          <Link to="bag.html">
            <i className="bi bi-bag me-2"></i> Bag
          </Link>
        </li>
        <li>
          <Link to="#">
            <i className="bi bi-person me-2"></i> Profile Pages
          </Link>
          <ul>
            <li>
              <Link to="my-order.html"> My Order</Link>
            </li>
            <li>
              <Link to="order-confirm.html"> Order Confirm</Link>
            </li>
            <li>
              <Link to="order-detail.html"> Order Detail</Link>
            </li>
            <li>
              <Link to="add-address.html"> Add Address</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="#">
            <i className="bi bi-clipboard me-2"></i> Extra Pages
          </Link>
          <ul>
            <li>
              <Link to="support.html">Support</Link>
            </li>
            <li>
              <Link to="notification.html">Notification</Link>
            </li>
            <li>
              <Link to="empty.html"> Empty Cart</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="#">
            <i className="bi bi-link-45deg me-2"></i> Navigation Link Example
          </Link>
          <ul>
            <li>
              <Link to="#">Link Example 1</Link>
              <ul>
                <li>
                  <Link to="#">Link Example 1.1</Link>
                  <ul>
                    <li>
                      <Link to="#">Link</Link>
                    </li>
                    <li>
                      <Link to="#">Link</Link>
                    </li>
                    <li>
                      <Link to="#">Link</Link>
                    </li>
                    <li>
                      <Link to="#">Link</Link>
                    </li>
                    <li>
                      <Link to="#">Link</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#">Link Example 1.2</Link>
                  <ul>
                    <li>
                      <Link to="#">Link</Link>
                    </li>
                    <li>
                      <Link to="#">Link</Link>
                    </li>
                    <li>
                      <Link to="#">Link</Link>
                    </li>
                    <li>
                      <Link to="#">Link</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <Link to="#">Link Example 2</Link>
            </li>
            <li>
              <Link to="#">Link Example 3</Link>
            </li>
            <li>
              <Link to="#">Link Example 4</Link>
            </li>
            <li data-nav-custom-content>
              <div className="custom-message">
                You can add any custom content to your navigation items. This
                text is just an example.
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
