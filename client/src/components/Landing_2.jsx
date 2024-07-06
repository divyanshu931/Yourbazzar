import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

function Landing_2() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true
  };

  return (
    <>
      <div className="landing-page">
        <Slider {...settings} className="osahan-slider m-0">
          <div className="osahan-slider-item d-flex align-items-center justify-content-center vh-100 flex-column text-center bg-success">
            <i className="icofont-food-basket display-1 text-white"></i>
            <h5 className="mt-4 mb-3 text-white">No Minimum Order</h5>
            <p className="text-center text-white-50 mb-5 px-5">Order in for yourself or for the group, with no restrictions on order value</p>
          </div>
          <div className="osahan-slider-item d-flex align-items-center justify-content-center vh-100 flex-column text-center bg-warning">
            <i className="icofont-map-pins display-1 text-black"></i>
            <h5 className="mt-4 mb-3 text-dark">Live Order Tracking</h5>
            <p className="text-center text-dark-50 mb-5 px-5">Know where your order is at all times, from the restaurant to your doorstep</p>
          </div>
          <div className="osahan-slider-item d-flex align-items-center justify-content-center vh-100 flex-column text-center bg-success">
            <i className="icofont-delivery-time display-1 text-white"></i>
            <h5 className="mt-4 mb-3 text-white">Lightning-Fast Delivery</h5>
            <p className="text-center text-white-50 mb-5 px-5">Experience Karyana's superfast delivery for food delivered fresh & on time</p>
          </div>
        </Slider>
      </div>
      <div className="osahan-footer fixed-bottom p-3">
        <Link to="/getStarted" className="btn btn-outline-success bg-white text-success btn-lg w-100 shadow">Get Started</Link>
      </div>
    </>
  );
}

export default Landing_2;
