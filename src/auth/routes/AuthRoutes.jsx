import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage, RegisterPAge } from "../pages"

//ruta de auth 

export const AuthRoutes = () => {
  return (
    <Routes>

        <Route path="login" element={<LoginPage />}/>
        <Route path="register" element={<RegisterPAge />}/>

        <Route path="/*" element={<Navigate to={"/auth/login"} />}/> {/* cualquier otra ruta que no esta definida navega a login */}
    </Routes>
  )
}

