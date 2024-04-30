'use client'

import React from 'react';
import ChartComponent from '../components/features/Chart';
import MainForecast from '../components/features/mainForecast';
import ExpandForecast from '../components/features/expandForecast';
// import getWeatherData from '../app/api/route'
import NavBar from '../components/features/navBar'
// import { searchLocation, getLocationData } from '../lib/utils';
// import SearchBox from "@/components/features/searchBox"
import { getWeatherData } from "@/app/api/route"
import { geolocationProvider } from "../components/providers/geolocationProvider"
import { FavoriteForecast } from '../components/features/favoriteForecast'

interface HomeProps {
  isCelsius: boolean;
  exposedDays: boolean[];
  toggleDayExposure: (index: number) => void;
  // data: any;
  longitude: string;
  latitude: string;
}

// export default async function Home({ isCelsius, exposedDays, toggleDayExposure, longitude, latitude }: HomeProps) {
export default function Home() {

  return (
    <main className="w-[95%] container flex flex-col h-screen p-2 pb-16 pt-4">

      {/* Navbar */}
      <div className="py-4">
        <NavBar />
      </div>

      {/* Content */}
      <div className="flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="pb-4">
              <MainForecast />
            </div>
            {/* <div className="pb-4">
              <ChartComponent />
            </div> */}
            <div className="pb-4 ">
              <ExpandForecast />
            </div>
          </div>
          {/* Sidebar for Favorites */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="pb-4">
              <FavoriteForecast />
            </div>
          </div>
        </div>
        {/* Sidebar for Favorites on small screens */}
        <div className="lg:hidden pb-4">
          <FavoriteForecast />
        </div>
      </div>
    </main>
  );
};



