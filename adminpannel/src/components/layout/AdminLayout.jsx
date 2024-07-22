import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header";
import Sidebar from "../slideBar";

const AdminLayout = ({ children }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const navigate = useNavigate();

  const openSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const checkTokenAndNavigate = () => {
      const token = localStorage.getItem("token");
      const expirationTime = localStorage.getItem("tokenExpiration");

      if (!token || !expirationTime) {
        setTimeout(() => {
          navigate("/");
        }, 2000);
        return;
      }

      if (new Date().getTime() > parseInt(expirationTime)) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    };

    checkTokenAndNavigate();

  }, [navigate]);

  return (
    <div className="grid-container">
      <Sidebar openSidebarToggle={openSidebarToggle} openSidebar={openSidebar} />
      <Header openSidebar={openSidebar} />
      {children}
    </div>
  );
};

export default AdminLayout;
