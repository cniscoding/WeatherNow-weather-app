import { useEffect } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js with automatic package selection

const ChartComponent = () => {
  useEffect(() => {
    const ctx = document.getElementById('myChart');

    // Check if a chart instance already exists on the canvas
    if (ctx && ctx.chart) {
      // Destroy the existing chart instance
      ctx.chart.destroy();
    }

    // Create a new chart instance
    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm','9pm','10pm'],
        datasets: [{
          label: 'Temperature',
          data: [12, 19, 3, 5, 2, 3,9,10,11,15],
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
        maintainAspectRatio:false,
      }
    });

    // Return a clean-up function to destroy the chart when the component unmounts
    return () => {
      newChart.destroy();
    };
  }, []);

  return (
    <div>
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default ChartComponent;