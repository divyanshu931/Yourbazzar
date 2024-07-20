import React, { useState, useEffect } from "react";
import axiosInstance from "../apis/axiosInstance";
import "./style.css"; // Import your CSS file
import AddAdminForm from "./addadmin"; // Import AddAdminForm component

function AdminControl() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [addFormOpen, setAddFormOpen] = useState(false); // State to manage visibility of Add Admin form

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/admins");
      setAdmins(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching admins:", error);
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    try {
      if (window.confirm("Are you sure you want to delete this admin?")) {
        setLoading(true);
        await axiosInstance.delete(`/api/admins/delete/${adminId}`);
        setAdmins(admins.filter((admin) => admin._id !== adminId));
        setLoading(false);
        setSuccessMessage("Admin deleted successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
      setErrorMessage("Failed to delete admin. Please try again.");
      setLoading(false);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const handleAddAdmin = async (newAdminData) => {
    try {
      setLoading(true);
      // Make POST request to add new admin
      await axiosInstance.post("/api/admins/add", newAdminData);
      setLoading(false);
      setSuccessMessage("Admin added successfully!");
      // Optionally, fetch admins again to update the list
      fetchAdmins();
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error adding admin:", error);
      setErrorMessage("Failed to add admin. Please try again.");
      setLoading(false);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const toggleAddForm = () => {
    setAddFormOpen(!addFormOpen); // Toggle the state to show/hide the Add Admin form
  };

  return (
    <div className="main-container">
      <h2 className="main-title">Admin Control</h2>

      {/* Button to toggle Add Admin Form */}
      <button className="button" onClick={toggleAddForm}>
        {addFormOpen ? "Hide Add Admin Form" : "Add Admin"}
      </button>

      {/* Render AddAdminForm if addFormOpen is true */}
      {addFormOpen && <AddAdminForm onAddAdmin={handleAddAdmin} />}

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Admin List in Table Format */}
      <table className="category-table">
        <thead>
          <tr className="table-header">
            <th>S.No</th>
            <th>Admin Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          ) : (
            admins.map((admin, index) => (
              <tr key={admin._id}>
                <td>{index + 1}</td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.role}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDeleteAdmin(admin._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminControl;
