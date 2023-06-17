import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useState, useEffect } from "react";

// Load Firebase configuration from environment variables
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
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { nickname, profilePicture } = additionalData; // Use the nickname from additionalData
    const createdAt = new Date();

    try {
      await userRef.set({
        nickname,
        profilePicture,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  } else {
    // User profile already exists, update the nickname
    try {
      await userRef.update({
        nickname: additionalData.nickname,
      });
    } catch (error) {
      console.log("Error updating nickname", error.message);
    }
  }

  return userRef;
};



export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const updateProfile = (profileData) => {
    return currentUser.updateProfile(profileData);
  };

  return {
    currentUser,
    loading,
    signup,
    login,
    logout,
    updateProfile,
  };
}



export default firebase;
