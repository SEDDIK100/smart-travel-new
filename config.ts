import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCY02XODOVSmmoAkWsW6CskJ4nVqpUxruI",
  authDomain: "smart-travel-75201.firebaseapp.com",
  projectId: "smart-travel-75201",
  storageBucket: "smart-travel-75201.firebasestorage.app",
  messagingSenderId: "700704933925",
  appId: "1:700704933925:web:65c4aa73252f7de2c097cc",
  measurementId: "G-V4HNLCC405"
};

// Initialize Firebase




export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
export const db = getFirestore(app);


