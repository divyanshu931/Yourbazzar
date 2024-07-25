import React, { useState } from "react";
import axiosInstance from "../apis/axiosInstance";
import "./style.css";

const Editcategories = ({ category, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: category.name,
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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type (optional)
      if (!file.type.startsWith("image/")) {
        setErrorMessage("Please upload an image file.");
        return;
      }
      
      try {
        // Resize image to 270x396 pixels using canvas
        const resizedImageBlob = await resizeImage(file, 270, 396);
        // Create a new File object from the resized image blob
        const resizedImageFile = new File([resizedImageBlob], file.name, { type: 'image/png' }); // Convert to PNG for compatibility

        // Store the resized image file in formData
        setFormData({ ...formData, imageFile: resizedImageFile });

        // Clear any previous error messages
        setErrorMessage("");
      } catch (error) {
        console.error("Error resizing image:", error);
        setErrorMessage("Failed to resize image. Please try again.");
      }
    }
  };

  // Function to resize image using canvas
  const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions to fit within maxWidth and maxHeight
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            resolve(blob); // Resolve with the resized image blob
          },
          file.type, // Use original image type (e.g., 'image/jpeg', 'image/png')
          1 // Quality level (1 is the highest)
        );
      };

      img.onerror = (error) => {
        reject(error); // Reject if image loading fails
      };
    });
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

      const response = await axiosInstance.put(
        `/api/categories/update/${category._id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
          Image Upload (270x396 pixels, PNG format):
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

    </div>
  );
};

export default Editcategories;
