import React, { useRef, useState, useEffect } from "react";
import "./Ruleta.css";

const premios = [
  "Cine",
  "Noche de pelis",
  "Casa chill",
  "Salir a pasear",
  "Casino",
  "Cena",
  "Sexo",
  "Amigos",
];

export const Ruleta = () => {
  const canvasRef = useRef(null);
  const [girando, setGirando] = useState(false);
  const [premio, setPremio] = useState("");
  const anguloInicial = 0;
  const arc = (2 * Math.PI) / premios.length;

  const dibujarRuleta = React.useCallback(() => {
    const colores = [
      "#ffb3ba", "#ffdfba", "#ffffba", "#baffc9",
      "#bae1ff", "#e0baff", "#ffc9de", "#c9fff5"
    ];

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const size = canvas.width;
    const outsideRadius = size / 2 - 10;
    const insideRadius = 40;

    ctx.clearRect(0, 0, size, size);

    for (let i = 0; i < premios.length; i++) {
      const angle = anguloInicial + i * arc;
      ctx.fillStyle = colores[i % colores.length];

      ctx.beginPath();
      ctx.arc(size / 2, size / 2, outsideRadius, angle, angle + arc, false);
      ctx.arc(size / 2, size / 2, insideRadius, angle + arc, angle, true);
      ctx.fill();
      ctx.save();
      ctx.restore();
    }
  }, [arc]);

  const girar = () => {
    if (girando) return;
    setGirando(true);

    const canvas = canvasRef.current;
    let startAngle = Math.random() * 2 * Math.PI;
    const spinTimeTotal = 3000 + Math.random() * 2000;
    const spinAngleTotal = (Math.random() * 5 + 10) * 2 * Math.PI;
    const start = performance.now();

    const animar = (now) => {
      const elapsed = now - start;
      if (elapsed >= spinTimeTotal) {
        const finalAngle = startAngle + spinAngleTotal;
        const degrees = (finalAngle * 180) / Math.PI + 90;
        const index = Math.floor((premios.length - (degrees % 360) / (360 / premios.length)) % premios.length);
        setPremio(premios[index]);
        setGirando(false);
        return;
      }
      const progress = elapsed / spinTimeTotal;
      const easing = 1 - Math.pow(1 - progress, 3);
      const angle = startAngle + easing * spinAngleTotal;
      const ctx = canvas.getContext("2d");
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(angle);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
      dibujarRuleta();
      ctx.restore();
      requestAnimationFrame(animar);
    };

    requestAnimationFrame(animar);
  };

  useEffect(() => {
    dibujarRuleta();
  }, [dibujarRuleta]);

  return (
    <div className="ruleta-container">
      <h2 className="titulo-ruleta">¿Qué hacemos?</h2>
      <div className="ruleta-wrapper">
        <div className="ruleta-puntero"></div>
        <canvas ref={canvasRef} width="300" height="300"></canvas>
      </div>
      <button className="boton-girar" onClick={girar} disabled={girando}>
        {girando ? "Girando..." : "Girar Ruleta"}
      </button>
      {premio && (
        <p className="premio-texto">
          ❤️ ¡Hoy toca: <strong>{premio}</strong>! ❤️
        </p>
      )}
    </div>
  );
};