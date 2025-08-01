import React, { useState, useEffect, useMemo } from 'react';
import "./Contador.css";

function Contador ({ onCelebrate }) {
  const startDate = useMemo(() => new Date(2025, 5, 6, 0, 0, 0), []); // ¡IMPORTANTE! Cambia esta fecha
  const [timeElapsed, setTimeElapsed] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const years = Math.floor(days / 365.25);

      const remainingDays = days % 365;
      const remainingHours = hours % 24;
      const remainingMinutes = minutes % 60;
      const remainingSeconds = seconds % 60;

      let displayTime = '';
      if (years > 0) {
        displayTime += `${years} año${years !== 1 ? 's' : ''} `;
      }
      if (remainingDays > 0 || years > 0) {
        displayTime += `${remainingDays} día${remainingDays !== 1 ? 's' : ''} `;
      }
      displayTime += `${remainingHours} hora${remainingHours !== 1 ? 's' : ''} `;
      displayTime += `${remainingMinutes} minuto${remainingMinutes !== 1 ? 's' : ''} `;
      displayTime += `${remainingSeconds} segundo${remainingSeconds !== 1 ? 's' : ''}`;

      setTimeElapsed(displayTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <>
      <p className="title-text">Tiempo desde que estamos juntos</p>
      <p className="time-display">{timeElapsed}</p>
      <p className="more-text">Vamos por más meses</p> 
      
      <button className="celebrate-button" onClick={onCelebrate}>
        Celebrar
      </button>
    </>
  );
};

export { Contador };
