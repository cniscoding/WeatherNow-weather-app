import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { roundTemperature, celsiusToFahrenheit, fahrenheitToCelsius } from '../../lib/utils';

interface favoriteProp {
  isCelsius: boolean;
}
export const FavoriteForecast: React.FC<favoriteProp> = ({isCelsius}) => {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const dummyData = [
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
        setCurrentWeather(dummyData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    // Render loading skeleton
    return (
      <Card className="w-full flex flex-col p-4 shadow-md">
        <CardTitle className="animate-pulse">Favorites</CardTitle>
        {[1, 2, 3].map((_, index) => (
          <div className="rounded-xl flex flex-col m-2 shadow-lg" key={index}>
            <CardHeader className="flex flex-col justify-center items-center p-1">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-1 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col">
                  <div className="h-16 w-16 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="temperature flex items-center justify-center flex-col">
                    <div className="h-6 bg-gray-300 rounded w-16 mb-1 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        ))}
      </Card>
    );
  }

  // Render actual content when data is loaded
  return (
    <Card className="w-full flex flex-col p-4 shadow-md">
      <CardTitle className="">Favorites</CardTitle>
      <div className="">
        {currentWeather.map((location, index) => (
          <div className="rounded-xl flex flex-col m-2 shadow-lg" key={index}>
            <CardHeader className="flex flex-col justify-center items-center p-1">
              <CardTitle>{location.location}</CardTitle>
              <CardDescription><p>{location.current.weather[0].description}</p></CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col">
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
                    <CardTitle>
                      {
                        isCelsius
                          ? `${roundTemperature(location.current.temp)} °C` 
                          : `${roundTemperature(celsiusToFahrenheit(location.current.temp))} °F` 
                      }
                    </CardTitle>

                    <CardDescription>
                      Feels like {
                        isCelsius
                          ? `${roundTemperature(location.current.feels_like)} °C` 
                          : `${roundTemperature(celsiusToFahrenheit(location.current.feels_like))} °F` 
                      }.
                    </CardDescription>
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