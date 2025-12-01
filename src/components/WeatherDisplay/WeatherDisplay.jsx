import React, { useState } from 'react';
import './WeatherDisplay.css';

const WeatherDisplay = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSearch, setShowSearch] = useState(true);

  const handleSearch = async () => {
    if (!location.trim()) {
      setError('Please enter a location');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:4000/weather/realtime?location=${encodeURIComponent(location)}`);
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response:', errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      const data = JSON.parse(responseText)
      // Extract the required fields
      const { windSpeed, temperature, humidity } = data;
      setWeatherData({
        windSpeed,
        temperature,
        humidity
      });
      
      setShowSearch(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleNewSearch = () => {
    setShowSearch(true);
    setWeatherData(null);
    setLocation('');
    setError(null);
  };

  return (
    <div className="weather-display-container">
      {showSearch ? (
        <>
          <h2>What's the weather like today?</h2>
          <div className="search-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Enter location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <button
              className="search-button"
              onClick={handleSearch}
              disabled={loading || !location.trim()}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
          {error && <div className="error">{error}</div>}
        </>
      ) : (
        <div className="weather-data-container">
          <h2>Weather for {location}</h2>
          
          <div className="weather-field">
            <div className="weather-field-title">Temperature</div>
            <div className="weather-field-value">{weatherData.temperature}°</div>
          </div>
          
          <div className="weather-field">
            <div className="weather-field-title">Wind Speed</div>
            <div className="weather-field-value">{weatherData.windSpeed} mph</div>
          </div>
          
          <div className="weather-field">
            <div className="weather-field-title">Humidity</div>
            <div className="weather-field-value">{weatherData.humidity}%</div>
          </div>
          
          <button className="search-button" onClick={handleNewSearch}>
            Search Again
          </button>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
