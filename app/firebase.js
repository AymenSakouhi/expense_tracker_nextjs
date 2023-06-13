// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLUgoQ-xJhcQ-HNzIzmmW-2I60qnlPnOE",
  authDomain: "expense-tracker-45b33.firebaseapp.com",
  projectId: "expense-tracker-45b33",
  storageBucket: "expense-tracker-45b33.appspot.com",
  messagingSenderId: "677386248979",
  appId: "1:677386248979:web:5bbaaf6521bea1997fb0e6",
  measurementId: "G-S9L59QDNYH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
