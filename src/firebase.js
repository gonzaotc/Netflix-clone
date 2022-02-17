import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApSDuHsB9ih9c_5k_MFQEm-N-zLWkEzeM",
  authDomain: "netflis-4f7e1.firebaseapp.com",
  projectId: "netflis-4f7e1",
  storageBucket: "netflis-4f7e1.appspot.com",
  messagingSenderId: "593551173420",
  appId: "1:593551173420:web:b4718e0298d71b81fd2e89",
};

// initialize firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth();

// collection ref
const moviesCollection = collection(db, "movies");

export { moviesCollection, auth };
export default db;
