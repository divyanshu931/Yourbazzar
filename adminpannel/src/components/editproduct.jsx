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
    image: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(), // Convert price to string for display
        category: product.category,
        bestProduct: product.bestProduct || false,
        image: product.image || "",
      });
    }
    
    // Fetch categories from backend
    axiosInstance.get("/api/categories/")
      .then(response => {
        setCategories(response.data); // Assuming response.data is an array of category objects
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id } = product;
      const updatedProduct = {
        ...formData,
        price: Number(formData.price), // Convert price from string to number
      };
      await axiosInstance.patch(`/api/products/${_id}`, updatedProduct);
      onSave(); // Notify the parent component to refresh the product list
      onClose(); // Close the form
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="edit-product-form">
      <button className="close-btn" onClick={onClose}>×</button>
      <h3 className="main-title">Edit Product</h3>
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
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditProduct;
