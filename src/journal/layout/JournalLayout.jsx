import {Box, Toolbar} from '@mui/material'
import { NavBar, SideBar } from '../components/';


const drawerWidth = 240;


export  const JournalLayout = ({ children }) => {


  return (
    //box es como un div
    <Box sx={{ display: 'flex'}} className="animate__animated animate__fadeIn animate__faster"> {/* padre */}

        <NavBar drawerWidth={ drawerWidth } />

        <SideBar draweWidth={ drawerWidth} />

        <Box component="main"   /* hijo */
        sx={{ flexGrow: 1, p: 3 }}

        >

            <Toolbar />

            {children}

        </Box>
    </Box>
  )
}

