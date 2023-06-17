import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCFas_JsvEvU1UdskyFKu7_N_UgYKJtc4Y",
    authDomain: "movielife-a9293.firebaseapp.com",
    projectId: "movielife-a9293",
    storageBucket: "movielife-a9293.appspot.com",
    messagingSenderId: "989181542890",
    appId: "1:989181542890:web:fbd8d5f81d10d5ddf8b293",
    measurementId: "G-G6WTQ0GXQ7"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get the Firebase services you need
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const currentUser = () => {
  const user = auth.currentUser;
  return user
};

currentUser()

export const signup = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const login = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const logout = () => {
  return auth.signOut();
};