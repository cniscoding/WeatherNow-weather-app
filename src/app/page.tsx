
import React, { useEffect } from 'react';
import ChartComponent from '../components/features/Chart';
import MainForecast from '../components/features/mainForecast';
import ExpandForecast from '../components/features/expandForecast';
// import getWeatherData from '../app/api/route'
import NavBar from '../components/features/navBar'
import { searchLocation } from '../lib/utils';

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
  // exposedDays: boolean[];
  // toggleDayExposure: (index: number) => void;
  // isCelsius: boolean;
}

export default async function Home({ isCelsius, exposedDays, toggleDayExposure }: HomeProps) {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const exclude = 'minutely';
  const units = 'metric'
  let data = {};

  let lat;
  let lon;

  try {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        const { latitude, longitude } = success.coords;
        lat = latitude;
        lon = longitude;
      },
      (error) => {
        console.error('Error getting location:', error);
        // Set default latitude and longitude Japan
        lat = '336.2048';
        lon = '138.2529'; // Default longitude
      }
    );
  } catch (error) {
    console.error('Error retrieving geolocation:', error);
        // Set default latitude and longitude Japan
        lat = '36.2048';
        lon = '138.2529'; // Default longitude
  }

  console.log('Latitude: error', lat);
  console.log('Longitude: error', lon);


  try {
    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=${units}&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    data = await response.json();

  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return <div>Loading...</div>;
  }

  return (
    <main className="w-[95%] container flex flex-col h-screen p-2 pb-16 pt-4">
      <div className="py-4">
        <NavBar />
      </div>
      <div className="pb-4">
        {/* <MainForecast currentWeather={currentWeather} isCelsius={isCelsius} /> */}
        <MainForecast currentWeather={data} />
      </div>
      <div className="pb-4">
        <ChartComponent currentWeather={data} />
      </div>
      <div className="pb-4">
        {/* <ExpandForecast currentWeather={data} exposedDays={exposedDays} toggleDayExposure={toggleDayExposure} isCelsius={isCelsius} /> */}
        <ExpandForecast currentWeather={data} />
      </div>
    </main>
  );
};

// export default Home;
