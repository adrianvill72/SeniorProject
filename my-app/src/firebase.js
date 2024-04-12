// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator,signInWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyB407uFF7J_X9Z9RAcqA6jaa57ohtwvpjA",
    authDomain: "loma-5a9be.firebaseapp.com",
    projectId: "loma-5a9be",
    storageBucket: "loma-5a9be.appspot.com",
    messagingSenderId: "411479983979",
    appId: "1:411479983979:web:4178573bdee782f1dfae2e",
    measurementId: "G-9T85KMS39F"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// const auth=()=>connectAuthEmulator(auth, "http://127.0.0.1:9099");

export default auth;


