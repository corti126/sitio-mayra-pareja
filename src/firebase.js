// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgfyy7LPOl0qKmY21BjkrQRV-rPxLeyvk",
  authDomain: "mayra-ca7e3.firebaseapp.com",
  projectId: "mayra-ca7e3",
  storageBucket: "mayra-ca7e3.firebasestorage.app",
  messagingSenderId: "1044029271534",
  appId: "1:1044029271534:web:98e5bc6de1ab76023732ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Conecta a la base de datos de Firestore
const db = getFirestore(app); // <-- NUEVO

// Exporta lo que necesites usar en el resto de tu código
export { db };