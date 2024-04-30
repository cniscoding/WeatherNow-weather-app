
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { geolocationProvider } from "@/components/providers/geolocationProvider";
// import { useState, useEffect } from 'react';

const apiKey = process.env.OPENWEATHERMAP_API_KEY;

export function getDayOfWeek(timestamp: number) {

  const milliseconds = timestamp * 1000;
  const date = new Date(milliseconds);
  const dayOfWeek = date.getDay();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = daysOfWeek[dayOfWeek];
  return dayName;
}

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
    const locationsData = await res.json();

    // console.log('Weather data:', projects);
    return locationsData;
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

