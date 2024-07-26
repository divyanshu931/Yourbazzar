import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faHome, faGift, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [authSubMenuOpen, setAuthSubMenuOpen] = useState(false);
  const [profileSubMenuOpen, setProfileSubMenuOpen] = useState(false);
  const [extraSubMenuOpen, setExtraSubMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const cookies = new Cookies();

  useEffect(() => {
    // Check if user is authenticated based on cookies
    const token = cookies.get('token');
    const userId = cookies.get('userId');
    setIsAuthenticated(!!token && !!userId); // Set authentication state based on token and userId presence
  }, [cookies]);

  const toggleAuthSubMenu = () => {
    setAuthSubMenuOpen(!authSubMenuOpen);
  };

  const toggleProfileSubMenu = () => {
    setProfileSubMenuOpen(!profileSubMenuOpen);
  };

  const toggleExtraSubMenu = () => {
    setExtraSubMenuOpen(!extraSubMenuOpen);
  };

  const handleLinkClick = () => {
    if (isOpen) {
      toggleSidebar();
    }
  };

  return (
    <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h3 className="m-0 fw-bold text-black">Your <span className="text-success">Bajaar</span></h3>
        <button className="close-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/Landing_2" onClick={handleLinkClick}>
            <i className="bi bi-code-square me-2"></i> Splash
          </Link>
        </li>
        <li>
          <Link to="/" onClick={handleLinkClick}>
            <i className="bi bi-file-break me-2"></i> Landing
          </Link>
        </li>
        <li>
          <Link to="/getStarted" onClick={handleLinkClick}>
            <i className="bi bi-ui-checks-grid me-2"></i> Get Started
          </Link>
        </li>
        {isAuthenticated ? (
          <li className={authSubMenuOpen ? 'active' : ''}>
            <a href="#!" onClick={(e) => { e.preventDefault(); toggleAuthSubMenu(); }}>
              <i className="bi bi-lock me-2"></i> Authentication
            </a>
            <ul className={`sub-menu ${authSubMenuOpen ? 'open' : ''}`}>
              <li><Link to="/change-password" onClick={handleLinkClick}>Change Password</Link></li>
              <li><Link to="/signout" onClick={handleLinkClick}>Sign Out</Link></li>
            </ul>
          </li>
        ) : (
          <li className={authSubMenuOpen ? 'active' : ''}>
            <a href="#!" onClick={(e) => { e.preventDefault(); toggleAuthSubMenu(); }}>
              <i className="bi bi-lock me-2"></i> Authentication
            </a>
            <ul className={`sub-menu ${authSubMenuOpen ? 'open' : ''}`}>
              <li><Link to="/signin" onClick={handleLinkClick}>Sign In</Link></li>
              <li><Link to="/signup" onClick={handleLinkClick}>Sign Up</Link></li>
              <li><Link to="/" onClick={handleLinkClick}>Verification</Link></li>
            </ul>
          </li>
        )}
        <li>
          <Link to="/home" onClick={handleLinkClick}><i className="bi bi-house me-2"></i> Homepage</Link>
        </li>
        <li>
          <Link to="/offers" onClick={handleLinkClick}><i className="bi bi-award me-2"></i> Offers</Link>
        </li>
        <li>
          <Link to="/whislist" onClick={handleLinkClick}><i className="bi bi-list-task me-2"></i> Whislist</Link>
        </li>
        <li>
          <Link to="/bag" onClick={handleLinkClick}>
            <i className="bi bi-bag me-2"></i> Bag
          </Link>
        </li>
        <li className={profileSubMenuOpen ? 'active' : ''}>
          <a href="#!" onClick={(e) => { e.preventDefault(); toggleProfileSubMenu(); }}>
            <i className="bi bi-person me-2"></i> Profile Pages
          </a>
          <ul className={`sub-menu ${profileSubMenuOpen ? 'open' : ''}`}>
            <li><Link to="/my-order" onClick={handleLinkClick}>My Order</Link></li>
            <li><Link to="/order-confirm" onClick={handleLinkClick}>Order Confirm</Link></li>
            <li><Link to="/order-detail" onClick={handleLinkClick}>Order Detail</Link></li>
            <li><Link to="/add-address" onClick={handleLinkClick}>Add Address</Link></li>
          </ul>
        </li>
        <li className={extraSubMenuOpen ? 'active' : ''}>
          <a href="#!" onClick={(e) => { e.preventDefault(); toggleExtraSubMenu(); }}>
            <i className="bi bi-clipboard me-2"></i> Extra Pages
          </a>
          <ul className={`sub-menu ${extraSubMenuOpen ? 'open' : ''}`}>
            <li><Link to="/support" onClick={handleLinkClick}>Support</Link></li>
            <li><Link to="/notification" onClick={handleLinkClick}>Contact</Link></li>
            <li><Link to="/empty" onClick={handleLinkClick}>Terms & Conditions</Link></li>
          </ul>
        </li>
      </ul>
      <ul className="bottom-nav">
        <li className="email">
          <Link className={`nav-item text-center ${location.pathname === '/home' ? 'active' : ''}`} to="/home" tabIndex="0" role="menuitem">
            <p className="h5 m-0"><FontAwesomeIcon icon={faHome} /></p>
            Home
          </Link>
        </li>
        <li className="github">
          <Link className={`nav-item text-center ${location.pathname === '/offers' ? 'active' : ''}`} to="/offers" tabIndex="0" role="menuitem">
            <p className="h5 m-0"><FontAwesomeIcon icon={faGift} /></p>
            Offers
          </Link>
        </li>
        <li className="ko-fi">
          <Link className={`nav-item text-center ${location.pathname === '/support' ? 'active' : ''}`} to="/support" tabIndex="0" role="menuitem">
            <p className="h5 m-0"><FontAwesomeIcon icon={faQuestionCircle} /></p>
            Help
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
