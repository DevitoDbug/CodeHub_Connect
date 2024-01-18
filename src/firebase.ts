import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWyJuIaQvXTIxuhs8ot5YgGtYvGmnDd0E",
  authDomain: "codehub-connect.firebaseapp.com",
  projectId: "codehub-connect",
  storageBucket: "codehub-connect.appspot.com",
  messagingSenderId: "392010543999",
  appId: "1:392010543999:web:d34e7a50d909250ce6a04a",
  measurementId: "G-H9ZMYNXMH4",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
