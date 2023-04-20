import { Grid, Typography } from "@mui/material"

export const AuthLayout = ({ children, title = '' }) => {
    return (


        <Grid
            container //contenedor 
            spacing={0}
            direction={"column"} /* como si fuera flex-bob */
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }} //styled extended
        >
            {/* caja gris  */}
            <Grid
                item
                className='box-shadow'
                xs={3} //tamaño de la caja, xs=pantallas chicas
                sx={{ backgroundColor: "white", padding: 3, borderRadius: 2, width: { sm: 450 } }}
            >
                <Typography variant='h5' sx={{ mb: 1 }}>{title} </Typography> {/* titulo, se recibe como parametro */}

                {children} {/* vistas */}

            </Grid>
        </Grid>
    )
}

