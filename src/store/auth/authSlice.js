import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: 'not-cheking', //'not-auhenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //de mi payload extraigo todos los valores que recibo en mi state
        login: (state, {payload}) => {  
            state.status = 'Authenticated'; 
            state.uid = payload.uid;
            state.email = payload.email ;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },
        logout: (state, {payload}) => {
            state.status = 'not-Authenticated';  
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload?.errorMessage; //mando el error si es que hace logout, ? por si no viene el payload
        },
        chekingCredentials: (state) => { //muto el estado de status y lo pongo en cheking
            state.status = 'cheking';
        }

    },
})
// Action creators are generated for each case reducer function
export const { login, logout, chekingCredentials } = authSlice.actions;