// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAn8PR70DOS3VUnVapDkXeD6qbdY9vDSM",
  authDomain: "itinerary-generator-24-26.firebaseapp.com",
  projectId: "itinerary-generator-24-26",
  storageBucket: "itinerary-generator-24-26.firebasestorage.app",
  messagingSenderId: "1093922440259",
  appId: "1:1093922440259:web:2dbf1f2682d403036cc0f6",
  measurementId: "G-9L92FHQEJ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize providers
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

export const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope('email');
facebookProvider.addScope('public_profile');

// Initialize Analytics (optional)
export const analytics = getAnalytics(app);

export default app;