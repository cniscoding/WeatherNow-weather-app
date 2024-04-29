'use client'
import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js with automatic package selection
import {
  CardTitle,
} from "@/components/ui/card"
import { getWeatherData } from '@/app/api/route'

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
  const [currentWeather, setCurrentWeather] = useState<any>(null); // State to hold weather data
  const [isCelsius, setIsCelsius] = useState<boolean>(true); // State to hold temperature unit

  useEffect(() => {
    async function fetchData() {
      try {
        // Get geolocation
        const { latitude, longitude } = await getGeolocation();
  
        // Get weather data based on geolocation
        const { props: { currentWeather } } = await getWeatherData(latitude, longitude);
        console.log('Weather data:', currentWeather);
  
        // Update state with weather data
        setCurrentWeather(currentWeather);

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
  
        // Extracting labels and temperature data
        const labels: string[] = [];
        const temperatureData: number[] = [];
  
        currentWeather.hourly.forEach(hourData => {
          labels.push(unixToHour(hourData.dt));
          temperatureData.push(hourData.temp);
        });
  
        console.log('Labels', labels)
        console.log('temperatureData', temperatureData)
        // Create a new chart instance
        const newChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Temperature',
  
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
  
        // Return a clean-up function to destroy the chart when the component unmounts
        return () => {
          newChart.destroy();
        };
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }
  
    // Call fetchData function
    fetchData();
  }, []); 
  

  return (
    <div className="border-2 rounded-xl p-4">
      <CardTitle className="">24 Hour Forecast</CardTitle>
      <div>
        <canvas id="myChart"></canvas>
      </div>
    </div>
  );
};

export default ChartComponent;