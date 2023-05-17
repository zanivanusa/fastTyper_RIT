import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ onTimerEnd }) => {
  const [timeRemaining, setTimeRemaining] = useState(60); // seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => { 
        const remaining = prevTime - 1;
        return remaining >= 0 ? remaining : 0;
      });
      
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (timeRemaining === 0) {
      onTimerEnd();
    }
  }, [timeRemaining]);

  return (
    <>{formatTime(timeRemaining)}</>
  );
};

export default CountdownTimer;