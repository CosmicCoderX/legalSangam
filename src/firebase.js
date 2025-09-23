// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
// Replace these with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyDq6d88MmpcGKfg5USFMCDFS7L_pSU_Be0",
  authDomain: "legalsangam.firebaseapp.com",
  projectId: "legalsangam",
  storageBucket: "legalsangam.firebasestorage.app",
  messagingSenderId: "627554365095",
  appId: "1:627554365095:web:e1cb5513a4bf592ec5b582",
  measurementId: "G-BJZ8143BYK"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
