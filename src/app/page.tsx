'use client'

import React, { useEffect, useState } from 'react';
import ChartComponent from '../components/features/Chart';
import MainForecast from '../components/features/mainForecast';
import ExpandForecast from '../components/features/expandForecast';
// import getWeatherData from '../app/api/route'
import NavBar from '../components/features/navBar'
// import { searchLocation, getLocationData } from '../lib/utils';
import SearchBox from "@/components/features/searchBox"
import { getWeatherData } from "@/app/api/route"
import { geolocationProvider } from "../components/providers/geolocationProvider"

interface HomeProps {
  isCelsius: boolean;
  exposedDays: boolean[];
  toggleDayExposure: (index: number) => void;
  // data: any;
  longitude: string;
  latitude: string;
}

interface ExpandForecastProps {
  currentWeather: any;
  // exposedDays: boolean[];
  // toggleDayExposure: (index: number) => void;
  // isCelsius: boolean;
}

// export default async function Home({ isCelsius, exposedDays, toggleDayExposure, longitude, latitude }: HomeProps) {
  export default function Home() {
  // const locationData = await getLocationData()
  // const locationData = await getProjects()
    // const locationData = await getLocationData();
    // const geolocation = await geolocationProvider();

    // const locationData =  getLocationData();
    // const geolocation =  await geolocationProvider();

  return (
    <main className="w-[95%] container flex flex-col h-screen p-2 pb-16 pt-4">

      <SearchBox />
      <div className="py-4">
        <NavBar />
      </div>
      <div className="pb-4">
        {/* <MainForecast currentWeather={currentWeather} isCelsius={isCelsius} /> */}
        {/* <MainForecast currentWeather={locationData} /> */}
        <MainForecast />
      </div>
      <div className="pb-4">
        {/* <ChartComponent currentWeather={locationData} /> */}
      </div>
      <div className="pb-4">
        {/* <ExpandForecast currentWeather={data} exposedDays={exposedDays} toggleDayExposure={toggleDayExposure} isCelsius={isCelsius} /> */}
        {/* <ExpandForecast currentWeather={locationData} /> */}
      </div>
    </main>
  );
};

// export default Home;


