// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
import {collection, getDocs } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY0pvCvBnkzksNEU6urVJxDJAJzNWm4XY",
  authDomain: "reactapp-ae3bf.firebaseapp.com",
  projectId: "reactapp-ae3bf",
  storageBucket: "reactapp-ae3bf.appspot.com",
  messagingSenderId: "922456798284",
  appId: "1:922456798284:web:b5f675d3a6323da43af0e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, collection, getDocs };