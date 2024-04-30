'use client'
import React, { useEffect, useState } from 'react';
import { roundTemperature, celsiusToFahrenheit } from '@/lib/utils';
import { getWeatherData } from '@/lib/getWeatherData'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from 'next/image';
import ChartComponent from '@/components/features/Chart';
import MainLoadingSkeleton from '@/components/features/mainLoadingSkeleton';

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
          // const { latitude: geoLat, longitude: geoLong } = await getGeolocation();
          // latitude = geoLat;
          // longitude = geoLong;
          const geoLocation = await getGeolocation();
          latitude = (geoLocation as { latitude: number }).latitude;
          longitude = (geoLocation as { longitude: number }).longitude;
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
    return <MainLoadingSkeleton />; 
  }

  if (!currentWeather) {
    return null; //
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
                    // <img
                    <Image
                      alt={currentWeather.current.weather[0].description.toString()}
                      src={`https://openweathermap.org/img/wn/${currentWeather.current.weather[0].icon}@2x.png`}
                      className="select-none"
                      width={100}
                      height={100}
                    />
                  )}
                </div>
                <div className="temperature flex items-center justify-center flex-col">
                  <CardTitle>
                    {
                      isCelsius
                        ? `${roundTemperature(currentWeather.current.temp)} °C` 
                        : `${roundTemperature(celsiusToFahrenheit(currentWeather.current.temp))} °F`
                    }
                  </CardTitle>
                  <CardDescription>
                    Feels like {
                      isCelsius
                        ? `${roundTemperature(currentWeather.current.feels_like)} °C`
                        : `${roundTemperature(celsiusToFahrenheit(currentWeather.current.feels_like))} °F` 
                    }.
                  </CardDescription>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <ChartComponent isCelsius={isCelsius} currentWeather={currentWeather}/>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MainForecast;
