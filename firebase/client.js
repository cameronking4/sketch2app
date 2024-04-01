import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOpBXH3i2HkyyBj8DZmQP6qHXpz8LnVD0",
  authDomain: "test-b6347.firebaseapp.com",
  projectId: "test-b6347",
  storageBucket: "test-b6347.appspot.com",
  messagingSenderId: "340466656669",
  appId: "1:340466656669:web:60f05c6f8aab5d8b7cfb74",
  measurementId: "G-CVKC595GC2"
};

// Initialize Firebase
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const app = getApp();