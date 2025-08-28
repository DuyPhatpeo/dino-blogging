// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBegX3mpirXXl2fNfUL0sRy57crXcso7m8",
  authDomain: "dinoblogging.firebaseapp.com",
  projectId: "dinoblogging",
  storageBucket: "dinoblogging.firebasestorage.app",
  messagingSenderId: "680136919670",
  appId: "1:680136919670:web:ea0eb4333e32ffa6bead57",
  measurementId: "G-QLWBN7VEX2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
