'use client'
import React from 'react';
import { roundTemperature, celsiusToFahrenheit } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from 'next/image';
import ChartComponent from '@/components/features/Chart';
import MainLoadingSkeleton from '@/components/features/mainLoadingSkeleton';
import { MdCancel } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";

interface MainForecastProps {
  isCelsius: boolean;
  currentWeather: any;
  loading: boolean;
  addFavoriteLocation: (location: string) => void;
  removeFavoriteLocation: (location: string) => void;
  favoriteLocationData: any;
}

const MainForecast: React.FC<MainForecastProps> = ({ favoriteLocationData, addFavoriteLocation, removeFavoriteLocation, isCelsius, currentWeather, loading }) => {
  if (loading || !currentWeather) {
    return <MainLoadingSkeleton />;
  }

  const handleFavoriteToggle = (location: any) => {

    const locationAdd = {
      location: currentWeather.timezone.split('/')[1].replace(/[_-]/g, ' '),
      coordinates: {
        latitude: currentWeather.lat,
        longitude: currentWeather.lon,
      },
      timezone: currentWeather.timezone,
      current: {
        temp: currentWeather.current.temp,
        feels_like: currentWeather.current.feels_like,
        weather: [
          {
            id: 801,
            main: currentWeather.current.weather[0].main,
            description: currentWeather.current.weather[0].description,
            icon: currentWeather.current.weather[0].icon,
          }
        ]
      }
    }
    if (favoriteLocationData.includes(location)) {
      removeFavoriteLocation(location);
    } else {
      // addFavoriteLocation(location);
      addFavoriteLocation(locationAdd);
    }
  };
  console.log(favoriteLocationData, 'favoriteLocationData main outside')
  return (
    <Card className="main-forecast w-full flex flex-col p-2 shadow-2xl">
      <CardTitle className="flex justify-center md:justify-start">Current Weather</CardTitle>
      <CardDescription className="flex justify-center md:justify-start tracking-tight text-xs md:text-sm">
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
      <div className="flex justify-end">
        <span className="inline-block cursor-pointer">
            <IoAddCircle
            onClick={() => handleFavoriteToggle(location)}
            className="text-blue-400 hover:text-blue-900 transition-colors duration-300 text-3xl"
          />
        </span>
      </div>
      <div className="flex shadow-xl">
        {/* current weather container */}
        <div className="w-full">
          <div className="shadow-xl rounded-xl ">
            <CardHeader className="flex flex-col justify-center items-center p-2">
              <CardTitle>
                {currentWeather && currentWeather.timezone && currentWeather.timezone.includes('/')
                  ? currentWeather.timezone.split('/')[1].replace(/[_-]/g, ' ')
                  : currentWeather && currentWeather.timezone}
              </CardTitle>
              <CardDescription className="text-center tracking-tight">{currentWeather.daily[0].summary}</CardDescription>
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
                      width={85}
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
            <ChartComponent isCelsius={isCelsius} currentWeather={currentWeather} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MainForecast;
