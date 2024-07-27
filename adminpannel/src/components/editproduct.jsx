import React, { useState, useEffect } from "react";
import axiosInstance from "../apis/axiosInstance";
import "./style.css";

const EditProduct = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    bestProduct: false,
    mrp: 0, // Initialize as 0 if it's supposed to be a number
    discount: 0, // Initialize as 0 if it's supposed to be a number
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        bestProduct: product.bestProduct || false,
        mrp: product.mrp || 0, // Ensure it defaults to 0 if undefined
        discount: product.discount || 0, // Ensure it defaults to 0 if undefined
      });
    }
    fetchCategories();
  }, [product]);

  const fetchCategories = () => {
    setLoading(true);
    axiosInstance.get("/api/categories/")
      .then(response => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories. Please try again later.");
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id } = product;
      const formDataToSend = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        bestProduct: formData.bestProduct,
        mrp: formData.mrp, // Already a number
        discount: formData.discount, // Already a number
      };

      setLoading(true);

      const response = await axiosInstance.put(`/api/products/products/${_id}`, formDataToSend);

      setLoading(false);
      onSave();
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="edit-product-form">
      <button className="close-btn" onClick={onClose}>×</button>
      <h3 className="main-title">Edit Product</h3>
      <p style={{ fontStyle: "italic", color: "black" }}>
        Note: Product photo cannot be directly updated. If you need to change the photo, please delete the product and re-upload it with the new photo. Ensure the photo size meets the specified requirements.
      </p>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading-container">Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Product Name:
            <input
              type="text"
              name="name"
              value={formData.name}
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
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            MRP:
            <input
              type="number"
              name="mrp"
              value={formData.mrp}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Discount:
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Category:
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Best Product:
            <input
              type="checkbox"
              name="bestProduct"
              checked={formData.bestProduct}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default EditProduct;
