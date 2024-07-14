import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../componentsAdmin/layout/AdminLayout";
import axios from "axios"; // Import axios for HTTP requests

function AdminControl() {
  const [hasToken, setHasToken] = useState(true);
  const [admins, setAdmins] = useState([]);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [newAdminData, setNewAdminData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin", // Default role
  });

  // Fetch all admins on component mount
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("/api/admins");
        setAdmins(response.data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();

    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, redirecting to login.");
      setHasToken(false);
    }
  }, []);

  // Function to handle adding an admin
  const handleAddAdmin = () => {
    console.log("Handle add admin functionality");
    setShowAddAdminModal(true);
  };

  // Function to handle submitting new admin data
  const handleSubmitNewAdmin = async () => {
    try {
      console.log("Submitting new admin data:", newAdminData);
      const response = await axios.post("/api/admins", newAdminData);
      console.log("New admin added:", response.data);
      
      // Update local state with new admin
      setAdmins([...admins, response.data]);
      setNewAdminData({ name: "", email: "", password: "", role: "admin" });
      setShowAddAdminModal(false);
    } catch (error) {
      console.error("Error adding new admin:", error);
    }
  };

  // Function to handle updating an admin (dummy implementation)
  const handleUpdateAdmin = (adminId) => {
    console.log(`Handle update admin functionality for admin with ID: ${adminId}`);
    // Implement logic to update an admin
  };

  // Function to handle deleting an admin (dummy implementation)
  const handleDeleteAdmin = async (adminId) => {
    try {
      console.log(`Handle delete admin functionality for admin with ID: ${adminId}`);
      const response = await axios.delete(`/api/admins/${adminId}`);
      console.log("Admin deleted:", response.data);

      // Filter out the deleted admin from the state
      const updatedAdmins = admins.filter(admin => admin._id !== adminId);
      setAdmins(updatedAdmins);
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  if (!hasToken) {
    // Simulate redirection after 10 seconds using setTimeout
    setTimeout(() => {
      window.location.href = "/"; // Redirect to login page after 10 seconds
    }, 10000); // 10 seconds delay

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh", // Full viewport height
          color: "black",
          textAlign: "center",
        }}
      >
        <p>Sorry, you are not logged in or do not have admin access. Redirecting to login...</p>
        <Link
          to="/"
          style={{ color: "black", textDecoration: "none", marginTop: "10px" }}
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="text-black">Admin Management</h4>
          <button className="btn btn-primary" onClick={handleAddAdmin}>
            Add Admin
          </button>
        </div>
        <div className="card shadow">
          <div className="card-body">
            <h5 className="card-title text-black">Admin List</h5>
            <ul className="list-group">
              {admins.map((admin) => (
                <li key={admin._id} className="list-group-item d-flex justify-content-between align-items-center">
                  {admin.name}
                  <div>
                    <button className="btn btn-warning me-2" onClick={() => handleUpdateAdmin(admin._id)}>
                      Update
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDeleteAdmin(admin._id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Modal for adding admin */}
      {showAddAdminModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Admin</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowAddAdminModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label text-black">Name</label>
                    <input type="text" className="form-control" id="name" value={newAdminData.name} onChange={(e) => setNewAdminData({ ...newAdminData, name: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label text-black">Email</label>
                    <input type="email" className="form-control" id="email" value={newAdminData.email} onChange={(e) => setNewAdminData({ ...newAdminData, email: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label text-black">Password</label>
                    <input type="password" className="form-control" id="password" value={newAdminData.password} onChange={(e) => setNewAdminData({ ...newAdminData, password: e.target.value })} />
                  </div>
                  <button type="button" className="btn btn-primary" onClick={handleSubmitNewAdmin}>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminControl;
