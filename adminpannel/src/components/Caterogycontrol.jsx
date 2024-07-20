import React, { useState, useEffect } from "react";
import axiosInstance from "../apis/axiosInstance";

import "./style.css"; // Import your CSS file

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [addFormOpen, setAddFormOpen] = useState(false); // State to manage visibility of Add Category form
  const [categoryToEdit, setCategoryToEdit] = useState(null); // State to hold category to edit
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false); // State to manage visibility of Add Category form

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/categories"); // Fetch categories from the API
      console.log("Data received from API:", response.data);
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/api/categories/${categoryId}`); // Delete category from the API
      setCategories(categories.filter((category) => category._id !== categoryId));
      setLoading(false);
      setSuccessMessage("Category deleted successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error deleting category:", error);
      setErrorMessage("Failed to delete category. Please try again.");
      setLoading(false);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const handleEdit = (categoryId) => {
    const category = categories.find((category) => category._id === categoryId);
    setCategoryToEdit(category);
    setAddFormOpen(true);
  };

  const handleCloseEditForm = () => {
    setAddFormOpen(false);
    setCategoryToEdit(null);
  };

  const handleAddCategory = () => {
    setShowAddCategoryForm(true);
  };

  const handleCloseAddCategoryForm = () => {
    setShowAddCategoryForm(false);
  };

  return (
    <div className="main-container">
      <h2 className="main-title">Category Control</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {/* Button to open Add Category Form */}
      <button className="button" onClick={handleAddCategory}>
        Add Category
      </button>


      {/* Category List in Table Format */}
      <table className="category-table">
        <thead>
          <tr className="table-header">
            <th>S.No</th>
            <th>Category Name</th>
            <th>Description</th>
            <th>Photo URL</th>
            <th>Update</th>
            <th>Delete</th>
            <th>Creation Time</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7">Loading...</td>
            </tr>
          ) : (
            categories.map((category, index) => (
              <tr key={category._id}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>{category.image}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(category._id)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(category._id)}>
                    Delete
                  </button>
                </td>
                <td>{new Date(category.createdAt).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      
    </div>
  );
}

export default Category;
