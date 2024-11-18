import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import dotenv from 'dotenv';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDBhhjZpuizdMb6QeUocY-M_KtKyC_VfSE", authDomain: "atandt-75797.firebaseapp.com", projectId: "atandt-75797", storageBucket: "atandt-75797.appspot.com", messagingSenderId: "542974584050", appId: "1:542974584050:web:8bcd4e6b9a053c08809c6b", measurementId: "G-HS36DYLY42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);