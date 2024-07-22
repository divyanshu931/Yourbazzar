import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../apis/axiosInstance";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const navigate = useNavigate();

  // Function to handle login form submission
  const handleSignIn = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Send login request
      const response = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        const { token } = response.data; // Extract token from response
        saveToken(token); // Save token to local storage
        sendOTP(email); // Send OTP after successful login
        setShowOTPInput(true); // Show OTP input box
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to send OTP
  const sendOTP = async (email) => {
    try {
      const otpResponse = await axiosInstance.post("/api/otp/send-otp", { email });
      if (otpResponse.data.success) {
        // OTP sent successfully
        setOTP(""); // Clear previous OTP input
      } else {
        setError(otpResponse.data.message || "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong while sending OTP. Please try again.");
      console.error(err);
    }
  };

  // Function to handle OTP verification form submission
  const handleOTPSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Verify OTP
      const otpVerificationResponse = await axiosInstance.post("/api/otp/verify-otp", {
        email,
        otp,
      });

      if (otpVerificationResponse.data.success) {
        navigate("/dashboard/admin"); // Navigate to dashboard upon successful OTP verification
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to save token to local storage
  const saveToken = (token) => {
    const expirationTime = new Date().getTime() + 8 * 60 * 60 * 1000; // 8 hours
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiration", expirationTime);
  };

  return (
    <>
      {/* Header */}
      <div
        style={{
          padding: "2rem",
          boxShadow: "0 .5rem 1rem rgba(0,0,0,.1)",
          backgroundColor: "#ffc107",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#343a40",
        }}
      >
        Sign In to YourBajaar Admin
      </div>

      {/* Body */}
      <div style={{ padding: "2rem" }}>
        <form onSubmit={showOTPInput ? handleOTPSubmit : handleSignIn}>
          <div className="mb-4">
            <label className="form-label text-muted small mb-1" style={{ color: "black" }}>Your Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="yourbajaar@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={showOTPInput || loading}
              style={{ border: "none", padding: ".5rem 1rem", color: "black" }}
            />
          </div>
          <div className="mb-4">
            <label className="form-label text-muted small mb-1" style={{ color: "black" }}>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="***********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={showOTPInput || loading}
              style={{ border: "none", padding: ".5rem 1rem", color: "black" }}
            />
          </div>
          {showOTPInput && (
            <div className="mb-4">
              <label className="form-label text-muted small mb-1" style={{ color: "black" }}>Enter OTP</label>
              <input
                type="text"
                className="form-control"
                placeholder="1234"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                style={{ border: "none", padding: ".5rem 1rem", color: "black" }}
              />
            </div>
          )}
          {error && <p className="text-danger">{error}</p>}
          <button
            type="submit"
            className="btn btn-success btn-lg w-100 shadow-sm"
            disabled={loading}
            style={{
              marginTop: "1rem",
              backgroundColor: "#28a745",
              borderColor: "#28a745",
              fontWeight: "bold",
              letterSpacing: "1px",
              borderRadius: ".25rem",
              padding: ".75rem 1.5rem",
              transition: "background-color 0.2s",
              color: "black", // Button text color set to black
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
          >
            {loading ? "WAIT..." : showOTPInput ? "VERIFY OTP" : "SIGN IN"}
          </button>
        </form>
      </div>

      {/* Footer */}
      {/* ... */}
    </>
  );
}

export default SignIn;
