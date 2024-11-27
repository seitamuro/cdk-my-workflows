import { Route, Routes } from 'react-router-dom'
import './App.css'
import { SignUp } from './components/SignUp'
import { HomePage } from './pages/HomePage'

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

export default App
