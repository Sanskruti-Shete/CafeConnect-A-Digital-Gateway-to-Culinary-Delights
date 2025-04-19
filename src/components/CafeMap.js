import React, { Component } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

class CafeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocation: null,
    };
  }

  handleLocationSelect = (location) => {
    this.setState({
      selectedLocation: location,
    });
    
    // Call the parent component's handler if provided
    if (this.props.onLocationSelect) {
      this.props.onLocationSelect(location);
    }
  };

  handleDirectionsClick = (location) => {
    // Open Google Maps directions in a new tab
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
    window.open(googleMapsUrl, "_blank");
  };

  render() {
    const { 
      cafeLocations, 
      mapCenter, 
      mapZoom, 
      mapContainerStyle,
      mapOptions 
    } = this.props;

    // Add InfoWindow styling
    const infoWindowStyle = {
      padding: "0px",
      margin: "0px"
    };

    // Add styling for the info content
    const infoContentStyle = {
      fontFamily: "Arial, sans-serif",
      padding: "10px",
      backgroundColor: "#fff",
      borderRadius: "4px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
      minWidth: "200px",
      maxWidth: "300px"
    };

    // Add styling for the cafe name
    const titleStyle = {
      margin: "0 0 8px 0",
      color: "#333",
      fontSize: "18px",
      fontWeight: "bold"
    };

    // Add styling for the details text
    const detailsStyle = {
      margin: "4px 0",
      color: "#555",
      fontSize: "14px",
      lineHeight: "1.4"
    };

    // Add styling for the directions button
    const buttonStyle = {
      backgroundColor: "#8B4513", // Brown color similar to the one in your image
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "8px 16px",
      fontSize: "14px",
      cursor: "pointer",
      marginTop: "10px",
      fontWeight: "bold",
      width: "100%"
    };

    return (
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle || { width: "100%", height: "500px" }}
          center={mapCenter}
          zoom={mapZoom}
          options={mapOptions}
        >
          {cafeLocations.map((location) => (
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
              onCloseClick={() => this.setState({ selectedLocation: null })}
              options={{ pixelOffset: new window.google.maps.Size(0, -30) }}
              styles={infoWindowStyle}
            >
              <div style={infoContentStyle}>
                <h3 style={titleStyle}>{this.state.selectedLocation.name}</h3>
                <p style={detailsStyle}><strong>Address:</strong> {this.state.selectedLocation.address}</p>
                <p style={detailsStyle}><strong>Hours:</strong> {this.state.selectedLocation.hours.weekdays}</p>
                <p style={detailsStyle}><strong>Phone:</strong> {this.state.selectedLocation.phone}</p>
                <button
                  style={buttonStyle}
                  onClick={() =>
                    this.handleDirectionsClick(this.state.selectedLocation)
                  }
                >
                  Get Directions
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default CafeMap;