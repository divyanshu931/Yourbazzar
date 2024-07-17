import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../componentsAdmin/layout/AdminLayout";

function AdminControl() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [admins, setAdmins] = useState([]);

  // Dummy admin list (replace with actual data fetching logic)
  useEffect(() => {
    // Simulated dummy data
    const dummyAdmins = [
      { id: 1, name: "Admin 1" },
      { id: 2, name: "Admin 2" },
      { id: 3, name: "Admin 3" },
      { id: 4, name: "Admin 4" },
    ];
    setAdmins(dummyAdmins);
    
    const userType = localStorage.getItem("userType");
    if (userType === "admin") {
      setIsAdmin(true);
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

  const adminListStyle = {
    marginTop: "20px",
    listStyleType: "none",
    padding: "0",
  };

  const adminItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    marginBottom: "5px",
    backgroundColor: "#f8f9fa",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const adminNameStyle = {
    fontWeight: "bold",
  };

  // Function to handle adding an admin (placeholder)
  const handleAddAdmin = () => {
    console.log("Handle add admin functionality");
    // Implement logic to add a new admin
  };

  // Function to handle updating an admin (placeholder)
  const handleUpdateAdmin = () => {
    console.log("Handle update admin functionality");
    // Implement logic to update an existing admin
  };

  // Function to handle deleting an admin (placeholder)
  const handleDeleteAdmin = () => {
    console.log("Handle delete admin functionality");
    // Implement logic to delete an existing admin
  };

  return (
    <>
      <AdminLayout>
        <div style={containerStyle}>
          {!isAdmin ? (
            <div style={errorMessageStyle}>
              <p style={{ color: "black", fontWeight: "bold" }}>Sorry, you are not an admin.</p>
              <p style={{ color: "black" }}>Access to this page is restricted.</p>
              
            </div>
          ) : (
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title mb-4">Admin List</h5>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6>Total Admins: {admins.length}</h6>
                  <div>
                    <button className="btn btn-success me-3" onClick={handleAddAdmin}>
                      Add Admin
                    </button>
                    <button className="btn btn-warning me-3" onClick={handleUpdateAdmin}>
                      Update Admin
                    </button>
                    <button className="btn btn-danger" onClick={handleDeleteAdmin}>
                      Delete Admin
                    </button>
                  </div>
                </div>
                <ul style={adminListStyle}>
                  {admins.map((admin) => (
                    <li key={admin.id} style={adminItemStyle}>
                      <span style={adminNameStyle}>{admin.name}</span>
                      {/* Optional: Add Edit and Delete icons/buttons here */}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
}

export default AdminControl;
