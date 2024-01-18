import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAq7GglCD88W-8gvSj0yOZHXPXBLZFL5cc",
  authDomain: "codehubconnectv2.firebaseapp.com",
  projectId: "codehubconnectv2",
  storageBucket: "codehubconnectv2.appspot.com",
  messagingSenderId: "990563579457",
  appId: "1:990563579457:web:2147a5a18cde07d806f8c0",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
