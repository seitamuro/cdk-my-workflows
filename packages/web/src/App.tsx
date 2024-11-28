import { Route, Routes } from 'react-router-dom'
import './App.css'
import { NavigationBar } from './components/NavigationBar'
import { BucketListPage } from './pages/BucketListPage'
import { HomePage } from './pages/HomePage'
import { SignInPage } from './pages/SignInPage'
import { SignOutPage } from './pages/SignOutPage'
import { SignUpPage } from './pages/SignUpPage'

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signout" element={<SignOutPage />} />
        <Route path="/bucket-list" element={<BucketListPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
