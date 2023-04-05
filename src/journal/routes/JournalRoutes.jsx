import { Navigate, Route, Routes } from "react-router-dom"
import { JournalPage } from "../pages/JournalPage"

//ruta Journal 

export const JournalRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<JournalPage /> }/>

        <Route path="/*" element={<Navigate to="/" /> }/> {/* cualquier ruta no definida navega al inicio */}

    </Routes>
  )
}

