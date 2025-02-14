import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2xAjPJYLDouySjJOeWPxMv71ekEL0rZg",
  authDomain: "portfolio-comments-d28cc.firebaseapp.com",
  projectId: "portfolio-comments-d28cc",
  storageBucket: "portfolio-comments-d28cc.firebasestorage.app",
  messagingSenderId: "1073106311316",
  appId: "1:1073106311316:web:67805d5c58f575665cbc81",
};

// Initialize with a unique name
const app = initializeApp(firebaseConfig, 'comments-app');
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc };