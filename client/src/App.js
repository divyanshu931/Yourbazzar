import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar'; // Import Sidebar
import Cookies from 'universal-cookie'; // Import universal-cookie

import Landing_2 from './components/Landing_2.jsx';
import Landing from './components/Landing';
import GetStart from './components/getStarted';
import SignIn from './components/signin';
import SignUp from './components/signup';
import Verification from './components/verification.jsx';
import OfferDetails from './Pages/offer_.jsx';
import Home from './Pages/home.jsx';
import Buynow from './Pages/shopingcart.jsx';
import ProductDetailPage from './Pages/product_details.jsx';
import Productbycategory from './Pages/categorybyname.jsx';
import AllOffers from './Pages/all-offer.jsx';
import FaqPage from './Pages/FQA.jsx';
import SignOut from './components/signout.jsx'; // Import SignOut component
import Search from './Pages/sreach.jsx';

const NotFound = () => (
  <div style={{ textAlign: 'center', color: '#000' }}>
    <h1>404 Not Found</h1>
    <p>The page you are looking for does not exist.</p>
  </div>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const cookies = new Cookies(); // Instantiate Cookies

  useEffect(() => {
    // Check if authentication token is present in cookies
    const token = cookies.get('token');
    setIsAuthenticated(!!token); // Set authentication state based on token presence
  }, [cookies]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="App">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isAuthenticated={isAuthenticated} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/Landing_2" element={<Landing_2 />} />
            <Route path="/search" element={<Search />} />
            <Route path="/getStarted" element={<GetStart />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/offer-details/:id" element={<OfferDetails />} />
            <Route path="/offers" element={<AllOffers />} />
            <Route path="/category/:categoryName" element={<Productbycategory />} />
            <Route path="/product-detail/:productId" element={<ProductDetailPage />} />
            <Route path="/buy/:productId" element={<Buynow />} />
            <Route path="/FAQ" element={<FaqPage />} />
            <Route path="/signout" element={<SignOut />} /> {/* Add the SignOut route */}
            <Route path="*" element={<NotFound />} /> {/* Route for 404 Not Found */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
