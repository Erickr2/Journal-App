import { IconButton, Typography } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NothingSelectedView } from "../views/NothingSelectedView"
import { NoteView } from "../views/NoteView"
import { AddOutlined } from "@mui/icons-material"
import { startNewNote } from "../../store/journal/thunks"
import { useDispatch, useSelector } from "react-redux"

export const JournalPage = () => {


  const dispatch = useDispatch();
  const { isSaving, active } = useSelector( state => state.journal); //extraigo de mi estado de journal el isSaving

  const handleClick = () => {
    dispatch( startNewNote() )
    
  }

  return (
   <JournalLayout>
    
    {
    (!!active)//si esta activo !active = falso, !!active = verdadero
    ? <NoteView />
    : <NothingSelectedView />
    }
    

    <IconButton
    size="large"
    sx={{
      color: 'white',
      backgroundColor: 'error.main',
      ':hover': { backgroundColor: 'error.main', opacity: 0.9},
      position: 'fixed',
      right: 50,
      bottom: 50
    }}
    onClick={ handleClick }
    disabled={ isSaving } //deshabilito si el estado esta en true
    >

      <AddOutlined sx={{ fontSize: 30}}/>
    </IconButton>
   </JournalLayout>
  )
}

