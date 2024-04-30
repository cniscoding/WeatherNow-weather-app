'use client'
import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import {
  CardTitle,
} from "@/components/ui/card"
import { roundTemperature, celsiusToFahrenheit } from '@/lib/utils'

interface ChartComponentProps {
  currentWeather: any;
  isCelsius: boolean;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ currentWeather, isCelsius }) => {
  const [chart, setChart] = useState<Chart | null>(null);

  useEffect(() => {
    function unixToHour(unixTimestamp: number) {
      const date = new Date(unixTimestamp * 1000);
      const hour = date.getHours();
      const period = hour >= 12 ? 'pm' : 'am';
      const formattedHour = hour % 12 || 12;
      return formattedHour + period;
    }

    if (currentWeather) {
      const ctx = document.getElementById('myChart') as HTMLCanvasElement;

      if (chart) {
        chart.destroy();
      }

      const labels: string[] = [];
      const temperatureData: number[] = currentWeather.hourly.map((hourData: any) => {
        return isCelsius ? roundTemperature(hourData.temp) : roundTemperature(celsiusToFahrenheit(hourData.temp));
      });


      currentWeather.hourly.map((hourData: any) => {
        labels.push(unixToHour(hourData.dt));
      });

      const newChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: isCelsius ? '°C' : '°F',
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

      setChart(prevChart => {
        if (prevChart) {
          prevChart.destroy();
        }
        return newChart;
      });

      return () => {
        if (newChart) {
          newChart.destroy();
        }
      };
    }
  }, [currentWeather, isCelsius]);

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