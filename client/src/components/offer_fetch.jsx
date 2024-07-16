import React, { useState, useEffect } from 'react';
import axiosInstance from '../apis/axiosInstance';
import { useParams } from 'react-router-dom';

function OfferFetch() {
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
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      {offer ? (
        <div className="offer-details">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{offer.title}</h2>
          <p style={{ fontSize: '1rem', color: '#666', marginBottom: '0.5rem' }}>Description: {offer.description}</p>
          <p style={{ fontSize: '1rem', color: '#ff0000', fontWeight: 'bold', marginBottom: '0.5rem' }}>Discount: {offer.discount}%</p>
          <p style={{ fontSize: '0.875rem', color: '#888' }}>Expiry Date: {new Date(offer.expiryDate).toLocaleDateString()}</p>
          {/* Add more details as needed */}
          <img src={offer.imageUrl} alt={offer.title} style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '1rem' }} />
        </div>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
}

export default OfferFetch;
