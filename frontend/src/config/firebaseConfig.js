// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDLIwSyBqmWphUtnpOUHAidlzzOrQ_7PRY",
    authDomain: "prolance-r.firebaseapp.com",
    projectId: "prolance-r",
    storageBucket: "prolance-r.firebasestorage.app",
    messagingSenderId: "329509169758",
    appId: "1:329509169758:web:d9dc8cb7f9928e8fc962cf",
    measurementId: "G-D6YC7WT39B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (only in browser environment)
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Initialize Firebase Authentication
const auth = getAuth(app);

export { app, analytics, auth };
export default app;
