// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZ2iQ6V8xuxX7oJVHEdvkMIxnW0WXPGfk",
  authDomain: "bags-shop-a90d4.firebaseapp.com",
  projectId: "bags-shop-a90d4",
  storageBucket: "bags-shop-a90d4.firebasestorage.app",
  messagingSenderId: "681817677534",
  appId: "1:681817677534:web:6388ff050bc09cd6916c4f",
  measurementId: "G-4XWJYVMZHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db=getFirestore(app);

export {db};