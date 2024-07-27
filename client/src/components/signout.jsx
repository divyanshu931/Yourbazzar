import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function SignOut() {
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const handleSignOut = () => {
      const allCookies = cookies.getAll();
      Object.keys(allCookies).forEach((cookieName) => {
        cookies.remove(cookieName);
      });

      // Wait for 2 seconds before redirecting
      setTimeout(() => {
        navigate("/signin");
      }, 1000); // 2000 milliseconds = 2 seconds
    };

    handleSignOut();
  }, [navigate, cookies]);

  return (
    <div className="text-center">
      <br/>
      <div   style={{ fontSize: '50px', fontWeight: 'bold', color: 'lightgrey', textAlign: 'center' }}>
        <br/><br/>
      <h2>Signing Out...</h2>
      <h3>Come back soon </h3>
      <img
              src="https://blinkit.com/57070263a359a92dc0fe.png" // Replace with the path to your fallback image
              alt="No products found"
              style={{ width: '400px', height: '500' }}
            />
            
        
      </div>
    </div>
  );
}

export default SignOut;
