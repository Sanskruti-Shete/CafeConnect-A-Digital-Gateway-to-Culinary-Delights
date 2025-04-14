import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowLeft, faCreditCard, faMoneyBill, faMobile } from '@fortawesome/free-solid-svg-icons';
import '../styles/Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [summary, setSummary] = useState({
    subtotal: 0,
    tax: 0,
    deliveryFee: 2.00,
    total: 0
  });
  
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    phoneNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Load cart data from localStorage when component mounts
  useEffect(() => {
    const loadCart = () => {
      const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(savedCart);
    };

    loadCart();

    // Add event listener for storage changes
    window.addEventListener('storage', loadCart);
    window.addEventListener('cartUpdate', loadCart);

    // Clean up event listener
    return () => {
      window.removeEventListener('storage', loadCart);
      window.removeEventListener('cartUpdate', loadCart);
    };
  }, []);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Basic validation
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP Code is required';
    
    // Payment method specific validation
    if (paymentMethod === 'credit-card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Card number must be 16 digits';
      
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) newErrors.expiryDate = 'Format must be MM/YY';
      
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
      else if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'CVV must be 3 or 4 digits';
    } else if (paymentMethod === 'mobile-payment') {
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      
      // Clear cart after successful payment
      localStorage.setItem('cart', JSON.stringify([]));
      window.dispatchEvent(new Event('cartUpdate'));
      
      // Redirect to confirmation page
      navigate('/confirmation', { 
        state: { 
          orderTotal: summary.total,
          orderItems: cartItems,
          paymentMethod
        } 
      });
    }, 2000);
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

      <div className="checkout-container">
        <div className="checkout-header">
          <Link to="/cart" className="back-to-cart">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Cart
          </Link>
          <h1>Checkout</h1>
        </div>

        {cartItems.length > 0 ? (
          <div className="checkout-grid">
            <div className="checkout-form-container">
              <form onSubmit={handleSubmit} className="checkout-form">
                <h2>Delivery Information</h2>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={errors.address ? 'error' : ''}
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={errors.city ? 'error' : ''}
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={errors.zipCode ? 'error' : ''}
                    />
                    {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                  </div>
                </div>

                <h2>Payment Method</h2>
                <div className="payment-methods">
                  <div 
                    className={`payment-method ${paymentMethod === 'credit-card' ? 'active' : ''}`}
                    onClick={() => handlePaymentMethodChange('credit-card')}
                  >
                    <FontAwesomeIcon icon={faCreditCard} />
                    <span>Credit Card</span>
                  </div>
                  <div 
                    className={`payment-method ${paymentMethod === 'cash' ? 'active' : ''}`}
                    onClick={() => handlePaymentMethodChange('cash')}
                  >
                    <FontAwesomeIcon icon={faMoneyBill} />
                    <span>Cash on Delivery</span>
                  </div>
                  <div 
                    className={`payment-method ${paymentMethod === 'mobile-payment' ? 'active' : ''}`}
                    onClick={() => handlePaymentMethodChange('mobile-payment')}
                  >
                    <FontAwesomeIcon icon={faMobile} />
                    <span>Mobile Payment</span>
                  </div>
                </div>

                {paymentMethod === 'credit-card' && (
                  <div className="credit-card-fields">
                    <div className="form-group">
                      <label htmlFor="cardNumber">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className={errors.cardNumber ? 'error' : ''}
                      />
                      {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="expiryDate">Expiry Date</label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className={errors.expiryDate ? 'error' : ''}
                        />
                        {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="cvv">CVV</label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className={errors.cvv ? 'error' : ''}
                        />
                        {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'mobile-payment' && (
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={errors.phoneNumber ? 'error' : ''}
                    />
                    {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="place-order-btn" 
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>

            <div className="order-summary checkout-summary">
              <h2 className="summary-title">Order Summary</h2>
              
              <div className="checkout-items">
                {cartItems.map((item) => (
                  <div className="checkout-item" key={item.id}>
                    <div className="item-info">
                      <span className="item-quantity">{item.quantity}x</span>
                      <span className="item-name">{item.name}</span>
                    </div>
                    <span className="item-price">{item.symbol || '$'}{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="divider"></div>
              
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
            </div>
          </div>
        ) : (
          <div className="empty-checkout">
            <h2>Your cart is empty</h2>
            <p>Add items to your cart before proceeding to checkout.</p>
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

export default Checkout;