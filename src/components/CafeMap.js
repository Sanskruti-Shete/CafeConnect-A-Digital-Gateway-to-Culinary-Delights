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
            >
              <div className="infowindow">
                <h3>{this.state.selectedLocation.name}</h3>
                <p>{this.state.selectedLocation.address}</p>
                <p>{this.state.selectedLocation.hours.weekdays}</p>
                <p>{this.state.selectedLocation.phone}</p>
                <button
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