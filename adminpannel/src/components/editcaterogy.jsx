import React, { useState } from "react";
import axiosInstance from "../apis/axiosInstance";
import "./style.css";

const Editcategories = ({ category, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: category.name,
    description: category.description,
    imageFile: null, // Store the image file to be uploaded
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    // Prevent changes to the name field
    if (e.target.name === "name") {
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type (optional)
      if (!file.type.startsWith("image/")) {
        setErrorMessage("Please upload an image file.");
        return;
      }
      // Validate image dimensions (optional)
      const img = new Image();
      img.onload = () => {
        const { width, height } = img;
        if (width === 300 && height === 400) {
          setErrorMessage(""); // Clear error message if dimensions are correct
          setFormData({ ...formData, imageFile: file }); // Store the selected image file
        } else {
          setErrorMessage("Please upload an image with dimensions 300x400 pixels.");
        }
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("description", formData.description);
      
      // Append image file to FormData if it exists
      if (formData.imageFile) {
        formDataToSend.append("image", formData.imageFile);
      }

      const response = await axiosInstance.put(`/api/categories/update/${category._id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccessMessage("Updated"); // Set success message
      onSave(); // Notify parent component to refresh category list
      onClose(); // Close the form

      // Clear success message after 1 second
      setTimeout(() => {
        setSuccessMessage("");
      }, 1000);
    } catch (error) {
      console.error("Error updating category:", error);
      setErrorMessage("Failed to update category. Please try again.");
    }
  };

  return (
    <div className="edit-product-form">
      <button className="close-btn" onClick={onClose}>
        ×
      </button>
      <h3 className="main-title">Edit Category</h3>
      <p className="point-to-notice">
        Note: You cannot change the category name.
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled // Disable editing of the name field
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image Upload (300x400 pixels):
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </label>
        {formData.imageFile && (
          <div className="image-preview-container">
            <img
              src={URL.createObjectURL(formData.imageFile)}
              alt="Selected Category"
              className="selected-image-preview"
            />
          </div>
        )}
        <div className="form-buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>

      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}
      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Editcategories;
