import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/Cart.css';

const Cart = () => {
  // Initial cart state based on your example items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Classic Cappuccino',
      price: 4.99,
      quantity: 1,
      image: 'cappuccino.jpg'
    },
    {
      id: 2,
      name: 'Butter Croissant',
      price: 3.49,
      quantity: 2,
      image: 'croissant.jpg'
    }
  ]);

  const [summary, setSummary] = useState({
    subtotal: 0,
    tax: 0,
    deliveryFee: 2.00,
    total: 0
  });

  // Update totals whenever cart items change
  useEffect(() => {
    updateTotals();
  }, [cartItems]);

  const updateTotals = () => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.10;
    const total = subtotal + tax + summary.deliveryFee;

    setSummary({
      ...summary,
      subtotal,
      tax,
      total
    });
  };

  const updateQuantity = (id, change) => {
    setCartItems(items => 
      items.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  return (
    <>
      <nav className="navbar">
          <div className="logo">CafeConnect</div>
          <div className="navlinks">
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/about">About</Link>
            <a href="#contact">Contact</a>
            <Link to="/login">Login</Link>
            <Link to="/account">
              <FontAwesomeIcon icon={faUser} /> Account
            </Link>
          </div>
        </nav>

      <div className="cart-container">
        <h1 className="cart-title">Your Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="cart-grid">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="item-image-info">
                    <div className="item-name-display">
                      <h3>{item.name}</h3>
                      <h3 className="item-price-display">${(item.price * item.quantity).toFixed(2)}</h3>
                    </div>
                    <div className="item-subinfo">
                      <p className="item-price">${item.price.toFixed(2)}</p>
                      <div className="quantity-controls-container">
                        <div className="quantity-button-group">
                          <button 
                            className="quantity-btn decrease"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            -
                          </button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button 
                            className="quantity-btn increase"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                        <button 
                          className="remove-btn"
                          onClick={() => removeItem(item.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-summary">
              <h2 className="summary-title">Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${summary.subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>${summary.tax.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>${summary.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${summary.total.toFixed(2)}</span>
              </div>
              <button className="checkout-btn">
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-cart">
            <i className="fas fa-shopping-cart"></i>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/menu" className="continue-shopping">Continue Shopping</Link>
          </div>
        )}
      </div>

      <footer>
        <div className="footer-grid" id="contact">
          <div>
            <h3>About Us</h3>
            <p>Your perfect spot for great coffee and warm conversations.</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
          <div>
            <h3>Quick Links</h3>
            <p>Menu</p>
            <p>Locations</p>
            <p>Careers</p>
          </div>
          <div>
            <h3>Contact</h3>
            <p>123 Coffee Street</p>
            <p>contact@cafeconnect.com</p>
            <p>(555) 123-4567</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p>&copy; 2025 CafeConnect. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Cart;