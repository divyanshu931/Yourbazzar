import React, { useState } from 'react';
import axiosInstance from '../apis/axiosInstance';
import AdminLayout from './layout/AdminLayout';

function AddCategoryForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    image: null
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const { width, height } = img;
        // Check image dimensions and format
        if (
          width === 270 &&
          height === 396 &&
          (selectedFile.type === 'image/png' || selectedFile.type === 'image/avif')
        ) {
          setErrorMessage(''); // Clear error message if dimensions and format are correct
          setFormData({ ...formData, image: selectedFile }); // Store the selected image file
        } else {
          setErrorMessage(
            'Please upload an image with dimensions 270x396 pixels in PNG or AVIF format.'
          );
          setFormData({ ...formData, image: null });
        }
      };

      img.src = event.target.result;
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('image', formData.image);

      const response = await axiosInstance.post('/api/categories/create', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setLoading(false);
      if (response.status === 201) {
        setSuccessMessage('Category successfully added!');
        setFormData({
          name: '',
          image: null
        });
        if (typeof onSuccess === 'function') {
          onSuccess();
        }
      } else {
        setErrorMessage('Failed to add category. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Failed to add category. Please try again.');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="main-container">
        <h2 className="main-title">Add Category</h2>

        <div className="add-category-form-container">
          <form className="add-category-form" onSubmit={handleAddSubmit}>
            {/* Category name */}
            <input
              type="text"
              name="name"
              placeholder="Category Name (unique)"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              required
            />
            {/* Image upload */}
            <div className="file-input-container">
              <label className="file-input-label">
                Choose an image<br />
                270x396 pixels in PNG or AVIF format
                <input
                  type="file"
                  name="image"
                  accept="image/png, image/avif"
                  onChange={handleImageChange}
                  className="file-input"
                  required
                />
              </label>
              {formData.image && (
                <span className="selected-file-name">{formData.image.name}</span>
              )}
            </div>
            {/* Form submission */}
            <div className="form-buttons">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Adding...' : 'Add'}
              </button>
            </div>
            {/* Error and success messages */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddCategoryForm;
