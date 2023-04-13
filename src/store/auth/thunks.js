import { signInWithGoogle } from "../../firebase/providers";
import { chekingCredentials } from "./authSlice"

//un thunk me sirve para tratar funciones asincronas, en este caso obtengo el dispatch y ejecuto la funcion chekingCredentials que cambia el estado de status a cheking
export const chekingAuthentication = ( email, password) => {
    return async( dispatch ) => {

        dispatch(chekingCredentials() );

    }
}

export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        dispatch(chekingCredentials() );

        const result = await signInWithGoogle(); //espero la respuesta de la funcion signInWithGoogle 
        console.log({ result }) 
    }
}