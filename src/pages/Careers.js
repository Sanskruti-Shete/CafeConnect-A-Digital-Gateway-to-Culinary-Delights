import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMapMarkerAlt,
  faMugHot,
  faHeart,
  faGraduationCap,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import "../styles/Careers.css";

class Careers extends Component {
  render() {
    return (
      <div className="careersbody">
        <div className="careerspage">
          {/* Navbar */}
          <nav className="navbar">
            <div className="logo">CafeConnect</div>
            <div className="navlinks">
              <a href="/">Home</a>
              <a href="/menu">Menu</a>
              <a href="/about">About</a>
              <a href="#contact">Contact</a>
              <a href="/login">Login</a>
              <a href="/account">
                <FontAwesomeIcon icon={faUser} /> Account
              </a>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="hero3">
            <div className="herocontent3">
              <h1>Join Our Team</h1>
              <p>
                Be part of a passionate community dedicated to crafting
                exceptional coffee experiences. We're always looking for
                talented individuals who share our love for coffee and service
                excellence.
              </p>
              <a href="#openings" className="applybtn">
                View Open Positions
              </a>
            </div>
          </section>

          {/* Job Openings */}
          <section className="maincontent">
            <h2 className="sectiontitle" id="openings">
              Current Openings
            </h2>
            <div className="jobsgrid">
              {this.renderJobCard(
                "Barista",
                "Downtown Location",
                "Join us as a barista and create exceptional coffee experiences. You will craft perfect drinks, provide outstanding customer service, and be part of a dynamic team."
              )}

              {this.renderJobCard(
                "Shift Supervisor",
                "Multiple Locations",
                "Lead and inspire our team while ensuring smooth cafe operations. Perfect for those with leadership experience and passion for coffee."
              )}

              {this.renderJobCard(
                "Pastry Chef",
                "Central Kitchen",
                "Create delicious pastries and baked goods that complement our coffee offerings. Bring your creativity and culinary expertise to our team."
              )}
            </div>
          </section>

          {/* Benefits Section */}
          <section className="benefits">
            <h2 className="sectiontitle">Benefits & Perks</h2>
            <div className="benefitsgrid">
              {this.renderBenefitCard(
                faMugHot,
                "Free Coffee",
                "Enjoy complimentary coffee during your shifts and take home weekly coffee beans."
              )}

              {this.renderBenefitCard(
                faHeart,
                "Health Benefits",
                "Comprehensive health, dental, and vision coverage for full-time employees."
              )}

              {this.renderBenefitCard(
                faGraduationCap,
                "Training & Development",
                "Continuous learning opportunities and coffee education programs."
              )}

              {this.renderBenefitCard(
                faClock,
                "Flexible Schedule",
                "Work-life balance with flexible scheduling options."
              )}
            </div>
          </section>

          {/* CTA Section */}
          <section className="ctasection">
            <h2>Ready to Start Your Journey?</h2>
            <p>Join our team and be part of something special.</p>
            <a href="/apply" className="applybtn">
              Apply Today
            </a>
          </section>

          {/* Footer */}
          <footer>
            <div className="footergrid">
              <div>
                <h3>About Us</h3>
                <p>
                  Your perfect spot for great coffee and warm conversations.
                </p>
                <div className="sociallinks">
                  <a href="#">
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                  <a href="#">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                  <a href="#">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </div>
              </div>
              <div>
                <h3>Quick Links</h3>
                <a href="/menu/menu.html" className="quicklinks">
                  Menu
                </a>
                <br />
                <a href="#" className="quicklinks">
                  Locations
                </a>
                <br />
                <a href="/careers/careers.html" className="quicklinks">
                  Careers
                </a>
              </div>
              <div>
                <h3>Contact</h3>
                <p>123 Coffee Street</p>
                <p>contact@cafeconnect.com</p>
                <p>(555) 123-4567</p>
              </div>
            </div>
            <div
              style={{
                textAlign: "center",
                paddingTop: "20px",
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <p>&copy; 2025 CafeConnect. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    );
  }

  // Helper method to render job cards
  renderJobCard(title, location, description) {
    return (
      <div className="jobcard" key={title}>
        <h3>{title}</h3>
        <div className="location">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <span>{location}</span>
        </div>
        <p className="description">{description}</p>
        <a href="/apply" className="applybtn">
          Apply Now
        </a>
      </div>
    );
  }

  // Helper method to render benefit cards
  renderBenefitCard(icon, title, description) {
    return (
      <div className="benefitcard" key={title}>
        <FontAwesomeIcon icon={icon} />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  }
}

export default Careers;
