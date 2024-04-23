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
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
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