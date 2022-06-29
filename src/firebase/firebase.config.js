// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDhKsKEZpiz_ikGdh3Icjrmlj5k-mtVALo",
  authDomain: "chatdv-5acd0.firebaseapp.com",
  projectId: "chatdv-5acd0",
  storageBucket: "chatdv-5acd0.appspot.com",
  messagingSenderId: "596734509568",
  appId: "1:596734509568:web:b454c3517a96c15ff38ee5",
  measurementId: "G-3VV5LZQ7Z4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)
const authentication = getAuth(app)
export {db, storage, authentication};