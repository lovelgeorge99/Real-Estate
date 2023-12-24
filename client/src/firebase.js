// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mtl-housing.firebaseapp.com",
  projectId: "mtl-housing",
  storageBucket: "mtl-housing.appspot.com",
  messagingSenderId: "789850310799",
  appId: "1:789850310799:web:b689308df9a7310e0948fa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);