import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages.jsx/home.jsx';
import Landing_2 from './components/Landing_2.jsx';
import Landing from './components/Landing';
import GetStart from './components/getStarted';
import SignIn from './components/signin';
import SignUp from './components/signup';
import Verification from './components/verification.jsx';
import OfferDetails from './components/offer_details'; // Import the OfferDetails component

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
            <Route path="/verification/:email" element={<Verification />} />
            {/* Add the route for OfferDetails */}
            <Route path="/offer-details/:id" element={<OfferDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
