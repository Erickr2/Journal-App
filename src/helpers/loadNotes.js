import {collection, getDocs} from 'firebase/firestore/lite';
import { FirebaseBD } from '../firebase/config';


 export const loadNotes = async( uid = '') => {
    if(!uid) throw new Error('El UID del usuario no existe'); //condicional para saber si existe el uid que recibo 

    const collectionRef = collection(FirebaseBD, `${uid}/Journal1/notas`); //consulta para traer la notas por el uid 
    const docs = await getDocs(collectionRef);//respuesta de los docs

    const notes = [];
    docs.forEach( doc => {
        notes.push({id: doc.id, ...doc.data()});
    });
    return notes;
}

