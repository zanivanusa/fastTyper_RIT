import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // Register necessary chart components

function Statistics() {
  const [keyPressCount, setKeyPressCount] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Keys Pressed',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    console.log('Component mounted');
    setStartTime(Date.now());

    const handleKeyPress = () => {
      console.log('Key pressed');
      setKeyPressCount((prevCount) => prevCount + 1);
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      console.log('Component unmounted');
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const updateTypingSpeed = () => {
      const elapsedTime = (Date.now() - startTime) / 1000; // Convert to seconds

      if (elapsedTime >= 60) {
        const typingSpeed = Math.round((keyPressCount / elapsedTime) * 60); // Calculate keys per minute
        setTypingSpeed(typingSpeed);
      } else {
        setTypingSpeed(keyPressCount);
        console.log(elapsedTime);
      }

      // Update chart data
      setChartData((prevData) => ({
        labels: [...prevData.labels, Math.floor(elapsedTime)], // Add the seconds passed as a label for each update
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data, keyPressCount], // Add the new key press count value
          },
        ],
      }));
    };

    const updateStatisticsInterval = setInterval(updateTypingSpeed, 1000);

    return () => {
      clearInterval(updateStatisticsInterval);
    };
  }, [keyPressCount, startTime]);

  return (
    <div style={{ marginTop: '20px' }}>
      <div>Keys Pressed: <span id="keypressCount">{keyPressCount}</span></div>

      {/* Render the chart */}
        <Line data={chartData} options={{
          scales: {
            x: {
              title: {
                display: true,
                text: 'Seconds Passed',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Keys Pressed',
              },
            },
          },
        }} />
    </div>
  );
}

export default Statistics;
