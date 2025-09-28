// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
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
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;
