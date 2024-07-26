import React, { useState, useEffect } from 'react';
import axiosInstance from '../apis/axiosInstance';
import { useParams, Link } from 'react-router-dom';
import ProductItem from '../components/productmap';

function OfferDetails() {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOfferAndProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch offer details
        const offerResponse = await axiosInstance.get(`/api/offers/${id}`);
        setOffer(offerResponse.data.offer);

        // Fetch products related to the offer
        const productsResponse = await axiosInstance.get(`/api/public/all`);
        setProducts(productsResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOfferAndProducts();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  // Filter products based on offer discount and product discount
  const discountedProducts = products.filter(product => 
    offer.discount==product.discount 
  );

  return (
    <>
      <div className="p-3 shadow-sm bg-warning danger-nav osahan-home-header sticky-top">
        <div className="font-weight-normal mb-0 d-flex align-items-center">
          <h6 className="fw-normal mb-0 text-dark d-flex align-items-center">
            <Link to="/home" className="text-dark me-3 fs-4"><i className="bi bi-chevron-left"></i></Link>
            <span>
              <b>Delivery in 27 minutes</b><br />
              <small>Omaxe Galleria, Bahadurgarh, Haryana - 124507 <i className="bi bi-arrow-right-circle-fill"></i></small>
            </span>
          </h6>
          <div className="ms-auto d-flex align-items-center">
            <a href="#" className="me-3 text-dark fs-5" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="bi bi-funnel"></i></a>
            <a href="#" className="toggle osahan-toggle fs-4 text-dark ms-auto"><i className="bi bi-list"></i></a>
          </div>
        </div>
      </div>
      <div className="osahan-listing">
        <div className="osahan-listing p-0 m-0 row border-top">
          <div className="p-3 border-bottom w-100">
            <h6 className="m-0 fw-bold d-flex align-items-center"><i className="icofont-sale-discount fs-5 me-2"></i>{offer.title}</h6>
          </div>
        </div>
        <div className="row">
          {discountedProducts.length > 0 ? (
            discountedProducts.map(product => (
              <ProductItem key={product._id} product={product} />
            ))
          ) : (
            <p>No products with discounts available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default OfferDetails;
