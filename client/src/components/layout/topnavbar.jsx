import React from 'react';
import { Link } from 'react-router-dom';
import BrandImage from '../../assets/brand.png'; // Adjust the path based on your project structure

const TopNavbar = () => {
  return (
    <div className="alert alert-warning alert-dismissible fade show d-flex align-items-center px-3 py-2 app-box m-0 border-0" role="alert">
      <div className="d-flex align-items-center gap-3">
        <img src={BrandImage} className="img-fluid" alt="Brand Logo" />
        <span>
          <p className="m-0 fw-bold text-dark">Use app for best experience!</p>
          <small className="text-dark-50">Available for Android & iOS</small>
        </span>
      </div>
      <span className="ms-auto me-3">
        <Link to="/" className="btn btn-sm btn-success me-3">USE APP</Link>
        <button type="button" className="btn-close" aria-label="Close"></button>
      </span>
    </div>
  );
}

export default TopNavbar;
