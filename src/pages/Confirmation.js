import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHouse } from '@fortawesome/free-solid-svg-icons';
import '../styles/Confirmation.css';

const Confirmation = () => {
  const location = useLocation();
  
  // If user navigates directly to this page without order data, redirect to home
  if (!location.state || !location.state.orderTotal) {
    return <Navigate to="/" />;
  }
  
  const { orderTotal, orderItems, paymentMethod } = location.state;
  const orderNumber = generateOrderNumber();
  const estimatedDeliveryTime = getEstimatedDeliveryTime();
  
  function generateOrderNumber() {
    return 'CC' + Math.floor(100000 + Math.random() * 900000);
  }
  
  function getEstimatedDeliveryTime() {
    const now = new Date();
    const deliveryTime = new Date(now.getTime() + 30 * 60000); // Add 30 minutes
    return deliveryTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  function getPaymentMethodText(method) {
    switch(method) {
      case 'credit-card':
        return 'Credit Card';
      case 'cash':
        return 'Cash on Delivery';
      case 'mobile-payment':
        return 'Mobile Payment';
      default:
        return 'Online Payment';
    }
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="confirmation-header">
          <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
          <h1>Order Confirmed!</h1>
          <p>Thank you for your order at CafeConnect</p>
        </div>
        
        <div className="order-details">
          <div className="detail-row">
            <span className="detail-label">Order Number:</span>
            <span className="detail-value">{orderNumber}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Payment Method:</span>
            <span className="detail-value">{getPaymentMethodText(paymentMethod)}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Estimated Delivery:</span>
            <span className="detail-value">Today by {estimatedDeliveryTime}</span>
          </div>
          <div className="detail-row total">
            <span className="detail-label">Total Amount:</span>
            <span className="detail-value">${orderTotal.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="order-items">
          <h2>Order Summary</h2>
          {orderItems.map((item, index) => (
            <div className="item-row" key={index}>
              <div className="item-detail">
                <span className="item-quantity">{item.quantity}x</span>
                <span className="item-name">{item.name}</span>
              </div>
              <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <div className="confirmation-actions">
          <Link to="/" className="home-button">
            <FontAwesomeIcon icon={faHouse} /> Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;