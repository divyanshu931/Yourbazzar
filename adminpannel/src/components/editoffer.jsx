import React, { useState } from "react";
import axiosInstance from "../apis/axiosInstance";
import "./style.css";

const EditOffer = ({ offer, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: offer.title,
    description: offer.description,
    discount: offer.discount,
    expiryDate: offer.expiryDate,
    imageUrl: offer.imageUrl,
    imageFile: null, // New state to handle file upload
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "imageFile") {
      const file = e.target.files[0];
      // Validate file type and dimensions
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const img = new Image();
          img.onload = function () {
            if (img.width === 720 && img.height === 418) {
              setFormData({ ...formData, imageUrl: event.target.result, imageFile: file });
              setErrorMessage("");
            } else {
              setFormData({ ...formData, imageUrl: null, imageFile: null });
              setErrorMessage("Image must be exactly 720x418 pixels.");
            }
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id } = offer; // Assuming offer has _id field

      // Validate expiry date
      const currentTimestamp = Date.now();
      const selectedDate = new Date(formData.expiryDate).getTime();

      if (selectedDate <= currentTimestamp) {
        setErrorMessage("Expiry date must be in the future.");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("discount", formData.discount);
      formDataToSend.append("expiryDate", formData.expiryDate);
      formDataToSend.append("image", formData.imageFile);

      await axiosInstance.put(`/api/offers/update/${_id}`, formDataToSend);
      setSuccessMessage("Offer Updated Successfully");
      onSave(); // Notify the parent component to refresh the offer list or take other actions
      onClose(); // Close the form

      // Clear success and error messages after 2 seconds
      setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 2000);
    } catch (error) {
      console.error("Error updating offer:", error);
    }
  };

  return (
    <div className="edit-product-form">
      <button className="close-btn" onClick={onClose}>
        ×
      </button>
      <h3 className="main-title">Edit Offer</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
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
          Discount (%):
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Expiry Date:
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image (PNG or AVIF format, 720x418 pixels):
          <input
            type="file"
            name="imageFile"
            onChange={handleChange}
            accept=".png,.avif"
          />
        </label>
        <div className="form-buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>

      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
        </div>
      )}
    </div>
  );
};

export default EditOffer;
