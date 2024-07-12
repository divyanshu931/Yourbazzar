import React, { useState, useEffect } from 'react';
import axiosInstance from '../apis/axiosInstance';
import { useParams } from 'react-router-dom';
import BestSellingProducts from '../components/bestproducts';
import TodayOffers from '../components/offer'; 
import Footer from '../components/footer';

function OfferDetails() {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOfferDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/offers/${id}`);
        setOffer(response.data.offer); // Assuming response structure is { success: true, offer: {...} }
      } catch (error) {
        console.error('Error fetching offer details:', error);
        setError('Failed to fetch offer details. Please try again later.');
      }
    };

    fetchOfferDetails();
  }, [id]);

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <>
      <div className="p-3 shadow-sm bg-warning danger-nav osahan-home-header sticky-top">
        <div className="font-weight-normal mb-0 d-flex align-items-center">
          <h4 className="m-0 fw-bold text-black">Your<span className="text-success">Bajaar</span></h4>
          <div className="ms-auto d-flex align-items-center">
            <a href="signin.html" className="me-3 text-dark fs-5"><i className="bi bi-person-circle"></i></a>
            <a href="bag.html" className="me-3 text-dark fs-5"><i className="bi bi-basket"></i></a>
            <a href="#" className="toggle osahan-toggle fs-4 text-dark ms-auto"><i className="bi bi-list"></i></a>
          </div>
        </div>
        <div className="input-group input-group-lg bg-white border-0 shadow-sm rounded overflow-hidden mt-3">
          <span className="input-group-text bg-white border-0"><i className="bi bi-search text-muted"></i></span>
          <input type="text" className="form-control border-0 ps-0" placeholder="Search for Products.." />
        </div>
      </div>
      <div className="offer-details-container d-flex justify-content-center align-items-center">
        {offer ? (
          <div className="offer-details text-center">
            <h2 className="offer-title">{offer.title}</h2>
            <p className="offer-description">Description: {offer.description}</p>
            <p className="offer-discount">Discount: {offer.discount}%</p>
            <p className="offer-expiry">Expiry Date: {new Date(offer.expiryDate).toLocaleDateString()}</p>
            {/* Add more details as needed */}
            <img src={offer.imageUrl} alt={offer.title} style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '1rem' }} />
          </div>
        ) : (
          <p className="loading-message">Loading...</p>
        )}
      </div>
      <TodayOffers/>
      <BestSellingProducts/>
      <Footer/>
    </>
  );
}

export default OfferDetails;
