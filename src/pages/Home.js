import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCoffee, 
  faWifi, 
  faClock, 
  faSeedling, 
  faRecycle, 
  faSolarPanel, 
  faHandsHelping, 
  faUser, 
  faDharmachakra 
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebook, 
  faInstagram, 
  faTwitter 
} from '@fortawesome/free-brands-svg-icons';

// You would need to create these CSS files or convert to styled components
import './Home.css';
import './Chatbot.css';
import './Wheel.css';

class CoffeShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChatOpen: false,
      isWheelOpen: false,
      wheelSpinning: false,
      prize: '',
      chatMessages: []
    };
  }

  toggleChat = () => {
    this.setState(prevState => ({
      isChatOpen: !prevState.isChatOpen
    }));
  }

  toggleWheel = () => {
    this.setState(prevState => ({
      isWheelOpen: !prevState.isWheelOpen
    }));
  }

  spinWheel = () => {
    if (this.state.wheelSpinning) return;
    
    this.setState({ wheelSpinning: true });
    
    const prizes = [
      'Free Coffee',
      '10% OFF',
      'Buy 1 Get 1',
      'Free Pastry',
      '15% OFF',
      'Free Dessert'
    ];
    
    // Random prize selection
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const selectedPrize = prizes[randomIndex];
    
    // Simulate wheel spinning
    setTimeout(() => {
      this.setState({
        wheelSpinning: false,
        prize: selectedPrize
      });
      
      document.getElementById('wheel-result').style.display = 'block';
      document.getElementById('prize').textContent = selectedPrize;
      document.getElementById('coupon-title').textContent = selectedPrize.toUpperCase();
    }, 3000);
  }

  sendChatMessage = () => {
    const inputElement = document.getElementById('chat-input');
    const message = inputElement.value.trim();
    
    if (message !== '') {
      const newMessage = {
        text: message,
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      this.setState(prevState => ({
        chatMessages: [...prevState.chatMessages, newMessage]
      }), () => {
        // Auto reply after a small delay
        setTimeout(() => {
          this.handleBotReply(message);
        }, 1000);
      });
      
      inputElement.value = '';
    }
  }

  handleBotReply = (userMessage) => {
    // Simple bot logic - could be expanded or connected to an API
    let botResponse = "Thanks for your message! Our team will get back to you soon.";
    
    if (userMessage.toLowerCase().includes('menu')) {
      botResponse = "You can check our full menu in the Menu section. We offer a variety of coffees, teas, and pastries!";
    } else if (userMessage.toLowerCase().includes('hour')) {
      botResponse = "We're open daily from 7am to 9pm!";
    } else if (userMessage.toLowerCase().includes('location')) {
      botResponse = "Our main location is at 123 Coffee Street. You can find all our locations in the Locations section.";
    }
    
    const botMessage = {
      text: botResponse,
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    this.setState(prevState => ({
      chatMessages: [...prevState.chatMessages, botMessage]
    }));
  }

  componentDidMount() {
    // Initialize event listeners or other setup if needed
  }

  render() {
    const { isChatOpen, isWheelOpen, wheelSpinning, chatMessages, prize } = this.state;
    
    return (
      <div className="coffee-shop">
        <div className="coffee-bean"></div>
        <div className="coffee-bean"></div>
        <div className="coffee-bean"></div>

        {/* Navbar */}
        <nav className="navbar">
          <div className="logo">CafeConnect</div>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/menu">Menu</a>
            <a href="/about">About</a>
            <a href="#contact">Contact</a>
            <a href="/login">Login</a>
            <a href="/account"><FontAwesomeIcon icon={faUser} /> Account</a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Moments Begin With A Perfect Brew</h1>
            <p>More than just coffee, it's a destination for your senses. Experience the perfect blend of artisanal coffee and modern ambiance.</p>
            <div className="button-container">
              <button className="hero-btn">
                <a href="/menu" style={{ textDecoration: 'none', color: 'white' }}>Order Now</a>
              </button>
              <button className="hero-btn reserve-btn">
                <a href="/reserve" style={{ textDecoration: 'none', color: 'white' }}>Reserve a Table</a>
              </button>
            </div>
          </div>
        </section>

        <img src="/coffee1.png" alt="Coffee Cup" id="coffee1" />
        <img src="/coffee2.png" alt="Coffee Beans" id="coffee2" />

        {/* Products Section */}
        <section className="products">
          <h2 className="section-title">Our Bestsellers</h2>
          <div className="product-grid">
            <div className="product-card">
              <img src="/cappuccino.jpg" alt="Cappuccino" className="product-image" />
              <h3>Classic Cappuccino</h3>
              <p>$4.99</p>
            </div>
            <div className="product-card">
              <img src="/latte.jpg" alt="Latte" className="product-image" />
              <h3>Caramel Latte</h3>
              <p>$5.49</p>
            </div>
            <div className="product-card">
              <img src="/espresso.jpg" alt="Espresso" className="product-image" />
              <h3>Double Espresso</h3>
              <p>$3.99</p>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="reviews">
          <h2 className="section-title">Customer Reviews</h2>
          <div className="review-slider">
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <p>"Best coffee shop in town! The atmosphere is perfect for both work and relaxation."</p>
              <h4>- Sarah Johnson</h4>
            </div>
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <p>"Their cappuccino is absolutely divine. I visit every morning before work!"</p>
              <h4>- Mike Thompson</h4>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <FontAwesomeIcon icon={faCoffee} className="feature-icon" />
              <h3>Premium Coffee</h3>
              <p>Sourced from the finest beans worldwide</p>
            </div>
            <div className="feature-card">
              <FontAwesomeIcon icon={faWifi} className="feature-icon" />
              <h3>Free Wi-Fi</h3>
              <p>Stay connected while you enjoy</p>
            </div>
            <div className="feature-card">
              <FontAwesomeIcon icon={faClock} className="feature-icon" />
              <h3>Quick Service</h3>
              <p>Your order ready in minutes</p>
            </div>
          </div>
        </section>

        {/* Eco-Friendly Initiatives Section */}
        <section className="eco-section">
          <h2 className="section-title">Our Eco-Friendly Initiatives</h2>
          <p className="section-intro">
            At CafeConnect, sustainability isn't just a buzzword—it's woven into every aspect of our operations. 
            We're committed to reducing our environmental footprint while serving you the perfect cup of coffee.
            Here's how we're making a difference, one cup at a time.
          </p>

          <div className="eco-grid">
            {/* Sustainable Sourcing */}
            <div className="eco-card">
              <FontAwesomeIcon icon={faSeedling} className="eco-icon" />
              <h3 className="eco-title">Sustainable Sourcing</h3>
              <p className="eco-description">
                We partner directly with small-scale farmers who practice sustainable agriculture. 
                Our beans are 100% organic, shade-grown, and Rainforest Alliance certified. 
                We pay premium prices to ensure fair wages and sustainable farming practices.
              </p>
              <div className="eco-stats">
                <div className="eco-stat">94%</div>
                <p>of our coffee is sustainably sourced</p>
                <div className="eco-progress">
                  <div className="eco-progress-bar" style={{ width: '94%' }}></div>
                </div>
              </div>
              <div className="eco-badges">
                <span className="eco-badge">Rainforest Alliance</span>
                <span className="eco-badge">Fair Trade</span>
                <span className="eco-badge">Organic</span>
              </div>
            </div>

            {/* Zero Waste */}
            <div className="eco-card">
              <FontAwesomeIcon icon={faRecycle} className="eco-icon" />
              <h3 className="eco-title">Zero Waste Program</h3>
              <p className="eco-description">
                Our comprehensive recycling program ensures minimal waste. We've eliminated single-use plastics, 
                implemented compostable packaging, and partner with local gardens to compost coffee grounds. 
                Bring your own cup and get 50¢ off your drink!
              </p>
              <div className="eco-stats">
                <div className="eco-stat">85%</div>
                <p>waste reduction since 2023</p>
                <div className="eco-progress">
                  <div className="eco-progress-bar" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="eco-badges">
                <span className="eco-badge">Compostable</span>
                <span className="eco-badge">Zero Plastic</span>
                <span className="eco-badge">Local Composting</span>
              </div>
            </div>

            {/* Energy & Water */}
            <div className="eco-card">
              <FontAwesomeIcon icon={faSolarPanel} className="eco-icon" />
              <h3 className="eco-title">Energy & Water Conservation</h3>
              <p className="eco-description">
                Our stores are powered by 100% renewable energy through solar panels and wind credits. 
                We've installed water-efficient fixtures and use innovative cleaning methods that reduce 
                water consumption while maintaining the highest cleanliness standards.
              </p>
              <div className="eco-stats">
                <div className="eco-stat">40%</div>
                <p>reduction in water usage since 2023</p>
                <div className="eco-progress">
                  <div className="eco-progress-bar" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div className="eco-badges">
                <span className="eco-badge">Solar Powered</span>
                <span className="eco-badge">Water Efficient</span>
                <span className="eco-badge">LED Lighting</span>
              </div>
            </div>

            {/* Community Impact */}
            <div className="eco-card">
              <FontAwesomeIcon icon={faHandsHelping} className="eco-icon" />
              <h3 className="eco-title">Community Impact</h3>
              <p className="eco-description">
                We actively engage with local communities through educational programs about sustainability. 
                Our monthly beach cleanups and tree planting initiatives have helped create greener neighborhoods. 
                Join us in making a difference!
              </p>
              <div className="eco-stats">
                <div className="eco-stat">5K+</div>
                <p>trees planted in local communities</p>
                <div className="eco-progress">
                  <div className="eco-progress-bar" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div className="eco-badges">
                <span className="eco-badge">Local Events</span>
                <span className="eco-badge">Education</span>
                <span className="eco-badge">Community Service</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact" id="contact">
          <h2 className="section-title">Contact Us</h2>
          <div className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Your Name" />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" rows="5"></textarea>
            </div>
            <button className="submit-btn">Send Message</button>
          </div>
        </section>

        {/* Footer */}
        <footer>
          <div className="footer-grid">
            <div>
              <h3>About Us</h3>
              <p>Your perfect spot for great coffee and warm conversations.</p>
              <div className="social-links">
                <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
                <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
                <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
              </div>
            </div>
            <div>
              <h3>Quick Links</h3>
              <a href="/menu" className="quicklinks">Menu</a><br />
              <a href="/location" className="quicklinks">Locations</a><br />
              <a href="/careers" className="quicklinks">Careers</a>
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

        {/* Chatbot Icon */}
        <div className="chat-icon" onClick={this.toggleChat}>
          <FontAwesomeIcon icon={faCoffee} />
        </div>
        
        {/* Chat Window */}
        <div className="chat-container" style={{ display: isChatOpen ? 'block' : 'none' }}>
          <div className="chat-header">
            <h3>CafeConnect Assistant</h3>
            <span onClick={this.toggleChat} style={{ cursor: 'pointer', fontSize: '20px' }}>×</span>
          </div>
          <div className="chat-body">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}-message`}>
                <div className="message-content">{msg.text}</div>
                <div className="message-time">{msg.time}</div>
              </div>
            ))}
          </div>
          <div className="chat-input-container">
            <input 
              type="text" 
              id="chat-input" 
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && this.sendChatMessage()} 
            />
            <button onClick={this.sendChatMessage}>Send</button>
          </div>
        </div>

        {/* Spin Wheel Icon */}
        <div className="wheel-icon" onClick={this.toggleWheel}>
          <FontAwesomeIcon icon={faDharmachakra} />
          <span className="wheel-label">Spin & Win</span>
        </div>
        
        {/* Spin Wheel Popup Container */}
        <div className="wheel-popup" style={{ display: isWheelOpen ? 'block' : 'none' }}>
          <div className="wheel-popup-content">
            <span onClick={this.toggleWheel} className="close-wheel">&times;</span>
            
            <div className="wheel-header">
              <h2>Spin to Win!</h2>
              <p>Try your luck and win exclusive coffee offers</p>
            </div>
            
            <div className="wheel-container">
              <div 
                className={`wheel ${wheelSpinning ? 'spinning' : ''}`}
                style={{ transform: wheelSpinning ? 'rotate(1440deg)' : 'rotate(0deg)' }}
              >
                <div className="wheel-section" style={{ '--i': 1, '--color': '#8b4513' }}>
                  <span>Free Coffee</span>
                </div>
                <div className="wheel-section" style={{ '--i': 2, '--color': '#a05a2c' }}>
                  <span>10% OFF</span>
                </div>
                <div className="wheel-section" style={{ '--i': 3, '--color': '#8b4513' }}>
                  <span>Buy 1 Get 1</span>
                </div>
                <div className="wheel-section" style={{ '--i': 4, '--color': '#a05a2c' }}>
                  <span>Free Pastry</span>
                </div>
                <div className="wheel-section" style={{ '--i': 5, '--color': '#8b4513' }}>
                  <span>15% OFF</span>
                </div>
                <div className="wheel-section" style={{ '--i': 6, '--color': '#a05a2c' }}>
                  <span>Free Dessert</span>
                </div>
              </div>
              <div className="wheel-arrow"></div>
              <button onClick={this.spinWheel} className="spin-btn" disabled={wheelSpinning}>
                SPIN
              </button>
            </div>
            
            <div className="wheel-result" style={{ display: prize ? 'block' : 'none' }}>
              <h3>Congratulations!</h3>
              <p id="prize-text">You won: <span id="prize">{prize}</span></p>
              <div className="coupon">
                <div className="coupon-content">
                  <h4 id="coupon-title">{prize.toUpperCase()}</h4>
                  <p>Use code: <span id="coupon-code">CAFEWIN2025</span></p>
                  <p className="coupon-expiry">Valid for 24 hours</p>
                </div>
              </div>
              <button className="claim-btn">Claim Your Prize</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CoffeShop;