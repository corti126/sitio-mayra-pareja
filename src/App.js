import React, { useState } from 'react';
import './App.css';
import { Contador } from './componentes/Contador/Contador'; // Importación con llaves
import { HeartEmitter } from './componentes/Contador/HeartEmitter'; // Importación con llaves
import { SobreCarta } from './componentes/SobreCarta/SobreCarta'; // Importación con llaves
import { Modal } from './componentes/Modal/Modal'; // Importamos el nuevo componente Modal

function App() {
  const [celebrateKey, setCelebrateKey] = useState(0);
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false); // Nuevo estado para el modal de la carta

  const handleCelebrate = () => {
    setCelebrateKey(prevKey => prevKey + 1); // Incrementa el contador cada vez
  };

  const openLetterModal = () => {
    setIsLetterModalOpen(true);
  };

  const closeLetterModal = () => {
    setIsLetterModalOpen(false);
  };

  // Contenido de la carta (puedes moverlo a un archivo de configuración si es muy largo)
  const letterContent = (
    <>
      <p className="letter-greeting">May,</p>
      <p className="letter-content">
        Desde que te conocí, mi corazón late más rápido que el WiFi gratis en una plaza pública. 
        Eres más brillante que un mensaje de "te amo" en LED gigante y más dulce que el doble 
        de caramelo en un café con extra de crema. Si fueras un algoritmo, serías el más eficiente: 
        optimizas mi felicidad con la menor cantidad de esfuerzo. Si fueras un bug, serías el único 
        que no querría corregir. Y si fueras una aplicación, serías la que siempre tengo anclada 
        en mi pantalla principal. Gracias por hacer de mi vida una versión mejorada, sin errores 
        (bueno, quizá con algunos, pero todos adorables).
      </p>
      <p className="letter-signature">Te amo,</p>
      <p className="letter-signature-name">Corti</p>
    </>
  );

  return (
    <div className="App">
      <div className="main-content-area">
        <Contador onCelebrate={handleCelebrate} />
        
        <div className="separator-line"></div> 
        <p className="connecting-phrase">¡Y hay más sorpresas!</p>

        {/* Pasamos la función openLetterModal al componente SobreCarta */}
        <SobreCarta onOpenLetter={openLetterModal} />
      </div>

      {/* HeartEmitter ahora recibe 'triggerCount' como prop */}
      <HeartEmitter triggerCount={celebrateKey} /> 

      {/* Renderizamos el Modal condicionalmente */}
      <Modal isOpen={isLetterModalOpen} onClose={closeLetterModal}>
        {letterContent}
      </Modal>
    </div>
  );
}

export default App;
