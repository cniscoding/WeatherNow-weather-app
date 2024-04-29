import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import React, { useEffect, useState } from 'react';
import { getWeatherData } from '@/app/api/route'
import { roundTemperature } from '../../lib/utils'

interface Coordinates {
  latitude: string;
  longitude: string;
}

interface FavoriteLocation {
  location: string;
  coordinates: Coordinates;
}

// interface WeatherData {
//   timezone: string;
//   daily: { summary: string }[];
//   current: {
//     temp: number;
//     feels_like: number;
//     weather: { description: string; icon: string }[];
//   };
// }

export const FavoriteForecast: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [isCelsius, setIsCelsius] = useState<boolean>(true);

  const favoriteList = [
    {
      location: "Thailand",
      coordinates: {
        latitude: 15.87,
        longitude: 100.9925
      },
      timezone: "Asia/Bangkok",
      current: {
        temp: 22,
        feels_like: 20,
        weather: [
          {
            id: 801,
            main: "Clouds",
            description: "few clouds",
            icon: "02d"
          }
        ]
      }
    },
    {
      location: "Las Vegas, NV",
      coordinates: {
        latitude: 36.188110,
        longitude: -115.176468
      },
      timezone: "America/Los_Angeles",
      current: {
        temp: 31,
        feels_like: 34,
        weather: [
          {
            id: 801,
            main: "Clear Sky",
            description: "Clear Sky",
            icon: "01d"
          }
        ]
      }
    },
    {
      location: "New Zealand",
      coordinates: {
        latitude: -40.9006,
        longitude: 174.8860
      },
      timezone: "Pacific/Auckland",
      current: {
        temp: 8,
        feels_like: 8,
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "Shower Rain",
            icon: "09d"
          }
        ]
      }
    }
  ];

  return (
    <Card className="w-full flex flex-col border-2 rounded-x p-4">
      <CardTitle className="">Favorites</CardTitle>
      <div className="">
        {favoriteList.map((location, index) => (
          <div className="border-2 rounded-xl flex flex-col m-2" key={index}>
            <CardHeader className="flex flex-col justify-center items-center p-1">
              <CardTitle>{location.location}</CardTitle>
              <CardDescription><p>{location.current.weather[0].description}</p></CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col">
                  {/* <div className={`relative invert-0 dark:invert mb-2`}> */}
                  <div>
                    {location.current.weather[0].icon && (
                      <img
                        alt={location.current.weather[0].description}
                        src={`https://openweathermap.org/img/wn/${location.current.weather[0].icon}@2x.png`}
                        className="select-none"
                      />
                    )}
                  </div>
                  <div className="temperature flex items-center justify-center flex-col">
                    <CardTitle >{roundTemperature(location.current.temp)} °{isCelsius ? 'C' : 'F'}</CardTitle>
                    <CardDescription>Feels like {roundTemperature(location.current.feels_like)} °{isCelsius ? 'C' : 'F'}{'.'}</CardDescription>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        ))}
      </div>
    </Card>
  );
};
