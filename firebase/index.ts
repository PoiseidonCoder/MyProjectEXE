// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "fir-auth-6a615.firebaseapp.com",
  projectId: "fir-auth-6a615",
  storageBucket: "fir-auth-6a615.appspot.com",
  messagingSenderId: "974446569018",
  appId: "1:974446569018:web:bbcdcb7937b4a5ea0ab703",
  measurementId: "G-E15KXQBM0V",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
