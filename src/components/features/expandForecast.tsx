'use client'
import { roundTemperature } from '@/lib/utils'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import {
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import React, { useEffect, useState } from 'react';
import { getWeatherData } from '@/app/api/route'

interface ExpandForecastProps {
//   currentWeather: any;
  exposedDays: boolean[];
//   // toggleDayExposure: (index: number) => void;
//   // isCelsius: boolean;
}

const ExpandForecast: React.FC<ExpandForecastProps> = ({exposedDays}) => {
  const [currentWeather, setCurrentWeather] = useState<any>(null); // State to hold weather data
  const [isCelsius, setIsCelsius] = useState<boolean>(true); // State to hold temperature unit

  useEffect(() => {
    async function fetchData() {
      try {
        // Get geolocation
        const { latitude, longitude } = await getGeolocation();

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

  if (!currentWeather) {
    return null; // Render nothing if weather data is not available yet
  }


  return (
    <div className="border-2 rounded-xl">
      <CardTitle className="">8 day forecast</CardTitle>
      <CardDescription>timeframe dateNow - date(7days) {currentWeather.dateTime}</CardDescription>
      <div className="forecast-container grid grid-cols-1 md:flex md:justify-center">
        <Accordion type="single" collapsible className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {currentWeather.daily.map((day, index) => (
            <div key={index} className={`forecast-item ${exposedDays && exposedDays[index] ? 'exposed' : ''}`} onClick={() => toggleDayExposure(index)}>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="flex flex-col border-2 rounded-xl h-48">
                  <div>{day.date}</div>
                  <div className="flex flex-col justify-center items-center">
                    {/* <TiWeatherDownpour size={'5em'} /> */}
                    <div className={`relative invert-0 dark:invert`}>
                      {day.weather[0].icon && (
                        <img
                          // alt={day.weather.description.toString()}
                          src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                          className="select-none"
                        />
                      )}
                    </div>
                    <div>
                      Low: {roundTemperature(day.temp.min)} °C | High: {roundTemperature(day.temp.max)} °C
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col justify-center items-center">
                  <div>
                    <div>{day.forecastType}</div>
                    <div className="detailed-info">
                      <div className="weather-info">
                        <div className="weather-details">
                          <div className="temperature">
                            {/* <p>
                              {currentWeather.temperature}°{isCelsius ? 'C' : 'F'}
                            </p> */}
                            <p>Feels like Low: {roundTemperature(day.feels_like.day)} °C | High: {roundTemperature(day.feels_like.night)}°{isCelsius ? 'C' : 'F'}</p>
                          </div>
                          <p>{day.summary}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default ExpandForecast;
