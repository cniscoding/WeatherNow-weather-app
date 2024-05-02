'use client'
import { roundTemperature, getDayOfWeek, celsiusToFahrenheit } from '@/lib/utils'
import {
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import React from 'react';
import ExpandForecastLoadingSkeleton from '@/components/features/expandLoadingSkeleton'
import Image from 'next/image';


interface ExpandForecastProps {
  isCelsius: boolean;
  currentWeather: any;
  loading: boolean;
}

interface Weather {
  icon: string;
}

interface WeatherDay {
  dt: number;
  summary: string;
  weather: Weather[];
  feels_like: FeelsLike;
  temp: Temp;
}

interface FeelsLike {
  day: number;
  night: number;
}

interface Temp {
  max: number;
  min: number;
}

const ExpandForecast: React.FC<ExpandForecastProps> = ({ isCelsius, currentWeather, loading}) => {

  if (loading || !currentWeather) {
    return <ExpandForecastLoadingSkeleton />;
  }

  return (
    <div className="rounded-xl p-4 shadow-2xl">
      <CardTitle className="text-center md:text-left">5 Day Forecast</CardTitle>
      <div className="pt-2 forecast-container grid grid-cols-6 gap-2">
        <div className="">

          {/* Top Container */}
        </div>
        {currentWeather.daily.slice(0, 5).map((day: WeatherDay, index: number) => (
          <div key={index} className={`border-2 rounded-xl p-1`}>
            <div className="flex flex-col h-full justify-between">
              <div className="">
                <CardTitle className='tracking-tight text-xs md:text-lg truncate'>{getDayOfWeek(day.dt)}</CardTitle>
                <CardDescription className='tracking-tight hidden md:flex text-[0.65rem] sm:text-sm'>{day.summary}</CardDescription>
              </div>
              <div className={`relative invert-0 dark:invert-100`}>
                {day.weather[0].icon && (
                  <Image
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    alt={day.summary}
                    className="select-none"
                    width={300}
                    height={200}
                    priority={true}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="forecast-container grid grid-cols-6 gap-2">
        <ul className="flex flex-col items-end justify-center">
          <li className="truncate sm:w-auto flex h-full justify-end text-xs md:text-sm items-center">Low </li>
          <li className="truncate bg-gray-200 h-full w-full flex justify-end dark:bg-gray-800 text-xs md:text-sm items-center">High</li>
          <li className="truncate sm:w-auto flex h-full justify-end text-xs md:text-sm items-center">Day</li>
          <li className="truncate bg-gray-200 h-full w-full flex justify-end dark:bg-gray-800 text-xs md:text-sm items-center">Night</li>
        </ul>

        {/* Bottom container */}
        {currentWeather.daily.slice(0, 5).map((day: WeatherDay, index: number) => (
          <div key={index} className={`forecast-item`}>
            <ul className="">
              <li className="border-b-2 w-full flex flex-col items-center text-xs md:text-sm">
                {isCelsius
                  ? `${roundTemperature(day.temp.min)} °C`
                  : `${roundTemperature(celsiusToFahrenheit(day.temp.min))} °F`
                }
              </li>
              <li className="border-b-2 w-full flex flex-col items-center bg-gray-200 dark:bg-gray-800 text-xs md:text-sm">
                {isCelsius
                  ? `${roundTemperature(day.temp.max)} °C`
                  : `${roundTemperature(celsiusToFahrenheit(day.temp.max))} °F`
                }
              </li>
              <li className="border-b-2 w-full flex flex-col items-center text-xs md:text-sm">
                {isCelsius
                  ? `${roundTemperature(day.feels_like.day)} °C`
                  : `${roundTemperature(celsiusToFahrenheit(day.feels_like.day))} °F`
                }
              </li>
              <li className="border-b-2 w-full flex flex-col items-center bg-gray-200 dark:bg-gray-800 text-xs md:text-sm">
                {isCelsius
                  ? `${roundTemperature(day.feels_like.night)} °C`
                  : `${roundTemperature(celsiusToFahrenheit(day.feels_like.night))} °F`
                }
              </li>
            </ul>
          </div>
        ))}</div>
    </div>
  );
};

export default ExpandForecast;
