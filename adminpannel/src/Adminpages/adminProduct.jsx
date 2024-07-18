import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import axios from "axios"; // Import Axios for API requests
import Product from "../components/Productcontrol";

function AdminProduct() {
 



  return (
    <>
      <AdminLayout>
       
       <Product/>
      </AdminLayout>
    </>
  );
}

export default AdminProduct;
