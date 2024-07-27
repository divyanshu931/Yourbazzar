import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const BagPage = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status from cookies
    const userId = cookies.get('userId');
    const token = cookies.get('token');

    if (userId && token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [cookies]);

  const handleSignIn = () => {
    navigate('/signin'); // Navigate to sign-in page
  };

  const handleBackToHomepage = () => {
    navigate('/'); // Navigate to homepage
  };

  return (
    <div className="p-3 d-flex align-items-center justify-content-center vh-100 flex-column">
      <div className="text-center mb-4"><img src="img/empty.svg" alt="#" className="col-12 img-fluid px-5" /></div>
      <div className="text-center">
        {authenticated ? (
          <>
            <h4>Your Bag is Empty</h4>
            <p className="text-muted">Looks like you haven't made your choice yet.</p>
          </>
        ) : (
          <p className="text-muted">Please <Link to="/signin">sign in</Link> to continue.</p>
        )}
      </div>
      <div className="osahan-footer p-3">
        {authenticated ? (
          <button className="btn btn-success btn-lg w-100 shadow px-5" onClick={handleBackToHomepage}>
            Back to Homepage
          </button>
        ) : (
          <button className="btn btn-success btn-lg w-100 shadow px-5" onClick={handleSignIn}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default BagPage;
