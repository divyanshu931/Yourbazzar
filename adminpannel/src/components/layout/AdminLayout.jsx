import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header";
import Sidebar from "../slideBar";
import Cookies from 'universal-cookie';
import "../style.css";

const cookies = new Cookies();

const AdminLayout = ({ children }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [userRole, setUserRole] = useState(""); // State to hold user's role
  const navigate = useNavigate();

  const openSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const checkRoleAndNavigate = () => {
      const role = cookies.get("userRole");
      
      if (!role) {
        setUserRole("Guest"); // Set default role if not found
        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        setUserRole(role); // Set userRole state if role is found
      }
    };

    checkRoleAndNavigate();

  }, [navigate]);

  return (
    <div className="grid-container">
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        openSidebar={openSidebar}
        userRole={userRole} // Pass userRole as prop to Sidebar
      />
      <Header openSidebar={openSidebar} />
      {userRole === "Admin" ? (
        // Render content for Admin role
        <div className="main-container">
          {children}
        </div>
      ) : userRole === "Seller" ? (
        <div className="main-container">
          {children}
        </div>
      ) : (
        // Render content for Guest or unauthorized role
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "black", fontSize: "3rem" }}>
            You don't have access to this page.
          </h1>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
