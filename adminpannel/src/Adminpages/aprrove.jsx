// ApproveProductsContent.jsx

import React, { useState, useEffect } from "react";
import axiosInstance from "../apis/axiosInstance"; // Adjust the path as per your project structure
import AdminLayout from "../components/layout/AdminLayout";
import ApprovedControl from "../components/approvedcontroller";

function ApproveProducts() {
 
  return (
  <>
  <AdminLayout>
    <ApprovedControl></ApprovedControl>
  </AdminLayout>
  </>
  );
}



export default ApproveProducts;
