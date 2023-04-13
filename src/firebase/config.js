// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'; //obtengo la autenticasion 
import { getFirestore } from 'firebase/firestore/lite'; //accedo a la BD
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdDCHyL2jryVG8WKwQy79tX2dDCs17Hdo",
  authDomain: "react-curso-4257a.firebaseapp.com",
  projectId: "react-curso-4257a",
  storageBucket: "react-curso-4257a.appspot.com",
  messagingSenderId: "866313585334",
  appId: "1:866313585334:web:7f820196d6e6f20b071c17",
  measurementId: "G-DZVF38N05X"
};

// Initialize Firebase
export const FireBaseApp = initializeApp(firebaseConfig); //configuracion de mi app
export const analytics = getAnalytics(FireBaseApp);

export const FirebaseAuth = getAuth( FireBaseApp ) //le paso la config de mi app al getAuth, funciones de autenticasion
export const FirebaseBD = getFirestore( FireBaseApp ); //config de la bd