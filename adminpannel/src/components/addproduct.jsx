import React, { useState, useEffect } from "react";
import axiosInstance from "../apis/axiosInstance";
import AdminLayout from "./layout/AdminLayout";
import Cookies from 'universal-cookie';

const cookies = new Cookies(); // Initialize universal cookies

function AddProductForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    mrp: 0,
    category: "",
    bestProduct: false,
    imageFile: null,
    approved: false,
    sellerName: "",
    discount: 0,
    sellerId: "", // Initialize sellerId state
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/api/categories/");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setFetchError("Failed to fetch categories. Please try again.");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch userId (assuming it's the same as sellerId in your context) from cookies
    const userId = cookies.get("userId");
    if (userId) {
      setFormData({ ...formData, sellerId: userId });
    }
  }, []); // Empty dependency array to run only once after initial render

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, imageFile: e.target.files[0] });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    } else if (e.target.type === "checkbox") {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const validateImageDimensions = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        if (img.width === 270 && img.height === 270) {
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
        setErrorMessage("Please upload an image with dimensions 270x270 pixels.");
        return;
      }
  
      const formDataForUpload = new FormData();
      formDataForUpload.append("name", formData.name);
      formDataForUpload.append("description", formData.description);
      formDataForUpload.append("price", Number(formData.price));
      formDataForUpload.append("mrp", Number(formData.mrp));
      formDataForUpload.append("category", formData.category);
      formDataForUpload.append("bestProduct", formData.bestProduct);
      formDataForUpload.append("image", formData.imageFile);
      formDataForUpload.append("sellerName", formData.sellerName);
      formDataForUpload.append("discount", Number(formData.discount));
      formDataForUpload.append("sellerId", formData.sellerId); // Ensure sellerId is included
  
      // Read userRole from cookies
      const userRole = cookies.get("userRole");
  
      // Set approved based on userRole (assuming "admin" grants approval)
      const approved = userRole === "admin";
      formDataForUpload.append("approved", approved);
  
      const response = await axiosInstance.post("/api/products/products", formDataForUpload, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
  
      setLoading(false);
      if (response.status === 201) {
        setErrorMessage("");
        setSuccessMessage("Product successfully added!");
        if (typeof onSuccess === "function") {
          onSuccess();
        }
      } else {
        setErrorMessage("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        setErrorMessage(error.response.data.message || "Failed to add product. Please try again.");
      } else {
        setErrorMessage("Failed to add product. Please try again.");
      }
      setLoading(false);
    }
  };
  
  
  return (
    <AdminLayout>
      <div className="main-container">
        <h2 className="main-title">Add Product</h2>

        <div className="add-product-form-container">
          <form className="add-product-form" onSubmit={handleAddSubmit}>
            {/* Input fields for adding a product */}
            <label style={{ color: "black" }}>Product Name</label>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
              maxLength={100}
            />

            <label style={{ color: "black" }}>Description</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="form-input"
              required
              maxLength={1000}
            />

            <label style={{ color: "black" }}>Price</label>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="form-input"
              required
              min="0"
            />

            <label style={{ color: "black" }}>MRP</label>
            <input
              type="number"
              name="mrp"
              placeholder="MRP"
              value={formData.mrp}
              onChange={handleChange}
              className="form-input"
              required
              min="0"
            />

            <label style={{ color: "black" }}>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            <label style={{ color: "black" }}>Choose photo</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="form-input"
              accept="image/png, image/avif" // Accept PNG and AVIF formats
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

            <label style={{ color: "black" }}>Seller Name</label>
            <input
              type="text"
              name="sellerName"
              placeholder="Seller Name"
              value={formData.sellerName}
              onChange={handleChange}
              className="form-input"
              required
            />

            <label style={{ color: "black" }}>Discount (%)</label>
            <input
              type="number"
              name="discount"
              placeholder="Discount"
              value={formData.discount}
              onChange={handleChange}
              className="form-input"
              min="0"
            />

            <div className="form-checkbox">
              <input
                type="checkbox"
                name="bestProduct"
                checked={formData.bestProduct}
                onChange={handleChange}
                style={{ marginRight: "5px" }}
              />
              <label style={{ color: "black" }}>Best Product</label>
            </div>

            <div className="form-buttons">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Adding..." : "Add"}
              </button>
            </div>

            {fetchError && <p className="error-message" style={{ color: "red" }}>{fetchError}</p>}
            {errorMessage && <p className="error-message" style={{ color: "red" }}>{errorMessage}</p>}
            {successMessage && <p className="success-message" style={{ color: "green" }}>{successMessage}</p>}

            <p className="note" style={{ color: "gray", fontSize: "12px" }}>
              Note: Upload the image file 500 by 500 (PNG or AVIF) for the product. Maximum file size is 3MB.
            </p>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddProductForm;
