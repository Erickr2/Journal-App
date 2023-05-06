import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material'

import { AuthLayout } from '../layout/AuthLayout';
import { Useform } from '../../hooks/useForm';
import { chekingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';
import { useMemo, useState } from 'react';

//estado inicial de mi form
const formData = {
  email: '',
  password: '',
}

//objeto con validaciones, el primer argumnto es una funcion y el segundo el mensjae de error
const formValidations = {
  email: [(value) => value.includes('@'), 'El corre debe tener una @'],
  password: [(value) => value.length >= 6, 'El password debe tener mas de 6 caracteres'],
}


export const LoginPage = () => {


  const dispatch = useDispatch(); //despachador de funciones

  const [FormSubmitted, setFormSubmitted] = useState(false); //estado que guarda el estado de mi sumit
  const { status, errorMessage } = useSelector(state => state.auth)//traigo el status de mi state y del reducer auth

  const { FormState, email, password, onInputChange,
    isFormValid, emailValid, passwordValid,
  } = Useform(formData, formValidations); //mando mis validaciones y mi estado inicial y extraigo mis funciones para validar 



  const isAuthrnticating = useMemo(() => status === 'cheking', [status]); //cada que mi status cambia revisa si el estado es cheking

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true); //modificador del estado 
    if (!isFormValid) return; //si no es valido el form, no hagas nada para que no mande al back string vacio
    dispatch(startLoginWithEmailPassword(FormState));//despacho mi funcion para crear usuarios y le mando el formstate que tiene toda mi data de registro

  }

  const onGoogleSignIn = () => {
    console.log('GoogleSignIn')
    dispatch(startGoogleSignIn());
  }


  return (
    <AuthLayout title='Login'>  {/* tema de la app */}

      <form onSubmit={handleSubmit} className="animate__animated animate__fadeIn animate__faster"
      > {/* mandamos el hanlde submit */}
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
              error={!!emailValid && FormSubmitted}
              helperText={emailValid}
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
              error={!!passwordValid && FormSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          {/* mensaje de error en casod e existir uno */}
          <Grid
            container
            display={!!errorMessage ? '' : 'none'}
            sx={{ mt: 1 }}
          >
            <Grid
              item
              xs={12}
            >
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>
          </Grid>


          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthrnticating} //se deshabilita el boton cuando el estado esta en cheking
                type='submit' //tipo submit para mandar el form
                variant='contained'
                fullWidth>
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthrnticating} //se deshabilita cuando esta en cheking
                onClick={onGoogleSignIn}
                variant='contained'
                fullWidth>
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

