import React, { useState } from 'react';
import './App.css';
import { Contador } from './componentes/Contador/Contador';
import { HeartEmitter } from './componentes/Contador/HeartEmitter';

function App() {
  // Estado para un contador que se incrementa con cada clic.
  // Esto servirá como un "disparador" para el HeartEmitter.
  const [celebrateTrigger, setCelebrateTrigger] = useState(0);

  // Función que se pasa al Contador para que la llame al hacer clic en "Celebrar"
  const handleCelebrate = () => {
    setCelebrateTrigger(prev => prev + 1); // Incrementa el contador cada vez
  };

  return (
    <div className="App">
      {/* Pasamos la función handleCelebrate al componente Contador */}
      <Contador onCelebrate={handleCelebrate} />

      {/* El HeartEmitter se renderiza aquí, fuera del Contador, para que ocupe toda la página. */}
      {/* Le pasamos el contador como 'trigger'. Cuando 'trigger' cambia, el HeartEmitter sabe que debe emitir nuevos corazones. */}
      <HeartEmitter trigger={celebrateTrigger} />
    </div>
  );
}

export default App;
