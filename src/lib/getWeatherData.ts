'use server'

import { getLocationData } from "@/lib/utils";

export async function getWeatherData(lat: number, lon: number) {
  try {
    const currentWeather = await getLocationData(lat, lon);
    return { props: { currentWeather } };
  } catch (error) {
    return { props: { currentWeather: null } }; // Handle error gracefully
  }
}
