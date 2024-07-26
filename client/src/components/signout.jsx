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
      <div className="text-center">
        <img 
          src="https://www.letsgowild.co.uk/wp-content/uploads/thankyouowl.png" 
          alt="Thank you" 
          className="signout-image"
        />
        <h2>Signing Out...</h2>
      </div>
    </div>
  );
}

export default SignOut;
