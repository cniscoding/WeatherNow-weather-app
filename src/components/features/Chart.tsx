'use client'
import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js with automatic package selection
import {
  CardTitle,
} from "@/components/ui/card"
import { getWeatherData } from '@/app/api/route'
import { roundTemperature } from '@/lib/utils'

// interface HourlyData {
//   dt: number;
//   temp: number;
//   feels_like: number;
//   pressure: number;
//   humidity: number;
//   dew_point: number;
//   uvi: number;
//   clouds: number;
//   visibility: number;
//   wind_speed: number;
//   wind_deg: number;
//   wind_gust: number;
//   weather: {
//     id: number;
//     main: string;
//     description: string;
//     icon: string;
//   }[];
//   pop: number;
//   rain: {
//     '1h': number;
//   };
// }

// interface CurrentWeather {
//   hourly: any;
//   current: any;
//   timezone: any;
// }

interface ChartComponentProps {
  currentWeather: any;
}


// const ChartComponent: React.FC<ChartComponentProps> = ({ currentWeather }) => {
const ChartComponent: React.FC<ChartComponentProps> = () => {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [isCelsius, setIsCelsius] = useState<boolean>(true);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       // Get geolocation
  //       const { latitude, longitude } = await getGeolocation();

  //       // Get weather data based on geolocation
  //       const { props: { currentWeather } } = await getWeatherData(latitude, longitude);
  //       console.log('Weather data:', currentWeather);

  //       // Update state with weather data
  //       setCurrentWeather(currentWeather);

  //       async function getGeolocation() {
  //         return new Promise((resolve, reject) => {
  //           navigator.geolocation.getCurrentPosition(
  //             (success) => {
  //               const { latitude, longitude } = success.coords;
  //               console.log('Geolocation success. Latitude:', latitude, 'Longitude:', longitude);
  //               resolve({ latitude, longitude });
  //             },
  //             (error) => {
  //               console.error('Error getting location:', error);
  //               reject(error);
  //             }
  //           );
  //         });
  //       }

  //       const ctx = document.getElementById('myChart');

  //       // Check if a chart instance already exists on the canvas
  //       if (ctx && ctx.chart) {
  //         // Destroy the existing chart instance
  //         ctx.chart.destroy();
  //       }

  //       // Function to convert Unix timestamp to hour
  //       function unixToHour(unixTimestamp) {
  //         const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
  //         const hour = date.getHours();
  //         const period = hour >= 12 ? 'pm' : 'am';
  //         const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format
  //         return formattedHour + period;
  //       }

  //       const labels: string[] = [];
  //       const temperatureData: number[] = [];

  //       currentWeather.hourly.forEach(hourData => {
  //         labels.push(unixToHour(hourData.dt));
  //         temperatureData.push(roundTemperature(hourData.temp));
  //       });

  //       const newChart = new Chart(ctx, {
  //         type: 'line',
  //         data: {
  //           labels: labels,
  //           datasets: [{
  //             label: '°C',

  //             data: temperatureData,
  //             borderWidth: 1
  //           }]
  //         },
  //         options: {
  //           scales: {
  //             y: {
  //               beginAtZero: true
  //             }
  //           },
  //           responsive: true,
  //           maintainAspectRatio: false,
  //         }
  //       });

  //       return () => {
  //         newChart.destroy();
  //       };
  //     } catch (error) {
  //       console.error('Error fetching weather data:', error);
  //     }
  //   }

  //   fetchData();
  // }, []); 

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
          const { latitude: geoLat, longitude: geoLong } = await getGeolocation();
          latitude = geoLat;
          longitude = geoLong;
        }
  
        // Get weather data based on geolocation
        const { props: { currentWeather } } = await getWeatherData(latitude, longitude);
        console.log('Weather data:', currentWeather);
  
        // Update state with weather data
        setCurrentWeather(currentWeather);
  
        const ctx = document.getElementById('myChart');
  
        // Check if a chart instance already exists on the canvas
        if (ctx && ctx.chart) {
          // Destroy the existing chart instance
          ctx.chart.destroy();
        }
  
        // Function to convert Unix timestamp to hour
        function unixToHour(unixTimestamp) {
          const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
          const hour = date.getHours();
          const period = hour >= 12 ? 'pm' : 'am';
          const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format
          return formattedHour + period;
        }
  
        const labels = [];
        const temperatureData = [];
  
        currentWeather.hourly.forEach(hourData => {
          labels.push(unixToHour(hourData.dt));
          temperatureData.push(roundTemperature(hourData.temp));
        });
  
        const newChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: '°C',
              data: temperatureData,
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            responsive: true,
            maintainAspectRatio: false,
          }
        });
  
        return () => {
          newChart.destroy();
        };
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }
  
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
          const defaultLat = 49.2827;
          const defaultLong = -123.1207;
          console.log('Using default coordinates. Latitude:', defaultLat, 'Longitude:', defaultLong);
          resolve({ latitude: defaultLat, longitude: defaultLong });
        }
      );
    });
  }

if (!currentWeather) {
  return null; // Render nothing if weather data is not available yet
}


return (
  <div className="mt-1 p-2 rounded-xl shadow-md">
    <CardTitle className="">24 Hour Temperature Forecast</CardTitle>
    <div>
      <canvas id="myChart"></canvas>
    </div>
  </div>
);
};

export default ChartComponent;