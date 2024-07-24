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
      navigate("/signin");
    };

    handleSignOut();
  }, [navigate, cookies]);

  return (
    <div className="p-4">
      <h2>Signing Out...</h2>
    </div>
  );
}

export default SignOut;
