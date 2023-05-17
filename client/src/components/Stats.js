import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

function Statistics() {
  const [keyPressCount, setKeyPressCount] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

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
    };

    const generateMockData = () => {
      setKeyPressCount(0);
    };

    const updateStatisticsInterval = setInterval(updateTypingSpeed, 1000);

    const generateDataButton = document.getElementById('generateData');
    if (generateDataButton) {
      generateDataButton.addEventListener('click', generateMockData);
    }

    return () => {
      clearInterval(updateStatisticsInterval);

      if (generateDataButton) {
        generateDataButton.removeEventListener('click', generateMockData);
      }
    };
  }, [keyPressCount, startTime]);

  return (
    <div style={{ marginTop: '20px' }}>
      <div>Keys Pressed: <span id="keypressCount">{keyPressCount}</span></div>
      <div>Typing Speed: {typingSpeed} keys per minute</div>
      <Button id="generateData" variant="dark" style={{ marginTop: '10px', marginLeft: '80px' }}>
        Reset
      </Button>
    </div>
  );
}

export default Statistics;
