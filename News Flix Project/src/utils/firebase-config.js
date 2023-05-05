
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjsczN06ATmG2oP8ChZdM_NE23gsd_H4A",
  authDomain: "newsflix-eaf2b.firebaseapp.com",
  projectId: "newsflix-eaf2b",
  storageBucket: "newsflix-eaf2b.appspot.com",
  messagingSenderId: "157973188250",
  appId: "1:157973188250:web:fc888601c17afc36c5d923",
  measurementId: "G-7NMY61C5Y0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);