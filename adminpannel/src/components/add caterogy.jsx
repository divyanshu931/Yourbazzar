import React, { useState } from 'react';
import axiosInstance from '../apis/axiosInstance';
import AdminLayout from './layout/AdminLayout';

function AddCategoryForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    description: ''
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
        const aspectRatio = img.width / img.height;
        const minWidth = 300;
        const maxWidth = 600;
        const minHeight = 400;
        const maxHeight = 800;
  
        if (
          img.width >= minWidth &&
          img.width <= maxWidth &&
          img.height >= minHeight &&
          img.height <= maxHeight &&
          Math.abs(aspectRatio - (3 / 4)) < 0.01  // Allow slight tolerance for aspect ratio
        ) {
          setFormData({ ...formData, image: selectedFile });
          setErrorMessage('');
        } else {
          setErrorMessage('Image dimensions must be between 300x400 to 600x800 pixels with a 3:4 aspect ratio.');
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
      formDataToSend.append('description', formData.description);

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
          image: null,
          description: ''
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
            {/* Point to notice: Category name must be unique */}
            <input
              type="text"
              name="name"
              placeholder="Category Name (unique)"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              required
            />
            <div className="file-input-container">
              <label className="file-input-label">
                Choose an image<br />
                300x400 to 600x800 pixels with a 3:4 aspect ratio
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
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
              onChange={handleInputChange}
              className="form-input"
            />
            <div className="form-buttons">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Adding...' : 'Add'}
              </button>
            </div>
            {/* Point to notice: Display error message if category name is not unique */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {/* Point to notice: Display success message upon successful category addition */}
            {successMessage && <p className="success-message">{successMessage}</p>}
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddCategoryForm;
