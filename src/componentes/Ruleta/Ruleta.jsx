import React, { useState, useRef } from 'react';
import './Ruleta.css';

export const Ruleta = () => {
  const [items] = useState([
    "Cine", "Noche de pelis", "Casa chill", "Salir a pasear",
    "Casino", "Cena", "Sexo", "amigos"
  ]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [rotation, setRotation] = useState(0);
  const rouletteRef = useRef(null);

  const spinRoulette = () => {
    if (spinning) return;

    setSpinning(true);
    setResult(null);

    const numberOfItems = items.length;
    const degreesPerItem = 360 / numberOfItems;

    const fullSpins = Math.floor(Math.random() * 6) + 5;
    const totalDegreesForFullSpins = fullSpins * 360;

    const winningIndex = Math.floor(Math.random() * numberOfItems);

    const degreesToLandOnItem = 360 - (winningIndex * degreesPerItem + degreesPerItem / 2);

    const finalRotation = totalDegreesForFullSpins + degreesToLandOnItem;

    setRotation(finalRotation);
    setTimeout(() => {
      setSpinning(false);
      setResult(items[winningIndex]);
    }, 5500);
  };

  document.documentElement.style.setProperty('--items-count', items.length);


  return (
    <div className="roulette-section-container">
      <h2 className="roulette-title">Gira la Ruleta de la Suerte</h2>
      <p className="roulette-description">¿Qué sorpresa te espera hoy?</p>
      
      <div className="roulette-wheel-container">
        <div className="pointer"></div>
        <div 
          ref={rouletteRef} 
          className={`roulette-wheel ${spinning ? 'spinning' : ''}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {items.map((item, index) => (
            <div 
              key={index} 
              className="wheel-segment" 
              style={{
                backgroundColor: index % 2 === 0 ? '#ffb3c1' : '#ffdde1',
                transform: `rotate(${index * (360 / items.length) - (360 / items.length) / 2}deg)`,
                '--segment-rotation': `${index * (360 / items.length)}deg`,
              }}
            >
              <span className="segment-text">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button 
        className="spin-button" 
        onClick={spinRoulette} 
        disabled={spinning}
      >
        {spinning ? 'Girando...' : 'GIRAR'}
      </button>

      {result && (
        <div className="roulette-result">
          <p className="result-text">¡El resultado es:</p>
          <p className="result-item">"{result}"</p>
          <p className="result-emoji">🎉</p>
        </div>
      )}
    </div>
  );
};
