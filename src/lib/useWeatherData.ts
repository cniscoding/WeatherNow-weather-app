import { useEffect, useState } from 'react';
import { getWeatherData } from '@/lib/getWeatherData'

const useWeatherData = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const searchLat = searchParams.get('Latitude');
        const searchLong = searchParams.get('Longitude');
        let latitude, longitude;

        if (searchLat && searchLong) {
          latitude = parseFloat(searchLat);
          longitude = parseFloat(searchLong);
        } else {
          const geoLocation = await getGeolocation();
          latitude = (geoLocation as { latitude: number }).latitude;
          longitude = (geoLocation as { longitude: number }).longitude;
        }

        // Get weather data based on geolocation
        const { props: { currentWeather } } = await getWeatherData(latitude, longitude);
        console.log('Weather data:', currentWeather);

        // Update state with weather data
        setCurrentWeather(currentWeather);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false)
      }
    }
    fetchData();
  }, []);

  async function getGeolocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (success) => {
          const { latitude, longitude } = success.coords;
          console.log('Geolocation success. Latitude:', latitude, 'Longitude:', longitude);
          resolve({ latitude, longitude });
        },
        (error) => {
          const defaultLat = 49.2827;
          const defaultLong = -123.1207;
          console.log('Using default coordinates. Latitude:', defaultLat, 'Longitude:', defaultLong);
          resolve({ latitude: defaultLat, longitude: defaultLong });
        }
      );
    });
  }

  return { currentWeather, loading };
};

export default useWeatherData;