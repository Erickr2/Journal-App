import { Navigate, Route, Routes } from "react-router-dom"

export const JournalRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<JournalRoutes /> }/>

        <Route path="/*" element={<Navigate to="/" /> }/>

    </Routes>
  )
}

