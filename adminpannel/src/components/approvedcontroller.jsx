import React, { useState, useEffect } from "react";
import axiosInstance from "../apis/axiosInstance";
import "./style.css"; // Import your CSS file

const ApprovedControl = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetchUnapprovedProducts();
  }, []);

  const fetchUnapprovedProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/products/products/unapproved");
      setProducts(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching unapproved products:", error);
      setError("Failed to fetch unapproved products. Please try again later.");
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      if (window.confirm("Are you sure you want to delete this product?")) {
        setLoading(true);
        await axiosInstance.delete(`/api/products/products/${productId}`);
        setProducts(products.filter((product) => product._id !== productId));
        setLoading(false);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product. Please try again.");
      setLoading(false);
    }
  };

  const handleToggleApproval = async (productId) => {
    try {
      setLoading(true);
      await axiosInstance.patch(`/api/products/products/approve/${productId}`);
      const updatedProducts = products.map((product) => {
        if (product._id === productId) {
          return { ...product, approved: !product.approved };
        }
        return product;
      });
      setProducts(updatedProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error toggling approval:", error);
      setError("Failed to toggle approval status. Please try again.");
      setLoading(false);
    }
  };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setSelectedImage("");
    setImageModalOpen(false);
  };

  return (
    <div className="main-container">
      <h2 className="main-title">Unapproved Products</h2>
      {loading && <div className="loading-container">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {imageModalOpen && (
        <div className="image-modal">
          <div className="image-modal-content">
            <span className="close" onClick={closeImageModal}>&times;</span>
            <img src={`${axiosInstance.defaults.baseURL}/${selectedImage}`} alt="Product Image" className="modal-image" />
          </div>
        </div>
      )}
      <table className="category-table">
        <thead>
          <tr className="table-header">
            <th>S.No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <button className="view-image-btn" onClick={() => openImageModal(product.image)}>
                  View
                </button>
              </td>
              <td>
                <button onClick={() => handleToggleApproval(product._id)}>
                  {product.approved ? "Unapprove" : "Approve"}
                </button>
                <button onClick={() => handleDelete(product._id) } >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedControl;
