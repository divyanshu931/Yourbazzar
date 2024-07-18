import React from 'react';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Landing_2 from './components/Landing_2.jsx';
import Landing from './components/Landing';
import GetStart from './components/getStarted';
import SignIn from './components/signin';
import SignUp from './components/signup';
import Verification from './components/verification.jsx';


import OfferDetails from './Pages/offer_.jsx';
import Home from './Pages/home.jsx';
import ShoppingCart from './Pages/shopingcart.jsx';
import ProductDetailPage from './Pages/product_details.jsx';
import  Productbycategory from './Pages/categorybyname.jsx';
import AllOffers from './Pages/all-offer.jsx';



const NotFound = () => (
  <div style={{ textAlign: 'center', color: '#000' }}>
  <h1>404 Not Found</h1>
  <p>The page you are looking for does not exist.</p>
</div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/Landing_2" element={<Landing_2 />} />
            <Route path="/getStarted" element={<GetStart />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/verification" element={<Verification />} />
            {/* Add the route for OfferDetails */}
            <Route  path="/offer-details/:id" element={<OfferDetails />} />
            <Route  path="/offers" element={<AllOffers />} />
           
           
            <Route path="/category/:categoryName" element={<Productbycategory/>} />
            <Route path="/product-detail/:productId" element={<ProductDetailPage />} />
            <Route  path="/bag" element={<ShoppingCart />} />

           
       {/* Route for 404 Not Found */}
       <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
