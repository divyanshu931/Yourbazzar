import React, { useState } from 'react';

const AddAdminForm = ({ onAddAdmin }) => {
  const [newAdminData, setNewAdminData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    setNewAdminData({ ...newAdminData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!newAdminData.name || !newAdminData.email || !newAdminData.password) {
      setFormError('All fields are required.');
      return;
    }

    try {
      // Call the parent component's handler to add admin
      await onAddAdmin(newAdminData);
      
      // Clear the form after successful addition
      setNewAdminData({ name: '', email: '', password: '' });
      setFormError('');
    } catch (error) {
      console.error('Error adding admin:', error);
      setFormError('Failed to add admin. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color:'black'}}>Add Admin</h3>
      {formError && <p style={{ color: '#dc3545', fontSize: '0.9rem', marginTop: '5px' }}>{formError}</p>}
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' ,color:'black' }}>Name:</label>
          <input
            type="text"
            name="name"
            value={newAdminData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
            placeholder="Enter name"
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block',color:'black' }}>Email:</label>
          <input
            type="email"
            name="email"
            value={newAdminData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
            placeholder="Enter email"
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block',color:'black' }}>Password:</label>
          <input
            type="password"
            name="password"
            value={newAdminData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '1rem', cursor: 'pointer' }}>Add Admin</button>
      </form>
    </div>
  );
};

export default AddAdminForm;
