import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const AddItem = () => {
  const [item, setItem] = useState('');

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (item.trim() === '') return;

    try {
      // Corregimos esta línea para guardar la referencia del documento
      const docRef = await addDoc(collection(db, 'items'), {
        text: item,
        timestamp: new Date(),
      });
      setItem('');
      console.log("Documento escrito con ID: ", docRef.id);
    } catch (e) {
      console.error("Error al agregar el documento: ", e);
    }
  };

  return (
    <form onSubmit={handleAddItem}>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Escribe algo aquí..."
      />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default AddItem;