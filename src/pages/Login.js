// Login.js
import React, { Component } from 'react';
import '../styles/Login.css';
import logo from '../images/logo1.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Logging in with:', this.state.email, this.state.password);
  };

  render() {
    return (
        <div className='bodylogin'>
      <div className="logincontainer">
        <div className="loginheader">
          <img src={logo} alt="Coffee Logo" className="logo" />
          <h1>Welcome Back</h1>
          <p id="msg">Sign in to your coffee account</p>
        </div>
        
        <form className="loginform" onSubmit={this.handleSubmit}>
          <div className="formgroup">
            <input 
              type="email" 
              id="email" 
              placeholder=" " 
              value={this.state.email} 
              onChange={this.handleChange}
              required
            />
            <label htmlFor="email">Email Address</label>
          </div>
          
          <div className="formgroup">
            <input 
              type="password" 
              id="password" 
              placeholder=" " 
              value={this.state.password} 
              onChange={this.handleChange}
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          
          <button type="submit" className="submitbutton">Sign In</button>
        </form>
        
        <div className="forgotpassword">
          <a href="#">Forgot your password?</a><br />
          <a href="/signup">Don't have an account? Sign Up</a>
        </div>
      </div>
      </div>
    );
  }
}

export default Login;
