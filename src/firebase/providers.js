import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; //para que aparezca la ventana de google 
import {  FirebaseAuth } from "./config"; //para obtener los datos de la autenticacion


const googleProvider = new GoogleAuthProvider(); //proveedor de google

export const signInWithGoogle = async() => { //funcion asincrona 
    try {
        
        const result = await signInWithPopup(FirebaseAuth, googleProvider); //guardamos el resultado del signIn de google
        
        const {displayName, email, photoURL, uid} = result.user; //extraemos del resultado de mi usuario: displayName, email, photoURL, uid

        return { //retornamos un ok y los datos de mi usuario
            ok: true,
            //user info
            displayName, email, photoURL, uid,

        }
    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;

        return { //control de errores
            ok: false,
            errorMessage,
        }
    }
}