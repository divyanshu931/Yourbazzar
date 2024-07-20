import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/layout_';

const FaqPage = () => {
  const faqs = [
    {
      question: 'How can I place an order?',
      answer: 'You can place an order by browsing our catalog, selecting the items you want, and proceeding to checkout.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards, PayPal, and cash on delivery (COD).'
    },
    {
      question: 'Do you offer delivery services?',
      answer: 'Yes, we offer delivery services within our delivery area. Delivery fees may apply depending on the distance.'
    },
    {
      question: 'Can I track my order?',
      answer: 'Yes, you will receive a tracking link once your order is confirmed and out for delivery.'
    },
    {
      question: 'What if I receive damaged items?',
      answer: 'Please contact our customer support immediately with a photo of the damaged items, and we will assist you with a replacement or refund.'
    },
    {
      question: 'Do you have a return policy?',
      answer: 'Yes, we have a return policy within 7 days of delivery for eligible items. Please refer to our Returns & Refunds page for more details.'
    },
    {
      question: 'How do I change or cancel my order?',
      answer: 'You can change or cancel your order by contacting our customer support before it has been processed. Once processed, changes may not be possible.'
    },
    {
      question: 'Are there any membership or loyalty programs available?',
      answer: 'Yes, we offer a loyalty program where you can earn points on purchases. Please visit our Loyalty Program page for more information.'
    },
    {
      question: 'What if an item I want is out of stock?',
      answer: 'If an item is out of stock, you can choose to receive a notification when it becomes available again or explore similar alternatives.'
    },
    {
      question: 'How can I contact customer support?',
      answer: 'You can contact our customer support team via email at support@yourbajaar.com or by phone at +123456789.'
    },
    {
      question: 'Do you offer bulk ordering discounts?',
      answer: 'Yes, we offer discounts on bulk orders. Please contact our sales team for more information on bulk pricing and discounts.'
    },
    {
      question: 'What safety measures do you take during delivery?',
      answer: 'Our delivery team follows strict hygiene and safety protocols to ensure your orders are delivered safely and securely.'
    }
  ];

  // State to manage animation class for each FAQ item
  const [animate, setAnimate] = useState(false);

  // useEffect to trigger animation when component mounts
  useEffect(() => {
    // Set animate to true after a short delay to trigger animation
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 200);

    // Clean up function to clear timeout
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Layout>
      <div className="faq-page" style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>FAQs</h1>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div className={`faq-item ${animate ? 'fade-in' : ''}`} key={index} style={{ animationDelay: `${index * 0.1}s` }}>
              <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{faq.question}</h3>
              <p style={{ fontSize: '16px' }}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FaqPage;
