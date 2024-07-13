import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer text-center text-lg-start">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0"><h1 className="m-0 fw-bold  text-white">
      Your<span className="text-success">Bajaar</span>
    </h1>
  <br/>
            <p>Your family member</p>
          </div>

          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Useful Links</h5>
            <ul className="list-unstyled mb-0">
              <li><a href="#!" className="text-light">Become a Partner</a></li>
              <li><a href="#!" className="text-light">Customer Care</a></li>
              <li><a href="#!" className="text-light">Career</a></li>
              <li><a href="#!" className="text-light">Contact Us</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Support</h5>
            <ul className="list-unstyled mb-0">
              <li><a href="#!" className="text-light">FAQs</a></li>
              <li><a href="#!" className="text-light">Help Center</a></li>
              <li><a href="#!" className="text-light">Feedback</a></li>
              <li><a href="#!" className="text-light">Live Chat</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Legal</h5>
            <ul className="list-unstyled mb-0">
              <li><a href="#!" className="text-light">Privacy Policy</a></li>
              <li><a href="#!" className="text-light">Terms of Service</a></li>
              <li><a href="#!" className="text-light">Return Policy</a></li>
              <li><a href="#!" className="text-light">Disclaimer</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Contact</h5>
            <ul className="list-unstyled mb-0">
              <li><p>Address: Example Address, City, Country</p></li>
              <li><p>Email: info@example.com</p></li>
              <li><p>Phone: +123 456 7890</p></li>
            </ul>
            <div className="social-icons d-flex justify-content-center mt-4">
              <a href="#!" className="mx-2" style={{ color: '#fff' }}><FaFacebook size={24} /></a>
              <a href="#!" className="mx-2" style={{ color: '#fff' }}><FaTwitter size={24} /></a>
              <a href="#!" className="mx-2" style={{ color: '#fff' }}><FaInstagram size={24} /></a>
              <a href="#!" className="mx-2" style={{ color: '#fff' }}><FaLinkedin size={24} /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Your Bajaar | All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
