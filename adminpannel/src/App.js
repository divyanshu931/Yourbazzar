import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import AdminDashboard from './Adminpages/admin';
import AdminControl from './Adminpages/admincontrol';
import CategoryDashboard from './Adminpages/admincaterogy';
import CustomerDashboard from './Adminpages/admincustomer';
import OfferDashboard from './Adminpages/adminoffer';
import AdminProduct from './Adminpages/adminProduct';
import SignIn from './components/signin';
import OrderPage from './Adminpages/adminorder';
import AddProductForm from './components/addproduct';
import AddCategoryForm from './components/add caterogy';
import AddOffer from './components/addoffer';



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
        {/* Define your routes inside the <Routes> component */}
        <Routes>
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/product-dashboard" element={<AdminProduct />} />
          <Route path="/admin-control" element={<AdminControl />} />
          <Route path="/category-dashboard" element={<CategoryDashboard />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/offer-dashboard" element={<OfferDashboard />} />
          <Route path="/order-dashboard" element={<OrderPage/>} />
          <Route path="/product/add" element={<AddProductForm/>} />
          <Route path="/category/add" element={<AddCategoryForm/>} />
          <Route path="/offer/add" element={<AddOffer/>} />
          <Route path='/' element={<SignIn/>}/>


            {/* Route for 404 Not Found */}
       <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
