import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTrash } from '@fortawesome/free-solid-svg-icons';
// Removed external CSS import since we're using inline styles

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [summary, setSummary] = useState({
    subtotal: 0,
    tax: 0,
    deliveryFee: 2.00,
    total: 0
  });
  const [personalization, setPersonalization] = useState({
    name: '',
    fontStyle: 'Arial',
    fontSize: 'medium'
  });

  // Load cart data from localStorage when component mounts
  useEffect(() => {
    const loadCart = () => {
      const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(savedCart);
      
      // Load personalization if available
      const savedPersonalization = JSON.parse(localStorage.getItem('personalization'));
      if (savedPersonalization) {
        setPersonalization(savedPersonalization);
      }
    };

    loadCart();

    // Add event listener for storage changes
    window.addEventListener('storage', loadCart);

    // Clean up event listener
    return () => {
      window.removeEventListener('storage', loadCart);
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

  const updateQuantity = (id, change) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    });

    setCartItems(updatedCart);
    
    // Update localStorage and trigger storage event
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdate'));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    
    setCartItems(updatedCart);
    
    // Update localStorage and trigger storage event
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdate'));
  };

  const handlePersonalizationChange = (e) => {
    const { name, value } = e.target;
    const updatedPersonalization = { ...personalization, [name]: value };
    
    setPersonalization(updatedPersonalization);
    localStorage.setItem('personalization', JSON.stringify(updatedPersonalization));
  };

  // Check if cart has coffee items
  const hasCoffeeItems = cartItems.some(item => 
    item.category === 'coffee' || 
    item.name.toLowerCase().includes('coffee') ||
    item.name.toLowerCase().includes('latte') ||
    item.name.toLowerCase().includes('espresso') ||
    item.name.toLowerCase().includes('cappuccino')
  );

  // Inline styles
  const styles = {
    // Navigation styles
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#8B4513',
      color: '#fff',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      letterSpacing: '1px'
    },
    navlinks: {
      display: 'flex',
      gap: '1.5rem'
    },
    navlink: {
      color: '#fff',
      textDecoration: 'none',
      fontWeight: '500',
      transition: 'color 0.3s ease'
    },

    // Cart container styles
    cartContainer: {
      maxWidth: '1200px',
      margin: '2rem auto',
      padding: '0 1rem'
    },
    cartTitle: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
      color: '#333'
    },
    cartGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem'
    },

    // Cart item styles - improved visibility
    cartItems: {
      gridColumn: '1 / span 2',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    cartItem: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1rem',
      border: '1px solid #e0e0e0'
    },
    itemImageInfo: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    },
    itemNameDisplay: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
      borderBottom: '1px solid #f0f0f0',
      paddingBottom: '0.75rem'
    },
    itemName: {
      fontSize: '1.3rem',
      margin: '0',
      fontWeight: '600',
      color: '#333333' // Darker text color for better contrast
    },
    itemPriceDisplay: {
      fontSize: '1.3rem',
      fontWeight: 'bold',
      margin: '0',
      color: '#333333' // Darker text color for better contrast
    },
    itemSubinfo: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    itemPrice: {
      margin: '0',
      color: '#333333', // Darker color for better visibility
      fontWeight: '500',
      fontSize: '1.1rem'
    },
    
    // Quantity controls with improved visibility
    quantityControlsContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem'
    },
    quantityButtonGroup: {
      display: 'flex',
      alignItems: 'center',
      border: '1px solid #ccc', // Darker border
      borderRadius: '4px',
      overflow: 'hidden'
    },
    quantityBtn: {
      border: 'none',
      backgroundColor: '#f0f0f0', // Slightly darker background
      padding: '0.4rem 0.9rem',
      cursor: 'pointer',
      fontSize: '1.1rem',
      transition: 'background-color 0.2s',
      color: '#333', // Ensuring text color is visible
      fontWeight: 'bold'
    },
    quantityDisplay: {
      padding: '0 1rem',
      fontSize: '1rem',
      color: '#333', // Ensuring text color is visible
      fontWeight: '500'
    },
    removeBtn: {
      background: 'none',
      border: 'none',
      color: '#dc3545', // Bright red for good visibility
      cursor: 'pointer',
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem',
      padding: '6px 12px', // Add some padding
      borderRadius: '4px', // Rounded corners
      transition: 'background-color 0.2s',
      fontWeight: '500', // Added weight for visibility
      border: '1px solid #ffcccb'
    },

    // Personalization section styles
    personalizationSection: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
    },
    personalizationTitle: {
      fontSize: '1.5rem',
      marginBottom: '0.5rem',
      color: '#333',
      fontWeight: 'bold'
    },
    personalizationSubtitle: {
      color: '#333',
      marginBottom: '1.5rem',
      fontSize: '1rem'
    },
    personalizationForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginBottom: '1.5rem'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    label: {
      fontWeight: '500',
      color: '#333',
      fontSize: '1rem'
    },
    input: {
      padding: '0.7rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      color: '#333'
    },
    select: {
      padding: '0.7rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      backgroundColor: '#fff',
      color: '#333'
    },
    cupPreview: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1.5rem',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      marginTop: '1rem'
    },
    coffeeCup: {
      width: '120px',
      height: '160px',
      background: 'linear-gradient(to right, #8B4513, #A0522D)',
      borderRadius: '0 0 60px 60px',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
      boxShadow: '0 4px 12px rgba(160, 82, 45, 0.5)'
    },
    cupName: {
      textAlign: 'center',
      padding: '0.5rem',
      maxWidth: '100px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
    },

    // Order summary styles - improved visibility
    orderSummary: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      alignSelf: 'flex-start',
      border: '1px solid #e0e0e0'
    },
    summaryTitle: {
      fontSize: '1.5rem',
      marginBottom: '1.5rem',
      color: '#333333', // Darker for better contrast
      fontWeight: 'bold',
      borderBottom: '1px solid #eaeaea',
      paddingBottom: '0.75rem'
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem',
      fontSize: '1.1rem',
      color: '#333333', // Darker for better visibility
      padding: '0.3rem 0'
    },
    summaryRowTotal: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '1rem',
      paddingTop: '1rem',
      borderTop: '1px solid #ccc', // Darker border
      fontSize: '1.3rem',
      fontWeight: 'bold',
      color: '#111111' // Almost black for maximum contrast
    },
    checkoutBtn: {
      display: 'block',
      width: '100%',
      padding: '0.9rem',
      backgroundColor: '#8B4513',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1.1rem',
      fontWeight: '600',
      textAlign: 'center',
      textDecoration: 'none',
      cursor: 'pointer',
      marginTop: '1.5rem',
      transition: 'background-color 0.2s',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    },

    // Empty cart styles
    emptyCart: {
      textAlign: 'center',
      padding: '3rem 1rem',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
    },
    emptyCartIcon: {
      fontSize: '3rem',
      color: '#8B4513',
      marginBottom: '1rem'
    },
    emptyCartTitle: {
      fontSize: '1.5rem',
      marginBottom: '0.5rem',
      color: '#333'
    },
    emptyCartText: {
      color: '#333',
      marginBottom: '1.5rem',
      fontSize: '1.1rem'
    },
    continueShopping: {
      display: 'inline-block',
      padding: '0.75rem 1.5rem',
      backgroundColor: '#8B4513',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      fontWeight: '500'
    },

    // Footer styles
    footer: {
      backgroundColor: '#333',
      color: '#fff',
      padding: '2rem 1rem',
      marginTop: '3rem'
    },
    footerGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    footerTitle: {
      fontSize: '1.2rem',
      marginBottom: '1rem',
      fontWeight: '600',
      color: '#fff'
    },
    footerText: {
      color: '#ddd',
      lineHeight: '1.6'
    },
    socialLinks: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1rem'
    },
    socialIcon: {
      color: '#fff',
      fontSize: '1.5rem',
      transition: 'color 0.2s'
    },
    footerBottom: {
      textAlign: 'center',
      paddingTop: '20px',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      marginTop: '2rem',
      color: '#ddd'
    }
  };

  return (
    <>
      <nav style={styles.navbar}>
        <div style={styles.logo}>CafeConnect</div>
        <div style={styles.navlinks}>
          <Link to="/" style={styles.navlink}>Home</Link>
          <Link to="/menu" style={styles.navlink}>Menu</Link>
          <Link to="/about" style={styles.navlink}>About</Link>
          <a href="#contact" style={styles.navlink}>Contact</a>
          <Link to="/login" style={styles.navlink}>Login</Link>
          <Link to="/account" style={styles.navlink}>
            <FontAwesomeIcon icon={faUser} /> Account
          </Link>
        </div>
      </nav>

      <div style={styles.cartContainer}>
        <h1 style={styles.cartTitle}>Your Cart</h1>
        
        {cartItems.length > 0 ? (
          <div style={styles.cartGrid}>
            <div style={styles.cartItems}>
              {cartItems.map((item) => (
                <div style={styles.cartItem} key={item.id}>
                  <div style={styles.itemImageInfo}>
                    <div style={styles.itemNameDisplay}>
                      <h3 style={styles.itemName}>{item.name}</h3>
                      <h3 style={styles.itemPriceDisplay}>
                        {item.symbol || '$'}{(item.price * item.quantity).toFixed(2)}
                      </h3>
                    </div>
                    <div style={styles.itemSubinfo}>
                      <p style={styles.itemPrice}>{item.symbol || '$'}{item.price.toFixed(2)}</p>
                      <div style={styles.quantityControlsContainer}>
                        <div style={styles.quantityButtonGroup}>
                          <button 
                            style={{...styles.quantityBtn, borderRight: '1px solid #ccc'}}
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            -
                          </button>
                          <span style={styles.quantityDisplay}>{item.quantity}</span>
                          <button 
                            style={{...styles.quantityBtn, borderLeft: '1px solid #ccc'}}
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                        <button 
                          style={styles.removeBtn}
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

            {hasCoffeeItems && (
              <div style={styles.personalizationSection}>
                <h2 style={styles.personalizationTitle}>Personalize Your Cup</h2>
                <p style={styles.personalizationSubtitle}>We'll print your name on your coffee cup!</p>
                
                <div style={styles.personalizationForm}>
                  <div style={styles.formGroup}>
                    <label htmlFor="name" style={styles.label}>Name on Cup:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={personalization.name}
                      onChange={handlePersonalizationChange}
                      placeholder="Enter your name"
                      maxLength="20"
                      style={styles.input}
                    />
                  </div>
                  
                  <div style={styles.formGroup}>
                    <label htmlFor="fontStyle" style={styles.label}>Font Style:</label>
                    <select
                      id="fontStyle"
                      name="fontStyle"
                      value={personalization.fontStyle}
                      onChange={handlePersonalizationChange}
                      style={styles.select}
                    >
                      <option value="Arial">Arial</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Courier New">Courier New</option>
                      <option value="Verdana">Verdana</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Brush Script MT">Brush Script</option>
                    </select>
                  </div>
                  
                  <div style={styles.formGroup}>
                    <label htmlFor="fontSize" style={styles.label}>Font Size:</label>
                    <select
                      id="fontSize"
                      name="fontSize"
                      value={personalization.fontSize}
                      onChange={handlePersonalizationChange}
                      style={styles.select}
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                </div>
                
                <div style={styles.cupPreview}>
                  <div style={styles.coffeeCup}>
                    <div 
                      style={{ 
                        ...styles.cupName,
                        fontFamily: personalization.fontStyle, 
                        fontSize: personalization.fontSize === 'small' ? '14px' : 
                                personalization.fontSize === 'medium' ? '18px' : '22px'
                      }}
                    >
                      {personalization.name || 'Your Name'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div style={styles.orderSummary}>
              <h2 style={styles.summaryTitle}>Order Summary</h2>
              <div style={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${summary.subtotal.toFixed(2)}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Tax</span>
                <span>${summary.tax.toFixed(2)}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Delivery Fee</span>
                <span>${summary.deliveryFee.toFixed(2)}</span>
              </div>
              <div style={styles.summaryRowTotal}>
                <span>Total</span>
                <span>${summary.total.toFixed(2)}</span>
              </div>
              <Link to="/checkout" style={styles.checkoutBtn}>
                Proceed to Checkout
              </Link>
            </div>
          </div>
        ) : (
          <div style={styles.emptyCart}>
            <i className="fas fa-shopping-cart" style={styles.emptyCartIcon}></i>
            <h2 style={styles.emptyCartTitle}>Your cart is empty</h2>
            <p style={styles.emptyCartText}>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/menu" style={styles.continueShopping}>Continue Shopping</Link>
          </div>
        )}
      </div>

      <footer style={styles.footer}>
        <div style={styles.footerGrid} id="contact">
          <div>
            <h3 style={styles.footerTitle}>About Us</h3>
            <p style={styles.footerText}>Your perfect spot for great coffee and warm conversations.</p>
            <div style={styles.socialLinks}>
              <a href="#" style={styles.socialIcon}><i className="fab fa-facebook"></i></a>
              <a href="#" style={styles.socialIcon}><i className="fab fa-instagram"></i></a>
              <a href="#" style={styles.socialIcon}><i className="fab fa-twitter"></i></a>
            </div>
          </div>
          <div>
            <h3 style={styles.footerTitle}>Quick Links</h3>
            <p style={styles.footerText}>Menu</p>
            <p style={styles.footerText}>Locations</p>
            <p style={styles.footerText}>Careers</p>
          </div>
          <div>
            <h3 style={styles.footerTitle}>Contact</h3>
            <p style={styles.footerText}>123 Coffee Street</p>
            <p style={styles.footerText}>contact@cafeconnect.com</p>
            <p style={styles.footerText}>(555) 123-4567</p>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p>&copy; 2025 CafeConnect. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Cart;