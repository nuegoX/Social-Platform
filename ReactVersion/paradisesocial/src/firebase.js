// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCj_tPAN4M1nyMTW4dowFnUyZVy0S5BrIk",
    authDomain: "socialparadise-48a58.firebaseapp.com",
    projectId: "socialparadise-48a58",
    storageBucket: "socialparadise-48a58.appspot.com",
    messagingSenderId: "398412519233",
    appId: "1:398412519233:web:495cfccc30178adf0eb3c0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);