'use client'

import React, { useState } from 'react';
import MainForecast from '../components/features/mainForecast';
import ExpandForecast from '../components/features/expandForecast';
import NavBar from '../components/features/navBar'
import { FavoriteForecast } from '../components/features/favoriteForecast'
import { ThemeProvider } from '@/app/providers'
import { ThemeSwitcher } from '@/components/features/ThemeSwitcher'
import { TemperatureToggle } from '@/components/features/ temperatureToggle'
import useWeatherData from '@/lib/useWeatherData';

interface ExpandForecast {
  isCelsius: boolean;
}

interface FavoriteForecast {
  isCelsius: boolean;
}
export default function Home() {
  const [isCelsius, setIsCelsius] = useState(true);
  const { currentWeather, loading } = useWeatherData();

  const toggleTemperatureUnit = () => {
    setIsCelsius((prev) => !prev);
  };

 
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className="w-[95%] container flex flex-col h-screen p-1 pb-16 ">
        <div className="flex flex-col md:flex-row-reverse md:justify-between">
          <div className="flex md:flex-col md:flex-row justify-end">
            <ThemeSwitcher />
            <TemperatureToggle onChange={toggleTemperatureUnit} />
          </div>
          <div className="w-full z-10 h-full">
            <NavBar />
          </div>
        </div>

        <div className="flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <div className="pb-4">
                <MainForecast isCelsius={isCelsius} currentWeather={currentWeather} loading={loading}/>
              </div>
              <div className="pb-4 ">
                <ExpandForecast isCelsius={isCelsius} currentWeather={currentWeather} loading={loading}/>
              </div>
            </div>

            <div className="lg:col-span-1 hidden lg:block">
              <div className="pb-4">
                <FavoriteForecast isCelsius={isCelsius}/>
              </div>
            </div>
          </div>
          <div className="lg:hidden pb-4">
            <FavoriteForecast isCelsius={isCelsius}/>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
};



