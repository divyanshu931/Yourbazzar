import React, { useState, useEffect } from "react";
import axiosInstance from "../apis/axiosInstance";
import AdminLayout from "./layout/AdminLayout";

function AddProductForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    bestProduct: false,
    image: ""
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    // Fetch categories when component mounts
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

  // Function to handle input changes
  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Function to handle form submission
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/products/add", {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price), // Ensure price is sent as a number
        category: formData.category,
        bestProduct: formData.bestProduct,
        image: formData.image
      });
      setLoading(false);
      if (response.status === 201) {
        setErrorMessage(""); // Clear any previous error message
        setSuccessMessage("Product successfully added!"); // Set success message
        if (typeof onSuccess === "function") {
          onSuccess(); // Notify parent component (ProductControl) of success
        }
      } else {
        setErrorMessage("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      if (error.response) {
        console.error("Response data:", error.response.data); // Log detailed response data
        setErrorMessage(error.response.data.message || "Failed to add product. Please try again.");
      } else {
        setErrorMessage("Failed to add product. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
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
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="form-input"
            required
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
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="form-input"
          />
          <div className="form-checkbox">
            <input
              type="checkbox"
              name="bestProduct"
              checked={formData.bestProduct}
              onChange={handleChange}
              style={{ marginRight: "5px", color: "black" }} // Inline style for checkbox text color
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
        </form>
      </div>
    </AdminLayout>
  );
}

export default AddProductForm;
