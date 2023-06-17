// Import the necessary Firebase modules
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, 
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, 
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID, 
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, 
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, 
  appId: import.meta.env.VITE_FIREBASE_APP_ID, 
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID, 
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get the Firebase services you need
export const auth = firebase.auth(); // Firebase Authentication service
export const firestore = firebase.firestore(); // Firebase Firestore service

// Function to get the current authenticated user
export const currentUser = () => {
  const user = auth.currentUser;
  return user;
};

// Function to sign up a new user
export const signup = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

// Function to log in an existing user
export const login = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

// Function to log out the current user
export const logout = () => {
  return auth.signOut();
};
