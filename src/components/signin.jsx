import React from "react";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <>
      <div className="p-3 shadow-sm bg-warning danger-nav osahan-home-header">
        <div className="font-weight-normal mb-0 d-flex align-items-center">
          <h6 className="fw-normal mb-0 text-dark d-flex align-items-center">
            <Link to="/getStarted" className="text-dark me-3 fs-4">
              <i className="bi bi-chevron-left"></i>
            </Link>
            Sign In
          </h6>
          <div className="ms-auto d-flex align-items-center">
            <a className="toggle osahan-toggle fs-4 text-dark ms-auto" href="#">
              <i className="bi bi-list"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <form>
          <div className="mb-4">
            <label className="form-label text-muted small mb-1">Mobile</label>
            <div className="input-group input-group-lg bg-white shadow-sm rounded overflow-hidden">
              <span className="input-group-text bg-white">
                <i className="bi bi-phone text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="+91 74191 98787"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label text-muted small mb-1">Your Email</label>
            <div className="input-group input-group-lg bg-white shadow-sm rounded overflow-hidden">
              <span className="input-group-text bg-white">
                <i className="bi bi-envelope-open text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="yourbajaar@gmail.com"
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
        </form>
      </div>

      {/* Fixed Bottom */}
      <div className="osahan-footer fixed-bottom p-3 text-center">
        <div className="h6">by continue, you agree to our</div>
        <p className="text-success mb-3">
          <Link to="terms.html" className="text-success">
            Terms & Conditions
          </Link>
        </p>
        <Link to="/verification" className="btn btn-success btn-lg w-100 shadow">
          SIGN IN
        </Link>
        <Link to="/signup" className="btn btn-outline-success btn-lg w-100 shadow mt-3">
          Not a member ? SIGN UP
        </Link>
      </div>
    </>
  );
}

export default SignIn;
