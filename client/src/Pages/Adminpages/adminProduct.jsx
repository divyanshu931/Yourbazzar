import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../componentsAdmin/layout/AdminLayout";

function ProductDashboard() {
  const [hasToken, setHasToken] = useState(true);
  const [products, setProducts] = useState([]);

  // Dummy product list (replace with actual data fetching logic)
  useEffect(() => {
    // Simulated dummy data
    const dummyProducts = [
      { id: 1, name: "Product 1", price: 100 },
      { id: 2, name: "Product 2", price: 150 },
      { id: 3, name: "Product 3", price: 200 },
      { id: 4, name: "Product 4", price: 120 },
    ];
    setProducts(dummyProducts);
    
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, redirecting to login.");
      setHasToken(false);
    }
  }, []);

  if (!hasToken) {
    // Simulate redirection after 10 seconds using setTimeout
    setTimeout(() => {
      window.location.href = "/"; // Redirect to login page after 10 seconds
    }, 10000); // 10 seconds delay

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh", // Full viewport height
          color: "black",
          textAlign: "center",
        }}
      >
        <p>Sorry, you are not logged in or do not have admin access. Redirecting to login...</p>
        <Link
          to="/"
          style={{ color: "black", textDecoration: "none", marginTop: "10px" }}
        >
          Go to Login
        </Link>
      </div>
    );
  }

  // Function to handle adding a product
  const handleAddProduct = () => {
    console.log("Handle add product functionality");
    // Implement logic to add a new product
  };

  // Function to handle updating a product
  const handleUpdateProduct = () => {
    console.log("Handle update product functionality");
    // Implement logic to update an existing product
  };

  // Function to handle deleting a product
  const handleDeleteProduct = () => {
    console.log("Handle delete product functionality");
    // Implement logic to delete an existing product
  };

  return (
    <>
      <AdminLayout>
        <div className="container-fluid mt-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="text-black">Total Products: {products.length}</h4>
            <div>
              <button className="btn btn-primary me-3" onClick={handleAddProduct}>
                Add Product
              </button>
              <button className="btn btn-warning me-3" onClick={handleUpdateProduct}>
                Update Product
              </button>
              <button className="btn btn-danger" onClick={handleDeleteProduct}>
                Delete Product
              </button>
            </div>
          </div>
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title text-black">Product List</h5>
              <ul className="list-group">
                {products.map((product) => (
                  <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {product.name}
                    <span className="badge bg-primary rounded-pill">₹{product.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default ProductDashboard;
