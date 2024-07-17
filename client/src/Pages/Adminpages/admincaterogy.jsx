import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../componentsAdmin/layout/AdminLayout";

function CategoryDashboard() {
  const [hasToken, setHasToken] = useState(true);
  const [categories, setCategories] = useState([]);

  // Dummy category list (replace with actual data fetching logic)
  useEffect(() => {
    // Simulated dummy data
    const dummyCategories = [
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
      { id: 3, name: "Category 3" },
      { id: 4, name: "Category 4" },
    ];
    setCategories(dummyCategories);
    
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, redirecting to login.");
      setHasToken(false);
    }
  }, []);

  // Redirect to login page after 10 seconds if no token
  useEffect(() => {
    if (!hasToken) {
      const redirectTimer = setTimeout(() => {
        window.location.href = "/"; // Redirect to login page
      }, 10000); // 10 seconds delay

      return () => clearTimeout(redirectTimer); // Clean up timer on unmount
    }
  }, [hasToken]);

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

  const categoryListStyle = {
    marginTop: "20px",
    listStyleType: "none",
    padding: "0",
  };

  const categoryItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    marginBottom: "5px",
    backgroundColor: "#f8f9fa",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const categoryNameStyle = {
    fontWeight: "bold",
    color: "#000", // Black text color
  };

  const buttonStyle = {
    padding: "8px 16px",
    marginRight: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    color: "#000", // Black text color
  };

  const addButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#28a745", // Green color for Add Category button
  };

  const updateButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#ffc107", // Yellow color for Update Category button
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#dc3545", // Red color for Delete Category button
  };

  // Function to handle adding a category (not implemented)
  const handleAddCategory = () => {
    console.log("Implement handleAddCategory functionality");
    // Implement logic to add a new category (API call)
  };

  // Function to handle updating a category (not implemented)
  const handleUpdateCategory = () => {
    console.log("Implement handleUpdateCategory functionality");
    // Implement logic to update an existing category (API call)
  };

  // Function to handle deleting a category (not implemented)
  const handleDeleteCategory = () => {
    console.log("Implement handleDeleteCategory functionality");
    // Implement logic to delete an existing category (API call)
  };

  return (
    <>
      <AdminLayout>
        <div style={containerStyle}>
          {!hasToken ? (
            <div style={errorMessageStyle}>
              <p>Sorry, you are not logged in or do not have admin access. Redirecting to login...</p>
              <Link to="/" style={{ color: "#721c24", textDecoration: "none", marginTop: "10px", fontWeight: "bold" }}>
                Go to Login
              </Link>
            </div>
          ) : (
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title mb-4 text-black">Category List</h5>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6>Total Categories: {categories.length}</h6>
                  <div>
                    <button style={addButtonStyle} onClick={handleAddCategory}>
                      Add Category
                    </button>
                    <button style={updateButtonStyle} onClick={handleUpdateCategory}>
                      Update Category
                    </button>
                    <button style={deleteButtonStyle} onClick={handleDeleteCategory}>
                      Delete Category
                    </button>
                  </div>
                </div>
                <ul style={categoryListStyle}>
                  {categories.map((category) => (
                    <li key={category.id} style={categoryItemStyle}>
                      <span style={categoryNameStyle}>{category.name}</span>
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

export default CategoryDashboard;
