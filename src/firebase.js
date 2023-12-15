import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyApquyBndV10M92v4lVivq-QQ3_uvVlzX0',
  authDomain: 'artlife4-fc1df.firebaseapp.com',
  projectId: 'artlife4-fc1df',
  storageBucket: 'artlife4-fc1df.appspot.com',
  messagingSenderId: '683362316164',
  appId: '1:683362316164:web:692195b016364398a937d1',
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
