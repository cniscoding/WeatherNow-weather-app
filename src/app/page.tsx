'use client'
import React, { useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


interface WeatherData {
  location: string;
  dateTime: string;
  temperature: number;
  feelsLike: number;
  description: string;
  forecast: {
    date: string;
    image: string;
    highTemperature: number;
    lowTemperature: number;
    forecastType: string;
  }[];
}

const Home: React.FC = () => {
  // Placeholder data
  const [currentWeather, setCurrentWeather] = useState<WeatherData>({
    location: 'New York',
    dateTime: new Date().toLocaleString(),
    temperature: 20,
    feelsLike: 22,
    description: 'Partly cloudy',
    forecast: [
      {
        date: 'April 23, 2024',
        image: 'forecast-image-1.png',
        highTemperature: 25,
        lowTemperature: 18,
        forecastType: 'Light rain',
      },
      {
        date: 'April 24, 2024',
        image: 'forecast-image-2.png',
        highTemperature: 27,
        lowTemperature: 20,
        forecastType: 'Broken clouds',
      },
      // Add more forecast data for other days
    ],
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

  // State to track which days have detailed information exposed
  const [exposedDays, setExposedDays] = useState<boolean[]>(
    new Array(currentWeather.forecast.length).fill(false)
  );

  // Function to toggle exposure of detailed information for a day
  const toggleDayExposure = (index: number) => {
    const newExposedDays = [...exposedDays];
    newExposedDays[index] = !newExposedDays[index];
    setExposedDays(newExposedDays);
  };


  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {/* top container */}
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
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{currentWeather.location}</CardTitle>
          <CardDescription>{currentWeather.dateTime}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <p>Card Content</p> */}
        </CardContent>
        <CardContent>
          <div>
            <div className="weather-info">
              {/* <h2>{weatherData.location}</h2> */}
              {/* <p>{weatherData.dateTime}</p> */}
              <div className="weather-details">
                <img src="weather-icon.png" alt="Weather Icon" />
                <div className="temperature">
                  <p>
                    {currentWeather.temperature}°{isCelsius ? 'C' : 'F'}
                  </p>
                  <p>Feels like {currentWeather.feelsLike}°{isCelsius ? 'C' : 'F'}</p>
                </div>
                <p>{currentWeather.description}</p>
              </div>

            </div>
          </div>
        </CardContent>
        <CardContent className="flex flex-col">
          <div>
            <CardTitle>hourly forecast chart</CardTitle>
            <p>some type of graph here</p>
          </div>
          <div>
            <CardTitle>8 day forecast</CardTitle>
            <div className="forecast-container">
              {currentWeather.forecast.map((day, index) => (
                <div key={index} className={`forecast-item ${exposedDays[index] ? 'exposed' : ''}`} onClick={() => toggleDayExposure(index)}>
                  <div>{day.date}</div>
                  <div>
                    <img src={day.image} alt="Forecast" />
                    <div>
                      High: {day.highTemperature}°C | Low: {day.lowTemperature}°C
                    </div>
                  </div>
                  <div>{day.forecastType}</div>
                  {exposedDays[index] && (
                    <div className="detailed-info">
                      <div className="weather-info">
                        {/* Render detailed weather information here */}
                        <div className="weather-details">
                          <img src="weather-icon.png" alt="Weather Icon" />
                          <div className="temperature">
                            <p>
                              {currentWeather.temperature}°{isCelsius ? 'C' : 'F'}
                            </p>
                            <p>Feels like {currentWeather.feelsLike}°{isCelsius ? 'C' : 'F'}</p>
                          </div>
                          <p>{currentWeather.description}</p>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </CardContent>
        <CardFooter>
          <p>something about the forecast</p>
        </CardFooter>
      </Card>

      {/* content */}


    </main>
  );
}

export default Home;