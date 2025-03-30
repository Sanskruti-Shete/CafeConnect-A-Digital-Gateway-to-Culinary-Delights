import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "../styles/Apply.css";

class Apply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: "",
      location: "",
      fullName: "",
      email: "",
      phone: "",
      experience: "",
      startDate: "",
      motivation: "",
      resume: null,
      coverLetter: null,
    };
  }

  handleInputChange = (event) => {
    const { name, value, type, files } = event.target;

    // Handle file inputs differently
    if (type === "file") {
      this.setState({ [name]: files[0] });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // Create FormData to handle file upload
    const formData = new FormData();

    // Append all form data to FormData object
    Object.keys(this.state).forEach((key) => {
      formData.append(key, this.state[key]);
    });

    // Here you would typically send the formData to your backend
    console.log("Form submitted", this.state);

    // Optional: Add form submission logic (e.g., API call)
    // axios.post('/api/applications', formData)
    //   .then(response => {
    //     // Handle successful submission
    //   })
    //   .catch(error => {
    //     // Handle errors
    //   });
  };

  render() {
    return (
      <div className="applybody">
        <div className="applypage">
          {/* Navbar */}
          <nav className="navbar">
            <div className="logo">CafeConnect</div>
            <div className="navlinks">
              <a href="/home/home.html">Home</a>
              <a href="/menu/menu.html">Menu</a>
              <a href="/about/about.html">About</a>
              <a href="#contact">Contact</a>
              <a href="/login/login.html">Login</a>
              <a href="/account/account.html">
                <FontAwesomeIcon icon={faUser} /> Account
              </a>
            </div>
          </nav>

          {/* Main Content */}
          <div className="maincontent1">
            <h1>Job Application</h1>
            <form className="applicationform" onSubmit={this.handleSubmit}>
              {/* Position Information Section */}
              <div className="formsection2">
                <h2>Position Information</h2>
                <div className="formgroup2">
                  <label>
                    Position Applied For <span className="required">*</span>
                  </label>
                  <select
                    name="position"
                    value={this.state.position}
                    onChange={this.handleInputChange}
                    required
                  >
                    <option value="">Select a position</option>
                    <option value="barista">Barista</option>
                    <option value="shift-supervisor">Shift Supervisor</option>
                    <option value="pastry-chef">Pastry Chef</option>
                  </select>
                </div>
                <div className="formgroup2">
                  <label>
                    Preferred Location <span className="required">*</span>
                  </label>
                  <select
                    name="location"
                    value={this.state.location}
                    onChange={this.handleInputChange}
                    required
                  >
                    <option value="">Select a location</option>
                    <option value="downtown">Downtown</option>
                    <option value="central">Central Kitchen</option>
                    <option value="north">North Location</option>
                  </select>
                </div>
              </div>

              {/* Personal Information Section */}
              <div className="formsection2">
                <h2>Personal Information</h2>
                <div className="formgroup2">
                  <label>
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={this.state.fullName}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
                <div className="formgroup2">
                  <label>
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
                <div className="formgroup2">
                  <label>
                    Phone <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Experience & Availability Section */}
              <div className="formsection2">
                <h2>Experience & Availability</h2>
                <div className="formgroup2">
                  <label>Years of Related Experience</label>
                  <input
                    type="number"
                    name="experience"
                    value={this.state.experience}
                    onChange={this.handleInputChange}
                    min="0"
                    step="0.5"
                  />
                </div>
                <div className="formgroup2">
                  <label>
                    Available Start Date <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={this.state.startDate}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
                <div className="formgroup2">
                  <label>
                    Why would you like to join CafeConnect?{" "}
                    <span className="required">*</span>
                  </label>
                  <textarea
                    name="motivation"
                    value={this.state.motivation}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Documents Section */}
              <div className="formsection2">
                <h2>Documents</h2>
                <div className="formgroup2">
                  <label>
                    Resume <span className="required">*</span>
                  </label>
                  <input
                    type="file"
                    name="resume"
                    className="fileinput"
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
                <div className="formgroup2">
                  <label>Cover Letter</label>
                  <input
                    type="file"
                    name="coverLetter"
                    className="fileinput"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>

              <button type="submit" className="submitbtn">
                Submit Application
              </button>
            </form>
          </div>

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
}

export default Apply;
