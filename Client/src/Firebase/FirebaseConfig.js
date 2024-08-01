// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4AzCsWSgH8oH9l-VK1eWTLnc5JaBHm8Q",
  authDomain: "test-607dc.firebaseapp.com",
  projectId: "test-607dc",
  storageBucket: "test-607dc.appspot.com",
  messagingSenderId: "625177834826",
  appId: "1:625177834826:web:d974f2af4efc25f291bdb3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

export { db, auth };