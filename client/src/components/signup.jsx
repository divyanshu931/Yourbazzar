import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../apis/axiosWithAuth";

function SignUp({ toggleSidebar }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false); // To handle loading state
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    // Frontend validation for all fields
    if (!email || !name || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true); // Start loading state

    try {
      // Send request to backend to send OTP to user's email
      const response = await axiosInstance.post("api/otp/send-otp", { email });

      console.log("API Response:", response);

      if (response.status === 200) {
        localStorage.setItem("signupData", JSON.stringify({
          email,
          name,
          password,
          confirmPassword,
          expiresAt: new Date().getTime() + 10 * 60 * 1000, // 10 minutes from now
        }));
        setOtpSent(true);
        // Navigate to verification page with user data
        navigate(`/verification`, { state: { email } });
      } else {
        setError("Error sending OTP. Please try again.");
      }
    } catch (err) {
      console.error("API Error:", err); // Log the error
      if (err.response && err.response.status === 400) {
        setError(err.response.data.message);
      } else {
        setError("Error sending OTP. Please try again.");
      }
    } finally {
      setLoading(false); // Stop loading state
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
            Sign Up
          </h6>
          <div className="ms-auto d-flex align-items-center">
            <a
              className="toggle osahan-toggle fs-4 text-dark ms-auto"
              href="#"
              onClick={toggleSidebar}
            >
              <i className="bi bi-list"></i>
            </a>
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="p-4">
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="form-label text-muted small mb-1">Your Name</label>
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
                type="email"
                className="form-control"
                placeholder="example@mail.com"
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button
            type="submit"
            className="btn btn-success btn-lg w-100 shadow"
            disabled={loading || otpSent} // Disable button while loading or OTP sent
          >
            {loading ? "Loading..." : otpSent ? "OTP SENT" : "SEND OTP"}
          </button>
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
      </div>
    </>
  );
}

export default SignUp;
