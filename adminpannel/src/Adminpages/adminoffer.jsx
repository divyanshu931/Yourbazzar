import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";


function OfferDashboard() {
  const [hasToken, setHasToken] = useState(true);
  const [offers, setOffers] = useState([]);

  // Dummy offer list (replace with actual data fetching logic)
  useEffect(() => {
    // Simulated dummy data
    const dummyOffers = [
      { id: 1, name: "Offer 1", discount: "10%" },
      { id: 2, name: "Offer 2", discount: "20%" },
      { id: 3, name: "Offer 3", discount: "15%" },
      { id: 4, name: "Offer 4", discount: "30%" },
    ];
    setOffers(dummyOffers);
    
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, redirecting to login.");
      setHasToken(false);
    }
  }, []);

  // Redirect to login page after 10 seconds if no token
  useEffect(() => {
    if (!hasToken) {
      const redirectTimer = setTimeout(() => {
        window.location.href = "/"; // Redirect to login page
      }, 10000); // 10 seconds delay

      return () => clearTimeout(redirectTimer); // Clean up timer on unmount
    }
  }, [hasToken]);

  // Inline styles
  const containerStyle = {
    margin: "20px auto",
    maxWidth: "800px",
    padding: "20px",
  };

  const errorMessageStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh", // Adjusted to make space for the link
    textAlign: "center",
    backgroundColor: "#f8d7da", // Bootstrap danger color for error messages
    color: "#721c24", // Bootstrap dark color for error messages
    padding: "20px",
    borderRadius: "5px",
  };

  const offerListStyle = {
    marginTop: "20px",
    listStyleType: "none",
    padding: "0",
  };

  const offerItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    marginBottom: "5px",
    backgroundColor: "#f8f9fa",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const offerNameStyle = {
    fontWeight: "bold",
    flex: "1",
      color:"black"
  };

  const offerDiscountStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "10px",
    marginLeft: "10px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginRight: "10px",
    minWidth: "120px",
    textAlign: "center",
    textTransform: "uppercase",
  };

  const addButtonStyle = {
    ...buttonStyle,
    backgroundColor: "green",
    color: "white",
  };

  const updateButtonStyle = {
    ...buttonStyle,
    backgroundColor: "yellow",
    color: "black",
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "red",
    color: "white",
  };

  // Function to handle adding an offer (placeholder)
  const handleAddOffer = () => {
    console.log("Handle add offer functionality");
    // Implement logic to add a new offer
  };

  // Function to handle updating an offer (placeholder)
  const handleUpdateOffer = () => {
    console.log("Handle update offer functionality");
    // Implement logic to update an existing offer
  };

  // Function to handle deleting an offer (placeholder)
  const handleDeleteOffer = () => {
    console.log("Handle delete offer functionality");
    // Implement logic to delete an existing offer
  };

  return (
    <>
      <AdminLayout>
        <div style={containerStyle}>
          {!hasToken ? (
            <div style={errorMessageStyle}>
              <p style={{ color: "black", fontWeight: "bold" }}>Sorry, you are not logged in or do not have admin access.</p>
              <p style={{ color: "black" }}>Redirecting to login...</p>
              <Link to="/" style={{ color: "#721c24", textDecoration: "none", marginTop: "10px", fontWeight: "bold" }}>
                Go to Login
              </Link>
            </div>
          ) : (
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title mb-4">Offer List</h5>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6>Total Offers: {offers.length}</h6>
                  <div>
                    <button style={addButtonStyle} onClick={handleAddOffer}>
                      Add Offer
                    </button>
                    <button style={updateButtonStyle} onClick={handleUpdateOffer}>
                      Update Offer
                    </button>
                    <button style={deleteButtonStyle} onClick={handleDeleteOffer}>
                      Delete Offer
                    </button>
                  </div>
                </div>
                <ul style={offerListStyle}>
                  {offers.map((offer) => (
                    <li key={offer.id} style={offerItemStyle}>
                      <span style={offerNameStyle}>{offer.name}</span>
                      <span style={offerDiscountStyle}>{offer.discount}</span>
                      {/* Optional: Add Edit and Delete icons/buttons here */}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
}

export default OfferDashboard;
