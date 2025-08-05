// src/App.jsx

import React, { useState, useEffect } from 'react';
import './App.css';
import { Contador } from './componentes/Contador/Contador';
import { HeartEmitter } from './componentes/Contador/HeartEmitter';
import { SobreCarta } from './componentes/SobreCarta/SobreCarta';
import { Modal } from './componentes/Modal/Modal';
import { Ruleta } from './componentes/Ruleta/Ruleta';
import { Lista } from './componentes/Listaa/Listaa';
import { ModalTarea } from './componentes/ModalTarea/ModalTarea';
import { FaPlus } from 'react-icons/fa';
import { db } from './firebase';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

function App() {
  const [celebrateKey, setCelebrateKey] = useState(0);
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);
  const [vistaActual, setVistaActual] = useState('principal');
  const [isTareaModalOpen, setIsTareaModalOpen] = useState(false);
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const colRef = collection(db, 'tareas');

    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const loadedTareas = [];
      snapshot.docs.forEach(doc => {
        loadedTareas.push({ id: doc.id, ...doc.data() });
      });
      setTareas(loadedTareas);
    });

    return () => unsubscribe();
  }, []);

  const handleCelebrate = () => {
    setCelebrateKey(prevKey => prevKey + 1);
  };

  const openLetterModal = () => {
    setIsLetterModalOpen(true);
  };

  const closeLetterModal = () => {
    setIsLetterModalOpen(false);
  };

  const openTareaModal = () => {
    setIsTareaModalOpen(true);
  };

  const closeTareaModal = () => {
    setIsTareaModalOpen(false);
  };

  const handleAgregarTarea = async (nuevaTarea) => {
    try {
      const colRef = collection(db, 'tareas');
      await addDoc(colRef, nuevaTarea);
    } catch (error) {
      console.error("Error al agregar la tarea: ", error);
    }
  };

  const toggleCompletada = async (id, estadoActual) => {
    try {
      const docRef = doc(db, 'tareas', id);
      await updateDoc(docRef, { completada: !estadoActual });
    } catch (error) {
      console.error("Error al actualizar la tarea: ", error);
    }
  };

  const eliminarTarea = async (id) => {
    try {
      const docRef = doc(db, 'tareas', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error al eliminar la tarea: ", error);
    }
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
      <div className="nav-bar">
        <button
          className={`nav-button ${vistaActual === 'principal' ? 'active' : ''}`}
          onClick={() => setVistaActual('principal')}
        >
          Principal
        </button>
        <button
          className={`nav-button ${vistaActual === 'lista' ? 'active' : ''}`}
          onClick={() => setVistaActual('lista')}
        >
          Lista a futuro
        </button>
      </div>

      {vistaActual === 'principal' ? (
        <div className="main-content-area">
          <Contador onCelebrate={handleCelebrate} />
          <div className="separator-line"></div>
          <p className="connecting-phrase">¡Y hay más sorpresas!</p>
          <SobreCarta onOpenLetter={openLetterModal} />
          <div className="separator-line"></div>
          <Ruleta />
        </div>
      ) : (
        <>
          <Lista
            tareas={tareas}
            toggleCompletada={toggleCompletada}
            eliminarTarea={eliminarTarea}
          />
          <button className="add-task-button" onClick={openTareaModal}>
            <FaPlus className="add-task-icon" />
          </button>
        </>
      )}

      <HeartEmitter triggerCount={celebrateKey} />

      <Modal isOpen={isLetterModalOpen} onClose={closeLetterModal}>
        {letterContent}
      </Modal>

      <ModalTarea 
        isOpen={isTareaModalOpen} 
        onClose={closeTareaModal}
        onAgregarTarea={handleAgregarTarea}
      />
    </div>
  );
}

export default App;