
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
    </Routes>
  )
}

export default App
