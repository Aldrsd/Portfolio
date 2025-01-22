import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJkRHH4NAOXBQHeI9s4lTk8kpUsJ69mdI",
  authDomain: "portofolio-web-e2543.firebaseapp.com",
  projectId: "portofolio-web-e2543",
  storageBucket: "portofolio-web-e2543.firebasestorage.app",
  messagingSenderId: "19818150866",
  appId: "1:19818150866:web:52be762a257434513be60b",
  measurementId: "G-HV3DW3RGER",
};

// Initialize with a unique name
const app = initializeApp(firebaseConfig, "comments-app");
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc };
