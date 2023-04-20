import { loginWithEmailPassword, logoutFirebase, registerByUserEmail, signInWithGoogle } from "../../firebase/providers";
import { chekingCredentials, login, logout } from "./authSlice"

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
        if(!result.ok) return dispatch(logout( result.errorMessage)); //si no viene el resultado mando error

        dispatch(login( result )) //caso contrario despacho el login
    }
}

//funcion que ejecuta el registerPAge, desestrcutura ladata 
export const startCreatingUserByEmailPassword = ({ email, password, displayName}) => {
    //retorna el despecho de mi la revision de las credenciales y espera el resultado de registerByUserEmail y se le manda la data
    return async( dispatch ) => {

        dispatch( chekingCredentials());

        const {ok, uid, photoURL, errorMessage} = await registerByUserEmail({ email, password, displayName});

        if( !ok ) return dispatch(logout({errorMessage}));

        dispatch(login({ uid, displayName, email, photoURL}));
    }
};

//funcion para hacer el login, recibe email y contraseña
export const startLoginWithEmailPassword = ({ email, password}) => {

    return async( dispatch ) => {
        //estraigo el despachador de funciones, redux
        dispatch(chekingCredentials());
        //espero la data de la funcion loginWithEmailPassword
        const {ok, uid, photoURL, errorMessage, displayName} = await loginWithEmailPassword({email, password});
        //si el valor dl ok es false, despacha el logout y menda el mensaje del error de porque no se inicio sesion
        if(!ok) return dispatch(logout({errorMessage}));
        //caso contrario despacha el login y manda la info del usuario
        dispatch(login({uid, email, password, photoURL, displayName}));

    }
    
};

//espera la respuesta de logoutFirebase, y una vez la recibe despacha el logout
export const startLogout = () => {
    return async( dispatch ) => {
        
        await logoutFirebase();

        dispatch( logout() );

    }
}
