import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import AdminLayout from '../components/layout/AdminLayout';

const OrderPage = ({ orders }) => {
  return (
    <AdminLayout>
    
        <div className="no-orders" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px', gridArea: 'main', overflowY: 'auto', padding: '20px', color: 'rgba(255, 255, 255, 0.95)' }}>
          <FaShoppingCart style={{ fontSize: '3rem', marginBottom: '20px' }} />
          <h1 style={{ fontSize: '1.5rem', color: 'black' }}>
            Till now No orders recorded. When anybody orders something, it will show here and we will also notify the admin.
          </h1>
        </div>
      
    </AdminLayout>
  );
}

export default OrderPage;
