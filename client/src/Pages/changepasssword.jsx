import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../apis/axiosInstance"; // Updated import

function ChangePassword() {
  const [step, setStep] = useState(1); // 1: Enter Email, 2: Enter OTP, 3: Change Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // For programmatic navigation

  // Function to send OTP
  const sendOtp = async (email) => {
    try {
      const response = await axiosInstance.post("/api/otp/send-otp", { email });
      if (response.data.success) {
        return true;
      } else {
        setError(response.data.message || "Failed to send OTP. Please try again.");
        return false;
      }
    } catch (error) {
      setError("Something went wrong while sending OTP. Please try again.");
      return false;
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear previous errors

    const otpSent = await sendOtp(email);
    if (otpSent) {
      setStep(2);
    }

    setIsLoading(false);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear previous errors

    try {
      const response = await axiosInstance.post("/api/otp/verify-otp", { email, otp });
      if (response.data.success) {
        setStep(3);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("Failed to verify OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear previous errors
  
    try {
      // Assuming OTP should also be sent with the request
      await axiosInstance.post("/api/auth//change-password", {
        email,
        otp, // Include OTP here
        newPassword,
      });
  
      navigate("/signin"); // Redirect to sign-in page or wherever appropriate
    } catch (error) {
      setError("Failed to change password Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <>
      <div className="p-1 shadow-sm bg-warning danger-nav osahan-home-header">
        <div className="font-weight-normal mb-0 d-flex align-items-center">
          <h6 className="fw-normal mb-0 text-dark d-flex align-items-center">
            <button
              type="button"
              className="text-dark me-3 fs-4 btn btn-link"
              onClick={() => navigate(-1)} // Use navigate(-1) to go back
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            Change Password
          </h6>
        </div>
      </div>

      <div className="p-4">
        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
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
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-success btn-lg w-100 shadow" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Loading...
                </>
              ) : (
                "Send OTP"
              )}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOtpSubmit}>
            <div className="mb-4">
              <label className="form-label text-muted small mb-1">Enter OTP</label>
              <div className="input-group input-group-lg bg-white shadow-sm rounded overflow-hidden">
                <span className="input-group-text bg-white">
                  <i className="bi bi-lock text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-success btn-lg w-100 shadow" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Loading...
                </>
              ) : (
                "Verify OTP"
              )}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-4">
              <label className="form-label text-muted small mb-1">New Password</label>
              <div className="input-group input-group-lg bg-white shadow-sm rounded overflow-hidden">
                <span className="input-group-text bg-white">
                  <i className="bi bi-lock text-muted"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="***********"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-success btn-lg w-100 shadow" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Loading...
                </>
              ) : (
                "Change Password"
              )}
            </button>
          </form>
        )}
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

export default ChangePassword;
