import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faGift, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [authSubMenuOpen, setAuthSubMenuOpen] = useState(false);
  const [profileSubMenuOpen, setProfileSubMenuOpen] = useState(false);
  const [extraSubMenuOpen, setExtraSubMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('Guest');
  const [userEmail, setUserEmail] = useState('Not logged in');
  const cookies = new Cookies();

  useEffect(() => {
    const token = cookies.get('token');
    const userId = cookies.get('userId');
    const userName = cookies.get('role');
    const userEmail = cookies.get('email');
    setIsAuthenticated(!!token && !!userId);

    if (isAuthenticated) {
      setUserName(userName || 'User');
      setUserEmail(userEmail || 'No email');
    } else {
      setUserName('Guest');
      setUserEmail('Not logged in');
    }
  }, [cookies, isAuthenticated]);

  const truncateEmail = (email) => {
    if (email.length > 13) {
      return email.substring(0, 13) + '...';
    }
    return email;
  };

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
      <div className="sidebar-header bg-success d-flex align-items-center py-4 px-3">
        <img
          src="https://th.bing.com/th/id/R.356a238b8453a398084a519e9a4acd5b?rik=ix4nLCnJdDRfgg&riu=http%3a%2f%2fwww.avratours.gr%2fmedia%2fgeneral%2fuser-circle.png&ehk=hdddfqNtczvV5RyAgBraDv0TqCeuUcqL7TWFQulPGPU%3d&risl=&pid=ImgRaw&r=0"
          alt="Profile"
          style={{
            width: '70px',
            height: '70px',
            objectFit: 'cover'
          }}
          className="img-fluid rounded-pill me-3"
        />
        <div className="text-white">
          <h6 className="mb-0">{userName}</h6>
          <small>{truncateEmail(userEmail)}</small><br />
          <span className="f-10 text-white-50">Version 1.32</span>
        </div>
      </div>
      <ul className="sidebar-menu fade show">
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
