import React, { useState } from "react";
import axiosInstance from "../apis/axiosInstance";
import "./style.css";

const Editcategories = ({ category, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: category.name,
    description: category.description,
    image: category.image,
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
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrorMessage("Please upload an image file.");
        return;
      }
      // Validate image dimensions
      const img = new Image();
      img.onload = () => {
        if (img.width === 312 && img.height === 360) {
          setErrorMessage(""); // Clear error message if dimensions are correct
          resizeImage(file); // Resize the image if dimensions are correct
        } else {
          setErrorMessage("Please upload an image with dimensions 312x360 pixels.");
        }
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const resizeImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 312;
        canvas.height = 360;
        ctx.drawImage(img, 0, 0, 312, 360);
        const resizedImageDataUrl = canvas.toDataURL("image/jpeg"); // You can change format if needed
        setFormData({ ...formData, image: resizedImageDataUrl });
      };
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id } = category; // Assuming category has _id field
      const formDataToSend = new FormData();
      formDataToSend.append('description', formData.description);
      
      // Check if formData.image is a Blob (indicating it's an image file)
      if (formData.image instanceof Blob) {
        formDataToSend.append('image', formData.image, 'category_image.jpg');
      }
      
      const response = await axiosInstance.put(`/api/categories/update/${_id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      setSuccessMessage("Updated"); // Set success message
      onSave(); // Notify the parent component to refresh the category list
      onClose(); // Close the form
  
      // Clear success message after 1 second
      setTimeout(() => {
        setSuccessMessage("");
      }, 1000);
    } catch (error) {
      console.error("Error updating category:", error);
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
          Image Upload (312x360 pixels):
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </label>
        {formData.image && (
          <img
            src={formData.image}
            alt="Selected Category"
            className="selected-image-preview"
          />
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
