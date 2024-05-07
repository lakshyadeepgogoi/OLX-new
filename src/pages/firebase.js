
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword,onAuthStateChanged, GoogleAuthProvider ,  RecaptchaVerifier, signInWithPhoneNumber, signInWithCredential, PhoneAuthProvider  } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { setPersistence, browserLocalPersistence } from 'firebase/auth';


const firebaseConfig = {

  apiKey: "AIzaSyBSJO2IHbtEctoLsrAk_BA79FAUdP1ZbvE",
  authDomain: "sellkaroindia-841bd.firebaseapp.com",
  projectId: "sellkaroindia-841bd",
  storageBucket: "sellkaroindia-841bd.appspot.com",
  messagingSenderId: "1058962837689",
  appId: "1:1058962837689:web:e6a45bacb51409b5554b68",
  measurementId: "G-879X80KHQW"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();

setPersistence(auth, browserLocalPersistence);

export { app, storage,auth, db, signInWithEmailAndPassword,GoogleAuthProvider, onAuthStateChanged, collection, getDocs, ref, getDownloadURL,  RecaptchaVerifier, signInWithPhoneNumber, signInWithCredential, PhoneAuthProvider  };