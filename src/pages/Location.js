import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faParking,
  faUtensils,
  faLaptop,
  faGuitar,
  faUmbrellaBeach,
  faDog,
  faBook,
  faClock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "../styles/Location.css"

import cafe1 from '../images/cafe1.jpg';
import cafe2 from '../images/cafe2.jpg';
import cafe3 from '../images/cafe3.jpg';
import cafe4 from '../images/cafe4.jpg';

class LocationsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cafeLocations: [
        {
          id: 1,
          name: "Downtown CafeConnect",
          lat: 28.6139,
          lng: 77.209,
          address: "123 Coffee Street, Downtown",
          hours: {
            weekdays: "Monday - Friday: 6:30 AM - 8:00 PM",
            weekends: "Saturday - Sunday: 7:30 AM - 6:00 PM",
          },
          phone: "(555) 123-4567",
          image: cafe1,
          features: [
            { icon: faWifi, text: "Free Wi-Fi" },
            { icon: faParking, text: "Parking" },
            { icon: faUtensils, text: "Full Menu" },
            { icon: faLaptop, text: "Workspaces" },
          ],
        },
        {
          id: 2,
          name: "Riverside CafeConnect",
          lat: 19.076,
          lng: 72.8777,
          address: "456 Riverside Avenue, Riverfront District",
          hours: {
            weekdays: "Monday - Friday: 7:00 AM - 9:00 PM",
            weekends: "Saturday - Sunday: 8:00 AM - 10:00 PM",
          },
          phone: "(555) 456-7890",
          image: cafe2,
          features: [
            { icon: faWifi, text: "Free Wi-Fi" },
            { icon: faGuitar, text: "Live Music" },
            { icon: faUmbrellaBeach, text: "Outdoor Seating" },
            { icon: faDog, text: "Pet Friendly" },
          ],
        },
        {
          id: 3,
          name: "University CafeConnect",
          lat: 13.0827,
          lng: 80.2707,
          address: "789 Campus Drive, University District",
          hours: {
            weekdays: "Monday - Friday: 6:00 AM - 11:00 PM",
            weekends: "Saturday - Sunday: 7:00 AM - 11:00 PM",
          },
          phone: "(555) 789-0123",
          image: cafe3,
          features: [
            { icon: faWifi, text: "Free Wi-Fi" },
            { icon: faBook, text: "Study Spaces" },
            { icon: faLaptop, text: "Power Outlets" },
            { icon: faClock, text: "Late Hours" },
          ],
        },
        {
          id: 4,
          name: "Kolkata CafeConnect",
          lat: 22.5726,
          lng: 88.3639,
          address: "45 Park Street, Kolkata",
          hours: {
            weekdays: "Monday - Friday: 7:00 AM - 10:00 PM",
            weekends: "Saturday - Sunday: 8:00 AM - 11:00 PM",
          },
          phone: "(555) 234-5678",
          image: cafe4,
          features: [
            { icon: faWifi, text: "Free Wi-Fi" },
            { icon: faUtensils, text: "Local Cuisine" },
            { icon: faLaptop, text: "Workspaces" },
            { icon: faClock, text: "Extended Hours" },
          ],
        },
      ],
      selectedLocation: null,
      mapCenter: { lat: 20.5937, lng: 78.9629 }, // Center of India
      mapZoom: 5,
    };
  }

  handleLocationSelect = (location) => {
    this.setState({
      selectedLocation: location,
      mapCenter: { lat: location.lat, lng: location.lng },
      mapZoom: 15,
    });
  };

  handleDirectionsClick = (location) => {
    // Open Google Maps directions in a new tab
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
    window.open(googleMapsUrl, "_blank");
  };

  renderLocationCard(location) {
    return (
      <div key={location.id} className="locationcard">
        <img
          src={location.image}
          alt={`${location.name} Cafe`}
          className="locationimage"
        />
        <div className="locationdetails">
          <h3 className="locationname">{location.name}</h3>
          <p className="locationaddress">{location.address}</p>
          <div className="locationhours">
            <p>
              <strong>Hours:</strong>
            </p>
            <p>{location.hours.weekdays}</p>
            <p>{location.hours.weekends}</p>
          </div>
          <p>
            <strong>Phone:</strong> {location.phone}
          </p>
          <div className="locationfeatures">
            {location.features.map((feature, idx) => (
              <span key={idx} className="featurebadge">
                <FontAwesomeIcon icon={feature.icon} /> {feature.text}
              </span>
            ))}
          </div>
          <div className="locationactions">
            <button
              className="directionsbtn"
              onClick={() => this.handleDirectionsClick(location)}
            >
              Get Directions
            </button>
            <button
              className="viewonmapbtn"
              onClick={() => this.handleLocationSelect(location)}
            >
              View on Map
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const mapContainerStyle = {
      width: "100%",
      height: "500px",
    };

    const mapOptions = {
      disableDefaultUI: true,
      zoomControl: true,
      streetViewControl: true,
      mapTypeControl: true,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#263c3f" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b9a76" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#746855" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3d19c" }],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }],
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#17263c" }],
        },
      ],
    };

    return (
      <div className="locationbody">
        <div className="locationspage">
          {/* Navbar */}
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

          {/* Hero Section */}
          <section className="hero4">
            <div className="herocontent4">
              <h1 className="herotitle4">Find Your Perfect Spot</h1>
              <p>
                Discover CafeConnect locations across the city, each with its
                own unique charm and atmosphere. Whether you're looking for a
                quiet spot to work or a lively place to meet friends, we've got
                you covered.
              </p>
            </div>
          </section>

          {/* Locations Section */}
          <section className="locations">
            <h2 className="sectiontitle">Our Top Locations</h2>
            <div className="locationgrid">
              {this.state.cafeLocations.map((location) =>
                this.renderLocationCard(location)
              )}
            </div>
          </section>

          {/* Map Section with Google Maps Integration */}
          <section className="mapsection">
            <h2 className="sectiontitle">Find Us On The Map</h2>
            <LoadScript
              googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            >
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={this.state.mapCenter}
                zoom={this.state.mapZoom}
                options={mapOptions}
              >
                {this.state.cafeLocations.map((location) => (
                  <Marker
                    key={location.id}
                    position={{ lat: location.lat, lng: location.lng }}
                    onClick={() => this.handleLocationSelect(location)}
                  />
                ))}

                {this.state.selectedLocation && (
                  <InfoWindow
                    position={{
                      lat: this.state.selectedLocation.lat,
                      lng: this.state.selectedLocation.lng,
                    }}
                    onCloseClick={() =>
                      this.setState({ selectedLocation: null })
                    }
                  >
                    <div className="infowindow">
                      <h3>{this.state.selectedLocation.name}</h3>
                      <p>{this.state.selectedLocation.address}</p>
                      <p>{this.state.selectedLocation.hours.weekdays}</p>
                      <p>{this.state.selectedLocation.phone}</p>
                      <button
                        onClick={() =>
                          this.handleDirectionsClick(
                            this.state.selectedLocation
                          )
                        }
                      >
                        Get Directions
                      </button>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          </section>

          {/* Footer */}
          <footer>
            <div className="footergrid" id="contact">
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

export default LocationsPage;
