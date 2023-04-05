import {Routes, Route} from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'

//Ruter principal. defino la estructura de mis rutas. AuthRoutes: tiene la ruta de login y registro,  JournalRoutes: tiene la pagina de journal

export const AppRouter = () => {
  return (
    <Routes>
        <Route path='/auth/*' element={<AuthRoutes /> } />

        <Route path='/*' element={<JournalRoutes /> }/>
    </Routes>
  )
}

