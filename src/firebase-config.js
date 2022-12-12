// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "disney-daily-planner-dbad2.firebaseapp.com",
    databaseURL: "https://disney-daily-planner-dbad2-default-rtdb.firebaseio.com",
    projectId: "disney-daily-planner-dbad2",
    storageBucket: "disney-daily-planner-dbad2.appspot.com",
    messagingSenderId: "401303154540",
    appId: "1:401303154540:web:377823426934ae833fcd49",
    measurementId: "G-T55ZHSVGQY"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app)

