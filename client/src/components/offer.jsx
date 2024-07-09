import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axiosInstance from '../apis/axiosInstance';
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div style={{ padding: '1rem 0' }}>
      <div style={{ padding: '0 1rem', display: 'flex', justifyContent: 'space-between' }}>
        <h6 style={{ marginBottom: '0.5rem', color: 'black', fontWeight: 'bold' }}>Today's Offers</h6>
        <a href="listing.html" style={{ color: 'green', textDecoration: 'none' }}>
          SEE ALL <i className="bi bi-arrow-right-circle-fill"></i>
        </a>
      </div>
      <Slider {...settings} className="home-cate">
        {offers.map(offer => (
          <div key={offer._id} style={{ padding: '0 0.5rem' }}>
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '0.25rem',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              transition: 'transform 0.2s ease-in-out',
              height: '100%'
            }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <a href="listing.html" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', overflow: 'hidden' }}>
                <img src={offer.imageUrl} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }} alt={offer.title} />
              </a>
              <div style={{ padding: '1rem', textAlign: 'center' }}>
                <h5 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0.5rem 0' }}>{offer.title}</h5>
                <p style={{ fontSize: '1rem', margin: '0.5rem 0', color: '#666' }}>{offer.description}</p>
                <p style={{ fontSize: '1rem', margin: '0.5rem 0', color: '#ff0000', fontWeight: 'bold' }}>Discount: {offer.discount}%</p>
                <p style={{ fontSize: '0.875rem', color: '#888' }}>Expiry Date: {new Date(offer.expiryDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TodayOffers;
