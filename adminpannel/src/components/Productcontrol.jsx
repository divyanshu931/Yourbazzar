import React, { useState, useEffect } from "react";
import axiosInstance from "../apis/axiosInstance";
import { Link } from "react-router-dom";
import EditProduct from "./editproduct";
import "./style.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [userRole, setUserRole] = useState(""); // State to store user role

  useEffect(() => {
    const role = cookies.get("userRole"); // Fetch user role from cookies
    setUserRole(role);
    fetchProducts(role); // Fetch products based on user role
  }, []);

  const fetchProducts = async (role) => {
    try {
      setLoading(true);
      let response;
      if (role === "Admin") {
        response = await axiosInstance.get("/api/products/all");
      } else if (role === "Seller") {
        response = await axiosInstance.get("/api/products/seller");
      } else {
        throw new Error("Unauthorized access"); // Handle unauthorized access if needed
      }
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
      setErrorMessage("Failed to fetch products. Please try again.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const handleDelete = async (productId) => {
    try {
      if (window.confirm("Are you sure you want to delete this product?")) {
        setLoading(true);
        await axiosInstance.delete(`/api/products/${productId}`);
        setProducts(products.filter((product) => product._id !== productId));
        setLoading(false);
        setSuccessMessage("Product deleted successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setErrorMessage("Failed to delete product. Please try again.");
      setLoading(false);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const handleEdit = (productId) => {
    const product = products.find((product) => product._id === productId);
    setProductToEdit(product);
    setAddFormOpen(true);
  };

  const handleCloseEditForm = () => {
    setAddFormOpen(false);
    setProductToEdit(null);
  };

  const handleSave = () => {
    fetchProducts(userRole); // Refresh the product list based on user role
  };

  return (
    <div className="main-container">
      <h2 className="main-title">Product Control</h2>

      <Link to="/product/add" className="button">
        Add Product
      </Link>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {addFormOpen && productToEdit && (
        <EditProduct
          product={productToEdit}
          onClose={handleCloseEditForm}
          onSave={handleSave}
        />
      )}
      <table className="category-table">
        <thead>
          <tr className="table-header">
            <th>S.No</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Update</th>
            <th>Delete</th>
            <th>Creation Time</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8">Loading...</td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.category}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(product._id)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(product._id)}>
                    Delete
                  </button>
                </td>
                <td>{new Date(product.createdAt).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Product;
