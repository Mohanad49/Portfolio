import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, getDocs } from "@firebase/firestore"; // Perbarui ini


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3pFhEEqD3fZYspv_ftWCWN1OsvEXx5pw",
  authDomain: "my-portfolio-da541.firebaseapp.com",
  projectId: "my-portfolio-da541",
  storageBucket: "my-portfolio-da541.firebasestorage.app",
  messagingSenderId: "661859753161",
  appId: "1:661859753161:web:4066d38bb9dd3f5a9e4118",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };