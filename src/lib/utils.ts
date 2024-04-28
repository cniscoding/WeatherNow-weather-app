import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const apiKey = process.env.OPENWEATHERMAP_API_KEY;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function roundTemperature(temp: number) {
  return Math.round(temp);
}


export async function searchLocation (searchQuery: string) {
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

export async function getLocationData() {
  try {
    let lat, lon;

    lat = '36.2048';
    lon = '138.2529';

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