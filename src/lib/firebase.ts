import { initializeApp, getApps, getApp } from 'firebase/app';

export const firebaseConfig = {
  apiKey: "AIzaSyBUxCBL_gSsCYYBLkI5vZBdAFJfEkYd6G4",
  authDomain: "sportsworld-5b1f6.firebaseapp.com",
  projectId: "sportsworld-5b1f6",
  storageBucket: "sportsworld-5b1f6.firebasestorage.app",
  messagingSenderId: "228391494335",
  appId: "1:228391494335:web:fc4b42061112ccdcae1c0a",
  measurementId: "G-PNHSTJ0T7Z"
};

// Initialize Firebase instance safely for SSR / Client
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
