
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './assets/style/main.css'
import { Register } from './pages/Register'

function App() {
  return (
    <Router>
        <Routes>
          <Route element={<Register/>} path='/' />
        </Routes>

    </Router>
  )
}

export default App
