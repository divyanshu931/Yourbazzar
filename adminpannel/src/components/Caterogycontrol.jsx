import React, { useState, useEffect } from "react";
import axiosInstance from "../apis/axiosInstance";
import { Link } from "react-router-dom";
import EditCategory from "./editcaterogy"; // Import the EditCategory component
import "./style.css"; // Import your CSS file

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [addFormOpen, setAddFormOpen] = useState(false); // State to manage visibility of Edit Category form
  const [categoryToEdit, setCategoryToEdit] = useState(null); // State to hold category to edit

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/categories");
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      if (window.confirm("Are you sure you want to delete this category?")) {
        setLoading(true);
        await axiosInstance.delete(`/api/categories/delete/${categoryId}`);
        setCategories(categories.filter((category) => category._id !== categoryId));
        setLoading(false);
        setSuccessMessage("Category deleted successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
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

  const handleSave = () => {
    fetchCategories(); // Refresh the category list
  };

  return (
    <div className="main-container">
      <h2 className="main-title">Category Control</h2>

      {/* Link to Add Category Form */}
      <Link to="/category/add" className="button">
        Add Category
      </Link>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      {/* Edit Category Form */}
      {addFormOpen && categoryToEdit && (
        <EditCategory
          category={categoryToEdit}
          onClose={handleCloseEditForm}
          onSave={handleSave}
        />
      )}

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
