import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal/sliceJournal';
 
//funcion que recibe una nota 
export const SideBarItem = ({ body, title, id, date, imageUrls =[] }) => {

    const dispatch = useDispatch();

    const newTitle = useMemo( () => {
        return title.length > 17
        ? title.substring(0, 17) + '...'
        : title;
    }, [title]);

    //como ya tengo la nota es un proceso sincrono y solo la mando 
    const handleClick = () => {
        dispatch(setActiveNote({title, body, id, date, imageUrls}))
        
      }

    return (
        <ListItem disablePadding>
            <ListItemButton 
            onClick={handleClick}
            >
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={body} />
                </Grid>

            </ListItemButton>
        </ListItem>
    )
}

