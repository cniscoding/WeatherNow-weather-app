'use client'
import { roundTemperature, getDayOfWeek, celsiusToFahrenheit, fahrenheitToCelsius} from '@/lib/utils'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import {
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import React, { useEffect, useState } from 'react';
import { getWeatherData } from '@/app/api/route'
import ExpandForecastLoadingSkeleton from '@/components/features/expandLoadingSkeleton'
import { useTheme } from "next-themes";

interface ExpandForecastProps {
  exposedDays: boolean[];
  isCelsius: boolean;
}

const ExpandForecast: React.FC<ExpandForecastProps> = ({ exposedDays, isCelsius }) => {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  // const [isCelsius, setIsCelsius] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const searchLat = searchParams.get('Latitude');
        const searchLong = searchParams.get('Longitude');
        let latitude, longitude;

        // Check if search params are available
        if (searchLat && searchLong) {
          latitude = parseFloat(searchLat);
          longitude = parseFloat(searchLong);
        } else {
          const { latitude: geoLat, longitude: geoLong } = await getGeolocation();
          latitude = geoLat;
          longitude = geoLong;
        }

        // Get weather data based on geolocation
        const { props: { currentWeather } } = await getWeatherData(latitude, longitude);
        console.log('Weather data:', currentWeather);

        // Update state with weather data
        setCurrentWeather(currentWeather);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false)
      }
    }
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  async function getGeolocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (success) => {
          const { latitude, longitude } = success.coords;
          console.log('Geolocation success. Latitude:', latitude, 'Longitude:', longitude);
          resolve({ latitude, longitude });
        },
        (error) => {
          const defaultLat = 49.2827;
          const defaultLong = -123.1207;
          console.log('Using default coordinates. Latitude:', defaultLat, 'Longitude:', defaultLong);
          resolve({ latitude: defaultLat, longitude: defaultLong });
        }
      );
    });
  }
  if (loading || !currentWeather) {
    return <ExpandForecastLoadingSkeleton />; // Render loading skeleton while data is being fetched
  }

  if (!currentWeather) {
    return null; // Render nothing if weather data is not available yet
  }

  const { theme } = useTheme();

  return (
    <div className="rounded-xl p-4 shadow-2xl">
      <CardTitle className="">5 Day Forecast</CardTitle>
      <div className="pt-2 forecast-container grid grid-cols-6 gap-2">
        <div className="">

        </div>
        {/* Top part */}
        {currentWeather.daily.slice(0, 5).map((day, index) => (
          <div key={index} className={`${exposedDays && exposedDays[index] ? 'exposed' : ''} border-2 rounded-xl p-1`} onClick={() => toggleDayExposure(index)}>
            {/* <div>{getDayOfWeek(day.dt)}</div> */}
            <div className="flex flex-col h-full justify-between">
              <div className="">
                <CardTitle className='text-sm md:text-lg truncate'>{getDayOfWeek(day.dt)}</CardTitle>
                <CardDescription className='text-[0.65rem] sm:text-sm'>{day.summary}</CardDescription>
              </div>
              <div className={`relative invert-0 dark:invert-100`}>
                {day.weather[0].icon && (
                  <img
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    className="select-none"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="forecast-container grid grid-cols-6 gap-2">
        <ul className="flex flex-col items-end justify-center">
          <li>Low </li>
          <li className="bg-gray-200 w-full flex justify-end dark:bg-gray-800">High</li>
          <li>Feels</li>
          <li className="bg-gray-200 w-full flex justify-end dark:bg-gray-800">Feels</li>
        </ul>

        {/* Bottom part */}
        {currentWeather.daily.slice(0, 5).map((day, index) => (
          <div key={index} className={`forecast-item ${exposedDays && exposedDays[index] ? 'exposed' : ''}`} onClick={() => toggleDayExposure(index)}>
            <ul className="">
              <li className="border-b-2 w-full flex flex-col items-center">
                {isCelsius
                  ? `${roundTemperature(day.temp.min)} °C` // Display Celsius temperature
                  : `${roundTemperature(celsiusToFahrenheit(day.temp.min))} °F` // Convert and display Fahrenheit temperature
                }
              </li>
              <li className="border-b-2 w-full flex flex-col items-center bg-gray-200 dark:bg-gray-800">
                {isCelsius
                  ? `${roundTemperature(day.temp.max)} °C` // Display Celsius temperature
                  : `${roundTemperature(celsiusToFahrenheit(day.temp.max))} °F` // Convert and display Fahrenheit temperature
                }
              </li>
              <li className="border-b-2 w-full flex flex-col items-center">
                {isCelsius
                  ? `${roundTemperature(day.feels_like.day)} °C` // Display Celsius temperature
                  : `${roundTemperature(celsiusToFahrenheit(day.feels_like.day))} °F` // Convert and display Fahrenheit temperature
                }
              </li>
              <li className="border-b-2 w-full flex flex-col items-center bg-gray-200 dark:bg-gray-800">
                {isCelsius
                  ? `${roundTemperature(day.feels_like.night)} °C` // Display Celsius temperature
                  : `${roundTemperature(celsiusToFahrenheit(day.feels_like.night))} °F` // Convert and display Fahrenheit temperature
                }
              </li>
            </ul>
          </div>
        ))}</div>
    </div>
  );
};

export default ExpandForecast;
