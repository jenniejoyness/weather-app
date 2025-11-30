import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import AlertsDisplay from './components/AlertsDisplay/AlertsDisplay';
import Predictions from './components/Predictions/Predictions';
import { getWeatherData } from './utils/api';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('weather');

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

  const renderContent = () => {
    switch (currentView) {
      case 'weather':
        return (
          <div className="flex flex-col items-center justify-center p-4">
            {/*<div className="text-center mb-8">*/}
            {/*  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Weather App</h1>*/}
            {/*  <p className="text-white text-opacity-90">Enter a location to check the current weather</p>*/}
            {/*</div>*/}
            
            {/*<div className="w-full max-w-2xl px-4">*/}
            {/*  <SearchBar onSearch={handleSearch} isLoading={loading} />*/}
            {/*  */}
            {/*  {error && (*/}
            {/*    <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">*/}
            {/*      {error}*/}
            {/*    </div>*/}
            {/*  )}*/}
            {/*  */}
            {/*  {loading && !weatherData && (*/}
            {/*    <div className="mt-8 flex justify-center">*/}
            {/*      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>*/}
            {/*    </div>*/}
            {/*  )}*/}
              
             <WeatherDisplay weatherData={weatherData} />
            {/*</div>*/}
          </div>
        );
      case 'alerts':
        return <AlertsDisplay />;
      case 'predictions':
        return <Predictions />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600">
      {/* Top Navigation */}
      <div className="flex space-evenly items-center p-6 gap-2.5">
        <div style={{ display: "flex", gap: '100px', justifyContent: 'space-evenly' }} className="flex justify-center">
          <button
            onClick={() => setCurrentView('weather')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              currentView === 'weather'
                ? 'bg-white text-blue-600 shadow-xl transform scale-105'
                : 'text-white hover:bg-white hover:bg-opacity-20 hover:scale-102'
            }`}
          >
            Weather
          </button>
          <button
            onClick={() => setCurrentView('alerts')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              currentView === 'alerts'
                ? 'bg-white text-blue-600 shadow-xl transform scale-105'
                : 'text-white hover:bg-white hover:bg-opacity-20 hover:scale-102'
            }`}
          >
            Alerts
          </button>
          <button
            onClick={() => setCurrentView('predictions')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              currentView === 'predictions'
                ? 'bg-white text-blue-600 shadow-xl transform scale-105'
                : 'text-white hover:bg-white hover:bg-opacity-20 hover:scale-102'
            }`}
          >
            Predictions
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {renderContent()}
      </div>

    </div>
  );
}

export default App;
