import React, { useState, useEffect } from 'react';
import axiosInstance from '../apis/axiosInstance';
import Layout from '../components/layout/layout_';

function AllOffers() {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllOffers = async () => {
      try {
        const response = await axiosInstance.get('/api/offers');
        setOffers(response.data.offers); // Assuming response structure is { success: true, offers: [...] }
      } catch (error) {
        console.error('Error fetching offers:', error);
        setError('Failed to fetch offers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllOffers();
  }, []);

  if (loading) {
    return <p className="loading-message">Loading...</p>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <Layout>
      <div style={containerStyle}>
        <h1 style={{ marginBottom: '2rem' }}>All Offers</h1>
        <div style={offersContainerStyle}>
          {offers.map((offer) => (
            <div key={offer._id} style={offerDetailsStyle}>
              <img src={offer.imageUrl} alt={offer.title} style={imageStyle} />
              <div style={contentStyle}>
                <h2 style={titleStyle}>{offer.title}</h2>
                <p style={descriptionStyle}>Description: {offer.description}</p>
                <p style={discountStyle}>Discount: {offer.discount}%</p>
                <p style={expiryStyle}>Expiry Date: {new Date(offer.expiryDate).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

// Styles
const containerStyle = {
  textAlign: 'center',
  padding: '1rem',
  zIndex: '998',
  position: 'relative',
  width: '100%', // Ensure the container takes the full width
};

const offersContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  width: '100%', // Ensure the offers container takes the full width
};

const offerDetailsStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start', // Align items to the start for better layout
  background: '#f9f9f9',
  borderRadius: '8px',
  padding: '1rem',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  width: '100%', // Set width to 100% to take full row
  maxWidth: '800px',
};

const imageStyle = {
  maxWidth: '100px',
  maxHeight: '100px',
  marginRight: '30px',
};

const contentStyle = {
  textAlign: 'left',
  width: '100%', // Make sure content takes full width available
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

export default AllOffers;
