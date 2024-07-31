import React, { useState, useEffect } from "react";
import axiosInstance from "../apis/axiosInstance";
import { Link } from "react-router-dom";
import EditOffer from "./editoffer"; // Import EditOffer component
import Cookies from 'universal-cookie'; // Import universal-cookie
import "./style.css";

function OfferControl() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [offerToEdit, setOfferToEdit] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // State to manage admin access

  const cookies = new Cookies();

  useEffect(() => {
    const userRole = cookies.get('userRole'); // Fetch user role from cookies
    setIsAdmin(userRole === 'Admin'); // Check if the user is an Admin
    if (userRole === 'Admin') {
      fetchOffers(); // Fetch offers only if user is an Admin
    }
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/offers/");
      setOffers(response.data.offers);
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
    const selectedOffer = offers.find((offer) => offer._id === offerId);
    setOfferToEdit(selectedOffer);
  };

  const handleCloseEdit = () => {
    setOfferToEdit(null); // Clear offerToEdit to hide EditOffer component
  };

  // Inline style for "No Access" message
  const noAccessStyle = {
    color: '#000', // Black color
    textAlign: 'center',
    padding: '20px',
    fontSize: '18px',
    fontFamily: 'Arial, sans-serif'
  };

  if (!isAdmin) {
    return <p style={noAccessStyle}>No Access for saller</p>; // Message for non-admin users
  }

  return (
    <>
      <h2 className="main-title">Offer Control</h2>

      {/* Link to Add Offer Form */}
      <Link to="/offer/add" className="button">
        Add Offer
      </Link>

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

      {/* Render EditOffer component when offerToEdit is set */}
      {offerToEdit && (
        <EditOffer
          offer={offerToEdit}
          onClose={handleCloseEdit}
          onSave={fetchOffers} // Example: Refresh offers after save
        />
      )}
    </>
  );
}

export default OfferControl;
