import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import { getWeatherData } from './utils/api';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (location) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getWeatherData(location);
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Weather App</h1>
        <p className="text-white text-opacity-90">Enter a location to check the current weather</p>
      </div>
      
      <div className="w-full max-w-2xl px-4">
        <SearchBar onSearch={handleSearch} isLoading={loading} />
        
        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {loading && !weatherData && (
          <div className="mt-8 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {weatherData && <WeatherDisplay weatherData={weatherData} />}
      </div>
      
      <footer className="mt-12 text-white text-opacity-80 text-sm text-center">
        <p> {new Date().getFullYear()} Weather App. Data provided by WeatherAPI.com</p>
      </footer>
    </div>
  );
}

export default App;
