'use client'
import React, { useEffect, useState } from 'react';
import { geolocationProvider } from '@/components/providers/geolocationProvider';
import { getLocationData } from '@/lib/utils';
import { roundTemperature, currentWeather, fetchData } from '../../lib/utils'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Image from 'next/image'
import { getWeatherData } from '@/app/api/route'
import { useWeatherData } from './useWeatherData';


interface MainForecastProps {
  // currentWeather: any; 
  // isCelsius: boolean;
}

// const MainForecast: React.FC<MainForecastProps> = () => {
const MainForecast: React.FC<MainForecastProps> = () => {
  const [currentWeather, setCurrentWeather] = useState<any>(null); // State to hold weather data
  const [isCelsius, setIsCelsius] = useState<boolean>(true); // State to hold temperature unit

  useEffect(() => {
    async function fetchData() {
      try {
        // Get geolocation
        // const { latitude, longitude } = await getGeolocation();
        // Get search params
        const searchParams = new URLSearchParams(window.location.search);
        const searchLat = searchParams.get('Latitude');
        const searchLong = searchParams.get('Longitude');

        let latitude, longitude;

        // Check if search params are available
        if (searchLat && searchLong) {
          latitude = parseFloat(searchLat);
          longitude = parseFloat(searchLong);
        } else {
          // If no search params, get geolocation
          const { latitude: geoLat, longitude: geoLong } = await getGeolocation();
          latitude = geoLat;
          longitude = geoLong;
        }


        // Get weather data based on geolocation
        const { props: { currentWeather } } = await getWeatherData(latitude, longitude);
        console.log('Weather data:', currentWeather);

        // Update state with weather data
        setCurrentWeather(currentWeather);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }

    // Call fetchData function
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
          console.error('Error getting location:', error);
          reject(error);
        }
      );
    });
  }
  // useEffect(() => {
  //   // Call fetchData function
  //   fetchData();
  // }, []);

  if (!currentWeather) {
    return null; // Render nothing if weather data is not available yet
  }

  return (
    <Card className="main-forecast w-full flex flex-col border-2 rounded-xl">
      <CardTitle className="">Current Weather</CardTitle>
      <CardDescription>
        {new Date().toLocaleDateString("en-US", {
          timeZoneName: "short",
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        }
        )}
      </CardDescription>
      <div className="flex items-center justify-center flex-col">
        {/* current weather container */}
        <div className="w-full">
          <div className="border-2 rounded-xl w-full">
            <CardHeader className="flex flex-col justify-center items-center">
              <CardTitle>{currentWeather.timezone}</CardTitle>
              <CardDescription>{currentWeather.daily[0].summary}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col justify-center items-center">
                <div className="weather-details flex flex-row">
                  <div className={`relative invert-0 dark:invert`}>
                    {currentWeather.current.weather[0].icon && (
                      <img
                        alt={currentWeather.current.weather[0].description.toString()}
                        src={`https://openweathermap.org/img/wn/${currentWeather.current.weather[0].icon}@2x.png`}
                        className="select-none"
                      />
                    )}

                  </div>
                  {/* https://openweathermap.org/img/wn/09n@2x.png */}
                  <div className="temperature flex items-center justify-center flex-col">
                    <CardTitle>{roundTemperature(currentWeather.current.temp)} °{isCelsius ? 'C' : 'F'}</CardTitle>
                    <CardDescription>Feels like {roundTemperature(currentWeather.current.feels_like)} °{isCelsius ? 'C' : 'F'}{'.'}</CardDescription>
                  </div>
                </div>
                <p>{currentWeather.current.weather[0].description}</p>
                <div className="weather-info">
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MainForecast;
