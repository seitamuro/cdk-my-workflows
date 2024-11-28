import React from 'react';
import { Link } from 'react-router-dom';
import { useMyAuth } from '../hooks/useMyAuth';
import { SignInButton } from './auth/SignInButton';
import { SignOutButton } from './auth/SignOutButton';

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    position: "sticky",
    top: 0,
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    width: '100%',
  },
  appName: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
  },
  authSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  userInfo: {
    fontSize: '1rem',
    color: '#666',
  },
} as const;

export const NavigationBar: React.FC = () => {
  const { isAuthenticated, userId } = useMyAuth();

  return (
    <nav style={styles.navbar}>
      <Link to="/"><h1 style={styles.appName}>My Workflows</h1></Link>
      <div style={styles.authSection}>
        {isAuthenticated ? (
          <>
            <span style={styles.userInfo}>User ID: {userId}</span>
            <SignOutButton />
          </>
        ) : (
          <SignInButton username="" password="" />
        )}
      </div>
    </nav>
  );
};
