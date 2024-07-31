import React, { useState, useEffect } from 'react';
import axiosInstance from '../apis/axiosInstance';
import { useParams, Link } from 'react-router-dom';
import ProductItem from '../components/productmap';
import Sidebar from '../components/layout/Sidebar';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap styles are imported

function OfferDetails() {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('popularity'); // Default filter

  useEffect(() => {
    const fetchOfferAndProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const offerResponse = await axiosInstance.get(`/api/offers/${id}`);
        setOffer(offerResponse.data.offer);

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const applyFilter = () => {
    setShowFilterModal(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  // Filter products based on selected filter and offer discount
  let filteredProducts = products.filter(product => product.discount === offer.discount);

  if (selectedFilter === 'highToLow') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (selectedFilter === 'lowToHigh') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedFilter === 'discount') {
    // Discount filter logic is already applied with discount match
  }

  return (
    <>
      <div className={`p-3 shadow-sm bg-warning danger-nav osahan-home-header sticky-top ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="font-weight-normal mb-0 d-flex align-items-center">
          <h6 className="fw-normal mb-0 text-dark d-flex align-items-center">
            <Link to="/home" className="text-dark me-3 fs-4"><i className="bi bi-chevron-left"></i></Link>
            <span>
              <b>Delivery in 27 minutes</b><br />
              <small>Omaxe Galleria, Bahadurgarh, Haryana - 124507 <i className="bi bi-arrow-right-circle-fill"></i></small>
            </span>
          </h6>
          <div className="ms-auto d-flex align-items-center">
            <Button variant="link" className="me-3 text-dark fs-5" onClick={() => setShowFilterModal(true)}><i className="bi bi-funnel"></i></Button>
            <a className="toggle osahan-toggle fs-4 text-dark ms-auto" onClick={toggleSidebar}>
              <i className="bi bi-list"></i>
            </a>
          </div>
        </div>
      </div>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="osahan-listing">
        <div className="osahan-listing p-0 m-0 row border-top">
          <div className="p-3 border-bottom w-100">
            <h6 className="m-0 fw-bold d-flex align-items-center"><i className="icofont-sale-discount fs-5 me-2"></i>{offer.title}</h6>
          </div>
        </div>
        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductItem key={product._id} product={product} />
            ))
          ) : (
            <center>
              <p>
                <img
                  src="https://blinkit.com/57070263a359a92dc0fe.png" // Replace with the path to your fallback image
                  alt="No products found"
                  style={{ width: '400px', height: '500px' }}
                />
                No products with discounts available.
              </p>
            </center>
          )}
        </div>
      </div>

      {/* Filter Modal */}
      <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sort by</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Check
              type="radio"
              id="filterPopularity"
              label="Popularity"
              name="filterOptions"
              value="popularity"
              checked={selectedFilter === 'popularity'}
              onChange={() => handleFilterChange('popularity')}
            />
            <Form.Check
              type="radio"
              id="filterHighToLow"
              label="High to Low"
              name="filterOptions"
              value="highToLow"
              checked={selectedFilter === 'highToLow'}
              onChange={() => handleFilterChange('highToLow')}
            />
            <Form.Check
              type="radio"
              id="filterLowToHigh"
              label="Low to High"
              name="filterOptions"
              value="lowToHigh"
              checked={selectedFilter === 'lowToHigh'}
              onChange={() => handleFilterChange('lowToHigh')}
            />
            <Form.Check
              type="radio"
              id="filterDiscount"
              label="Discount"
              name="filterOptions"
              value="discount"
              checked={selectedFilter === 'discount'}
              onChange={() => handleFilterChange('discount')}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={() => setSelectedFilter('')}>CLEAR ALL</Button>
          <Button variant="success" onClick={applyFilter}>APPLY FILTER</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OfferDetails;
