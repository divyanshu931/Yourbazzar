import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer btn-color text-center text-lg-start">
      <div className="container p-4">
        <div className="row justify-content-center">
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Your Bajaar</h5>
            <p>
            your family member 

            </p>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Usefull links</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#!" className="text-light">Become a patner</a>
              </li>
              <li>
                <a href="#!" className="text-light">customer care</a>
              </li>
              <li>
                <a href="#!" className="text-light">career</a>
              </li>
              <li>
                <a href="#!" className="text-light">contact us 4</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Contact</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <p>Address: Example Address, City, Country</p>
              </li>
              <li>
                <p>Email: info@example.com</p>
              </li>
              <li>
                <p>Phone: +123 456 7890</p>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Social Media</h5>
            <ul className="list-unstyled mb-0 d-flex justify-content-center">
              <li className="mx-2">
                <a href="#!" className="text-dark"><FaFacebook size={24} /></a>
              </li>
              <li className="mx-2">
                <a href="#!" className="text-dark"><FaTwitter size={24} /></a>
              </li>
              <li className="mx-2">
                <a href="#!" className="text-dark"><FaInstagram size={24} /></a>
              </li>
              <li className="mx-2">
                <a href="#!" className="text-dark"><FaLinkedin size={24} /></a>
              </li>
            </ul>
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
