import { Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './components/auth/AuthProvider'
import { NavigationBar } from './components/NavigationBar'
import { BucketListPage } from './pages/BucketListPage'
import { HomePage } from './pages/HomePage'
import { SignInPage } from './pages/SignInPage'
import { SignOutPage } from './pages/SignOutPage'
import { SignUpPage } from './pages/SignUpPage'
import { UserInfoPage } from './pages/UserInfoPage'

function App() {
  return (
    <AuthProvider>
      <NavigationBar />
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signout" element={<SignOutPage />} />
        <Route path="/bucket-list" element={<BucketListPage />} />
        <Route path="/user-info" element={<UserInfoPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
