// src/componentes/Album/Album.jsx

import React, { useState } from 'react';
import './Album.css';
import { ModalAgregarFoto } from '../ModalAgregarFoto/ModalAgregarFoto';
import { FaPlus, FaTrash } from 'react-icons/fa';

export const Album = ({ fotos, agregarFoto, eliminarFoto }) => {
  const [isModalOpenAgregar, setIsModalOpenAgregar] = useState(false);
  const [isModalOpenImagen, setIsModalOpenImagen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModalAgregar = () => setIsModalOpenAgregar(true);
  const closeModalAgregar = () => setIsModalOpenAgregar(false);

  const openModalImagen = (url) => {
    setSelectedImage(url);
    setIsModalOpenImagen(true);
  };

  const closeModalImagen = () => {
    setSelectedImage(null);
    setIsModalOpenImagen(false);
  };

  const handleGuardarFoto = (nuevaFoto) => {
    agregarFoto(nuevaFoto);
    closeModalAgregar();
  };

  return (
    <div className="album-wrapper">
      <h2 className="album-titulo">Álbum de Recuerdos 💖</h2>
      <button className="album-add-button" onClick={openModalAgregar}>
        <FaPlus /> Agregar foto
      </button>

      <div className="album-container">
        {fotos.length === 0 && (
          <p className="album-empty">Agrega tu primer recuerdo 💖</p>
        )}
        {fotos.map((foto) => (
          <div className="album-photo" key={foto.id}>
            {/* ✅ MODIFICACIÓN CLAVE AQUÍ: Se crea un contenedor para la imagen */}
            <div className="photo-image-container" onClick={() => openModalImagen(foto.url)}>
              <img src={foto.url} alt="recuerdo" />
            </div>
            
            {/* ✅ La fecha ahora está fuera del contenedor de la imagen */}
            <p className="photo-date">{foto.fecha}</p>
            
            <button className="delete-photo" onClick={(e) => {
              e.stopPropagation();
              eliminarFoto(foto.id);
            }}>
              <FaTrash size={14} />
            </button>
          </div>
        ))}
      </div>

      {isModalOpenAgregar && (
        <ModalAgregarFoto
          isOpen={isModalOpenAgregar}
          onClose={closeModalAgregar}
          onSave={handleGuardarFoto}
        />
      )}

      {isModalOpenImagen && (
        <div className="modal-imagen-fondo" onClick={closeModalImagen}>
          <div className="modal-imagen-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Imagen Ampliada" />
            <button className="modal-cerrar" onClick={closeModalImagen}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};