import React, { Component } from "react";
import "../styles/Signup.css";
import logo from '../images/logo1.png';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", this.state);
  };

  render() {
    return (
      <div className="signupbody">
        <div className="signupcontainer">
          <div className="signupheader">
            <img src={logo} alt="Coffee Logo" />
            <h1>Create Account</h1>
            <p id="joinmsg">Join our coffee community</p>
          </div>
          <form className="signupform" onSubmit={this.handleSubmit}>
            <div className="formgroup">
              <input
                type="text"
                id="name"
                value={this.state.name}
                onChange={this.handleChange}
                placeholder=" "
                required
              />
              <label htmlFor="name">Full Name</label>
            </div>
            <div className="formgroup">
              <input
                type="email"
                id="email"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder=" "
                required
              />
              <label htmlFor="email">Email Address</label>
            </div>
            <div className="formgroup">
              <input
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
                placeholder=" "
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="formgroup">
              <input
                type="password"
                id="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                placeholder=" "
                required
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <div className="terms">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </div>
          <div className="loginlink">
            <a href="/login">Already have an account? Sign In</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
