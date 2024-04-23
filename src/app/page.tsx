'use client'
import React, { useState } from 'react';

// Interface for weather data
interface WeatherData {
  location: string;
  dateTime: string;
  temperature: number;
  feelsLike: number;
  description: string;
}

const Home: React.FC = () => {
  // Placeholder data
  const [weatherData, setWeatherData] = useState<WeatherData>({
    location: 'New York',
    dateTime: new Date().toLocaleString(),
    temperature: 20,
    feelsLike: 22,
    description: 'Partly cloudy',
  });

  // State for temperature unit toggle
  const [isCelsius, setIsCelsius] = useState(true);

  // State for dark mode toggle
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle temperature unit
  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search input change
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* top container */}
      <div className="border-2 p-2 rounded-xl">
        <div className="border-2 p-2 rounded-xl flex p-4">
          <input
            type="text"
            className="search-input border-2"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <div>
            <button onClick={toggleTemperatureUnit}>
              {isCelsius ? 'C' : 'F'}
            </button>
          </div>
          <div>
            <button onClick={toggleDarkMode}>
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
        {/* content */}
        <div>
          <div className="weather-info">
            <h2>{weatherData.location}</h2>
            <p>{weatherData.dateTime}</p>
            <div className="weather-details">
              <img src="weather-icon.png" alt="Weather Icon" />
              <div className="temperature">
                <p>
                  {weatherData.temperature}°{isCelsius ? 'C' : 'F'}
                </p>
                <p>Feels like {weatherData.feelsLike}°{isCelsius ? 'C' : 'F'}</p>
              </div>
              <p>{weatherData.description}</p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;