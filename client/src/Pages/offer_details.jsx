import React, { useState, useEffect } from 'react';
import axiosInstance from '../apis/axiosInstance';
import { useParams } from 'react-router-dom';
import BestSellingProducts from '../components/bestproducts';
import TodayOffers from '../components/offer'; 

import Layout from '../components/layout/layout_';
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
   <Layout>
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
   
      </Layout>
    </>
  );
}

export default OfferDetails;
