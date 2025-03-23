import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faHeart, 
  faHandsHelping, 
  faLeaf, 
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebook, 
  faInstagram, 
  faTwitter 
} from '@fortawesome/free-brands-svg-icons';
import './About.css'; // Make sure to create this CSS file

class About extends React.Component {
  render() {
    return (
      <div className="about-container">
        {/* Navbar */}
        <nav className="navbar">
          <div className="logo">CafeConnect</div>
          <div className="nav-links">
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

        {/* Hero Section */}
        <section className="hero-about">
          <div className="hero-content">
            <h1 className="hero-title">Our Story</h1>
            <p>Crafting memorable moments, one cup at a time</p>
          </div>
        </section>

        {/* Story Section */}
        <section className="story-section">
          <div className="story-image">
            <img src="/images/shop.jpg" alt="Our Coffee Shop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="story-content">
            <h2>A Journey of Passion</h2>
            <p>Founded in 2020, CafeConnect emerged from a simple yet powerful vision: to create a space where exceptional coffee meets genuine community. Our journey began with a deep appreciation for the art of coffee-making and a desire to share that passion with others.</p>
            <br />
            <p>Today, we continue to honor that vision by sourcing the finest beans from sustainable farms worldwide, training our baristas in the art of coffee crafting, and creating an atmosphere where every customer feels at home.</p>
            <br />
            <p>Through the challenges of our early days during the pandemic, we adapted and innovated, introducing virtual coffee tastings and home brewing workshops. These initiatives not only helped us survive but strengthened our bonds with the community we serve.</p>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <h2 style={{ textAlign: 'center' }}>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <FontAwesomeIcon 
                icon={faHeart} 
                className="feature-icon" 
                style={{ fontSize: '40px', color: '#8b4513', marginBottom: '20px' }} 
              />
              <h3>Passion</h3>
              <p>We pour our heart into every cup, ensuring each drink tells a story of dedication and love for coffee.</p>
            </div>
            <div className="value-card">
              <FontAwesomeIcon 
                icon={faHandsHelping} 
                className="feature-icon" 
                style={{ fontSize: '40px', color: '#8b4513', marginBottom: '20px' }} 
              />
              <h3>Community</h3>
              <p>More than a coffee shop, we're a gathering place where connections are made and community thrives.</p>
            </div>
            <div className="value-card">
              <FontAwesomeIcon 
                icon={faLeaf} 
                className="feature-icon" 
                style={{ fontSize: '40px', color: '#8b4513', marginBottom: '20px' }} 
              />
              <h3>Sustainability</h3>
              <p>We're committed to ethical sourcing and environmental responsibility in every aspect of our operation.</p>
            </div>
            <div className="value-card">
              <FontAwesomeIcon 
                icon={faStar} 
                className="feature-icon" 
                style={{ fontSize: '40px', color: '#8b4513', marginBottom: '20px' }} 
              />
              <h3>Excellence</h3>
              <p>We strive for perfection in every detail, from bean selection to customer service.</p>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="timeline-section">
          <h2 style={{ textAlign: 'center' }}>Our Journey</h2>
          <div className="timeline">
            <div className="timeline-item">
              <h3>2020</h3>
              <p>CafeConnect opens its doors during challenging times</p>
            </div>
            <div className="timeline-item">
              <h3>2021</h3>
              <p>Launched virtual coffee workshops and home delivery service</p>
            </div>
            <div className="timeline-item">
              <h3>2022</h3>
              <p>Expanded our sustainable coffee sourcing program</p>
            </div>
            <div className="timeline-item">
              <h3>2023</h3>
              <p>Opened our second location and training center</p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <h2 style={{ textAlign: 'center' }}>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img src="/images/barista.jpg" alt="Sarah Johnson" className="member-image" />
              <h3>Sarah Johnson</h3>
              <p>Master Barista</p>
            </div>
            <div className="team-member">
              <img src="/images/chef.jpg" alt="Michael Chen" className="member-image" />
              <h3>Michael Chen</h3>
              <p>Head of Coffee</p>
            </div>
            <div className="team-member">
              <img src="/images/manager.jpg" alt="Emma Rodriguez" className="member-image" />
              <h3>Emma Rodriguez</h3>
              <p>Community Manager</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer>
          <div className="footer-grid contact">
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
              <Link to="/menu" className="quicklinks">Menu</Link><br />
              <Link to="#" className="quicklinks">Locations</Link><br />
              <Link to="/careers" className="quicklinks">Careers</Link>
            </div>
            <div id="contact">
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
      </div>
    );
  }
}

export default About;