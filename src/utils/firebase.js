// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjshSDjc2kOjyB8I1ypkurSqdUidktJXk",
  authDomain: "netflix-gpt-37b4b.firebaseapp.com",
  projectId: "netflix-gpt-37b4b",
  storageBucket: "netflix-gpt-37b4b.firebasestorage.app",
  messagingSenderId: "132344647943",
  appId: "1:132344647943:web:b0dbbff5679ba272ddb5a2",
  measurementId: "G-CFPC6N22QE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);