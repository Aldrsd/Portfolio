import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "@firebase/firestore"; // Perbarui ini

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJkRHH4NAOXBQHeI9s4lTk8kpUsJ69mdI",
  authDomain: "portofolio-web-e2543.firebaseapp.com",
  projectId: "portofolio-web-e2543",
  storageBucket: "portofolio-web-e2543.firebasestorage.app",
  messagingSenderId: "19818150866",
  appId: "1:19818150866:web:52be762a257434513be60b",
  measurementId: "G-HV3DW3RGER",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };
