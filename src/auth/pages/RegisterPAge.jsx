import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { Useform } from '../../hooks/useForm';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserByEmailPassword } from '../../store/auth';

//estado inicial
const formData = {
  email: '',
  password: '',
  displayName: ''
}

//objeto con validaciones, el primer argumnto es una funcion y el segundo el mensjae de error
const formValidations = {
  email: [(value) => value.includes('@'), 'El corre debe tener una @'],
  password: [(value) => value.length >= 6, 'El password debe tener mas de 6 caracteres'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio'],
}

export const RegisterPAge = () => {

  const dispatch = useDispatch();

  const [FormSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector(state => state.auth);
  const isChekingAuthentication = useMemo(() => status === 'cheking', [status]);

  const { FormState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid,
  } = Useform(formData, formValidations);


  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return; //si no es valido el form, no hagas nada para que no mande al back string vacio
    dispatch(startCreatingUserByEmailPassword(FormState));//despacho mi funcion para crear usuarios y le mando el formstate que tiene toda mi data de registro

    console.log(FormState);
  }

  return (

    <AuthLayout title='Crear Cuenta'> {/* tema de la app */}

      <form onSubmit={handleSubmit} className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}> {/* 12 para que ocupe 12 posiciones como normalmente es en css */}
            <TextField
              label="Nombre completo"
              type='text'
              placeholder='KAruchita'
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && FormSubmitted}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="correo"
              type='email'
              placeholder='correo@google.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && FormSubmitted}
              helperText={emailValid}

            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="contraseña"
              type='password'
              placeholder='Contraseña'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && FormSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            <Grid 
            item 
            xs={12}
            display={!!errorMessage ? '': 'none'} 
            >
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12} >
              <Button
                disabled={isChekingAuthentication}
                type='submit'
                variant='contained'
                fullWidth
              >
                Crear cuenta
              </Button>


            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to="/auth/login">
              ingresar
            </Link>
          </Grid>

        </Grid>

      </form>

    </AuthLayout>

  )
}

