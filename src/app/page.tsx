'use client'
import ChartComponent from '../components/features/Chart';
import { TiWeatherDownpour } from "react-icons/ti";
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
      <div className="border-2 p-2 rounded-xl flex p-4 w-full items-center justify-center">
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
      {/* current weather */}
      <div>

      </div>
      <Card className="w-full flex flex-col items-center p-2">
        <div className="border-2 w-full p-4 m-2">
          <CardHeader>
            <CardTitle>{currentWeather.location}</CardTitle>
            <CardDescription>{currentWeather.dateTime}</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div className="weather-info">
                <div className="weather-details">
                  {/* <img src="weather-icon.png" alt="Weather Icon" /> */}
                  <TiWeatherDownpour size={'5em'} />
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
        </div>
        {/* hourly forecast */}
        <CardContent className="w-full flex flex-col border-2 p-2">
          <div className="border-2 p-4 m-2">
            <CardTitle>hourly forecast chart</CardTitle>
            {/* <p>some type of graph here</p> */}
            <ChartComponent />
          </div>
          {/* 8 day forecast */}
          <div className="border-2 p-4 m-2">
            <CardTitle>8 day forecast</CardTitle>
            <div className="forecast-container m-4">
              <Accordion type="single" collapsible>
                {currentWeather.forecast.map((day, index) => (
                  <div key={index} className={`forecast-item ${exposedDays[index] ? 'exposed' : ''}`} onClick={() => toggleDayExposure(index)}>
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger>
                        <div>{day.date}</div>
                        <div>
                          {/* <img src={day.image} alt="Forecast" /> */}
                          <TiWeatherDownpour size={'5em'} />
                          <div>
                            High: {day.highTemperature}°C | Low: {day.lowTemperature}°C
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div>{day.forecastType}</div>
                        <div className="detailed-info">
                          <div className="weather-info">
                            {/* Render detailed weather information here */}
                            <div className="weather-details">
                              {/* <img src="weather-icon.png" alt="Weather Icon" /> */}
                              {/* <TiWeatherDownpour size={'4em'} /> */}
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
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                ))}
              </Accordion>
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