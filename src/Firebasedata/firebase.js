// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC78QesPTnSgrgUQHS1GXRNibgcqGSem6U",
    authDomain: "evergreenculture-36195.firebaseapp.com",
    projectId: "evergreenculture-36195",
    storageBucket: "evergreenculture-36195.firebasestorage.app",
    messagingSenderId: "901429242298",
    appId: "1:901429242298:web:ef878d50e64e0dcf2f9583",
    measurementId: "G-N5XW0WDQ4Z"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
