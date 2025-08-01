import React from 'react'; // Ya no necesitamos useState aquí
import './SobreCarta.css'; // Importamos los estilos del sobre

// Exportación con llaves
export const SobreCarta = ({ onOpenLetter }) => { // Recibe la función para abrir el modal

  return (
    <div className="sobre-container">
      {/* Mensaje decorativo antes del sobre */}
      <p className="sobre-intro-text">Un pequeño secreto para ti...</p>

      <div 
        className="envelope" // Ya no necesitamos la clase 'open' aquí
        onClick={onOpenLetter} // Al hacer clic, llama a la función para abrir el modal
      >
        {/* Solapa superior del sobre (ahora solo visual, no se anima) */}
        <div className="envelope-flap"></div>
        {/* Cuerpo principal del sobre */}
        <div className="envelope-body"></div>
        {/* Corazón decorativo en el sobre */}
        <div className="envelope-heart">❤️</div>
        {/* La carta ya no se renderiza aquí */}
      </div>

      {/* Frase decorativa después del sobre */}
      <p className="sobre-outro-text">¡Haz clic para descubrirlo!</p>
    </div>
  );
};
