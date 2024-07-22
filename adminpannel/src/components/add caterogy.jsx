import React, { useState } from 'react';
import axiosInstance from '../apis/axiosInstance';
import AdminLayout from './layout/AdminLayout';

function AddCategoryForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    image: null, // Updated to hold the selected file object
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Function to handle input changes (including file input)
  const handleChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      // Check if file is selected
      if (file) {
        // Validate image dimensions
        const img = new Image();
        img.onload = function () {
          if (this.width === 800 && this.height === 600) { // Specify your required dimensions here
            setFormData({ ...formData, image: file });
            setErrorMessage('');
          } else {
            setFormData({ ...formData, image: null });
            setErrorMessage('Please select an image with dimensions 800x600.');
          }
        };
        img.src = URL.createObjectURL(file);
      } else {
        setFormData({ ...formData, image: null });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Function to handle form submission
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if formData.image is set and its dimensions are correct
      if (!formData.image) {
        setErrorMessage('Please select an image.');
        return;
      }

      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('description', formData.description);

      const response = await axiosInstance.post('/api/categories/create', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
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
            <div className="file-input-container">
              <label className="file-input-label">
                Choose an image
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="file-input"
                  required
                />
              </label>
              {formData.image && (
                <span className="selected-file-name">{formData.image.name}</span>
              )}
            </div>
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
