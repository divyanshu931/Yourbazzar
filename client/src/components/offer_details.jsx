import axiosInstance from '../apis/axiosInstance';
import React, { useEffect, useState } from 'react';

function OfferDetails({ match }) {
  const [offer, setOffer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOfferDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/offers/${match.params.id}`);
        setOffer(response.data); // Update state with offer details
      } catch (error) {
        console.error('Error fetching offer details:', error);
        setError('Failed to fetch offer details. Please try again later.');
      }
    };

    fetchOfferDetails();
  }, [match.params.id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {offer ? (
        <div>
          <h2>{offer.title}</h2>
          <p>Description: {offer.description}</p>
          <p>Discount: {offer.discount}%</p>
          <p>Expiry Date: {new Date(offer.expiryDate).toLocaleDateString()}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default OfferDetails;
