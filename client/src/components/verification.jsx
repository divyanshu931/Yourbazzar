import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../apis/axiosInstance'; // Adjust import path as needed

function Verification() {
  const { email } = useParams();
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const [error, setError] = useState('');
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(300); // 5 minutes in seconds
  const navigate = useNavigate();

  useEffect(() => {
    let interval;

    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [countdown]);

  const handleResend = async () => {
    try {
      const response = await axiosInstance.post('/sendOTP', {
        email: email,
      });

      if (response.status === 200) {
        setCountdown(300); // Reset countdown timer to 5 minutes
        setError('');
      } else {
        setError('Failed to resend OTP. Please try again.');
      }
    } catch (err) {
      setError('Error resending OTP. Please try again.');
      console.error(err);
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();

    const enteredOtp = otp1 + otp2 + otp3 + otp4; // Concatenate OTP fields

    try {
      const response = await axiosInstance.post('/verifyAndRegister', {
        email: email,
        otp: enteredOtp,
        name: localStorage.getItem('name'), // Get stored name from localStorage
        password: localStorage.getItem('password'), // Get stored password from localStorage
      });

      if (response.status === 201) {
        // Registration and OTP verification successful
        navigate('/home'); // Navigate to the next page upon successful verification
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Error verifying OTP. Please try again.');
      console.error(err);
    }
  };

  return (
    <>
      <div className="p-3 shadow-sm bg-warning danger-nav osahan-home-header">
        <div className="font-weight-normal mb-0 d-flex align-items-center">
          <h6 className="fw-normal mb-0 text-dark d-flex align-items-center">
            <a href="#" className="text-dark me-3 fs-4" onClick={() => navigate('/home')}>
              <i className="bi bi-chevron-left"></i>
            </a>
            Verification
          </h6>
          <div className="ms-auto d-flex align-items-center">
            <a href="#" className="toggle osahan-toggle fs-4 text-dark ms-auto">
              <i className="bi bi-list"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="text-center">
          <h4 className="fw-bold">Verifying your Email</h4>
          <p className="text-muted">We have sent a 4-digit code to<br />{email}</p>
        </div>
        <form onSubmit={handleVerify} className="my-5">
          <div className="d-flex justify-content-center gap-3">
            <div className="col-2">
              <input
                type="text"
                className="form-control form-control-lg text-center"
                value={otp1}
                onChange={(e) => setOtp1(e.target.value)}
                required
                minLength="1"
                maxLength="1"
              />
            </div>
            <div className="col-2">
              <input
                type="text"
                className="form-control form-control-lg text-center"
                value={otp2}
                onChange={(e) => setOtp2(e.target.value)}
                required
                minLength="1"
                maxLength="1"
              />
            </div>
            <div className="col-2">
              <input
                type="text"
                className="form-control form-control-lg text-center"
                value={otp3}
                onChange={(e) => setOtp3(e.target.value)}
                required
                minLength="1"
                maxLength="1"
              />
            </div>
            <div className="col-2">
              <input
                type="text"
                className="form-control form-control-lg text-center"
                value={otp4}
                onChange={(e) => setOtp4(e.target.value)}
                required
                minLength="1"
                maxLength="1"
              />
            </div>
          </div>
          {error && <p className="text-danger">{error}</p>}
          <br />
          <button type="submit" className="btn btn-success btn-lg w-100 shadow">
            Verify
          </button>
        </form>
        <div className="text-center h6">
          {resendDisabled ? (
            <>
              Resend in <span className="text-danger">{countdown}</span> seconds
            </>
          ) : (
            <button
              className="btn btn-link"
              onClick={handleResend}
              disabled={resendDisabled}
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Verification;
