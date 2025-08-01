import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, query, onSnapshot } from 'firebase/firestore'; // Ya no necesitamos 'addDoc' aquí
import AddItem from './componentes/AddItem';
import './App.css';

function App() {
  const [items, setItems] = useState([]);

  // useEffect para leer los datos en tiempo real
  useEffect(() => {
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mi Página Interactiva</h1>

        {/* Usamos el nuevo componente para la entrada de datos */}
        <AddItem />

        {/* Lista de items guardados */}
        <div style={{ marginTop: '20px' }}>
          <h3>Items guardados:</h3>
          {items.map((item) => (
            <div key={item.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px' }}>
              {item.text}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;