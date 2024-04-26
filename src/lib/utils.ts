import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const apiKey = process.env.OPENWEATHERMAP_API_KEY;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function roundTemperature(temp: number) {
  return Math.round(temp);
}


export const searchLocation = async (searchQuery: string): Promise<any> => {
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