import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

export const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button className="modal-close-button" onClick={onClose}>X</button>
      </div>
    </div>,
    document.getElementById('root')
  );
};
