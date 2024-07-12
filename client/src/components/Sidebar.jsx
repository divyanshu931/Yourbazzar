import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  // State to manage visibility of Authentication submenu
  const [authSubMenuOpen, setAuthSubMenuOpen] = useState(false);

  // Function to toggle Authentication submenu
  const toggleAuthSubMenu = () => {
    setAuthSubMenuOpen(!authSubMenuOpen);
  };

  // Close sidebar when a link is clicked
  const handleLinkClick = () => {
    if (isOpen) {
      toggleSidebar();
    }
  };

  return (
    <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h3>Your Bajaar</h3>
        <button className="close-btn" onClick={toggleSidebar}>
          <i className="bi bi-x"></i>
        </button>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/index.html" onClick={handleLinkClick}>
            <i className="bi bi-code-square me-2"></i> Splash
          </Link>
        </li>
        <li>
          <Link to="/landing.html" onClick={handleLinkClick}>
            <i className="bi bi-file-break me-2"></i> Landing
          </Link>
        </li>
        <li>
          <Link to="/get-started.html" onClick={handleLinkClick}>
            <i className="bi bi-ui-checks-grid me-2"></i> Get Started
          </Link>
        </li>
        <li className={authSubMenuOpen ? 'active' : ''}>
          <a href="#!" onClick={(e) => { e.preventDefault(); toggleAuthSubMenu(); }}>
            <i className="bi bi-lock me-2"></i> Authentication
          </a>
          <ul className={`sub-menu ${authSubMenuOpen ? 'open' : ''}`}>
            <li><Link to="/signin.html" onClick={handleLinkClick}>Sign In</Link></li>
            <li><Link to="/signup.html" onClick={handleLinkClick}>Sign Up</Link></li>
            <li><Link to="/change-password.html" onClick={handleLinkClick}>Change Password</Link></li>
            <li><Link to="/verification.html" onClick={handleLinkClick}>Verification</Link></li>
          </ul>
        </li>
        <li>
          <Link to="/home.html" onClick={handleLinkClick}><i className="bi bi-house me-2"></i> Homepage</Link>
        </li>
        <li>
          <Link to="/gift-card.html" onClick={handleLinkClick}><i className="bi bi-award me-2"></i> Offers</Link>
        </li>
        <li>
          <Link to="/listing.html" onClick={handleLinkClick}><i className="bi bi-list-task me-2"></i> Listing</Link>
        </li>
        <li>
          <Link to="/bag.html" onClick={handleLinkClick}><i className="bi bi-bag me-2"></i> Bag</Link>
        </li>
        <li onClick={handleLinkClick}>
          <Link to="/profile"><i className="bi bi-person me-2"></i> Profile Pages</Link>
          <ul>
            <li><Link to="/my-order.html" onClick={handleLinkClick}>My Order</Link></li>
            <li><Link to="/order-confirm.html" onClick={handleLinkClick}>Order Confirm</Link></li>
            <li><Link to="/order-detail.html" onClick={handleLinkClick}>Order Detail</Link></li>
            <li><Link to="/add-address.html" onClick={handleLinkClick}>Add Address</Link></li>
          </ul>
        </li>
        <li onClick={handleLinkClick}>
          <Link to="/extra-pages"><i className="bi bi-clipboard me-2"></i> Extra Pages</Link>
          <ul>
            <li><Link to="/support.html" onClick={handleLinkClick}>Support</Link></li>
            <li><Link to="/notification.html" onClick={handleLinkClick}>Notification</Link></li>
            <li><Link to="/empty.html" onClick={handleLinkClick}>Empty Cart</Link></li>
          </ul>
        </li>
      
      </ul>
      <ul className="bottom-nav">
        <li className="email">
          <Link className={`nav-item text-center ${location.pathname === '/home.html' ? 'active' : ''}`} to="/home.html" tabIndex="0" role="menuitem">
            <p className="h5 m-0"><i className="icofont-ui-home"></i></p>
            Home
          </Link>
        </li>
        <li className="github">
          <Link className={`nav-item text-center ${location.pathname === '/gift-card.html' ? 'active' : ''}`} to="/gift-card.html" tabIndex="0" role="menuitem">
            <p className="h5 m-0"><i className="icofont-sale-discount"></i></p>
            Offers
          </Link>
        </li>
        <li className="ko-fi">
          <Link className={`nav-item text-center ${location.pathname === '/support.html' ? 'active' : ''}`} to="/support.html" tabIndex="0" role="menuitem">
            <p className="h5 m-0"><i className="icofont-support-faq"></i></p>
            Help
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
