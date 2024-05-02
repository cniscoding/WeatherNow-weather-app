import { useState } from 'react';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  temp: number;
  feels_like: number;
  weather: Weather[];
}

export interface Location {
  location: string;
  coordinates: Coordinates;
  timezone: string;
  current: CurrentWeather;
}

export const useFavoriteLocations =
  [
    {
      location: "Mexico",
      coordinates: {
        latitude: -99.1331785,
        longitude: 19.4326296
      },
      timezone: "America/Mexico",
      current: {
        temp: 32,
        feels_like: 38,
        weather: [
          {
            id: 801,
            main: "Clear Sky",
            description: "Clear Sky",
            icon: "01d"
          }
        ]
      }
    },
    {
      location: "Tokyo",
      coordinates: {
        latitude: 140.0419644,
        longitude: 35.2524044
      },
      timezone: "Tokyo",
      current: {
        temp: 22,
        feels_like: 20,
        weather: [
          {
            id: 801,
            main: "Clouds",
            description: "few clouds",
            icon: "02d"
          }
        ]
      }
    },
    {
      location: "Toronto",
      coordinates: {
        latitude: -79.3839347,
        longitude: 43.6534817
      },
      timezone: "Toronto",
      current: {
        temp: 31,
        feels_like: 34,
        weather: [
          {
            id: 801,
            main: "Clear Sky",
            description: "Clear Sky",
            icon: "01d"
          }
        ]
      }
    },
    {
      location: "New York",
      coordinates: {
        latitude: -74.3693157,
        longitude: 40.3606638
      },
      timezone: "",
      current: {
        temp: 8,
        feels_like: 8,
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "Shower Rain",
            icon: "09d"
          }
        ]
      }
    }
  ];

