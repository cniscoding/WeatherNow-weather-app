'use client'
import React, {useState} from 'react';

interface navBarProps {

}

const navBar: React.FC<navBarProps> = ({ }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;


  const handleSearch = async () => {
    console.log(searchQuery)
    try {
      // Fetch longitude and latitude using OpenWeatherMap Geo API
      console.log(`http://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=5&appid=${apiKey}`)
      const geoResponse = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=5&appid=${apiKey}`
      );
      console.log(geoResponse)
      // const geoData = await geoResponse.json();

      // Extract longitude and latitude from geoData
      // if (geoData.length > 0) {
      //   const { lat, lon } = geoData[0];

      //   // Fetch weather data using longitude and latitude
      //   const weatherResponse = await fetch(
      //     `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}`
      //   );
      //   const weatherData = await weatherResponse.json();
        
      //   // Set weatherData state with fetched data
      //   setWeatherData(weatherData);
      // }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>

    <nav className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search For Location"
          value={searchQuery}
          onChange={handleInputChange}
          className="border-b border-white bg-transparent text-white mr-2"
        />
        <button onClick={handleSearch} className="text-white">🔎</button>
      </div>
      <div>
      </div>
      <div className="flex space-x-4">
        <span className="underline cursor-pointer">Hourly</span>
        <span className="underline cursor-pointer">36 Hours</span>
        <span className="underline cursor-pointer">Weekend</span>
        <span className="underline cursor-pointer">8 Day</span>
      </div>
    </nav>
    <div>
      testing here.
      {searchQuery}
    </div>
    </div>
  );
};

export default navBar