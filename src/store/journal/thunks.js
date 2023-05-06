import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseBD } from "../../firebase/config";
import { addNEwEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving } from "./sliceJournal";
import { fileUpload, loadNotes } from "../../helpers";


export const startNewNote = () => {
    return async( dispatch, getSate ) => {

        dispatch( savingNewNote() );//hago el dispatch de mi reducer para deshabilitar el boton

        //extraigo el uid de mi state y del nodo de auth
        const { uid } = getSate().auth;
        console.log(uid)

        const newNote = {
            title: '',
            body: '', 
            date: new Date().getTime(),
        }

        //indicamos la ruta donde va hacer la inserción junto con el udi del usuario
        const newDoc = doc( collection( FirebaseBD, `${uid}/Journal1/notas`) ); //aqui esta toda mi config de la BD; variables de entorno, config api_key etc
        const setDocRes = await setDoc( newDoc, newNote );// mandamos el documento que queremos modificar y la nota

        newNote.id = newDoc.id;

        //puedo mandar varios dispatch a la vez y asi mismo a cualquier parte de mi store
        dispatch( addNEwEmptyNote( newNote ));//despachamos el reducer y le mandamos como payload la newNote, esto hace la inserción en mi arreglo de notes
        dispatch(setActiveNote( newNote ));//despachamos el reducer y le mandamos como payload la newNote, esto activa la nota con su info
    }
}

//funcion para empezar a cargar la notas 
export const startLoadingNotes = () => {
    return async( dispatch, getSate ) => {
        const { uid } = getSate().auth; //extraigo el uid del estado de mi auth
        
        const notes = await loadNotes( uid ); //guardo la respuesta de la carga de la notas de mi helper, este es mi payload
        dispatch(setNotes(notes)); //despacho mi funcion para setear la notas de mi usuario 
    }
}



export const startUploadingFiles = (files = []) => {
    return async( dispatch ) => {
        dispatch( setSaving() );

        /* await fileUpload( files[0]); */

        //arreglo donde voy a guardar las promesas para cargar los archivos
        const fileUploadPromises = [];
        //recorro mi arreglo y guardo en el arreglo de arriba las promesas que reciba de la funcion fileUpload
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) )
        }

        //espero que termine de ejecutarse todas las promesas que hay en mi arreglo de promesas
        const photosURL = await Promise.all( fileUploadPromises )
        
        dispatch(setPhotosToActiveNote( photosURL ));
    }
}


export const startDeletingNote = () => {
    return async(dispatch, getSate) => {
        //extraigo el uid y la nota activa de mi state auth y de mi jorunal
        const {uid} = getSate().auth;
        const { active: note} = getSate().journal;
        //hago la referencia al documento que voy modificar 
        const docRef = doc(FirebaseBD, `${uid}/Journal1/notas/${note.id}`);
        const res = await deleteDoc( docRef );//elimino el doc que le mande como referencia

        dispatch(deleteNoteById(note.id))
    }
}

