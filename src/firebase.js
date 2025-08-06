// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgfyy7LPOl0qKmY21BjkrQRV-rPxLeyvk",
  authDomain: "mayra-ca7e3.firebaseapp.com",
  projectId: "mayra-ca7e3",
  storageBucket: "mayra-ca7e3.firebasestorage.app",
  messagingSenderId: "1044029271534",
  appId: "1:1044029271534:web:98e5bc6de1ab76023732ff"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };