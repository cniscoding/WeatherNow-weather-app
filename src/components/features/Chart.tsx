'use client'
import { useEffect } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js with automatic package selection
import {
  CardTitle,
} from "@/components/ui/card"

interface HourlyData {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  pop: number;
  rain: {
    '1h': number;
  };
}

interface CurrentWeather {
  hourly: any;
  current: any;
  timezone: any;
}

interface ChartComponentProps {
  currentWeather: any;
}


const ChartComponent: React.FC<ChartComponentProps> = ({ currentWeather }) => {
  // const ChartComponent = (currentWeather: CurrentWeather) => {
  useEffect(() => {
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

    // console.log('currentWeather from chart', currentWeather.timezone)
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
        // labels: ['1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm'],
        labels: labels,
        datasets: [{
          label: 'Temperature',
          // data: [12, 19, 3, 5, 2, 3, 9, 10, 11, 15],
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
  }, []);

  return (
    <div className="border-2 rounded-xl">
      <CardTitle className="">24 Hour Forecast</CardTitle>
      <div>
        <canvas id="myChart"></canvas>
      </div>
    </div>
  );
};

export default ChartComponent;