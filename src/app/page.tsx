

import React, { useEffect } from 'react';
import ChartComponent from '../components/features/Chart';
import MainForecast from '../components/features/mainForecast';
import ExpandForecast from '../components/features/expandForecast';
// import getWeatherData from '../app/api/route'
import NavBar from '../components/features/navBar'
import { searchLocation } from '../lib/utils';
import SearchBox from "@/components/features/searchBox"
import { getWeatherData } from "@/app/api/route"
import { geolocationProvider } from "../components/providers/geolocationProvider"

interface HomeProps {
  isCelsius: boolean;
  exposedDays: boolean[];
  toggleDayExposure: (index: number) => void;
  // data: any;
}

async function getProjects() {

  try {
    let lat, lon;
    if (true) {
      // Use default lat and lon
      lat = '36.2048';
      lon = '138.2529';
    } else {
      // Get lat and lon from geolocationProvider
      // (code to get lat and lon from geolocationProvider)
    }
    // const { lat, lon } = await geolocationProvider();
    // let lat = '36.2048'
    // let lon = '138.2529' 
    // console.log('Latitude:', lat, 'Longitude:', lon);
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const exclude = 'minutely';
    const units = 'metric';

    const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=${units}&appid=${apiKey}`, { cache: 'no-store' });
    const projects = await res.json();

    // console.log('Weather data:', projects);
    return projects;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

interface ExpandForecastProps {
  currentWeather: any;
  // exposedDays: boolean[];
  // toggleDayExposure: (index: number) => void;
  // isCelsius: boolean;
}

export default async function Home({ isCelsius, exposedDays, toggleDayExposure }: HomeProps) {
  const projects = await getProjects()

  // console.log('projects asjkldfjkla sdklfjas l;dkfj;asdklfj kl;adsjf ;klasjdf; klasjd;fkl jasd;', projects)
  return (
    <main className="w-[95%] container flex flex-col h-screen p-2 pb-16 pt-4">
      <SearchBox />
      <div className="py-4">
        <NavBar />
      </div>
      <div className="pb-4">
        {/* <MainForecast currentWeather={currentWeather} isCelsius={isCelsius} /> */}
        <MainForecast currentWeather={projects} />
      </div>
      <div className="pb-4">
        <ChartComponent currentWeather={projects} />
      </div>
      <div className="pb-4">
        {/* <ExpandForecast currentWeather={data} exposedDays={exposedDays} toggleDayExposure={toggleDayExposure} isCelsius={isCelsius} /> */}
        <ExpandForecast currentWeather={projects} />
      </div>
    </main>
  );
};

// export default Home;


