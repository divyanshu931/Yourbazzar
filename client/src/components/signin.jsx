import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../apis/axiosInstance";


function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("/api/auth/login", {
        name,
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name); // Save name
        localStorage.setItem("email", response.data.email); // Save email
  
        navigate("/home");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.error(err);
    }
  };

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
        
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="form-label text-muted small mb-1">Name</label>
            <div className="input-group input-group-lg bg-white shadow-sm rounded overflow-hidden">
              <span className="input-group-text bg-white">
                <i className="bi bi-person text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-success btn-lg w-100 shadow">
            SIGN IN
          </button>
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
        <Link to="/signup" className="btn btn-outline-success btn-lg w-100 shadow mt-3">
          Not a member? SIGN UP
        </Link>
      </div>
    </>
  );
}

export default SignIn;
