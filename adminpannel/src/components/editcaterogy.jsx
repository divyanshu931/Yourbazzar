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

  const handleChange = (e) => {
    // Prevent changes to the name field
    if (e.target.name === "name") {
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id } = category; // Assuming category has _id field
      const updatedCategory = {
        description: formData.description,
        image: formData.image,
      };
      await axiosInstance.put(`/api/categories/update/${_id}`, updatedCategory);
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
          Image URL:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </label>
        <div className="form-buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>

      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Editcategories;
