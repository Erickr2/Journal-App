import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { ChekingAuth } from '../ui/components/chekingAuth'
import { useChekAuth } from '../hooks'

//Ruter principal. defino la estructura de mis rutas. AuthRoutes: tiene la ruta de login y registro,  JournalRoutes: tiene la pagina de journal

export const AppRouter = () => {

  //extraigo el estado de la funcion que verifica el estado de mi autenticacion
  const status = useChekAuth();
  //si mi estado esta en cheking manda el componente de carga
  if (status === 'cheking') {
    return <ChekingAuth />
  }

  return (
    <Routes>
      {
        //con ayuda del ternario condiciono que rutas mostrar si el usuario esta autenticado
        (status === 'Authenticated') ?
          <Route path='/*' element={<JournalRoutes />} /> :
          <Route path='/auth/*' element={<AuthRoutes />} />
      }
      {/* cualquie otra ruta que no se encuentre definida navega a login */}
      <Route path='/*' element={<Navigate to='/auth/login' />} />


    </Routes>
  )
}

