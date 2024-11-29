// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// Firestore
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbG0oVVH7Yk-tWCcdbodLUAahNWGtttlo",
  authDomain: "projeto-final-dev-senai.firebaseapp.com",
  projectId: "projeto-final-dev-senai",
  storageBucket: "projeto-final-dev-senai.firebasestorage.app",
  messagingSenderId: "784172088269",
  appId: "1:784172088269:web:5f33f1e5935ec956232284",
  measurementId: "G-9B4LEPXG7R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const analytics = (typeof window !== 'undefined') ? getAnalytics(app) : null;

export {auth, db,createUserWithEmailAndPassword, signInWithEmailAndPassword, analytics  };


