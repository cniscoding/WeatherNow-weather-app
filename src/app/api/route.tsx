'use server'

import { geolocationProvider } from "@/components/providers/geolocationProvider";
import { getLocationData } from "@/lib/utils";

// export async function getWeatherData(latitude, longitude) {
//   // console.log('latlon1', lat, lon)
//   // const { lat, lon } = await geolocationProvider;
//   // console.log('latlon2', lat, lon)
//   const currentWeather = await getLocationData(latitude, longitude);
//   // console.log('currentWeather', currentWeather)
//   return { props: { currentWeather } };
// }

export async function getWeatherData(lat, lon) {
  try {
    const currentWeather = await getLocationData(lat, lon);
    return { props: { currentWeather } };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return { props: { currentWeather: null } }; // Handle error gracefully
  }
}