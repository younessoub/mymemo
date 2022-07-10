import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,

  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,

  projectId: "memo-e61b0",

  storageBucket: "memo-e61b0.appspot.com",

  messagingSenderId: "232148050257",

  appId: "1:232148050257:web:3952bc67b137a8ec3cb370"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
