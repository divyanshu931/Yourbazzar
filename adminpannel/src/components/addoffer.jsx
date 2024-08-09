import React, { useState, useEffect } from "react";
import axiosInstance from "../apis/axiosInstance";
import AdminLayout from "./layout/AdminLayout";
import Cookies from 'universal-cookie';

const cookies = new Cookies(); // Initialize universal cookies

const AddOffer = ({ onAdd }) => {
  const initialFormData = {
    title: "",
    description: "",
    discount: 0,
    expiryDate: "",
    imageFile: null,
    sellerId: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userIdFromCookies = cookies.get("userId");
    if (userIdFromCookies) {
      setUserId(userIdFromCookies);
      setFormData((prevData) => ({ ...prevData, sellerId: userIdFromCookies }));
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setFormData({ ...formData, imageFile: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const validateImageDimensions = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        if (img.width === 826 && img.height === 826) {
          resolve(true);
        } else {
          resolve(false);
        }
      };
      img.onerror = () => {
        reject("Failed to load image for dimension check.");
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Validate image dimensions
      const isValidDimensions = await validateImageDimensions(formData.imageFile);
      if (!isValidDimensions) {
        setLoading(false);
        setErrorMessage("Please upload an image with dimensions 826x826 pixels.");
        return;
      }

      const formDataForUpload = new FormData();
      formDataForUpload.append("title", formData.title);
      formDataForUpload.append("description", formData.description);
      formDataForUpload.append("discount", Number(formData.discount));
      formDataForUpload.append("expiryDate", formData.expiryDate);
      formDataForUpload.append("image", formData.imageFile);
      formDataForUpload.append("sellerId", formData.sellerId);

      const response = await axiosInstance.post("/api/offers/create", formDataForUpload, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setLoading(false);
      if (response.status === 201) {
        setErrorMessage("");
        setSuccessMessage("Offer successfully added!");
        if (typeof onAdd === "function") {
          onAdd();
        }
      } else {
        setErrorMessage("Failed to add offer. Please try again.");
      }
    } catch (error) {
      console.error("Error adding offer:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        setErrorMessage(error.response.data.message || "Failed to add offer. Please try again.");
      } else {
        setErrorMessage("Failed to add offer. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="main-container">
        <h2 className="main-title">Add Offer</h2>

        <div className="add-offer-form-container">
          <form className="add-offer-form" onSubmit={handleAddSubmit}>
            {/* Input fields for adding an offer */}
            <label style={{ color: "black" }}>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Offer Title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              required
              maxLength={100}
            />

            <label style={{ color: "black" }}>Description</label>
            <textarea
              name="description"
              placeholder="Offer Description"
              value={formData.description}
              onChange={handleChange}
              className="form-input"
              required
              maxLength={1000}
            />

            <label style={{ color: "black" }}>Discount (%)</label>
            <input
              type="number"
              name="discount"
              placeholder="Discount Percentage"
              value={formData.discount}
              onChange={handleChange}
              className="form-input"
              required
              min="0"
            />

            <label style={{ color: "black" }}>Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="form-input"
              required
            />

            <label style={{ color: "black" }}>Choose Image</label>
            <input
              type="file"
              name="imageFile"
              onChange={handleChange}
              className="form-input"
              accept="image/png, image/avif" // Accept PNG and AVIF formats
              required
            />
            {imagePreview && (
              <div className="image-preview">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="preview-image"
                  style={{ maxWidth: "500px", maxHeight: "500px", width: "auto", height: "auto" }}
                />
              </div>
            )}

            <div className="form-buttons">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Adding..." : "Add Offer"}
              </button>
            </div>

            {errorMessage && <p className="error-message" style={{ color: "red" }}>{errorMessage}</p>}
            {successMessage && <p className="success-message" style={{ color: "green" }}>{successMessage}</p>}

            <p className="note" style={{ color: "gray", fontSize: "12px" }}>
              Note: Upload an image file 826 by 826 pixels (PNG or AVIF) for the offer. Maximum file size is 3MB.
            </p>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddOffer;
