import React, { useState } from 'react';
import './ModalAgregarFoto.css';
import { FaTimes } from 'react-icons/fa';
import { FaUpload } from 'react-icons/fa';

const IMGBB_API_KEY = 'a4ea5b36d57e09ececc110f4bb689a8d';

export const ModalAgregarFoto = ({ isOpen, onClose, onSave }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fecha, setFecha] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const esFormularioValido = file && fecha !== '';

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.includes('image')) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!esFormularioValido || isUploading) return;

    setIsUploading(true);

    try {
      const base64File = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(file);
      });

      const formData = new FormData();
      formData.append('image', base64File);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        const downloadURL = data.data.url;
        
        const selectedDate = new Date(fecha + 'T12:00:00');
        
        const fechaFirestore = selectedDate.toISOString().split('T')[0];
        const fechaDisplay = selectedDate.toLocaleDateString('es-AR').replaceAll('/', '.');

        onSave({
          url: downloadURL,
          fecha: fechaDisplay,
          fechaOrden: fechaFirestore
        });
        
        setFile(null);
        setPreview(null);
        setFecha('');
      } else {
        throw new Error('Error al subir la imagen a Imgbb');
      }
    } catch (error) {
      console.error("Error al subir la imagen y guardar la foto: ", error);
      alert("Hubo un error al guardar la foto. Por favor, inténtalo de nuevo.");
    } finally {
      setIsUploading(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-button">
          <FaTimes />
        </button>
        <h3 className="modal-titulo">Agregar nueva foto</h3>
        <form onSubmit={handleSave} className="modal-form">
          <div className="input-group">
            <label className="input-label">Seleccionar imagen</label>
            <div className="custom-file-input-container">
              <input 
                id="file-input"
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="input-file-hidden" 
              />
              <label htmlFor="file-input" className="custom-file-label">
                <FaUpload />
                {file ? file.name : "Seleccionar archivo"}
              </label>
            </div>
          </div>
          {preview && <img src={preview} alt="preview" className="preview-image" />}
          <div className="input-group">
            <label className="input-label">Fecha</label>
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="input-field" />
          </div>
          <button type="submit" className="modal-button" disabled={!esFormularioValido || isUploading}>
            {isUploading ? 'Guardando...' : 'Guardar'}
          </button>
        </form>
      </div>
    </div>
  );
};