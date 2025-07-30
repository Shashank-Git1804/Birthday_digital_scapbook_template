// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjQEjpTTx7Wc3Cv64cBnKjLeEJ9y5hP7o",
  authDomain: "birthday-57cd8.firebaseapp.com",
  projectId: "birthday-57cd8",
  storageBucket: "birthday-57cd8.firebasestorage.app",
  messagingSenderId: "603144064481",
  appId: "1:603144064481:web:4b186b40b795e2ba9e96a0",
  measurementId: "G-TMTYYNGJMW"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };