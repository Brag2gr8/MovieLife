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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userRef;
};

export default firebase;
