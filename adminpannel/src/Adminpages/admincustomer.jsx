import React, { useState, useEffect } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import CustomerControl from "../components/customercontrol";

function CustomerDashboard() {
  const containerStyle = {
    gridArea: "main",
    overflowY: "auto",
    padding: "20px",
    color: "rgba(255, 255, 255, 0.95)",
  };
   

  return (
    <>
      <AdminLayout>
      <CustomerControl></CustomerControl>
      </AdminLayout>
    </>
  );
}

export default CustomerDashboard;
