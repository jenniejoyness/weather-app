import React from 'react';

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) return null;

  const { current, location } = weatherData;

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md w-full max-w-md">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">{location.name}, {location.country}</h2>
        <div className="flex items-center justify-center mt-2">
          <img 
            src={current.condition.icon} 
            alt={current.condition.text} 
            className="w-16 h-16"
          />
          <span className="text-4xl font-bold text-gray-800 ml-2">{current.temp_c}°C</span>
        </div>
        <p className="text-gray-600 mt-2">{current.condition.text}</p>
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-500">Wind Speed</p>
          <p className="font-semibold">{current.wind_kph} km/h</p>
        </div>
        <div className="p-3 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-500">Humidity</p>
          <p className="font-semibold">{current.humidity}%</p>
        </div>
        <div className="p-3 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-500">Feels Like</p>
          <p className="font-semibold">{current.feelslike_c}°C</p>
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-500 text-center">
        <p>Last updated: {new Date(current.last_updated).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default WeatherDisplay;
