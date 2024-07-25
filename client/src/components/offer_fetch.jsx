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
        setOffer(response.data.offer);
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
    <div style={containerStyle}>
      {offer ? (
        <div style={offerDetailsStyle}>
          <img src={offer.imageUrl} alt={offer.title} style={imageStyle}  />
          <div style={contentStyle}>
            <h2 style={titleStyle}>{offer.title}</h2>
            <p style={descriptionStyle}>Description: {offer.description}</p>
            <p style={discountStyle}>Discount: {offer.discount}%</p>
            <p style={expiryStyle}>Expiry Date: {new Date(offer.expiryDate).toLocaleDateString()}</p>
          </div>
        </div>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
}

// Styles
const containerStyle = {
  textAlign: 'center',
  padding: '1rem',
  zIndex: '998',
  position: 'relative',
};

const offerDetailsStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const imageStyle = {
  maxWidth: '300px',
  maxHeight: '300px',
  marginRight: '50px',
};

const contentStyle = {
  textAlign: 'left',
};

const titleStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
   color: 'green',
  
};

const descriptionStyle = {
  fontSize: '1rem',
  color: '#666',
  marginBottom: '0.5rem',
};

const discountStyle = {
  fontSize: '1rem',
  color: '#ff0000',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
};

const expiryStyle = {
  fontSize: '0.875rem',
  color: '#888',
};

export default OfferFetch;
