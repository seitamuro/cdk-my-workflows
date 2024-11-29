import { AuthProvider } from '@/components/auth/AuthProvider';
import { NavigationBar } from '@/components/NavigationBar';
import { BucketListPage } from '@/pages/BucketListPage';
import { ConfirmPage } from '@/pages/ConfirmPage';
import { HomePage } from '@/pages/HomePage';
import { SignInPage } from '@/pages/SignInPage';
import { SignOutPage } from '@/pages/SignOutPage';
import { SignUpPage } from '@/pages/SignUpPage';
import { UserInfoPage } from '@/pages/UserInfoPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signout" element={<SignOutPage />} />
          <Route path="/confirm" element={<ConfirmPage />} />
          <Route path="/user" element={<UserInfoPage />} />
          <Route path="/buckets" element={<BucketListPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
