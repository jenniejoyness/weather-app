import React from 'react';

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) return null;

  const { current, location } = weatherData;

  return (
    <div>
        <h2> Whats the weather like today? </h2>
    </div>
  );
};

export default WeatherDisplay;
