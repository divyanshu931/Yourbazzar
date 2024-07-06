import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <>
      <div className="osahan-index bg-c d-flex align-items-center justify-content-center vh-100 index-page">
        <div className="text-center">
          <a href="landing.html">
            <img src="img/brand.png" className="img-fluid shadow rounded-3" alt="Brand" />
          </a>
          <br />
          <div className="spinner"></div>
        </div>
      </div>
      <div className="osahan-footer fixed-bottom p-3">
        <Link to="/Landing_2" className="btn btn-success btn-lg w-100 d-flex align-items-center shadow">
          Get Started <i className="icofont-arrow-right ms-auto"></i>
        </Link>
      </div>
    </>
  );
}

export default Landing;
