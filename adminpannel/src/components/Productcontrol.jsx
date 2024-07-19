import React, { useState, useEffect } from "react";
import axiosInstance from "../apis/axiosInstance";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

import "./style.css"; // Import your CSS file

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [addFormOpen, setAddFormOpen] = useState(false); // State to manage visibility of Add Product form

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/public/all");
      console.log("Data received from API:", response.data);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };





  const handleDelete = async (productId) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/api/products/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
      setLoading(false);
      setSuccessMessage("Product deleted successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error deleting product:", error);
      setErrorMessage("Failed to delete product. Please try again.");
      setLoading(false);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div className="main-container">
      <h2 className="main-title">Product Control</h2>
      
      {/* Link to Add Product Form */}
      <Link to="/product/add" className="button">
        Add Product
      </Link>

     
   

      {/* Product List */}
      <div className="product-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          products.map((product) => (
            <div className="product-item" key={product._id}>
              <p className="product-name">{product.name}</p>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <p className="product-category">{product.category}</p>
              <div className="product-actions">
                <button className="delete-btn" onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
                {/* You can add an edit button here if needed */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Product;
