'use client'
import React, { useEffect, useState } from 'react';
import { geolocationProvider } from '@/components/providers/geolocationProvider';
import { roundTemperature, celsiusToFahrenheit, fahrenheitToCelsius, fetchData, renderWeather } from '@/lib/utils';
// import { roundTemperature, currentWeather, fetchData } from '../../lib/utils'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Image from 'next/image'
import { getWeatherData } from '@/app/api/route'
// import { useWeatherData } from './useWeatherData';
import ChartComponent from '@/components/features/Chart';
import useWeatherData from '@/lib/weatherData'
import mainLoadingSkeleton from '@/components/features/mainLoadingSkeleton'

interface MainForecastProps {
  // currentWeather: any; 
  isCelsius: boolean;
}

const MainForecast: React.FC<MainForecastProps> = ({ isCelsius }) => {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
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
    return <mainLoadingSkeleton />; // Render loading skeleton while data is being fetched
  }

  if (!currentWeather) {
    return null; // Render nothing if weather data is not available yet
  }


  return (
    <Card className="main-forecast w-full flex flex-col p-2 shadow-2xl">
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
      <div className="flex shadow-xl">
        {/* current weather container */}
        <div className="w-full">
          <div className="shadow-xl rounded-xl">
            <CardHeader className="flex flex-col justify-center items-center p-2">
              <CardTitle>{currentWeather.timezone}</CardTitle>
              <CardDescription>{currentWeather.daily[0].summary}</CardDescription>
            </CardHeader>
            {/* <CardContent> */}
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
                <div className="temperature flex items-center justify-center flex-col">
                  <CardTitle>
                    {
                      isCelsius
                        ? `${roundTemperature(currentWeather.current.temp)} °C` // Display Celsius temperature
                        : `${roundTemperature(celsiusToFahrenheit(currentWeather.current.temp))} °F` // Convert and display Fahrenheit temperature
                    }
                  </CardTitle>
                  <CardDescription>
                    Feels like {
                      isCelsius
                        ? `${roundTemperature(currentWeather.current.feels_like)} °C` // Display Celsius temperature
                        : `${roundTemperature(celsiusToFahrenheit(currentWeather.current.feels_like))} °F` // Convert and display Fahrenheit temperature
                    }.
                  </CardDescription>
                </div>
              </div>
              {/* <p>{currentWeather.current.weather[0].description}</p> */}
            </div>
            {/* </CardContent> */}
          </div>
          {/* testing */}
          <div className="mt-2">
            <ChartComponent />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MainForecast;
