'use client'
import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TiWeatherDownpour } from 'react-icons/ti';

interface ExpandForecastProps {
  currentWeather: any; // Define the type of currentWeather object
  exposedDays: boolean[];
  toggleDayExposure: (index: number) => void;
  isCelsius: boolean;
}

const ExpandForecast: React.FC<ExpandForecastProps> = ({ currentWeather, exposedDays, toggleDayExposure, isCelsius }) => {
  return (
    <div className="border-2 rounded-xl">
      <CardTitle className="">5 day forecast</CardTitle>
      <CardDescription>timeframe dateNow - date(7days) {currentWeather.dateTime}</CardDescription>
      <div className="forecast-container grid grid-cols-1 md:flex md:justify-center">
        <Accordion type="single" collapsible className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {currentWeather.forecast.map((day, index) => (
            <div key={index} className={`forecast-item ${exposedDays && exposedDays[index] ? 'exposed' : ''}`} onClick={() => toggleDayExposure(index)}>

              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="flex flex-col border-2 rounded-xl h-48">
                  <div>{day.date}</div>
                  <div className="flex flex-col justify-center items-center">
                    <TiWeatherDownpour size={'5em'} />
                    <div>
                      Low: {day.lowTemperature}°C | High: {day.highTemperature}°C
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
                            <p>
                              {currentWeather.temperature}°{isCelsius ? 'C' : 'F'}
                            </p>
                            <p>Feels like {currentWeather.feelsLike}°{isCelsius ? 'C' : 'F'}</p>
                          </div>
                          <p>{currentWeather.description}</p>
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
