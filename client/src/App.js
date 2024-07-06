import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages.jsx/home.jsx';
import Landing_2 from './components/Landing_2.jsx';
import Landing from './components/Landing';
import GetStart from './components/getStarted';
import SignIn from './components/signin';
import SignUp from './components/signup';
import Verification from './components/verification.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/Landing_2" element={<Landing_2 />} />
            <Route exact path="/getStarted" element={<GetStart />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/verification/:email" element={<Verification />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
