import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../apis/axiosInstance'; // Adjust import path as needed
import { Link } from 'react-router-dom';
function Verification() {
  const location = useLocation();
  const email = location.state?.email || "";
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(300); // 5 minutes in seconds
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVerify = async (event) => {
    event.preventDefault();

    const enteredOtp = otp1 + otp2 + otp3 + otp4; // Concatenate OTP fields

    if (enteredOtp.length !== 4) {
      setError('Please enter the 4-digit OTP.');
      return;
    }

    try {
      const signupData = JSON.parse(localStorage.getItem('signupData'));
      const response = await axiosInstance.post('/api/auth/signup', {
        email: signupData.email,
        otp: enteredOtp,
        name: signupData.name,
        password: signupData.password
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
            <Link to="/" className="text-dark me-3 fs-4" onClick={() => navigate('/')}>
              <i className="bi bi-chevron-left"></i>
            </Link>
            Verification
          </h6>
          <div className="ms-auto d-flex align-items-center">
          
            
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="p-4">
        <form onSubmit={handleVerify}>
        <div className="p-5">
        <div className="text-center">
          <h4 className="fw-bold text-black">Verifying your Email</h4>
          <p className="text-muted">We have sent a 4-digit code to<br />{email}</p>
        </div>
        </div>
          <div className="mb-4">
            <label className="form-label text-muted small mb-1">Enter OTP</label>
            <div className="d-flex justify-content-between">
              <input
                type="text"
                className="form-control text-center mx-1"
                value={otp1}
                onChange={(e) => setOtp1(e.target.value)}
                maxLength="1"
              />
              <input
                type="text"
                className="form-control text-center mx-1"
                value={otp2}
                onChange={(e) => setOtp2(e.target.value)}
                maxLength="1"
              />
              <input
                type="text"
                className="form-control text-center mx-1"
                value={otp3}
                onChange={(e) => setOtp3(e.target.value)}
                maxLength="1"
              />
              <input
                type="text"
                className="form-control text-center mx-1"
                value={otp4}
                onChange={(e) => setOtp4(e.target.value)}
                maxLength="1"
              />
            </div>
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button
            type="submit"
            className="btn btn-success btn-lg w-100 shadow"
            disabled={countdown === 0}
          >
            {countdown > 0 ? `Verify OTP (${Math.floor(countdown / 60)}:${countdown % 60})` : 'Resend OTP'}
          </button>
        </form>
      </div>
    </>
  );
}

export default Verification;
