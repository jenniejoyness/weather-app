const API_BASE_URL = 'https://api.weatherapi.com/v1';
const API_KEY = 'YOUR_API_KEY'; // You should replace this with your actual API key

export const getWeatherData = async (location) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(location)}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getForecast = async (location) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=3`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};

export const getLocationSuggestions = async (query) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch location suggestions');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching location suggestions:', error);
    throw error;
  }
};

export const getAlerts = async () => {
  try {
    const response = await fetch('http://localhost:4000/alerts');
    console.log({response});
    if (!response.ok) {
      throw new Error('Failed to fetch alerts');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching alerts:', error);
    throw error;
  }
};

export const createAlert = async (alertData) => {
  try {
    const response = await fetch('http://localhost:4000/alerts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(alertData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create alert');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating alert:', error);
    throw error;
  }
};
