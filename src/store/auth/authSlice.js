import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status:'not-cheking', //'not-auhenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    erroMessage: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            
        },
        logout: (state, payload) => {

        },
        chekingCredentials: (state) => { //muto el estado de status y lo pongo en cheking
            state.status = 'cheking';
        }
       
    },
})
// Action creators are generated for each case reducer function
export const { login, logout, chekingCredentials  } = authSlice.actions;