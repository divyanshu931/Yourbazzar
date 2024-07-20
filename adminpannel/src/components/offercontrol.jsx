import React, { useState, useEffect } from "react";
import axiosInstance from "../apis/axiosInstance";
import "./style.css";

function OfferControl() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [offerToEdit, setOfferToEdit] = useState(null);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/offers/");
      setOffers(response.data.offers); // Assuming response.data.offers is the array of offers
      setLoading(false);
    } catch (error) {
      console.error("Error fetching offers:", error);
      setLoading(false);
      setErrorMessage("Failed to fetch offers. Please try again.");
    }
  };

  const handleDelete = async (offerId) => {
    try {
      if (window.confirm("Are you sure you want to delete this offer?")) {
        setLoading(true);
        await axiosInstance.delete(`/api/offers/delete/${offerId}`);
        setOffers(offers.filter((offer) => offer._id !== offerId));
        setLoading(false);
        setSuccessMessage("Offer deleted successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error deleting offer:", error);
      setErrorMessage("Failed to delete offer. Please try again.");
      setLoading(false);
    }
  };

  const handleEdit = (offerId) => {
    const offer = offers.find((offer) => offer._id === offerId);
    setOfferToEdit(offer);
    setAddFormOpen(true);
  };

  const handleCloseForm = () => {
    setAddFormOpen(false);
    setOfferToEdit(null);
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      let response;
      if (offerToEdit) {
        // Edit existing offer
        response = await axiosInstance.put(`/api/offers/${offerToEdit._id}`, formData);
        setSuccessMessage("Offer updated successfully!");
      } else {
        // Add new offer
        response = await axiosInstance.post("/api/offers/add", formData);
        setSuccessMessage("Offer added successfully!");
      }
      setLoading(false);
      handleCloseForm();
      fetchOffers(); // Refresh the offer list
    } catch (error) {
      console.error("Error saving offer:", error);
      setErrorMessage("Failed to save offer. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <h2 className="main-title">Offer Control</h2>

      {/* Link to Add Offer Form */}
      <button onClick={() => setAddFormOpen(true)} className="button">
        {offerToEdit ? "Edit Offer" : "Add Offer"}
      </button>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Offer List in Table Format */}
      <table className="category-table">
        <thead>
          <tr className="table-header">
            <th>S.No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Discount</th>
            <th>Expiry Date</th>
            <th>Image URL</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8">Loading...</td>
            </tr>
          ) : (
            offers.map((offer, index) => (
              <tr key={offer._id}>
                <td>{index + 1}</td>
                <td>{offer.title}</td>
                <td>{offer.description}</td>
                <td>{offer.discount}%</td>
                <td>{new Date(offer.expiryDate).toLocaleDateString()}</td>
                <td>{offer.imageUrl}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(offer._id)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(offer._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Add/Edit Offer Form */}
      {addFormOpen && (
        <div className="edit-product-form">
          <h3 className="main-title">{offerToEdit ? "Edit Offer" : "Add Offer"}</h3>
          <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
              type="text"
              value={offerToEdit ? offerToEdit.title : ""}
              onChange={(e) => setOfferToEdit({ ...offerToEdit, title: e.target.value })}
              required
            />
            <label>Description:</label>
            <input
              type="text"
              value={offerToEdit ? offerToEdit.description : ""}
              onChange={(e) => setOfferToEdit({ ...offerToEdit, description: e.target.value })}
              required
            />
            <label>Discount (%):</label>
            <input
              type="number"
              value={offerToEdit ? offerToEdit.discount : ""}
              onChange={(e) => setOfferToEdit({ ...offerToEdit, discount: parseInt(e.target.value) })}
              required
            />
            <label>Expiry Date:</label>
            <input
              type="date"
              value={offerToEdit ? offerToEdit.expiryDate.slice(0,10) : ""}
              onChange={(e) => setOfferToEdit({ ...offerToEdit, expiryDate: e.target.value })}
              required
            />
            <label>Image URL:</label>
            <input
              type="text"
              value={offerToEdit ? offerToEdit.imageUrl : ""}
              onChange={(e) => setOfferToEdit({ ...offerToEdit, imageUrl: e.target.value })}
              required
            />
            <button type="submit">Save</button>
            <button type="button" onClick={handleCloseForm}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default OfferControl;
