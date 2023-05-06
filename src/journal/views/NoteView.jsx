import { DeleteOutline, SaveOutlined, UploadFileOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

import { ImageGallery } from "../components"
import { Useform } from "../../hooks/useForm"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo, useRef } from "react"
import { setActiveNote,startDeletingNote,startUploadingFiles } from "../../store/journal"
import { startSaveNote } from "../../store/auth"


export const NoteView = () => {

    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal); //extraigo el estado de mi valor active y la reenombro como note
    const { body, title, onInputChange, FormState, date } = Useform(note); //estado incial mi note

    const dispatch = useDispatch();

    //memo para memorizar el valor de mi fecha y estar pendiente al cambio de la misma 
    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    //hacemos referencia a un elemento, en este caso un html
    const fileInputRef = useRef();

    //si cambia cualquier propiedad del formstate, modifica la nota activa con el cambio que hay en el form state
    useEffect(() => {
        dispatch(setActiveNote(FormState))
    }, [FormState])

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota Actualizada', messageSaved, 'success')
        }

    }, [messageSaved])


    const onSaveNote = () => {
        dispatch(startSaveNote());
    };

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;

        dispatch( startUploadingFiles( target.files))
    }

    const onDelete = () => {
        dispatch(startDeletingNote());
    }

    return (
        <Grid
            className="animate__animated animate__fadeIn animate__faster"
            container direction='row'
            justifyContent="space-between"
            alignItems='center'
            sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight='ligth'>{dateString}</Typography>
            </Grid>



            <Grid item>

                <input
                    type='file'
                    multiple
                    ref={ fileInputRef } //indicamos la refernecia de mi elemento 
                    onChange={onFileInputChange}
                    style={{display: 'none'}}
                />

                <IconButton
                color="primary"
                disabled={ isSaving }
                onClick={ () => fileInputRef.current.click() } //simulo el click con ayuda de mi referencia //mi referencia.actual.click(evento)
                >
                    <UploadFileOutlined />
                </IconButton>

                <Button
                    onClick={onSaveNote}
                    color="primary"
                    sx={{ padding: 2 }}
                    disabled={isSaving}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese titulo"
                    label="Titulo"
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió hoy?"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button 
                onClick={ onDelete }
                sx={{  mt: 2 }}
                color="error"
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>

            <ImageGallery images={ note.imageUrls }/> {/* mando las imagenes que estan en la nota activa en el valor imagesUrls */}

        </Grid>
    )
}

