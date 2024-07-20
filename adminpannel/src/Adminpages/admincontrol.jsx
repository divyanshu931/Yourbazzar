import React from "react";
import AdminLayout from "../components/layout/AdminLayout";
import AdminContro from "../components/admincontrol";

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
       <AdminContro/>
      </AdminLayout>
    </>
  );
}

export default AdminControl;
