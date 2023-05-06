//NOTA los reducer no despachan funciones de terceros, solo se resuelven con lo que hay en su scope
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isSaving: false, //establesco el isSaving en false para cuando clike este en true
    messageSaved: '',
    notes: [],
    active: null,

}

export const jorunalSlice = createSlice({
    name: 'jorunal',//nombre del slice 
    initialState,//estado inicial
    //acciones
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true; //obtengo el isSaving y lo pongo en true
        },
        addNEwEmptyNote: (state, action) => {
            state.notes.push(action.payload); //obtengo mis notas del state y hago un push de lo que tenga mi payload
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload; //obtenemos la nota para renderizarla y activar la nota con la info que trae la new note
            state.messageSaved = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                //si el id de la nota que recibo es igual al id de la nota que viene en el payload, retorna lo uqe hay en payload, que es la actualizacion de la nota
                if(note.id === action.payload.id){
                    return action.payload;
                }
                return note
            });

            state.messageSaved = `${ action.payload.title}, actualizada correctamente`
        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload] //hacemos el spred de las imagenes y le agregamos las nuevas que acrgemos que vienen en el paylod de mi action
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: (state, action) => {
            state.active = null;
            state.notes = state.notes.filter( note => note.id !== action.payload);//filtro las notas que tengan un id diferente al que me mandan en el payload
        }
    },
})
// Action creators are generated for each case reducer function
export const { 
    addNEwEmptyNote, 
    clearNotesLogout,
    deleteNoteById, 
    savingNewNote, 
    setActiveNote, 
    setNotes, 
    setPhotosToActiveNote, 
    setSaving, 
    updateNote, 
} = jorunalSlice.actions;