import React from 'react';
import { Link } from 'react-router-dom';
import './SideDrawer.css';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const styles = {
  drawer: (isOpen: boolean) => ({
    position: 'fixed' as const,
    top: 0,
    left: 0,
    height: '100vh',
    width: '250px',
    backgroundColor: '#fff',
    boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s ease-in-out',
    zIndex: 1000,
  }),
  overlay: (isOpen: boolean) => ({
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? ('visible' as const) : ('hidden' as const),
    transition: 'opacity 0.3s ease-in-out',
    zIndex: 999,
  }),
  menuList: {
    padding: '2rem 1rem',
    listStyle: 'none',
  },
  menuItem: {
    marginBottom: '1rem',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '1.1rem',
    display: 'block',
    padding: '0.5rem',
    transition: 'all 0.2s',
  },
};

export const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <div style={styles.overlay(isOpen)} onClick={onClose} />
      <div style={styles.drawer(isOpen)}>
        <nav>
          <ul style={styles.menuList}>
            <li style={styles.menuItem} className="menu-item">
              <Link to="/" style={styles.link} onClick={onClose}>
                Home
              </Link>
            </li>
            <li style={styles.menuItem} className="menu-item">
              <Link to="/bucket-list" style={styles.link} onClick={onClose}>
                S3 Bucket List
              </Link>
            </li>
            <li style={styles.menuItem} className="menu-item">
              <Link to="/user-info" style={styles.link} onClick={onClose}>
                User Info
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
