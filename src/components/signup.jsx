import React from "react";
import { Link } from "react-router-dom";

function SignUp({ toggleSidebar }) {
    return (
      <>
        <div className="p-3 shadow-sm bg-warning danger-nav osahan-home-header">
          <div className="font-weight-normal mb-0 d-flex align-items-center">
            <h6 className="fw-normal mb-0 text-dark d-flex align-items-center">
              <Link to="/getStarted" className="text-dark me-3 fs-4">
                <i className="bi bi-chevron-left"></i>
              </Link>
              Sign Up
            </h6>
            <div className="ms-auto d-flex align-items-center">
              <a className="toggle osahan-toggle fs-4 text-dark ms-auto" href="#" onClick={toggleSidebar}>
                <i className="bi bi-list"></i>
              </a>
            </div>
          </div>
        </div>
      {/* Body */}
      <div className="p-4">
        <form>
          <div className="mb-4">
            <label className="form-label text-muted small mb-1">Your Email</label>
            <div className="input-group input-group-lg bg-white shadow-sm rounded overflow-hidden">
              <span className="input-group-text bg-white">
                <i className="bi bi-envelope-open text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="example@mail.com"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label text-muted small mb-1">Password</label>
            <div className="input-group input-group-lg bg-white shadow-sm rounded overflow-hidden">
              <span className="input-group-text bg-white">
                <i className="bi bi-lock text-muted"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="***********"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label text-muted small mb-1">Confirm Password</label>
            <div className="input-group input-group-lg bg-white shadow-sm rounded overflow-hidden">
              <span className="input-group-text bg-white">
                <i className="bi bi-lock text-muted"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="***********"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Fixed Bottom */}
      <div className="osahan-footer fixed-bottom p-3 text-center">
        <div className="h6">By signing up you agree to our</div>
        <p className="text-success mb-3">
          <Link to="privacy-policy" className="text-success">
            Privacy Policy and Terms.
          </Link>
        </p>
        <Link to="/verification" className="btn btn-success btn-lg w-100 shadow">
          CREATE AN ACCOUNT
        </Link>
      </div>
    
    
    </>
  );
}

export default SignUp;
