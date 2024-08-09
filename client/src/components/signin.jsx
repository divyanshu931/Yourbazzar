import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../apis/axiosInstance";
import Cookies from "universal-cookie";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleSignIn = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });

      if (response.data.token) {
        const token = response.data.token;
        const expirationTime = new Date().getTime() + 3600 * 1000; // 1 hour from now in milliseconds

        // Set cookies for token, userId, role, name, and email
        cookies.set("token", token, { path: "/", expires: new Date(expirationTime) });
        cookies.set("userId", response.data.userId, { path: "/" });
        cookies.set("role", response.data.role, { path: "/" });
        cookies.set("name", response.data.name, { path: "/" });
        cookies.set("email", response.data.email, { path: "/" });

        // Navigate to home page
        navigate("/home");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
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

      <div className="p-4">
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="form-label text-muted small mb-1">Your Email</label>
            <div className="input-group input-group-lg bg-white shadow-sm rounded overflow-hidden">
              <span className="input-group-text bg-white">
                <i className="bi bi-envelope-open text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder=""
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
          {!isLoading ? (
            <button type="submit" className="btn btn-success btn-lg w-100 shadow">
              SIGN IN
            </button>
          ) : (
            <button className="btn btn-success btn-lg w-100 shadow" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Loading...
            </button>
          )}
        </form>
        <div className="text-center mt-3">
          <Link to="/change-password" className="text-success">Forgot Password?</Link>
        </div>
      </div>

      <div className="osahan-footer fixed-bottom p-3 text-center">
        <div className="h6">by continuing, you agree to our</div>
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
