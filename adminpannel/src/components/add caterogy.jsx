import React, { useState } from 'react';
import axiosInstance from '../apis/axiosInstance';
import AdminLayout from './layout/AdminLayout';


function AddCategoryForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosInstance.post('/api/categories/create', {
        name: formData.name,
        image: formData.image,
        description: formData.description
      });
      setLoading(false);
      if (response.status === 201) {
        setErrorMessage(''); // Clear any previous error message
        setSuccessMessage('Category successfully added!'); // Set success message
        if (typeof onSuccess === 'function') {
          onSuccess(); // Notify parent component of success
        }
      } else {
        setErrorMessage('Failed to add category. Please try again.');
      }
    } catch (error) {
      console.error('Error adding category:', error);
      if (error.response) {
        console.error('Response data:', error.response.data); // Log detailed response data
        setErrorMessage(error.response.data.message || 'Failed to add category. Please try again.');
      } else {
        setErrorMessage('Failed to add category. Please try again.');
      }
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="main-container">
        <h2 className="main-title">Add Category</h2>
        
        <div className="add-category-form-container">
          <form className="add-category-form" onSubmit={handleAddSubmit}>
            {/* Input fields for adding a category */}
            <input
              type="text"
              name="name"
              placeholder="Category Name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
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
            />
            <div className="form-buttons">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Adding...' : 'Add'}
              </button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddCategoryForm;
