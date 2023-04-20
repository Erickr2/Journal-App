import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";

export const useChekAuth = () => {
    //traigo el estado de mi autenticacion
    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    
    useEffect(() => {
        //funcion que revisa el estado de mi autenticacion 
        onAuthStateChanged(FirebaseAuth, async (user) => { 
            if (!user) return dispatch(logout()); //si no hay respuesta del usuario, mada el logout
            //desestrucuro la dat de mi user
            const { uid, email, displayName, photoURL } = user;
            //despacho el login y mando la informacion de mi usuario
            dispatch(login({ uid, displayName, photoURL, email }))
        });


    }, [])

    return status
}

