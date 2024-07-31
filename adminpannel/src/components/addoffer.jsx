import React, { useState } from "react";
import axiosInstance from "../apis/axiosInstance";
import { useNavigate } from "react-router-dom";
import AdminLayout from './layout/AdminLayout';


const AddOffer = ({ onAdd }) => {
  const initialFormData = {
    title: "",
    description: "",
    discount: "",
    expiryDate: "",
    imageFile: null, // Store the image file
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Initialize useNavigate hook
  const navigate = useNavigate();

  // Function to handle input changes including file input
  const handleChange = (e) => {
    if (e.target.name === "imageFile") {
      const file = e.target.files[0];
      // Check if a file is selected
      if (file) {
        const fileExtension = file.name.split(".").pop().toLowerCase();
        // Check if the selected file is either PNG or AVIF
        if (fileExtension === "png" || fileExtension === "avif") {
          setFormData({ ...formData, [e.target.name]: file });
          setErrorMessage(""); // Clear any previous error message
        } else {
          setFormData({ ...formData, imageFile: null });
          setErrorMessage("Please upload a PNG or AVIF image."); // Display error message for unsupported format
        }
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("discount", formData.discount);
      formDataToSend.append("expiryDate", formData.expiryDate);
      formDataToSend.append("image", formData.imageFile); // Append image file

      const response = await axiosInstance.post("/api/offers/create", formDataToSend);
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

  // Inline style for labels and file input
  const labelStyle = {
    color: "black",
  };

  const fileLabelStyle = {
    display: "inline-block",
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#f9f9f9",
    color: "grey", // Make the file name text grey
    cursor: "pointer",
    width: "100%",
    textAlign: "center",
    width: "250px", 
    marginTop: "8px",
    
  };

  const fileInputStyle = {
    display: "none", // Hide the default file input
  };

  return (
    <AdminLayout>
      <div className="main-container">
        <div className="add-offer-form">
          <h3 className="main-title">Add Offer</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label style={labelStyle}>Title:</label>
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
              <label style={labelStyle}>Description:</label>
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
              <label style={labelStyle}>Discount (%):</label>
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
              <label style={labelStyle}>Expiry Date:</label>
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
 
              <input
                id="imageFile"
                type="file"
                name="imageFile"
                onChange={handleChange}
                style={fileInputStyle}
                accept=".png,.avif"
                required
              />
              <label htmlFor="imageFile" style={fileLabelStyle}>
                {formData.imageFile ? formData.imageFile.name : "Choose file"}
              </label>
            </div>

            <div className="form-buttons">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Adding..." : "Add"}
              </button>
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={() => navigate(-1)} // Navigate back
              >
                Back
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
