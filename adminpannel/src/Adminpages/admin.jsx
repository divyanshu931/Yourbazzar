import React, { useEffect, useState } from "react";
import AdminHome from "../components/AdminHome";
import AdminLayout from "../components/layout/AdminLayout";
import Cookies from 'universal-cookie'; // Import universal-cookie

function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false); // State to manage admin access

  useEffect(() => {
    const cookies = new Cookies();
    const userRole = cookies.get('userRole'); // Fetch user role from cookies
    setIsAdmin(userRole === 'Admin'); // Check if the user is an Admin
  }, []);

  // Inline style for "No Access" message
  const noAccessStyle = {
    color: '#000', // Black color
    textAlign: 'center',
    padding: '20px',
    fontSize: '18px',
    fontFamily: 'Arial, sans-serif'
  };

  if (!isAdmin) {
    return <p style={noAccessStyle}>You can't access</p>; // Message for non-admin users
  }

  return (
    <AdminLayout>
      <AdminHome />
    </AdminLayout>
  );
}

export default AdminDashboard;
