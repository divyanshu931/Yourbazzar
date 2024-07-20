import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import AdminLayout from '../components/layout/AdminLayout';

const OrderPage = ({ orders }) => {
  return (
    <AdminLayout>
      <div className="main-container">
      <h2 className="main-title">Order Control</h2>
          <div className="main-containers">
            <FaShoppingCart style={{ fontSize: '3rem', marginBottom: '20px' }} />
            <h1 style={{ fontSize: '1.5rem', color: 'black' }}>
              Till now No orders recorded. When anybody orders something, it will show here and we will also notify the admin.
            </h1>
          </div>
      
          <table className="category-table">
            <thead>
              <tr className="table-header">
                <th>S.No</th>
                <th>Customer Name</th>
                <th>Total Bill</th>
                <th>Address</th>
                <th>Date</th>
                <th>Order Mode</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
            
            </tbody>
          </table>
     
      </div>
    </AdminLayout>
  );
}

export default OrderPage;
