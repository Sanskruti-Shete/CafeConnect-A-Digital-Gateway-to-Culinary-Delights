import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faWifi,
  faClock,
  faSeedling,
  faRecycle,
  faSolarPanel,
  faHandsHelping,
  faUser,
  faDharmachakra,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import "../styles/Home.css";


import coffee1 from "../images/coffee1.png";
import coffee2 from "../images/coffee2.png";
import cappuccino from "../images/cappuccino.jpg";
import latte from "../images/latte.jpg";
import espresso from "../images/espresso.jpg";

import Chatbot from "../components/Bot";
import SpinnerWheel from "../components/Spin";

class Home extends Component {
  render() {
    return (
      <div className="coffeeshop">
        <div className="coffeebean"></div>
        <div className="coffeebean"></div>
        <div className="coffeebean"></div>

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
        <section className="hero">
          <div className="herocontent">
            <h1 className="herotitle">Moments Begin With A Perfect Brew</h1>
            <p>
              More than just coffee, it's a destination for your senses.
              Experience the perfect blend of artisanal coffee and modern
              ambiance.
            </p>
            <div className="buttoncontainer">
              <button className="herobtn">
                <a
                  href="/menu"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Order Now
                </a>
              </button>
              <button className="herobtn reservebtn">
                <a
                  href="/reserve"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Reserve a Table
                </a>
              </button>
            </div>
          </div>
        </section>

        <img src={coffee1} alt="Coffee Cup" id="coffee1" />
        <img src={coffee2} alt="Coffee Beans" id="coffee2" />

        {/* Products Section */}
        <section className="products">
          <h2 className="sectiontitle">Our Bestsellers</h2>
          <div className="productgrid">
            <div className="productcard">
              <img src={cappuccino} alt="Cappuccino" className="productimage" />
              <h3>Classic Cappuccino</h3>
              <p>$4.99</p>
            </div>
            <div className="productcard">
              <img src={latte} alt="Latte" className="productimage" />
              <h3>Caramel Latte</h3>
              <p>$5.49</p>
            </div>
            <div className="productcard">
              <img src={espresso} alt="Espresso" className="productimage" />
              <h3>Double Espresso</h3>
              <p>$3.99</p>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="reviews">
          <h2 className="sectiontitle">Customer Reviews</h2>
          <div className="reviewslider">
            <div className="reviewcard">
              <div className="stars">★★★★★</div>
              <p>
                "Best coffee shop in town! The atmosphere is perfect for both
                work and relaxation."
              </p>
              <h4>- Sarah Johnson</h4>
            </div>
            <div className="reviewcard">
              <div className="stars">★★★★★</div>
              <p>
                "Their cappuccino is absolutely divine. I visit every morning
                before work!"
              </p>
              <h4>- Mike Thompson</h4>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <h2 className="sectiontitle">Why Choose Us</h2>
          <div className="featuregrid">
            <div className="featurecard">
              <FontAwesomeIcon icon={faCoffee} className="feature-icon" />
              <h3>Premium Coffee</h3>
              <p>Sourced from the finest beans worldwide</p>
            </div>
            <div className="featurecard">
              <FontAwesomeIcon icon={faWifi} className="feature-icon" />
              <h3>Free Wi-Fi</h3>
              <p>Stay connected while you enjoy</p>
            </div>
            <div className="featurecard">
              <FontAwesomeIcon icon={faClock} className="feature-icon" />
              <h3>Quick Service</h3>
              <p>Your order ready in minutes</p>
            </div>
          </div>
        </section>

        {/* Eco-Friendly Initiatives Section */}
        <section className="ecosection">
          <h2 className="sectiontitle">Our Eco-Friendly Initiatives</h2>
          <p className="sectionintro">
            At CafeConnect, sustainability isn't just a buzzword—it's woven into
            every aspect of our operations. We're committed to reducing our
            environmental footprint while serving you the perfect cup of coffee.
            Here's how we're making a difference, one cup at a time.
          </p>

          <div className="ecogrid">
            {/* Sustainable Sourcing */}
            <div className="ecocard">
              <FontAwesomeIcon icon={faSeedling} className="ecoicon" />
              <h3 className="ecotitle">Sustainable Sourcing</h3>
              <p className="ecodescription">
                We partner directly with small-scale farmers who practice
                sustainable agriculture. Our beans are 100% organic,
                shade-grown, and Rainforest Alliance certified. We pay premium
                prices to ensure fair wages and sustainable farming practices.
              </p>
              <div className="ecostats">
                <div className="ecostat">94%</div>
                <p>of our coffee is sustainably sourced</p>
                <div className="ecoprogress">
                  <div
                    className="ecoprogressbar"
                    style={{ width: "94%" }}
                  ></div>
                </div>
              </div>
              <div className="ecobadges">
                <span className="ecobadge">Rainforest Alliance</span>
                <span className="ecobadge">Fair Trade</span>
                <span className="ecobadge">Organic</span>
              </div>
            </div>

            {/* Zero Waste */}
            <div className="ecocard">
              <FontAwesomeIcon icon={faRecycle} className="ecoicon" />
              <h3 className="ecotitle">Zero Waste Program</h3>
              <p className="ecodescription">
                Our comprehensive recycling program ensures minimal waste. We've
                eliminated single-use plastics, implemented compostable
                packaging, and partner with local gardens to compost coffee
                grounds. Bring your own cup and get 50¢ off your drink!
              </p>
              <div className="ecostats">
                <div className="ecostat">85%</div>
                <p>waste reduction since 2023</p>
                <div className="ecoprogress">
                  <div
                    className="ecoprogressbar"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
              <div className="ecobadges">
                <span className="ecobadge">Compostable</span>
                <span className="ecobadge">Zero Plastic</span>
                <span className="ecobadge">Local Composting</span>
              </div>
            </div>

            {/* Energy & Water */}
            <div className="ecocard">
              <FontAwesomeIcon icon={faSolarPanel} className="ecoicon" />
              <h3 className="ecotitle">Energy & Water Conservation</h3>
              <p className="ecodescription">
                Our stores are powered by 100% renewable energy through solar
                panels and wind credits. We've installed water-efficient
                fixtures and use innovative cleaning methods that reduce water
                consumption while maintaining the highest cleanliness standards.
              </p>
              <div className="ecostats">
                <div className="ecostat">40%</div>
                <p>reduction in water usage since 2023</p>
                <div className="ecoprogress">
                  <div
                    className="ecoprogressbar"
                    style={{ width: "40%" }}
                  ></div>
                </div>
              </div>
              <div className="ecobadges">
                <span className="ecobadge">Solar Powered</span>
                <span className="ecobadge">Water Efficient</span>
                <span className="ecobadge">LED Lighting</span>
              </div>
            </div>

            {/* Community Impact */}
            <div className="ecocard">
              <FontAwesomeIcon icon={faHandsHelping} className="ecoicon" />
              <h3 className="ecotitle">Community Impact</h3>
              <p className="ecodescription">
                We actively engage with local communities through educational
                programs about sustainability. Our monthly beach cleanups and
                tree planting initiatives have helped create greener
                neighborhoods. Join us in making a difference!
              </p>
              <div className="ecostats">
                <div className="ecostat">5K+</div>
                <p>trees planted in local communities</p>
                <div className="ecoprogress">
                  <div
                    className="ecoprogressbar"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>
              <div className="ecobadges">
                <span className="ecobadge">Local Events</span>
                <span className="ecobadge">Education</span>
                <span className="ecobadge">Community Service</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact" id="contact">
          <h2 className="sectiontitle">Contact Us</h2>
          <div className="contactform">
            <div className="formgroup">
              <input type="text" placeholder="Your Name" />
            </div>
            <div className="formgroup">
              <input type="email" placeholder="Your Email" />
            </div>
            <div className="formgroup">
              <textarea placeholder="Your Message" rows="5"></textarea>
            </div>
            <button className="submitbtn">Send Message</button>
          </div>
        </section>

        {/* Footer */}
        <footer>
          <div className="footergrid">
            <div>
              <h3>About Us</h3>
              <p>Your perfect spot for great coffee and warm conversations.</p>
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
              <a href="/menu" className="quicklinks">
                Menu
              </a>
              <br />
              <a href="/location" className="quicklinks">
                Locations
              </a>
              <br />
              <a href="/careers" className="quicklinks">
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
        <Chatbot />
        <SpinnerWheel />
      </div>
    );
  }
}

export default Home;
