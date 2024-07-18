import React from "react";
import AdminLayout from "../components/layout/AdminLayout";

function AdminControl() {
  // Inline styles
  const containerStyle = {
    gridArea: "main",
    overflowY: "auto",
    padding: "20px",
    color: "rgba(255, 255, 255, 0.95)",
  };

  return (
    <>
      <AdminLayout>
        <div style={containerStyle}>
          <p style={{ color: "black", fontWeight: "bold" }}>Welcome to the Admin Control Panel.</p>
          <p style={{ color: "black" }}>Manage your admin tasks here.</p>

          <h1 style={{ color: "black", fontWeight: "bold" }}>OPPs you are not a  super admin [owner of yourbajaar].</h1>
        </div>
      </AdminLayout>
    </>
  );
}

export default AdminControl;
