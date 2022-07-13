// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyArIBXkDarXFRFqTbAqOrSQWgCcsOcOp38",
    authDomain: "reactspas-d0926.firebaseapp.com",
    projectId: "reactspas-d0926",
    storageBucket: "reactspas-d0926.appspot.com",
    messagingSenderId: "893662140505",
    appId: "1:893662140505:web:cd6464afbf5fc5cdb1f948"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const auth = getAuth(firebase);

export default firebase;