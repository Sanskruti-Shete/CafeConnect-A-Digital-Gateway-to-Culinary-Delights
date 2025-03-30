import React, { Component } from "react";
import "../styles/Reserve.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faHandsHelping,
  faLeaf,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
class Reserve extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "",
      occasion: "",
      requests: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reservation details:", this.state);
  };

  render() {
    return (
      <div className="reservebody">
        <div className="reservationcontainer">
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
          <section className="hero2">
            <div className="herocontent2">
              <h1 className="herotitle2">Reserve Your Table</h1>
              <p>
                Make your visit even more special by reserving your preferred
                table at CafeConnect.
              </p>
            </div>
          </section>
          <section className="reservationsection">
            <form className="reservationform" onSubmit={this.handleSubmit}>
              <div className="formgroup1">
                <label htmlFor="location">Select Location</label>
                <select
                  id="location"
                  value={this.state.location}
                  onChange={this.handleChange}
                  required
                >
                  <option value="">Choose a CafeConnect location</option>
                  <option>Downtown CafeConnect</option>
                  <option>Riverside CafeConnect</option>
                  <option>University CafeConnect</option>
                </select>
              </div>
              <div className="formgroup1">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="formgroup1">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="formgroup1">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="formgroup1">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  value={this.state.date}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="formgroup1">
                <label htmlFor="time">Time</label>
                <select
                  id="time"
                  value={this.state.time}
                  onChange={this.handleChange}
                  required
                >
                  <option value="">Select preferred time</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i}>{`${i + 9}:00 ${
                      i + 9 >= 12 ? "PM" : "AM"
                    }`}</option>
                  ))}
                </select>
              </div>
              <div className="formgroup1">
                <label htmlFor="guests">Number of Guests</label>
                <select
                  id="guests"
                  value={this.state.guests}
                  onChange={this.handleChange}
                  required
                >
                  <option value="">Select number of guests</option>
                  {[...Array(6)].map((_, i) => (
                    <option key={i}>
                      {i + 1} Guest{i > 0 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div className="formgroup1">
                <label htmlFor="occasion">Special Occasion</label>
                <select
                  id="occasion"
                  value={this.state.occasion}
                  onChange={this.handleChange}
                >
                  <option value="">Select if applicable</option>
                  <option>Birthday</option>
                  <option>Anniversary</option>
                  <option>Business Meeting</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="formgroup1">
                <label htmlFor="requests">Special Requests</label>
                <textarea
                  id="requests"
                  value={this.state.requests}
                  onChange={this.handleChange}
                  placeholder="Any special requests or dietary requirements?"
                ></textarea>
              </div>
              <button type="submit" className="submitbtn">
                Confirm Reservation
              </button>
            </form>
          </section>
          <footer>
            <div className="footergrid" id="contact">
              <div>
                <h3>About Us</h3>
                <p>
                  Your perfect spot for great coffee and warm conversations.
                </p>
                <div className="sociallinks">
                  <a href="#">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                </div>
              </div>
              <div>
                <h3>Quick Links</h3>
                <a href="/menu/menu.html" className="quicklinks">
                  Menu
                </a>
                <br />
                <a href="/location/location.html" className="quicklinks">
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
}

export default Reserve;
