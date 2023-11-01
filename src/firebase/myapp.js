// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8j9YD47iDp8fEetvTrnDfWZaEswMzLn8",
  authDomain: "project-udemy-firebase.firebaseapp.com",
  projectId: "project-udemy-firebase",
  storageBucket: "project-udemy-firebase.appspot.com",
  messagingSenderId: "334270692885",
  appId: "1:334270692885:web:131aa1042fc623e740d81c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const Login = ({email, password}) => {
    return signInWithEmailAndPassword(auth, email, password)
}

export const RegisterUser = ({email, password}) => {
  return createUserWithEmailAndPassword(auth, email, password)
}
export const Out = () => {
  return signOut(auth)
}
