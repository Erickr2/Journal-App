import {useDispatch} from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material'

import { AuthLayout } from '../layout/AuthLayout';
import { Useform } from '../../hooks/useForm';
import { chekingAuthentication, startGoogleSignIn } from '../../store/auth';


export const LoginPage = () => {

  const dispatch = useDispatch(); //despachador de funciones

  //extraigo la data y defino mi valor inicial
  const {email, password, onInputChange} = Useform({
    email: 'erick@erick.com',
    password: '12345'
  })

  const handleSubmit = ( event ) => {
    event.preventDefault();

    console.log({email, password})
    dispatch(chekingAuthentication({email, password})); //con ayuda del dispatch invocamos la funcion chekingAuthentication 
  }

  const onGoogleSignIn = () => {
    console.log('GoogleSignIn')
    dispatch( startGoogleSignIn());
  }


  return (
    <AuthLayout title='Login'>  {/* tema de la app */}

      <form onSubmit={handleSubmit}> {/* mandamos el hanlde submit */}
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}> {/* 12 para que ocupe 12 posiciones como normalmente es en css */}
            <TextField
              label="correo"
              type='email'
              name="email"
              value={email} //valor de mi input 
              placeholder='correo@google.com'
              fullWidth
              onChange={onInputChange} //controlador 
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="contraseña"
              type='password'
              name="password"
              value={password}
              placeholder='Contraseña'
              fullWidth
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button 
              type='submit' //tipo submit para mandar el form
              variant='contained' 
              fullWidth>
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button onClick={onGoogleSignIn} variant='contained' fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}> Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>


        </Grid>

      </form>

    </AuthLayout>

  )
}

