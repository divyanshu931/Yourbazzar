import React, { useState, useEffect } from "react";
import axiosInstance from "../apis/axiosInstance";
import "./style.css"; // Import your CSS file

function Product() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    bestProduct: false,
    image: ""
  });
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null); // Track the ID of the product being edited

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/public/all");
      console.log("Data received from API:", response.data);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingProductId) {
        // Update existing product
        await axiosInstance.put(`/api/products/${editingProductId}`, formData);
        // Assuming your backend updates the product and returns the updated data
        const updatedProduct = { ...formData, _id: editingProductId };
        setProducts(products.map(product => (product._id === editingProductId ? updatedProduct : product)));
      } else {
        // Add new product
        await axiosInstance.post("/api/products", formData);
        // After adding, fetch the updated list of products
        fetchProducts();
      }
      setFormData({
        name: "",
        description: "",
        price: 0,
        category: "",
        bestProduct: false,
        image: ""
      });
      setLoading(false);
      setAddFormOpen(false);
      setEditingProductId(null); // Reset editing state
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/api/products/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
      setLoading(false);
    } catch (error) {
      console.error("Error deleting product:", error);
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      bestProduct: product.bestProduct,
      image: product.image
    });
    setAddFormOpen(true);
    setEditingProductId(product._id);
  };

  return (
    <div className="main-container">
      <h2 className="main-title">Product Control</h2>
      <button className="button" onClick={() => setAddFormOpen(true)}>Add Product</button>

      
      {addFormOpen && (
        <div className="add-product-form-container">
          <form className="add-product-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="form-input"
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-input"
            >
              <option value="dairy">Dairy</option>
              <option value="Electronics">Electronics</option>
              <option value="Cold drinks">Cold Drinks</option>
              {/* Add more categories as needed */}
            </select>
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="form-input"
            />
            <div className="form-buttons">
              <button type="button" className="submit-btn" onClick={() => { setAddFormOpen(false); setEditingProductId(null); }}>
                Close
              </button>
              <button type="button" className="submit-btn">
                {editingProductId ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <div className="product-item" key={product._id}>
              <p className="product-name">{product.name}</p>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <p className="product-category">{product.category}</p>
              <div className="product-actions">
                <button className="delete-btn" onClick={() => handleDelete(product._id)}>Delete</button>
                <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Product;
