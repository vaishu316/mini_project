// firebase.js (Ensure this is correctly set up)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase Config (Replace with your actual Firebase credentials)
const firebaseConfig = {
  apiKey: "AIzaSyD_2PN-oF2h-D1ZJb7gOuO9UGZ7RHNmedM",
  authDomain: "mini-project-3fa12.firebaseapp.com",
  projectId: "mini-project-3fa12",
  storageBucket: "mini-project-3fa12.firebasestorage.app",
  messagingSenderId: "529425710049",
  appId: "1:529425710049:web:45997693ffc010b7ce70a0",
  measurementId: "G-3Y3GQ6Q5HW"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
