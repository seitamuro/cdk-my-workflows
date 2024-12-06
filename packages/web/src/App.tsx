import { AuthProvider } from '@/components/auth/AuthProvider';
import { NavigationBar } from '@/components/NavigationBar';
import { BucketListPage } from '@/pages/BucketListPage';
import { ConfirmPage } from '@/pages/ConfirmPage';
import { HomePage } from '@/pages/HomePage';
import { SignInPage } from '@/pages/SignInPage';
import { SignOutPage } from '@/pages/SignOutPage';
import { SignUpPage } from '@/pages/SignUpPage';
import { UserInfoPage } from '@/pages/UserInfoPage';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import { S3UploadPage } from './pages/S3UploadPage';

const App = () => {
  return (
    <AuthProvider>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signout" element={<SignOutPage />} />
        <Route path="/confirm" element={<ConfirmPage />} />
        <Route path="/user-info" element={<UserInfoPage />} />
        <Route path="/bucket-list" element={<BucketListPage />} />
        <Route path="/s3-upload" element={<S3UploadPage />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
