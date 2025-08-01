import React, { useState } from 'react';
import './App.css';
import { Contador } from './componentes/Contador/Contador';
import { HeartEmitter } from './componentes/Contador/HeartEmitter';

function App() {
  const [celebrateTrigger, setCelebrateTrigger] = useState(0);

  const handleCelebrate = () => {
    setCelebrateTrigger(prev => prev + 1);
  };

  return (
    <div className="App">
      <Contador onCelebrate={handleCelebrate} />

      <HeartEmitter trigger={celebrateTrigger} />
    </div>
  );
}

export default App;
