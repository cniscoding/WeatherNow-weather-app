import { useEffect, useState } from 'react';
import { getWeatherData } from '@/app/api/route'

const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const searchLat = searchParams.get('Latitude');
        const searchLong = searchParams.get('Longitude');

        let latitude, longitude;

        // Check if search params are available
        if (searchLat && searchLong) {
          latitude = parseFloat(searchLat);
          longitude = parseFloat(searchLong);
        } else {
          // If no search params, get geolocation
          const { latitude: geoLat, longitude: geoLong } = await getGeolocation();
          latitude = geoLat;
          longitude = geoLong;
        }

        // Get weather data based on geolocation
        const data = await getWeatherData(latitude, longitude);
        console.log('Weather data:', data);

        // Update state with weather data
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }

    // Call fetchData function
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  async function getGeolocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (success) => {
          const { latitude, longitude } = success.coords;
          console.log('Geolocation success. Latitude:', latitude, 'Longitude:', longitude);
          resolve({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
          reject(error);
        }
      );
    });
  }

  return weatherData;
};

export default useWeatherData;