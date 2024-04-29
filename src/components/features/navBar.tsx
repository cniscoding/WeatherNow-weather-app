'use client'
import React, { useState } from 'react';
import { searchLocation } from '../../lib/utils';
import SearchBox from "./searchBox"

interface navBarProps {

}

const navBar: React.FC<navBarProps> = ({ }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  return (
    <div>

      <nav className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
        <div >
          <SearchBox />
        </div>
        <div className="flex space-x-4">
          <span className="underline cursor-pointer">Hourly</span>
          <span className="underline cursor-pointer">36 Hours</span>
          <span className="underline cursor-pointer">Weekend</span>
          <span className="underline cursor-pointer">8 Day</span>
        </div>
      </nav>
    </div>
  );
};

export default navBar