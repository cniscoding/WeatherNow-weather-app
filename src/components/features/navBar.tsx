'use client'
import React from 'react';
import SearchBox from "./searchBox"

interface navBarProps {
  currentWeatherUpdate: any
}

const navBar: React.FC<navBarProps> = ({ currentWeatherUpdate }) => {

  return (

    // <nav className="text-black py-1 md:py-2 px-6 flex justify-between items-center flex-col rounded-xl shadow-md">
    <div className="w-full z-10 h-full">
      <SearchBox currentWeatherUpdate={currentWeatherUpdate} />
    </div>
    // <div className="flex space-x-4">
    //   {/* <span className="underline cursor-pointer">Hourly</span>
    //   <span className="underline cursor-pointer">36 Hours</span>
    //   <span className="underline cursor-pointer">Weekend</span>
    //   <span className="underline cursor-pointer">8 Day</span> */}
    // </div>
    // </nav>

  );
};

export default navBar