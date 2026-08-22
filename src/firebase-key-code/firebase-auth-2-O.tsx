// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",// ENTER_HERE_YOUR_FIREBASE_API_KEY,
  authDomain: "", // YOUR_FIREBASE_DOMAIN_NAME
  projectId: "", // YOUR_FIREBASE_PROJECT_ID
  storageBucket: "", // YOUR_FIREBASE_STORAGE_BUCKET_ID
  messagingSenderId: "", // YOUR_MESSAGE_SENDER_ID
  appId: "", // YOUR_API_ID
  measurementId: "" // YOUR_MEASURMENT_ID
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
