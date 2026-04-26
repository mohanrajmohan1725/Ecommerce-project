import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWvJWl207nYyVxTjtQlrYujWOtwYj2fRo",
  authDomain: "ecom-project-d5353.firebaseapp.com",
  projectId: "ecom-project-d5353",
  storageBucket: "ecom-project-d5353.appspot.com",
  messagingSenderId: "106908153430",
  appId: "1:106908153430:web:3422ebbc513acf123f6df7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);