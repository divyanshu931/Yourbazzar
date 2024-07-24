import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignOut() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleSignOut = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      navigate("/signin");
    };

    handleSignOut();
  }, [navigate]);

  return (
    <div className="p-4">
      <h2>Signing Out...</h2>
    </div>
  );
}

export default SignOut;
