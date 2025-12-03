import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgUSvGRCA8Afv5F86ScGhtOnq3CZh85KE",
  authDomain: "community-2d1c5.firebaseapp.com",
  projectId: "community-2d1c5",
  storageBucket: "community-2d1c5.firebasestorage.app",
  messagingSenderId: "761210016118",
  appId: "1:761210016118:web:da7281bf7bb13bfa8e2a57",
  measurementId: "G-M04J2ZHSFY",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
