import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme"


//se monta el componente AppRouter que tiene la estructura de mis rutas 

export const JournalApp = () => {
  return (
    <AppTheme> {/* tema de mi App */}
    <AppRouter /> 
    </AppTheme>
  )
}

