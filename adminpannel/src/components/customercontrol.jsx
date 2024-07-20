import React, { useState, useEffect } from "react";
import axiosInstance from "../apis/axiosInstance"; // Replace with your Axios instance setup

function CustomerControl() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailFormOpen, setEmailFormOpen] = useState(false); // State to manage visibility of Email Customer form
  const [selectedCustomerId, setSelectedCustomerId] = useState(null); // State to store selected customer ID for sending email
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/customers");
      setCustomers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setLoading(false);
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      if (window.confirm("Are you sure you want to delete this customer?")) {
        setLoading(true);
        await axiosInstance.delete(`/api/customers/delete/${customerId}`);
        setCustomers(customers.filter((customer) => customer._id !== customerId));
        setLoading(false);
        setSuccessMessage("Customer deleted successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
      setErrorMessage("Failed to delete customer. Please try again.");
      setLoading(false);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const toggleEmailForm = (customerId) => {
    setEmailFormOpen(!emailFormOpen); // Toggle the state to show/hide the Email Customer form
    setSelectedCustomerId(customerId); // Set the selected customer ID for sending email
  };

  const handleSendEmail = async () => {
    try {
      setLoading(true);
      if (selectedCustomerId) {
        // Send email to a specific customer
        await axiosInstance.post(`/api/customers/email/${selectedCustomerId}`, { subject: emailSubject, body: emailBody });
        setSuccessMessage("Email sent to customer successfully!");
      } else {
        // Send email to all customers
        await axiosInstance.post(`/api/customers/email/all`, { subject: emailSubject, body: emailBody });
        setSuccessMessage("Email sent to all customers successfully!");
      }
      setLoading(false);
      setEmailFormOpen(false); // Close the Email Customer form after sending email
      setEmailSubject("");
      setEmailBody("");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error sending email:", error);
      setErrorMessage("Failed to send email. Please try again.");
      setLoading(false);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div className="main-container">
      <h2 className="main-title">Customer Control</h2>

      {/* Button to toggle Email Customer Form */}
      <button className="button" onClick={() => toggleEmailForm(null)}>
        {emailFormOpen ? "Hide Email Form" : "Email All Customers"}
      </button>

      {/* Email Customer Form */}
      {emailFormOpen && (
        <div className="email-form">
          <h3>Email Form</h3>
          <div className="form-group">
            <label>Subject:</label>
            <input type="text" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Body:</label>
            <textarea value={emailBody} onChange={(e) => setEmailBody(e.target.value)} />
          </div>
          <button className="button" onClick={handleSendEmail}>Send Email</button>
        </div>
      )}

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Customer List in Table Format */}
      <table className="category-table">
        <thead>
          <tr className="table-header">
            <th>S.No</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Delete</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          ) : (
            customers.map((customer, index) => (
              <tr key={customer._id}>
                <td>{index + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDeleteCustomer(customer._id)}>
                    Delete
                  </button>
                </td>
                <td>
                  <button className="email-btn" onClick={() => toggleEmailForm(customer._id)}>
                    Email
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

export default CustomerControl;
