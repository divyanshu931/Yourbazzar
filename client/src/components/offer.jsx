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
    autoplaySpeed: 1800,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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
    <div className="py-3">
      <div className="px-3 d-flex justify-content-between">
        <h6 className="mb-2 text-black fw-bold">Today's Offers</h6>
        <Link to="/offers" className="text-success text-decoration-none">
          SEE ALL <i className="bi bi-arrow-right-circle-fill"></i>
        </Link>
      </div>

      <Slider {...sliderSettings} className="slick-slider">
        {offers.map((offer, index) => (
          <div key={index} className="home-productc">
            <Link to={`/offer-details/${offer._id}`}>
              <img  src={`${axiosInstance.defaults.baseURL}/${offer.imageUrl} `}className="img-fluid" alt={offer.title} style={{ width: '400px', height: '400px', objectFit: 'zoomout' }} />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TodayOffers;
