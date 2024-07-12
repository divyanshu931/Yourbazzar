import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../componentsAdmin/slideBar";
import Header from "../componentsAdmin/header";
import AdminHome from "../componentsAdmin/AdminHome";

function AdminDashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [hasToken, setHasToken] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, redirecting to login.");
      setHasToken(false);
    }
  }, []);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  if (!hasToken) {
    // Simulate redirection after 10 seconds using setTimeout
    setTimeout(() => {
      window.location.href = "/"; // Redirect to login page after 10 seconds
    }, 2000); // 10 seconds delay

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'black', textAlign: 'center' }}>
        <p>Sorry, No token and your are not admin . Redirecting to login...</p>
        <Link to="/" style={{ color: 'black', textDecoration: 'none', marginTop: '10px' }}>Go to Login</Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <AdminHome />
      </div>
    </>
  );
}

export default AdminDashboard;
