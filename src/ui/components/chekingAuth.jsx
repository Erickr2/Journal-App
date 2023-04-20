import { CircularProgress, Grid, colors } from '@mui/material'
import React from 'react'

//componente que renderiza una pantalla de carga, esto esta en ui porque es un componente global que puedo usartoda la pp

export const ChekingAuth = () => {
  return (

    <Grid
      container //contenedor   
      spacing={0}
      direction={"column"} /* como si fuera flex-bob */
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }} //styled extended
    >

      <Grid
        container
        direction='row'
        justifyContent='center'
        >
          <CircularProgress color='warning' />
        </Grid>
      </Grid>

      )
}

