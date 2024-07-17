import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../componentsAdmin/layout/AdminLayout";

function AdminProduct() {
  const [hasToken, setHasToken] = useState(true);
  const [products, setProducts] = useState([]);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    bestProduct: false,
    image: ""
  });
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const dummyProducts = [
      { id: 1, name: "Product 1", price: 100, category: "Electronics" },
      { id: 2, name: "Product 2", price: 150, category: "Clothing" },
      { id: 3, name: "Product 3", price: 200, category: "Home" },
      { id: 4, name: "Product 4", price: 120, category: "Books" },
    ];
    setProducts(dummyProducts);
    
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, redirecting to login.");
      setHasToken(false);
    }
  }, []);

  useEffect(() => {
    if (!hasToken) {
      const redirectTimer = setTimeout(() => {
        window.location.href = "/"; // Redirect to login page
      }, 10000); // 10 seconds delay

      return () => clearTimeout(redirectTimer);
    }
  }, [hasToken]);

  const containerStyle = {
    margin: "20px auto",
    maxWidth: "800px",
    padding: "20px",
    color: "black",
  };

  const errorMessageStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh",
    textAlign: "center",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    padding: "20px",
    borderRadius: "5px",
  };

  const successMessageStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh",
    textAlign: "center",
    backgroundColor: "#d4edda",
    color: "#155724",
    padding: "20px",
    borderRadius: "5px",
  };

  const productListStyle = {
    marginTop: "20px",
    listStyleType: "none",
    padding: "0",
  };

  const productItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    marginBottom: "5px",
    backgroundColor: "#f8f9fa",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const productNameStyle = {
    fontWeight: "bold",
  };

  const productPriceStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "10px",
  };

  const buttonStyle = {
    padding: "8px 16px",
    marginRight: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    color: "#000",
  };

  const addButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#28a745",
  };

  const updateButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#ffc107",
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#dc3545",
  };

  const handleShowAddProductForm = () => {
    setShowAddProductForm(true);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleHideAddProductForm = () => {
    setShowAddProductForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      const data = await response.json();
      console.log('Product added:', data);
      setProducts([...products, data.data]);
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        category: "",
        bestProduct: false,
        image: ""
      });
      setShowAddProductForm(false);
      setSuccessMessage("Product added successfully!");
    } catch (error) {
      console.error('Error adding product:', error.message);
      setErrorMessage("Failed to add product. Please try again.");
    }
  };

  const handleUpdateProduct = async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      const updatedProduct = await response.json();
      console.log('Product updated:', updatedProduct);
      const updatedProducts = products.map(product =>
        product.id === productId ? updatedProduct.data : product
      );
      setProducts(updatedProducts);
      setSuccessMessage("Product updated successfully!");
    } catch (error) {
      console.error('Error updating product:', error.message);
      setErrorMessage("Failed to update product. Please try again.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      console.log('Product deleted:', productId);
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
      setShowDeleteConfirmation(false); // Hide confirmation after delete
      setSuccessMessage("Product deleted successfully!");
    } catch (error) {
      console.error('Error deleting product:', error.message);
      setErrorMessage("Failed to delete product. Please try again.");
    }
  };

  const handleShowDeleteConfirmation = (productId) => {
    setShowDeleteConfirmation(true);
    setProductToDelete(productId);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setProductToDelete(null);
  };

  return (
    <>
      <AdminLayout>
        <div style={containerStyle}>
          {!hasToken ? (
            <div style={errorMessageStyle}>
              <p>Sorry, you are not logged in or do not have admin access. Redirecting to login...</p>
              <Link to="/" style={{ color: "#721c24", textDecoration: "none", marginTop: "10px", fontWeight: "bold" }}>
                Go to Login
              </Link>
            </div>
          ) : (
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title mb-4">Product List</h5>
                {successMessage && (
                  <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div>
                )}
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6>Total Products: {products.length}</h6>
                  <div>
                    <button style={addButtonStyle} onClick={handleShowAddProductForm}>
                      Add Product
                    </button>
                  </div>
                </div>
                <ul style={productListStyle}>
                  {products.map((product) => (
                    <li key={product.id} style={productItemStyle}>
                      <span style={productNameStyle}>{product.name}</span>
                      <span style={productPriceStyle}>₹{product.price}</span>
                      <div>
                        <button style={updateButtonStyle} onClick={() => handleUpdateProduct(product.id)}>
                          Update
                        </button>
                        <button style={deleteButtonStyle} onClick={() => handleShowDeleteConfirmation(product.id)}>
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {showAddProductForm && (
            <div className="card shadow mt-4">
              <div className="card-body">
                <h5 className="card-title mb-4">Add Product</h5>
                {successMessage && (
                  <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div>
                )}
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}
                <form onSubmit={handleAddProduct}>
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={newProduct.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      value={newProduct.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      value={newProduct.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select
                      className="form-control"
                      id="category"
                      name="category"
                      value={newProduct.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Home">Home</option>
                      <option value="Books">Books</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        name="bestProduct"
                        checked={newProduct.bestProduct}
                        onChange={(e) => setNewProduct({ ...newProduct, bestProduct: e.target.checked })}
                      />
                      &nbsp;Best Product
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Image URL:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="image"
                      name="image"
                      value={newProduct.image}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mr-2">
                    Add
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={handleHideAddProductForm}>
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}
          {showDeleteConfirmation && (
            <div className="card shadow mt-4">
              <div className="card-body">
                <h5 className="card-title mb-4">Confirm Deletion</h5>
                <p>Are you sure you want to delete this product?</p>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-danger mr-2" onClick={() => handleDeleteProduct(productToDelete)}>
                    Yes
                  </button>
                  <button className="btn btn-secondary" onClick={handleCancelDelete}>
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
}

export default AdminProduct;
