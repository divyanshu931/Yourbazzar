import React from 'react';
import AdminLayout from './layout/AdminLayout';

function SellerSupport() {
  // Define inline styles
  const containerStyle = {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif'
  };

  const titleStyle = {
    textAlign: 'center',
    color: '#333' // Dark gray color for the title
  };

  const infoStyle = {
    marginBottom: '20px',
    color: '#000' // Black color for the contact info
  };

  const detailsStyle = {
    marginBottom: '20px',
    color: '#555' // Medium gray color for additional information
  };

  const paragraphStyle = {
    lineHeight: '1.6'
  };

  const emailStyle = {
    fontSize: '16px',
    color: '#000' // Black color for email and phone
  };

  const addressStyle = {
    fontSize: '14px',
    color: '#333' // Dark gray color for address
  };

  return (
    <AdminLayout>
      <div style={containerStyle}>
        <h2 style={titleStyle}>Seller Support</h2>
        <div style={infoStyle}>
          <h3>Contact Us</h3>
          <p style={emailStyle}><strong>Email:</strong> support@sellercompany.com</p>
          <p style={emailStyle}><strong>Phone:</strong> +123-456-7890</p>
          <p style={addressStyle}><strong>Address:</strong> 123 Seller St, Commerce City, CC 12345</p>
        </div>
        <div style={detailsStyle}>
          <h3>Additional Information</h3>
          <p style={paragraphStyle}>If you have any issues or need assistance with your account or products, please feel free to reach out to us using the contact details above. Our support team is available to help you with any inquiries you may have.</p>
        </div>
      </div>
    </AdminLayout>
  );
}

export default SellerSupport;
