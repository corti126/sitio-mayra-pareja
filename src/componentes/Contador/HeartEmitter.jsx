import React, { useState, useEffect, useRef } from 'react';
import './Contador.css'; // Mantenemos el CSS aquí, asumiendo que está en la misma carpeta

// Exportación con llaves
export const HeartEmitter = ({ trigger }) => { 
  const [hearts, setHearts] = useState([]);
  // Usamos useRef para generar IDs únicos para cada ráfaga de corazones
  const nextBatchId = useRef(0);

  useEffect(() => {
    // Solo si 'trigger' cambia y es mayor que 0 (para evitar que se active al inicio)
    if (trigger > 0) { 
      const newHeartsBatch = [];
      const numberOfHearts = 25; // Cantidad de corazones a emitir por ráfaga
      const duration = 2000; // Duración de la animación en ms (2 segundos)
      const currentBatchId = nextBatchId.current++; // ID único para esta nueva ráfaga

      for (let i = 0; i < numberOfHearts; i++) {
        newHeartsBatch.push({
          id: `${currentBatchId}-${i}`, // ID único para cada corazón (batchId + index)
          left: `${Math.random() * 100}vw`, // Posición horizontal aleatoria en el viewport
          animationDelay: `${Math.random() * 0.5}s`, // Retraso aleatorio para que no salgan todos juntos
          animationDuration: `${duration / 1000 + Math.random() * 0.5}s`, // Duración ligeramente aleatoria
          size: `${20 + Math.random() * 20}px`, // Tamaño aleatorio
          batchId: currentBatchId, // Guardamos el ID de la ráfaga para poder limpiarlos después
        });
      }

      // Añadimos la nueva ráfaga de corazones a la lista existente
      setHearts(prevHearts => [...prevHearts, ...newHeartsBatch]);

      // Programamos la eliminación de esta ráfaga de corazones después de que termine su animación
      const cleanupTimer = setTimeout(() => {
        setHearts(prevHearts => prevHearts.filter(heart => heart.batchId !== currentBatchId));
      }, duration + 500); // Un poco más de la duración de la animación para asegurar que terminen

      // Función de limpieza para este useEffect
      return () => clearTimeout(cleanupTimer);
    }
  }, [trigger]); // Este efecto se ejecuta cada vez que 'trigger' cambia

  return (
    // El contenedor de los corazones ahora es global, ocupando toda la pantalla
    <div className="heart-emitter-container">
      {hearts.map(heart => (
        <span
          key={heart.id} // Usamos el ID único para la clave de React
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
