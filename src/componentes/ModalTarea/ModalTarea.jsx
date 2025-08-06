import React, { useState } from 'react';
import './ModalTarea.css';
import { FaTimes } from 'react-icons/fa';

export const ModalTarea = ({ isOpen, onClose, onAgregarTarea }) => {
  const [tareaTexto, setTareaTexto] = useState('');
  const [tareaFecha, setTareaFecha] = useState('');

  const esFormularioValido = tareaTexto.trim() !== '' && tareaFecha !== '';

  const handleAgregarTarea = (e) => {
    e.preventDefault();
    if (esFormularioValido) {
      onAgregarTarea({
        texto: tareaTexto,
        fecha: tareaFecha,
        completada: false
      });

      setTareaTexto('');
      setTareaFecha('');
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-button">
          <FaTimes />
        </button>
        <h3 className="modal-titulo">Agrega planes por hacer</h3>
        <form onSubmit={handleAgregarTarea} className="modal-form">
          <div className="input-group">
            <label htmlFor="tareaTexto" className="input-label">Plan / Acontecimiento</label>
            <input
              type="text"
              id="tareaTexto"
              value={tareaTexto}
              onChange={(e) => setTareaTexto(e.target.value)}
              placeholder="Ej: Ir de picnic al parque..."
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="tareaFecha" className="input-label">Fecha</label>
            <div className="date-input-wrapper">
              <input
                type="date"
                id="tareaFecha"
                value={tareaFecha}
                onChange={(e) => setTareaFecha(e.target.value)}
                className="input-field"
              />
            </div>
          </div>
          <button
            type="submit"
            className="modal-button"
            disabled={!esFormularioValido}
          >
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
};