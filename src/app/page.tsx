import React, { useEffect } from 'react';
import ChartComponent from '../components/features/Chart';
import MainForecast from '../components/features/mainForecast';
import ExpandForecast from '../components/features/expandForecast';
import getWeatherData from '../app/api/route'

interface HomeProps {
  isCelsius: boolean;
  exposedDays: boolean[];
  toggleDayExposure: (index: number) => void;
  // data: any;
}

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

interface ExpandForecastProps {
  currentWeather: any;
  exposedDays: boolean[];
  toggleDayExposure: (index: number) => void;
  isCelsius: boolean;
}

export default async function Home({ isCelsius, exposedDays, toggleDayExposure }: HomeProps) {

const lat = "49.16";
const lon = "-123.13";
const apiKey = process.env.OPENWEATHERMAP_API_KEY;

try {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  const data = await response.json(); 
  console.log("Fetched data:", data.city.name);

  // return {
  //   props: { currentWeather: data.city.name }
  // };
} catch (error) {
  console.error('There was a problem with the fetch operation:', error);
  return <div>Loading...</div>;
}

  const currentWeather: WeatherData = {
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
      {
        date: 'April 25, 2024',
        image: 'forecast-image-3.png',
        highTemperature: 10,
        lowTemperature: 2,
        forecastType: 'Broken clouds',
      },
      {
        date: 'April 26, 2024',
        image: 'forecast-image-3.png',
        highTemperature: 10,
        lowTemperature: 2,
        forecastType: 'Broken clouds',
      },
      {
        date: 'April 27, 2024',
        image: 'forecast-image-3.png',
        highTemperature: 10,
        lowTemperature: 2,
        forecastType: 'Broken clouds',
      },
    ],
  };

  return (
    <main className="w-[95%] container flex flex-col h-screen p-2 pb-16 pt-4">
      <div className="py-4">
        some type of bar up here
      </div>
      <div className="pb-4">
        {/* <MainForecast currentWeather={currentWeather} isCelsius={isCelsius} /> */}
        <MainForecast currentWeather={currentWeather}/>
      </div>
      <div className="pb-4">
        <ChartComponent />
      </div>
      <div className="pb-4">
        <ExpandForecast currentWeather={currentWeather} exposedDays={exposedDays} toggleDayExposure={toggleDayExposure} isCelsius={isCelsius} />
      </div>
    </main>
  );
};

// export default Home;
