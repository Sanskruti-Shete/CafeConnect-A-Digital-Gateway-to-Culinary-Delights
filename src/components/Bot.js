import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import "./Chatbot.css";

class Chatbot extends Component {
  constructor(props) {
    super(props);
    // Add a welcome message to the initial state
    this.state = {
      isChatOpen: false,
      chatMessages: [
        {
          text: "Hi there! I'm the CafeConnect assistant. How can I help you today?",
          sender: "bot",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }
      ],
      isTyping: false,
    };
    this.chatBodyRef = React.createRef();
    
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
    
    this.API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
    this.GEMINI_API_URL = process.env.REACT_APP_GEMINI_API_URL;
  }

  componentDidMount() {
    // Set up initial scroll position when chat opens
    if (this.chatBodyRef.current) {
      this.chatBodyRef.current.scrollTop = this.chatBodyRef.current.scrollHeight;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Auto-scroll to bottom of chat when new messages arrive or when chat opens
    if (
      this.chatBodyRef.current && 
      (prevState.chatMessages.length !== this.state.chatMessages.length || 
       (!prevState.isChatOpen && this.state.isChatOpen))
    ) {
      this.chatBodyRef.current.scrollTop = this.chatBodyRef.current.scrollHeight;
    }
  }

  toggleChat = () => {
    this.setState((prevState) => ({
      isChatOpen: !prevState.isChatOpen,
    }));
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
      console.log("Sending message to Gemini API:", message);
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
      console.log("API Response Status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Full API Response:", data);

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

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.sendChatMessage();
    }
  };

  render() {
    const { isChatOpen, chatMessages, isTyping } = this.state;

    return (
      <>
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
          <div className="chatbody" ref={this.chatBodyRef}>
            {chatMessages.map((msg, index) => (
              <div key={index} className={`chatmessage ${msg.sender}-message`}>
                <div className="messagetext">{msg.text}</div>
                <div className="messagetime">{msg.time}</div>
              </div>
            ))}
            {isTyping && (
              <div className="chatmessage bot-message typingindicator">
                Typing...
              </div>
            )}
          </div>
          <div className="chatinputcontainer">
            <input
              type="text"
              id="chatinput"
              placeholder="Type your message..."
              onKeyDown={this.handleKeyDown}
            />
            <button id="sendbutton" onClick={this.sendChatMessage}>
              Send
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Chatbot;