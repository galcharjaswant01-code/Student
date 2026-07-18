import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDcLIbFsi9XZsKEk-pdkBNT9Vtqhz-0YXs",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "student-9dde3.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "student-9dde3",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "student-9dde3.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "774249179086",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:774249179086:web:549899892ef0a551432d9f",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-5FZBNRLBY8"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
