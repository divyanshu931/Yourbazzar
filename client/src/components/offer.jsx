import React, { useState, useEffect } from 'react';
import axiosInstance from '../apis/axiosInstance';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TodayOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axiosInstance.get('/api/offers');
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div style={{ padding: '1rem 0', zIndex: '998', position: 'relative' }}>
      <div style={{ padding: '0 1rem', display: 'flex', justifyContent: 'space-between' }}>
        <h6 style={{ marginBottom: '0.5rem', color: 'black', fontWeight: 'bold' }}>Today's Offers</h6>
        <Link to="/offers" style={{ color: 'green', textDecoration: 'none' }}>
          SEE ALL <i className="bi bi-arrow-right-circle-fill"></i>
        </Link>
      </div>
      <Slider {...sliderSettings} className="offer-details-container">
        {offers.map(offer => (
          <div key={offer._id} className="offer-details">
            <Link to={`/offer-details/${offer._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="offer-card">
                <div className="offer-image">
                  <img src={offer.imageUrl} alt={offer.title} />
                </div>
                <div className="offer-content">
                  <h5 className="offer-title">{offer.title}</h5>
                  <p className="offer-description">{offer.description}</p>
                  <p className="offer-discount">Discount: {offer.discount}%</p>
                  <p className="offer-expiry">Expiry Date: {new Date(offer.expiryDate).toLocaleDateString()}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TodayOffers;
