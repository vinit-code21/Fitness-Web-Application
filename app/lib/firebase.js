// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCe1BjDAZOIRFN0mFJ94l2hs9Yp9cK1D1I",
    authDomain: "fitness-web-app-ea4f9.firebaseapp.com",
    projectId: "fitness-web-app-ea4f9",
    storageBucket: "fitness-web-app-ea4f9.firebasestorage.app",
    messagingSenderId: "1090630447005",
    appId: "1:1090630447005:web:e5cd4b387ce237a4290974",
    measurementId: "G-2NBT3B6X3M"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);