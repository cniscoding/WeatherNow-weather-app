
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { geolocationProvider } from "@/components/providers/geolocationProvider";
// import { useState, useEffect } from 'react';

const apiKey = process.env.OPENWEATHERMAP_API_KEY;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function roundTemperature(temp: number) {
  return Math.round(temp);
}


export async function searchLocation(searchQuery: string) {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=5&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export async function getLocationData(latitude, longitude) {

  try {
    let lat = latitude
    let lon = longitude


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

export async function fetchAndSetCityWeather(lat: number,
  lng: number,
  cityName: string,
  countryShortName: string) {

}

// export const [currentWeather, setCurrentWeather] = useState<any>(null); // State to hold weather data

// export const fetchData = async () => {
//   try {
//     // Get geolocation
//     const { latitude, longitude } = await getGeolocation();

//     // Get weather data based on geolocation
//     const { props: { currentWeather } } = await getWeatherData(latitude, longitude);
//     console.log('Weather data:', currentWeather);

//     // Update state with weather data
//     setCurrentWeather(currentWeather);
//   } catch (error) {
//     console.error('Error fetching weather data:', error);
//   }
// };

// async function getGeolocation() {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(
//       (success) => {
//         const { latitude, longitude } = success.coords;
//         console.log('Geolocation success. Latitude:', latitude, 'Longitude:', longitude);
//         resolve({ latitude, longitude });
//       },
//       (error) => {
//         console.error('Error getting location:', error);
//         reject(error);
//       }
//     );
//   });
// }


// export function useWeatherData() {
//   const [currentWeather, setCurrentWeather] = useState<any>(null);
//   const [isCelsius, setIsCelsius] = useState<boolean>(true);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         // Get geolocation
//         const { latitude, longitude } = await getGeolocation();

//         // Get weather data based on geolocation
//         const { props: { currentWeather } } = await getWeatherData(latitude, longitude);
//         console.log('Weather data:', currentWeather);

//         // Update state with weather data
//         setCurrentWeather(currentWeather);
//       } catch (error) {
//         console.error('Error fetching weather data:', error);
//       }
//     }

//     // Call fetchData function
//     fetchData();
//   }, []); // Empty dependency array ensures this effect runs only once on component mount

//   async function getGeolocation() {
//     return new Promise<{ latitude: number; longitude: number }>((resolve, reject) => {
//       navigator.geolocation.getCurrentPosition(
//         (success) => {
//           const { latitude, longitude } = success.coords;
//           console.log('Geolocation success. Latitude:', latitude, 'Longitude:', longitude);
//           resolve({ latitude, longitude });
//         },
//         (error) => {
//           console.error('Error getting location:', error);
//           reject(error);
//         }
//       );
//     });
//   }

//   return currentWeather;
// }