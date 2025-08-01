import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'; // Necesitamos ReactDOM para crear un portal
import './Modal.css'; // Estilos para el modal

// Exportación con llaves
export const Modal = ({ isOpen, onClose, children }) => {
  // Eliminamos: const modalRef = useRef(); // Eliminada para resolver la advertencia

  // Efecto para controlar el scroll del body
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    // Limpieza al desmontar el componente
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  // Si no está abierto, no renderizamos nada
  if (!isOpen) return null;

  // Renderizamos el modal usando un Portal para que esté fuera del flujo normal del DOM
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} // Evita que el clic en el contenido cierre el modal
      >
        {children}
        <button className="modal-close-button" onClick={onClose}>X</button>
      </div>
    </div>,
    document.getElementById('root') // Renderiza el modal directamente en el div #root
  );
};
