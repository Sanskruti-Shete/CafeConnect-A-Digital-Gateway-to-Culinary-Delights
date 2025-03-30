import React, { Component } from 'react';
import '../styles/Account.css'; 
import { FaCoffee, FaHome, FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'James Wilson',
      memberSince: 'January 2025',
      coffeeOrders: 87,
      rewardPoints: 310,
      availableCoupons: 2,
      recentOrders: [
        {
          id: 'CC-7845',
          name: 'Classic Cappuccino',
          date: 'Feb 22, 2025',
          price: 4.99,
          status: 'Delivered',
          image: '../cappuccino.jpg'
        },
        {
          id: 'CC-7823',
          name: 'Caramel Latte',
          date: 'Feb 18, 2025',
          price: 5.49,
          status: 'Delivered',
          image: '../latte.jpg'
        },
        {
          id: 'CC-7792',
          name: 'Double Espresso',
          date: 'Feb 15, 2025',
          price: 3.99,
          status: 'Delivered',
          image: '../espresso.jpg'
        }
      ]
    };
  }

  renderNavbar() {
    return (
        <nav className="navbar">
        <div className="logo">CafeConnect</div>
        <div className="navlinks">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/about">About</Link>
          <a href="#contact">Contact</a>
          <Link to="/login">Login</Link>
          <Link to="/account">
             Account
          </Link>
        </div>
      </nav>
    );
  }

  renderAccountHeader() {
    return (
      <div className="accountheader">
        <div className="accountcontainer">
          <h1>My Account</h1>
          <p>Welcome back, Coffee Lover!</p>
        </div>
      </div>
    );
  }

  renderSidebar() {
    const { username, memberSince } = this.state;
    return (
      <div className="accountsidebar">
        <div className="userprofile">
          <div className="profileimage">
          <i className="fas fa-user-circle"></i>
          </div>
          <h3>{username}</h3>
          <p>Member since {memberSince}</p>
          <button className="accountbtn editprofilebtn">Edit Profile</button>
        </div>
        <div className="accountmenu">
          {[
            { icon: 'fas fa-tachometer-alt', text: 'Dashboard', active: true },
            { icon: 'fas fa-shopping-bag', text: 'Orders' },
            { icon: 'fas fa-credit-card', text: 'Payment Methods' },
            { icon: 'fas fa-map-marker-alt', text: 'Addresses' },
            { icon: 'fas fa-heart', text: 'Favorites' },
            { icon: 'fas fa-cog', text: 'Settings' },
            { icon: 'fas fa-sign-out-alt', text: 'Logout', className: 'logout' }
          ].map((item, index) => (
            <a 
              key={index} 
              href="#" 
              className={`menuitem ${item.active ? 'active' : ''} ${item.className || ''}`}
            >
              <i className={item.icon}></i> {item.text}
            </a>
          ))}
        </div>
      </div>
    );
  }

  renderMemberStats() {
    const { coffeeOrders, rewardPoints, availableCoupons } = this.state;
    const stats = [
      { 
        icon: 'fas fa-mug-hot', 
        value: coffeeOrders, 
        label: 'Coffees Ordered' 
      },
      { 
        icon: 'fas fa-star', 
        value: rewardPoints, 
        label: 'Reward Points' 
      },
      { 
        icon: 'fas fa-ticket-alt', 
        value: availableCoupons, 
        label: 'Available Coupons' 
      }
    ];

    return (
      <div className="statscontainer">
        {stats.map((stat, index) => (
          <div key={index} className="statcard">
            <div className="staticon">
              <i className={stat.icon}></i>
            </div>
            <div className="statinfo">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  renderRecentOrders() {
    return (
      <div className="recentorders">
        <div className="sectionheader">
          <h3>Recent Orders</h3>

        </div>
        <div className="orderlist">
          {this.state.recentOrders.map((order) => (
            <div key={order.id} className="orderitem">
              <div className="orderimage">
                <img src={order.image} alt={order.name} />
              </div>
              <div className="orderdetails">
                <h4>{order.name}</h4>
                <p>Date: {order.date}</p>
                <p>Order #: {order.id}</p>
              </div>
              <div className="orderprice">
                <h4>${order.price.toFixed(2)}</h4>
                <span className="orderstatus delivered">{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  renderSubscriptionCard() {
    return (
      <div className="subscriptioncard">
        <div className="subscriptioncontent">
          <div className="subscriptiontext">
            <h3>Coffee Subscription</h3>
            <p>Get freshly roasted coffee delivered every week, straight to your doorstep.</p>
            <ul className="subscriptionbenefits">
              {[
                '15% discount on every order',
                'Free delivery',
                'Exclusive coffee varieties'
              ].map((benefit, index) => (
                <li key={index}>
                  <i className="fas fa-check"></i> {benefit}
                </li>
              ))}
            </ul>
            <button className="accountbtn">Subscribe Now</button>
          </div>
          <div className="subscriptionimage">
            <i className="fas fa-coffee"></i>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="accountpage">
        {this.renderNavbar()}
        {this.renderAccountHeader()}
        
        <section className="accountdashboard">
          <div className="accountcontainer">
            <div className="dashboardgrid">
              <div className="accountsidebarcontainer">
                {this.renderSidebar()}
              </div>
              
              <div className="accountcontent">
                <div className="accountwelcome">
                  <h2>Dashboard</h2>
                  <p>Hello {this.state.username}, here's what's happening with your account today.</p>
                </div>
                
                {this.renderMemberStats()}
                {this.renderRecentOrders()}
                {this.renderSubscriptionCard()}
              </div>
            </div>
          </div>
        </section>
        
      </div>
    );
  }
}

export default AccountPage;