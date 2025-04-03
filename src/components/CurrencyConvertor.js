import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faGlobe, faLocationArrow } from '@fortawesome/free-solid-svg-icons';

const CurrencyConverter = ({ updatePrices }) => {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [isConverterOpen, setIsConverterOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  
  // Common currencies for coffee shops with country codes for geolocation matching
  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', countries: ['US', 'USA'] },
    { code: 'EUR', name: 'Euro', symbol: '€', countries: ['DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'IE', 'FI', 'PT', 'GR'] },
    { code: 'GBP', name: 'British Pound', symbol: '£', countries: ['GB', 'UK'] },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', countries: ['CA'] },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', countries: ['AU'] },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', countries: ['JP'] },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', countries: ['CN'] },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', countries: ['IN'] },
    { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$', countries: ['MX'] }
  ];

  // Exchange rates (mockup - in a real app these would come from an API)
  const mockExchangeRates = {
    'USD': 1,
    'EUR': 0.93,
    'GBP': 0.79,
    'CAD': 1.38,
    'AUD': 1.53,
    'JPY': 150.27,
    'CNY': 7.24,
    'INR': 83.50,
    'MXN': 16.70
  };

  // Get user's currency based on location
  const getCurrencyFromLocation = (countryCode) => {
    if (!countryCode) return 'USD';
    
    for (const currency of currencies) {
      if (currency.countries.includes(countryCode)) {
        return currency.code;
      }
    }
    return 'USD'; // Default if no match found
  };

  // Get currency symbol
  const getCurrencySymbol = (code) => {
    const currency = currencies.find(c => c.code === code);
    return currency ? currency.symbol : '$';
  };

  // Detect user's location
  const detectUserLocation = () => {
    setLocationLoading(true);
    setLocationError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real application, you would use the coordinates to make a reverse geocoding API call
          // to determine the user's country
          const { latitude, longitude } = position.coords;
          
          // Example of how you would make the API call (commented out)
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            .then(response => response.json())
            .then(data => {
              setUserLocation(data.countryCode);
              const localCurrency = getCurrencyFromLocation(data.countryCode);
              setTargetCurrency(localCurrency);
              setLocationLoading(false);
            })
            .catch(error => {
              setLocationError("Couldn't determine your location. Using default currency.");
              setLocationLoading(false);
            });
        },
        (error) => {
          setLocationError("Geolocation permission denied. Using default currency.");
          setLocationLoading(false);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser. Using default currency.");
      setLocationLoading(false);
    }
  };

  useEffect(() => {
    // In a real app, you would fetch real-time exchange rates from an API
    if (targetCurrency && baseCurrency) {
      const baseRate = mockExchangeRates[baseCurrency];
      const targetRate = mockExchangeRates[targetCurrency];
      const newRate = targetRate / baseRate;
      setExchangeRate(newRate);
      
      // Call the parent component function to update prices
      if (updatePrices) {
        updatePrices(targetCurrency, newRate, getCurrencySymbol(targetCurrency));
      }
    }
  }, [targetCurrency, baseCurrency]);

  const toggleConverter = () => {
    setIsConverterOpen(!isConverterOpen);
  };

  const handleCurrencyChange = (e) => {
    setTargetCurrency(e.target.value);
  };

  return (
    <div className="currency-converter">
      <button 
        className="converter-toggle" 
        onClick={toggleConverter}
        style={{
          position: 'fixed',
          right: '20px',
          top: '100px',
          zIndex: 1000,
          background: '#2c1810',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}
      >
        <FontAwesomeIcon icon={faGlobe} />
      </button>
      
      {isConverterOpen && (
        <div 
          className="converter-panel"
          style={{
            position: 'fixed',
            right: '20px',
            top: '160px',
            zIndex: 1000,
            background: 'white',
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
            width: '250px'
          }}
        >
          <h3 style={{ margin: '0 0 10px 0', color: '#2c1810' }}>Currency Converter</h3>
          
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="currency-select" style={{ display: 'block', marginBottom: '5px', color: '#666' }}>
              Select Currency:
            </label>
            <select 
              id="currency-select"
              value={targetCurrency}
              onChange={handleCurrencyChange}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            >
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.name} ({currency.code})
                </option>
              ))}
            </select>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <button 
              onClick={detectUserLocation}
              disabled={locationLoading}
              style={{
                background: '#2c1810',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '14px'
              }}
            >
              <FontAwesomeIcon icon={faLocationArrow} />
              {locationLoading ? 'Detecting...' : 'Detect Location'}
            </button>
            
            <div style={{ 
              fontSize: '14px', 
              color: '#666',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span>1 USD = {exchangeRate.toFixed(2)} {targetCurrency}</span>
            </div>
          </div>
          
          {locationError && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '10px' }}>
              {locationError}
            </div>
          )}
          
          {userLocation && (
            <div style={{ fontSize: '12px', marginTop: '10px', color: 'green' }}>
              Location detected: {userLocation}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;