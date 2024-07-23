import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../apis/axiosInstance";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

// Define CSS constant for SignIn component
const signInStyles = `
.container {
  margin-top: 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
}

.card {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 0.5rem;
  background-color: #ffffff;
  max-width: 30rem;
  width: 100%;
}

.card-header {
  background-color: #ffc107;
  color: #343a40;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  padding: 2rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.card-body {
  padding: 2rem;
}

.form-label {
  color: #495057;
  font-weight: bold;
  padding: 2rem;
}

.form-control {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
  color: #495057;
  background-color: #f8f9fa;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
  color: #ffffff;
  font-weight: bold;
  border-radius: 0.25rem;
  padding: 0.75rem 1.5rem;
}

.btn-success:hover {
  background-color: #218838;
}

.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  padding: 0.75rem 1.25rem;
  margin-top: 1rem;
  border-radius: 0.25rem;
}
`;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [showError, setShowError] = useState(false); // State to control error display
  const navigate = useNavigate();

  useEffect(() => {
    // Clear error after 3 seconds
    const errorTimer = setTimeout(() => {
      setShowError(false);
      setError("");
    }, 3000);

    return () => clearTimeout(errorTimer);
  }, [error]); // Clear timer when error state changes

  const saveToken = (token, id, role) => {
    const expirationTime = new Date();
    expirationTime.setDate(expirationTime.getDate() + 1); // Expires next day
  
    // Save token, id, and role to cookies
    cookies.set('token', token, { path: '/', expires: expirationTime });
    cookies.set('userId', id, { path: '/', expires: expirationTime });
    cookies.set('userRole', role, { path: '/', expires: expirationTime });
  };
  

  const handleSignIn = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });
  
      if (response.data.success) {
        const { token, userId, role } = response.data;
        
        if (role === "Customer") {
          setError("Access denied for customers. Please use admin or seller credentials.");
          setShowError(true); // Show error message
        } else if (role === "Admin" || role === "Seller") {
          saveToken(token, userId, role); // Save token, id, and role
          sendOTP(email);
          setShowOTPInput(true);
        }
      } else {
        setError("Invalid credentials. Please try again.");
        setShowError(true); // Show error message
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setShowError(true); // Show error message
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sendOTP = async (email) => {
    try {
      const otpResponse = await axiosInstance.post("/api/otp/send-otp", { email });
      if (otpResponse.data.success) {
        setOTP("");
      } else {
        setError(otpResponse.data.message || "Failed to send OTP. Please try again.");
        setShowError(true); // Show error message
      }
    } catch (err) {
      setError("Something went wrong while sending OTP. Please try again.");
      setShowError(true); // Show error message
      console.error(err);
    }
  };

  const handleOTPSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const otpVerificationResponse = await axiosInstance.post("/api/otp/verify-otp", {
        email,
        otp,
      });

      if (otpVerificationResponse.data.success) {
        navigate("/dashboard/admin");
      } else {
        setError("Invalid OTP. Please try again.");
        setShowError(true); // Show error message
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setShowError(true); // Show error message
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="container">
      <style>{signInStyles}</style>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header">
              Sign In to YourBajaar Admin
            </div>
            <div className="card-body">
              <form onSubmit={showOTPInput ? handleOTPSubmit : handleSignIn}>
                <div className="mb-3">
                  <label className="form-label mb-1">Your Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="yourbajaar@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={showOTPInput || loading}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label mb-1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="***********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={showOTPInput || loading}
                  />
                </div>
                {showOTPInput && (
                  <div className="mb-3">
                    <label className="form-label mb-1">Enter OTP</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="1234"
                      value={otp}
                      onChange={(e) => setOTP(e.target.value)}
                    />
                  </div>
                )}
                {error && <div className="alert alert-danger">{error}</div>}
                <button
                  type="submit"
                  className="btn btn-success btn-lg w-100 mt-3"
                  disabled={loading}
                >
                  {loading ? "WAIT..." : showOTPInput ? "VERIFY OTP" : "SIGN IN"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
