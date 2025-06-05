// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTLeZHD4vCWJk7TyKTLtb8xzT3wGPZ68U",
  authDomain: "ecom-116f3.firebaseapp.com",
  projectId: "ecom-116f3",
  storageBucket: "ecom-116f3.firebasestorage.app",
  messagingSenderId: "1018644891085",
  appId: "1:1018644891085:web:5941ff8aa6857eef333084",
  measurementId: "G-0JKG04W78F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();