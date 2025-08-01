import React, { useState } from 'react';
import './App.css';
import { Contador } from './componentes/Contador/Contador';
import { HeartEmitter } from './componentes/Contador/HeartEmitter';
import { SobreCarta } from './componentes/SobreCarta/SobreCarta';
import { Modal } from './componentes/Modal/Modal';
import { Ruleta } from './componentes/Ruleta/Ruleta'; // ¡Importamos el componente Ruleta!

function App() {
  const [celebrateKey, setCelebrateKey] = useState(0);
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);

  const handleCelebrate = () => {
    setCelebrateKey(prevKey => prevKey + 1);
  };

  const openLetterModal = () => {
    setIsLetterModalOpen(true);
  };

  const closeLetterModal = () => {
    setIsLetterModalOpen(false);
  };

  const letterContent = (
    <>
      <p className="letter-greeting">Querida Mayra,</p>
      <p className="letter-content">
        Desde que te conocí, mi corazón late más rápido que el WiFi gratis en una plaza pública. 
        Eres más brillante que un mensaje de "te amo" en LED gigante y más dulce que el doble 
        de caramelo en un café con extra de crema. Si fueras un algoritmo, serías el más eficiente: 
        optimizas mi felicidad con la menor cantidad de esfuerzo. Si fueras un bug, serías el único 
        que no querría corregir. Y si fueras una aplicación, serías la que siempre tengo anclada 
        en mi pantalla principal. Gracias por hacer de mi vida una versión mejorada, sin errores 
        (bueno, quizá con algunos, pero todos adorables).
      </p>
      <p className="letter-signature">Con todo mi amor,</p>
      <p className="letter-signature-name">Santi</p>
    </>
  );

  return (
    <div className="App">
      <div className="main-content-area">
        <Contador onCelebrate={handleCelebrate} />
        
        <div className="separator-line"></div> 
        <p className="connecting-phrase">¡Y hay más sorpresas!</p>

        <SobreCarta onOpenLetter={openLetterModal} />

        {/* ¡Aquí agregamos el componente Ruleta! */}
        <Ruleta />

      </div>

      <HeartEmitter triggerCount={celebrateKey} /> 

      <Modal isOpen={isLetterModalOpen} onClose={closeLetterModal}>
        {letterContent}
      </Modal>

    </div>
  );
}

export default App;
