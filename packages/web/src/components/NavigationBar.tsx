import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMyAuth } from '../hooks/useMyAuth';
import { SignOutButton } from './auth/SignOutButton';
import { SideDrawer } from './SideDrawer';

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'sticky' as const,
    top: 0,
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    width: '100%',
    zIndex: 100,
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
  menuButton: {
    background: 'none',
    border: 'none',
    padding: '0.5rem',
    cursor: 'pointer',
    marginRight: '1rem',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
    width: '24px',
    height: '20px',
  },
  menuLine: {
    width: '100%',
    height: '2px',
    backgroundColor: '#333',
    transition: 'all 0.3s ease',
  },
};

export const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userId } = useMyAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <nav style={styles.navbar}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={toggleDrawer} style={styles.menuButton}>
            <div style={styles.menuLine}></div>
            <div style={styles.menuLine}></div>
            <div style={styles.menuLine}></div>
          </button>
          <Link to="/"><h1 style={styles.appName}>My Workflows</h1></Link>
        </div>
        <div style={styles.authSection}>
          {isAuthenticated ? (
            <>
              <span style={styles.userInfo}>User ID: {userId}</span>
              <SignOutButton />
            </>
          ) : (
            <button onClick={() => navigate('/signin')}>Sign In</button>
          )}
        </div>
      </nav>
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};
