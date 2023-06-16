import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useState, useEffect } from "react";

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
