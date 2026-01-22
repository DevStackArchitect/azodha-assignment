import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/store';
import { logout } from '@/store/slices/authSlice';
import { resetOnboarding } from '@/store/slices/onboardingSlice';
import { clearLocalStorage } from '@/utils/localStorage';
import { showInfoToast } from '@/utils/toast';
import styles from './style.module.scss';

interface SidebarProps {
  activePage: 'home' | 'profile' | 'favorites' | 'payments';
}

const Sidebar: React.FC<SidebarProps> = ({ activePage }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetOnboarding());
    clearLocalStorage();
    showInfoToast('You have been logged out successfully');
    router.push('/login');
    setIsMobileMenuOpen(false);
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      path: '/home',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 'profile',
      label: 'Profile',
      path: '/profile',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 'favorites',
      label: 'Favorites',
      path: '/favorites',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 'payments',
      label: 'Payments',
      path: '/payments',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z" fill="currentColor" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className={styles.mobileHeader}>
        <div className={styles.mobileLogo}>
          <h1>CLARITY</h1>
        </div>
        <button 
          className={styles.hamburger}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.open : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.open : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.open : ''}`}></span>
        </button>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div 
          className={styles.overlay}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isMobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.logo}>
          <h1>CLARITY</h1>
        </div>

        <nav className={styles.navigation}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.path)}
              className={`${styles.navButton} ${activePage === item.id ? styles.active : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button onClick={handleLogout} className={styles.logoutButton}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="currentColor" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
