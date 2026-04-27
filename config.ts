import { initializeApp,getApp, getApps } from "firebase/app";
import { getAuth, getReactNativePersistence , initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCY02XODOVSmmoAkWsW6CskJ4nVqpUxruI",
  authDomain: "smart-travel-75201.firebaseapp.com",
  projectId: "smart-travel-75201",
  storageBucket: "smart-travel-75201.firebasestorage.app",
  messagingSenderId: "700704933925",
  appId: "1:700704933925:web:65c4aa73252f7de2c097cc",
  measurementId: "G-V4HNLCC405",
};

// Initialize Firebase

const isNew = getApps.length===0;




export const app = isNew ?  initializeApp(firebaseConfig): getApp() ;

export const auth = isNew ? initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
}) : getAuth(app);

export const db = getFirestore(app);
