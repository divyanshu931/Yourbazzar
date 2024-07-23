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
    category: "",
    bestProduct: false,
    imageFile: null,
    approved: false // Initialize approved field
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

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formDataForUpload = new FormData();
      formDataForUpload.append("name", formData.name);
      formDataForUpload.append("description", formData.description);
      formDataForUpload.append("price", Number(formData.price));
      formDataForUpload.append("category", formData.category);
      formDataForUpload.append("bestProduct", formData.bestProduct);
      formDataForUpload.append("image", formData.imageFile);

      // Read userRole from cookies
      const userRole = cookies.get("userRole");

      // Set approved based on userRole (assuming "Admin" grants approval)
      const approved = userRole === "Admin";
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
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="form-input"
              required
            />
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
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="form-input"
              accept="image/png, image/jpeg"
            />
            {imagePreview && (
              <div className="image-preview">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="preview-image"
                  style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto" }}
                />
              </div>
            )}
            <div className="form-checkbox">
              <input
                type="checkbox"
                name="bestProduct"
                checked={formData.bestProduct}
                onChange={handleChange}
                style={{ marginRight: "5px", color: "black" }}
              />
              <label htmlFor="bestProduct" style={{ color: "black" }}>Best Product</label>
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
              Note: Upload the image file (PNG or JPEG) for the product. Maximum file size is 3MB.
            </p>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddProductForm;
