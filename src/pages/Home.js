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

import "./Home.css";
import "./Chatbot.css";
import "./Wheel.css";

import coffee1 from "../images/coffee1.png";
import coffee2 from "../images/coffee2.png";
import cappuccino from "../images/cappuccino.jpg";
import latte from "../images/latte.jpg";
import espresso from "../images/espresso.jpg";

class CoffeShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChatOpen: false,
      isWheelOpen: false,
      wheelSpinning: false,
      prize: "",
      chatMessages: [],
      isTyping: false,
    };
  }

  toggleChat = () => {
    this.setState((prevState) => ({
      isChatOpen: !prevState.isChatOpen,
    }));
  };

  toggleWheel = () => {
    this.setState((prevState) => ({
      isWheelOpen: !prevState.isWheelOpen,
    }));
  };

  spinWheel = () => {
    if (this.state.wheelSpinning) return;

    this.setState({ wheelSpinning: true });

    const prizes = [
      "Free Coffee",
      "10% OFF",
      "Buy 1 Get 1",
      "Free Pastry",
      "15% OFF",
      "Free Dessert",
    ];

    // Random prize selection
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const selectedPrize = prizes[randomIndex];

    // Simulate wheel spinning
    setTimeout(() => {
      this.setState({
        wheelSpinning: false,
        prize: selectedPrize,
      });
      const wheelResultElement = document.getElementById("wheelresult");
      const prizeElement = document.getElementById("prize");
      const couponTitleElement = document.getElementById("coupontitle");

      if (wheelResultElement) {
        wheelResultElement.style.display = "block";
      }

      if (prizeElement && selectedPrize) {
        prizeElement.textContent = selectedPrize;
      }

      if (couponTitleElement && selectedPrize) {
        couponTitleElement.textContent = selectedPrize.toUpperCase();
      }

      if (selectedPrize) {
        document.getElementById("wheelresult").style.display = "block";
        document.getElementById("prize").textContent = selectedPrize;
        document.getElementById("coupontitle").textContent =
          selectedPrize.toUpperCase();
      }

      document.getElementById("prize").textContent = selectedPrize;
      document.getElementById("coupontitle").textContent =
        selectedPrize.toUpperCase();
    }, 3000);

    this.API_KEY = "AIzaSyCkiKAzRMB2EcYTnwBl7vKybsD4SFPK0KE";
    this.GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";

    // Coffee shop information
    this.COFFEE_SHOP_INFO = `
      About CafeConnect:
      - Name: CafeConnect
      - Location: 123 Coffee Street
      - Hours: Monday-Friday 7am-8pm, Weekends 8am-9pm
      
      Menu:
      - Signature Drinks: 
        * Vanilla Bean Latte ($4.50)
        * Caramel Macchiato Supreme ($5.00)
        * House Blend Dark Roast ($3.50)
      - Seasonal Specials:
        * Pumpkin Spice Cold Brew (Fall)
        * Peppermint Mocha (Winter)
      
      Services:
      - Free WiFi (Password: happycoffee2024)
      - Meeting Room (Seats 8, $25/hour)
      - Student Discount: 15% with valid ID
      - Loyalty Program: Buy 9 drinks, get 1 free
      
      Events:
      - Live Music: Every Friday 7-9pm
      - Coffee Tasting: First Saturday monthly
      - Open Mic Night: Thursdays 6-8pm
      
      Contact:
      - Phone: (555) 123-4567
      - Email: contact@cafeconnect.com
      - Instagram: @cafeconnect_official
    `;
  };
  sendChatMessage = async () => {
    const inputElement = document.getElementById("chatinput");
    const message = inputElement.value.trim();

    if (message !== "") {
      const newMessage = {
        text: message,
        sender: "user",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      this.setState(
        (prevState) => ({
          chatMessages: [...prevState.chatMessages, newMessage],
          isTyping: true,
        }),
        () => {
          inputElement.value = "";
          this.callGeminiAPI(message);
        }
      );
    }
  };

  callGeminiAPI = async (message) => {
    try {
      const requestBody = {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are a friendly and helpful assistant for CafeConnect coffee shop.
            Use this specific information about our coffee shop to answer customer questions:
            
            ${this.COFFEE_SHOP_INFO}
            
            Important guidelines:
            1. Only use the information provided above about our coffee shop
            2. If asked about something not in our information, politely say you don't have that information
            3. Keep responses friendly and conversational
            4. Keep responses brief and to the point
            5. If asked about prices, specials, or deals, always mention our loyalty program
            
            Customer message: ${message}`,
              },
            ],
          },
        ],
      };

      const response = await fetch(
        `${this.GEMINI_API_URL}?key=${this.API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();

      if (
        data &&
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0] &&
        data.candidates[0].content.parts[0].text
      ) {
        const botMessage = {
          text: data.candidates[0].content.parts[0].text,
          sender: "bot",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        this.setState((prevState) => ({
          chatMessages: [...prevState.chatMessages, botMessage],
          isTyping: false,
        }));
      } else {
        throw new Error("Unexpected API response structure");
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);

      const errorMessage = {
        text: "I'm sorry, I couldn't process that request. Please try again.",
        sender: "bot",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      this.setState((prevState) => ({
        chatMessages: [...prevState.chatMessages, errorMessage],
        isTyping: false,
      }));
    }
  };

  render() {
    const {
      isChatOpen,
      isWheelOpen,
      wheelSpinning,
      chatMessages,
      prize,
      isTyping,
    } = this.state;

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

        {/* Chatbot Icon */}
        <div className="chaticon" onClick={this.toggleChat}>
          <FontAwesomeIcon icon={faCoffee} />
        </div>

        {/* Chat Window */}

        <div className={`chatcontainer ${isChatOpen ? "show" : ""}`}>
          <div className="chatheader">
            <h3>CafeConnect Assistant</h3>
            <span onClick={this.toggleChat}>×</span>
          </div>
          <div
            className="chatbody"
            ref={(el) => {
              this.chatBodyRef = el;
            }}
          >
            {chatMessages.map((msg, index) => (
              <div key={index} className={`chatmessage ${msg.sender}-message`}>
                <div>{msg.text}</div>
                <div className="messagetime">{msg.time}</div>
              </div>
            ))}
            {isTyping && (
              <div className="chatmessage botmessage typingindicator">
                Typing...
              </div>
            )}
          </div>
          <div className="chatinputcontainer">
            <input
              type="text"
              id="chatinput"
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === "Enter" && this.sendChatMessage()}
            />
            <button id="sendbutton" onClick={this.sendChatMessage}>
              Send
            </button>
          </div>
        </div>

        {/* Spin Wheel Icon */}
        <div className="wheelicon" onClick={this.toggleWheel}>
          <FontAwesomeIcon icon={faDharmachakra} />
          <span className="wheellabel">Spin & Win</span>
        </div>

        {/* Spin Wheel Popup Container */}
        <div
          className="wheelpopup"
          style={{ display: isWheelOpen ? "block" : "none" }}
        >
          <div className="wheelpopupcontent">
            <span onClick={this.toggleWheel} className="closewheel">
              &times;
            </span>

            <div className="wheelheader">
              <h2>Spin to Win!</h2>
              <p>Try your luck and win exclusive coffee offers</p>
            </div>

            <div className="wheelcontainer">
              <div
                className={`wheel ${wheelSpinning ? "spinning" : ""}`}
                style={{
                  transform: wheelSpinning ? "rotate(1440deg)" : "rotate(0deg)",
                }}
              >
                <div
                  className="wheelsection"
                  style={{ "--i": 1, "--color": "#8b4513" }}
                >
                  <span>Free Coffee</span>
                </div>
                <div
                  className="wheelsection"
                  style={{ "--i": 2, "--color": "#a05a2c" }}
                >
                  <span>10% OFF</span>
                </div>
                <div
                  className="wheelsection"
                  style={{ "--i": 3, "--color": "#8b4513" }}
                >
                  <span>Buy 1 Get 1</span>
                </div>
                <div
                  className="wheelsection"
                  style={{ "--i": 4, "--color": "#a05a2c" }}
                >
                  <span>Free Pastry</span>
                </div>
                <div
                  className="wheelsection"
                  style={{ "--i": 5, "--color": "#8b4513" }}
                >
                  <span>15% OFF</span>
                </div>
                <div
                  className="wheelsection"
                  style={{ "--i": 6, "--color": "#a05a2c" }}
                >
                  <span>Free Dessert</span>
                </div>
              </div>
              <div className="wheelarrow"></div>
              <button
                onClick={this.spinWheel}
                className="spinbtn"
                disabled={wheelSpinning}
              >
                SPIN
              </button>
            </div>

            <div
              className="wheelresult"
              style={{ display: prize ? "block" : "none" }}
            >
              <h3>Congratulations!</h3>
              <p id="prizetext">
                You won: <span id="prize">{prize}</span>
              </p>
              <div className="coupon">
                <div className="couponcontent">
                  <h4 id="coupontitle">{prize.toUpperCase()}</h4>
                  <p>
                    Use code: <span id="couponcode">CAFEWIN2025</span>
                  </p>
                  <p className="couponexpiry">Valid for 24 hours</p>
                </div>
              </div>
              <button className="claimbtn">Claim Your Prize</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CoffeShop;
