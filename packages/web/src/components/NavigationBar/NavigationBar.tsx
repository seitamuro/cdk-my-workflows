import { SideDrawer } from '@/components/SideDrawer';
import { useMyAuth } from '@/hooks/useMyAuth';
import { Menu } from '@mui/icons-material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavigationBar.css';

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'sticky' as const,
    top: 0,
    alignItems: 'center',
    padding: '1rem 0rem',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    width: '100vw',
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
    padding: '0',
    cursor: 'pointer',
    margin: '0rem 1rem',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
    width: '24px',
    height: '20px',
    gap: '1px',
  },
  signInButton: {
    padding: '0.5rem 1rem',
    margin: '0rem 1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    whiteSpace: 'nowrap' as const,
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
};

export const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useMyAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <nav style={styles.navbar}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={toggleDrawer} style={styles.menuButton}>
            <Menu style={{ color: '#333' }} />
          </button>
          <Link to="/">
            <h1 style={styles.appName}>My Workflows</h1>
          </Link>
        </div>
        <div style={styles.authSection}>
          {isAuthenticated ? (
            <button
              className={'hover'}
              onClick={() => navigate('/signout')}
              style={styles.signInButton}
            >
              Sign Out
            </button>
          ) : (
            <button
              className={'hover'}
              onClick={() => navigate('/signin')}
              style={styles.signInButton}
            >
              Sign In
            </button>
          )}
        </div>
      </nav>
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};
