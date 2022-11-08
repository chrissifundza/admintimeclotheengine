import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDD-eBh6uKXnyplYU3HVjpKfpgESLW4ryk",
  authDomain: "tes-delivery.firebaseapp.com",
  projectId: "tes-delivery",
  storageBucket: "tes-delivery.appspot.com",
  messagingSenderId: "1092509668282",
  appId: "1:1092509668282:web:38a69142177643b0eb4383",
  measurementId: "G-3F18DG8VJW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export  {db, storage,auth }