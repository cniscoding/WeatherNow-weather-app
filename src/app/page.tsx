'use client'
import React, { useState } from 'react';
import ChartComponent from '../components/features/Chart';
import MainForecast from '../components/features/mainForecast';
import ExpandForecast from '../components/features/expandForecast';

// import { TiWeatherDownpour } from "react-icons/ti";
// import React, { useState } from 'react';
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"

// interface WeatherData {
//   location: string;
//   dateTime: string;
//   temperature: number;
//   feelsLike: number;
//   description: string;
//   forecast: {
//     date: string;
//     image: string;
//     highTemperature: number;
//     lowTemperature: number;
//     forecastType: string;
//   }[];
// }

// const Home: React.FC = () => {
//   // Placeholder data
// const [currentWeather, setCurrentWeather] = useState<WeatherData>({
//   location: 'New York',
//   dateTime: new Date().toLocaleString(),
//   temperature: 20,
//   feelsLike: 22,
//   description: 'Partly cloudy',
//   forecast: [
//     {
//       date: 'April 23, 2024',
//       image: 'forecast-image-1.png',
//       highTemperature: 25,
//       lowTemperature: 18,
//       forecastType: 'Light rain',
//     },
//     {
//       date: 'April 24, 2024',
//       image: 'forecast-image-2.png',
//       highTemperature: 27,
//       lowTemperature: 20,
//       forecastType: 'Broken clouds',
//     },
//     {
//       date: 'April 25, 2024',
//       image: 'forecast-image-3.png',
//       highTemperature: 10,
//       lowTemperature: 2,
//       forecastType: 'Broken clouds',
//     },
//     {
//       date: 'April 26, 2024',
//       image: 'forecast-image-3.png',
//       highTemperature: 10,
//       lowTemperature: 2,
//       forecastType: 'Broken clouds',
//     },
//     {
//       date: 'April 27, 2024',
//       image: 'forecast-image-3.png',
//       highTemperature: 10,
//       lowTemperature: 2,
//       forecastType: 'Broken clouds',
//     },
//     // Add more forecast data for other days
//   ],
// });

//   // State for temperature unit toggle
//   const [isCelsius, setIsCelsius] = useState(true);

//   // State for dark mode toggle
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   // Function to toggle temperature unit
//   const toggleTemperatureUnit = () => {
//     setIsCelsius(!isCelsius);
//   };

//   // Function to toggle dark mode
//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   // State for search query
//   const [searchQuery, setSearchQuery] = useState('');

//   // Function to handle search input change
//   const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   // State to track which days have detailed information exposed
//   const [exposedDays, setExposedDays] = useState<boolean[]>(
//     new Array(currentWeather.forecast.length).fill(false)
//   );

//   // Function to toggle exposure of detailed information for a day
//   const toggleDayExposure = (index: number) => {
//     const newExposedDays = [...exposedDays];
//     newExposedDays[index] = !newExposedDays[index];
//     setExposedDays(newExposedDays);
//   };


//   return (
//     <main className="flex min-h-screen flex-col items-center p-24">
//       {/* top container */}
//       <div className="border-2 p-4 rounded-xl flex w-full items-center justify-center">
//         <input
//           type="text"
//           className="search-input border-2"
//           placeholder="Search..."
//           value={searchQuery}
//           onChange={handleSearchInputChange}
//         />
//         <div>
//           <button onClick={toggleTemperatureUnit}>
//             {isCelsius ? 'C' : 'F'}
//           </button>
//         </div>
//         <div>
//           <button onClick={toggleDarkMode}>
//             {isDarkMode ? 'Light Mode' : 'Dark Mode'}
//           </button>
//         </div>
//       </div>

//       {/* current weather */}
//       <Card className="main-forecast w-full flex flex-col p-4 m-2">
//         <div className="flex items-center justify-center flex-col">
//           {/* current weather container */}
//           <div className="w-full px-8 py-2">
//             <div className="border-2 rounded-xl w-full">
//               <CardHeader className="flex flex-col justify-center items-center">
//                 <CardTitle>{currentWeather.location}</CardTitle>
//                 <CardDescription>{currentWeather.dateTime}</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex flex-col justify-center items-center">
//                   <p>Feels like {currentWeather.feelsLike}°{isCelsius ? 'C' : 'F'}{'.'} {currentWeather.description}</p>
//                   <div className="weather-info">
//                     <div className="weather-details flex flex-row">
//                       <TiWeatherDownpour className="text-5xl" />
//                       <div className="temperature flex items-center justify-center p-2 text-4xl">
//                         <p>
//                           {currentWeather.temperature}°{isCelsius ? 'C' : 'F'}
//                         </p>
//                       </div>

//                     </div>

//                   </div>
//                 </div>
//               </CardContent>
//             </div>
//           </div>
//           {/* hourly forecast */}
//           <CardContent className="w-full flex flex-col">
//             <div className="border-2 rounded-xl p-4 m-2">
//               <CardTitle>hourly forecast chart</CardTitle>
//               <ChartComponent />
//             </div>
//             {/* 8 day forecast */}
//             <div className="border-2 rounded-xl p-4 m-2 ">
//               <CardTitle className="py-4">8 day forecast</CardTitle>
//               <div className="forecast-container grid grid-cols-1 md:flex md:justify-center">
//                 <Accordion type="single" collapsible className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//                   {currentWeather.forecast.map((day, index) => (
//                     <div key={index} className={`forecast-item ${exposedDays[index] ? 'exposed' : ''}`} onClick={() => toggleDayExposure(index)}>
//                       <AccordionItem value={`item-${index}`}>
//                         <AccordionTrigger className="flex flex-col border-2 rounded-xl h-48 p-2">
//                           <div>{day.date}</div>
//                           <div className="flex flex-col justify-center items-center">
//                             {/* <img src={day.image} alt="Forecast" /> */}
//                             <TiWeatherDownpour size={'5em'} />
//                             <div>
//                               Low: {day.lowTemperature}°C | High: {day.highTemperature}°C
//                             </div>
//                           </div>
//                         </AccordionTrigger>
//                         <AccordionContent className="flex flex-col justify-center items-center">
//                           <div>
//                             <div>{day.forecastType}</div>
//                             <div className="detailed-info">
//                               <div className="weather-info">
//                                 {/* Render detailed weather information here */}
//                                 <div className="weather-details">
//                                   {/* <img src="weather-icon.png" alt="Weather Icon" /> */}
//                                   {/* <TiWeatherDownpour size={'4em'} /> */}
//                                   <div className="temperature">
//                                     <p>
//                                       {currentWeather.temperature}°{isCelsius ? 'C' : 'F'}
//                                     </p>
//                                     <p>Feels like {currentWeather.feelsLike}°{isCelsius ? 'C' : 'F'}</p>
//                                   </div>
//                                   <p>{currentWeather.description}</p>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </AccordionContent>
//                       </AccordionItem>
//                     </div>
//                   ))}
//                 </Accordion>
//               </div>
//             </div>
//           </CardContent>
//         </div>
//         <CardFooter className="">
//           <p>something about the forecast</p>
//         </CardFooter>
//       </Card>

//       {/* content */}


//     </main>
//   );
// }

// export default Home;


interface HomeProps {
  isCelsius: boolean;
  exposedDays: boolean[];
  toggleDayExposure: (index: number) => void;
}

interface WeatherData {
  location: string;
  dateTime: string;
  temperature: number;
  feelsLike: number;
  description: string;
  forecast: {
    date: string;
    image: string;
    highTemperature: number;
    lowTemperature: number;
    forecastType: string;
  }[];
}

interface ExpandForecastProps {
  currentWeather: any;
  exposedDays: boolean[];
  toggleDayExposure: (index: number) => void;
  isCelsius: boolean; // Add this line
}

const Home: React.FC<HomeProps> = ({ isCelsius, exposedDays, toggleDayExposure }) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData>({
    location: 'New York',
    dateTime: new Date().toLocaleString(),
    temperature: 20,
    feelsLike: 22,
    description: 'Partly cloudy',
    forecast: [
      {
        date: 'April 23, 2024',
        image: 'forecast-image-1.png',
        highTemperature: 25,
        lowTemperature: 18,
        forecastType: 'Light rain',
      },
      {
        date: 'April 24, 2024',
        image: 'forecast-image-2.png',
        highTemperature: 27,
        lowTemperature: 20,
        forecastType: 'Broken clouds',
      },
      {
        date: 'April 25, 2024',
        image: 'forecast-image-3.png',
        highTemperature: 10,
        lowTemperature: 2,
        forecastType: 'Broken clouds',
      },
      {
        date: 'April 26, 2024',
        image: 'forecast-image-3.png',
        highTemperature: 10,
        lowTemperature: 2,
        forecastType: 'Broken clouds',
      },
      {
        date: 'April 27, 2024',
        image: 'forecast-image-3.png',
        highTemperature: 10,
        lowTemperature: 2,
        forecastType: 'Broken clouds',
      },
    ],
  });

  return (
    <main className="w-[95%] container flex flex-col h-screen p-2 pb-16 pt-4">
      <div className="pb-4">
        <MainForecast currentWeather={currentWeather} isCelsius={isCelsius} />
      </div>
      <div className="pb-4">
        <ChartComponent />
      </div>
      <div className="pb-4">
        <ExpandForecast currentWeather={currentWeather} exposedDays={exposedDays} toggleDayExposure={toggleDayExposure} isCelsius={isCelsius} />
      </div>
    </main>
  );
};

export default Home;
