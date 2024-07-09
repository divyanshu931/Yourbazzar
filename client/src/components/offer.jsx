import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../apis/axiosWithAuth'; // Import axiosWithAuth for authenticated requests

const TodayOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axiosWithAuth({
          method: 'get',
          url: '/api/offers'
        });
        setOffers(response.data.offers);
      } catch (error) {
        console.error('Error fetching offers:', error);
        setError('Failed to fetch offers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show loading indicator while fetching data
  }

  if (error) {
    return <p>{error}</p>; // Show error message if fetching data fails
  }

  return (
    <div className="py-3">
      <div className="px-3 d-flex justify-content-between">
        <h6 className="mb-2 text-black fw-bold">Today's Offers</h6>
        <a href="listing.html" className="text-success text-decoration-none">
          SEE ALL <i className="bi bi-arrow-right-circle-fill"></i>
        </a>
      </div>
      <div className="home-cate">
        {offers.map(offer => (
          <div key={offer._id} className="home-productc">
            <a href="listing.html">
              <img src={offer.imageUrl} className="img-fluid" alt={offer.title} />
            </a>
            <div className="offer-details">
              <h5>{offer.title}</h5>
              <p>{offer.description}</p>
              <p>Discount: {offer.discount}%</p>
              <p>Expiry Date: {new Date(offer.expiryDate).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayOffers;
