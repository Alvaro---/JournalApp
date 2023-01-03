// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDW-Y8nxaHjIEnwqV4ddop6YNta1s8nTm0",
    authDomain: "react-cursos-f9d40.firebaseapp.com",
    projectId: "react-cursos-f9d40",
    storageBucket: "react-cursos-f9d40.appspot.com",
    messagingSenderId: "506584955713",
    appId: "1:506584955713:web:c010ee181bd686a5713fc0"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)