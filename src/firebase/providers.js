import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth"; //para que aparezca la ventana de google 
import {  FirebaseAuth } from "./config"; //para obtener los datos de la autenticacion
import { async } from "@firebase/util";


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

//funcion para crear usuarios con email y pass, desestructuro mi data que recibo 
export const registerByUserEmail = async({email, password, displayName}) => {

    //espero la respuesta de firebase y la imprimo, si todo esta ok, retornamos los valores y el ok en true
    try {

        //esta es la funcion que crea mi usuario
        const res = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid, photoURL} = res.user;
        await updateProfile( FirebaseAuth.currentUser, {displayName} ); //me ayuda a actualizar la info de mi usuario loggeado

        //retorna el estado del ok y la informacion del usuario
        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        return {ok: false, errorMessage: error.message} //cachamos el error
    }

};

//funcion para hacer login, recibe email y contraseña
export const loginWithEmailPassword = async({ email, password}) => {

    try {
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password); //espera la respuesta del login
        const {uid, photoURL, displayName} = result.user; //desestructuro la data del usuario
        //retornamos el estado del ok y la data del usuario
        return {
            ok: true,
            uid, photoURL, email, displayName
        }
    } catch (error) {
        return {ok: false, errorMessage: error.message}
    }
};

//funcion para hacer logout, cierra todas las sesion fb, google, tw, etc
export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
};
 