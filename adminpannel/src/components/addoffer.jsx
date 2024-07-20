import React, { useState } from "react";
import axiosInstance from "../apis/axiosInstance";
import "./style.css";
import AdminLayout from "./layout/AdminLayout";

const AddOffer = ({ onClose, onAdd }) => {
  const initialFormData = {
    title: "",
    description: "",
    discount: "",
    expiryDate: "",
    imageUrl: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/offers/create", formData);
      setLoading(false);
      if (response.status === 201) {
        setErrorMessage(""); // Clear any previous error message
        setSuccessMessage("Offer successfully added!"); // Set success message
        if (typeof onAdd === "function") {
          onAdd(); // Notify parent component of success
        }
      } else {
        setErrorMessage("Failed to add offer. Please try again.");
      }
    } catch (error) {
      console.error("Error adding offer:", error);
      if (error.response) {
        console.error("Response data:", error.response.data); // Log detailed response data
        setErrorMessage(
          error.response.data.message ||
            "Failed to add offer. Please try again."
        );
      } else {
        setErrorMessage("Failed to add offer. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
     <div className="main-container">
    
      <div className="add-offer-form">
      <h3 className="main-title">Add Offer</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              required
              placeholder="Enter title"
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input"
              required
              placeholder="Enter description"
            />
          </div>
          <div className="form-group">
            <label>Discount (%):</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className="form-input"
              required
              placeholder="Enter discount"
            />
          </div>
          <div className="form-group">
            <label>Expiry Date:</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label>Image URL:</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="form-input"
              required
              placeholder="Enter image URL"
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
</AdminLayout> 
);
};

export default AddOffer;
