import React, { useState, useEffect, useRef } from 'react';
import './Contador.css';

export const HeartEmitter = ({ trigger }) => { 
  const [hearts, setHearts] = useState([]);
  const nextBatchId = useRef(0);

  useEffect(() => {
    if (trigger > 0) { 
      const newHeartsBatch = [];
      const numberOfHearts = 25;
      const duration = 2000;
      const currentBatchId = nextBatchId.current++;

      for (let i = 0; i < numberOfHearts; i++) {
        newHeartsBatch.push({
          id: `${currentBatchId}-${i}`,
          left: `${Math.random() * 100}vw`,
          animationDelay: `${Math.random() * 0.5}s`,
          animationDuration: `${duration / 1000 + Math.random() * 0.5}s`,
          size: `${20 + Math.random() * 20}px`,
          batchId: currentBatchId,
        });
      }

      setHearts(prevHearts => [...prevHearts, ...newHeartsBatch]);

      const cleanupTimer = setTimeout(() => {
        setHearts(prevHearts => prevHearts.filter(heart => heart.batchId !== currentBatchId));
      }, duration + 500);

      return () => clearTimeout(cleanupTimer);
    }
  }, [trigger]);

  return (
    <div className="heart-emitter-container">
      {hearts.map(heart => (
        <span
          key={heart.id}
          className="heart"
          style={{
            left: heart.left,
            animationDelay: heart.animationDelay,
            animationDuration: heart.animationDuration,
            fontSize: heart.size,
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
};
