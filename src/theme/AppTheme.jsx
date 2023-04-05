//high order componenet, componente que tiene otro componenetes

import {ThemeProvider} from '@emotion/react'
import {CssBaseline} from '@mui/material'
import { purpleTheme } from './'

//children son los componentes que le vamos a pasar y a los que les va aproveer el theme 
export const AppTheme = ({ children }) => {
  return (

    <ThemeProvider theme={purpleTheme}> {/* tema que va a tener mi app */}
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. para que se vea chulo */}
    <CssBaseline />
    {children}
  </ThemeProvider>

  )
}

