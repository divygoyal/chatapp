// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfDFcQGxJFunlTyeXp08ZDQxlxHj-jvis",
  authDomain: "chat-a290d.firebaseapp.com",
  projectId: "chat-a290d",
  storageBucket: "chat-a290d.appspot.com",
  messagingSenderId: "757959191723",
  appId: "1:757959191723:web:719cf2e39f548307775bee",
  measurementId: "G-S1Y8WHYYW0"
  
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth =getAuth();
export const storage = getStorage();
export const db = getFirestore(); 