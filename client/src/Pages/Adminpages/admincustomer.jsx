import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../componentsAdmin/layout/AdminLayout";

function CustomerDashboard() {
  const [hasSuperAdminAccess, setHasSuperAdminAccess] = useState(false);
  const [customers, setCustomers] = useState([]);

  // Dummy customer list (replace with actual data fetching logic)
  useEffect(() => {
    // Simulated dummy data
    const dummyCustomers = [
      { id: 1, name: "Customer 1" },
      { id: 2, name: "Customer 2" },
      { id: 3, name: "Customer 3" },
      { id: 4, name: "Customer 4" },
    ];
    setCustomers(dummyCustomers);
    
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "super") {
      setHasSuperAdminAccess(true);
    }
  }, []);

  // Inline styles
  const containerStyle = {
    margin: "20px auto",
    maxWidth: "800px",
    padding: "20px",
  };

  const errorMessageStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh", // Adjusted to make space for the link
    textAlign: "center",
    backgroundColor: "#f8d7da", // Bootstrap danger color for error messages
    color: "#721c24", // Bootstrap dark color for error messages
    padding: "20px",
    borderRadius: "5px",
  };

  const customerListStyle = {
    marginTop: "20px",
    listStyleType: "none",
    padding: "0",
  };

  const customerItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    marginBottom: "5px",
    backgroundColor: "#f8f9fa",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const customerNameStyle = {
    fontWeight: "bold",
  };

  // Function to handle adding a customer (placeholder)
  const handleAddCustomer = () => {
    console.log("Handle add customer functionality");
    // Implement logic to add a new customer
  };

  // Function to handle updating a customer (placeholder)
  const handleUpdateCustomer = () => {
    console.log("Handle update customer functionality");
    // Implement logic to update an existing customer
  };

  // Function to handle deleting a customer (placeholder)
  const handleDeleteCustomer = () => {
    console.log("Handle delete customer functionality");
    // Implement logic to delete an existing customer
  };

  return (
    <>
      <AdminLayout>
        <div style={containerStyle}>
          {!hasSuperAdminAccess ? (
            <div style={errorMessageStyle}>
              <p style={{ color: "black", fontWeight: "bold" }}>Sorry, you are not a super admin.</p>
              <p style={{ color: "black" }}>Access to this dashboard is restricted.</p>
             
            </div>
          ) : (
            
              <div className="card-body">
                <h5 className="card-title mb-4 text-black">Customer List</h5>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6>Total Customers: {customers.length}</h6>
                  <div>
                    <button className="btn btn-success me-3" onClick={handleAddCustomer}>
                      Add Customer
                    </button>
                    <button className="btn btn-warning me-3" onClick={handleUpdateCustomer}>
                      Update Customer
                    </button>
                    <button className="btn btn-danger" onClick={handleDeleteCustomer}>
                      Delete Customer
                    </button>
                  </div>
                </div>
                <ul style={customerListStyle}>
                  {customers.map((customer) => (
                    <li key={customer.id} style={customerItemStyle}>
                      <span style={customerNameStyle}>{customer.name}</span>
                      {/* Optional: Add Edit and Delete icons/buttons here */}
                    </li>
                  ))}
                </ul>
              </div>
         
          )}
        </div>
      </AdminLayout>
    </>
  );
}

export default CustomerDashboard;
