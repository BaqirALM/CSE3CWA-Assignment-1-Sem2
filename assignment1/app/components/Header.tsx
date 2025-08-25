"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useDarkMode } from './DarkModeProvider';
import styles from './Header.module.css';
import KebabMenu from './KebabMenu';

const Header = () => {
  const { isDarkMode } = useDarkMode();
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState('');

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname === path;
  };

  // Handle navigation click
  const handleNavClick = (path: string) => {
    let pageName = '';
    if (path === '/') pageName = 'tabs';
    else if (path === '/pages/about') pageName = 'about';
    else if (path === '/pages/escape-room') pageName = 'escape-room';
    else if (path === '/coding-races') pageName = 'coding-races';
    else if (path === '/pages/court-room') pageName = 'court-room';
    
    setCurrentPage(pageName);
  };

  useEffect(() => {
    let pageName = '';
    if (pathname === '/') pageName = 'tabs';
    else if (pathname === '/pages/about') pageName = 'about';
    else if (pathname === '/pages/escape-room') pageName = 'escape-room';
    else if (pathname === '/coding-races') pageName = 'coding-races';
    else if (pathname === '/pages/court-room') pageName = 'court-room';
    
    if (pageName) {
      setCurrentPage(pageName);
    }
  }, [pathname]);

  const buildClassName = (baseClass: string, isActive: boolean) => {
    return isActive ? `${baseClass} ${styles.active}` : baseClass;
  };

  return (
    <header className={`${styles.header} ${isDarkMode ? styles.dark : ''}`} suppressHydrationWarning>
      <div className={styles.headerContent}>
        <div className={`${styles.studentId} ${isDarkMode ? styles.dark : ''}`} suppressHydrationWarning>
          Student ID: 21612428
        </div>
        <h1 className={`${styles.title} ${isDarkMode ? styles.dark : ''}`} suppressHydrationWarning>
          Assignment 1 CSE3CWA
        </h1>
        <nav className={styles.navigation}>
          <a 
            href="/" 
            className={buildClassName(styles.navLink, isActive('/'))}
            onClick={() => handleNavClick('/')}
          >
            Tabs
          </a>
          <a 
            href="/pages/about" 
            className={buildClassName(styles.navLink, isActive('/pages/about'))}
            onClick={() => handleNavClick('/pages/about')}
          >
            About
          </a>
          <a 
            href="/pages/escape-room" 
            className={buildClassName(styles.navLink, isActive('/pages/escape-room'))}
            onClick={() => handleNavClick('/pages/escape-room')}
          >
            Escape Room
          </a>
          <a 
            href="/coding-races" 
            className={buildClassName(styles.navLink, isActive('/coding-races'))}
            onClick={() => handleNavClick('/coding-races')}
          >
            Coding Races
          </a>
          <a 
            href="/pages/court-room" 
            className={buildClassName(styles.navLink, isActive('/pages/court-room'))}
            onClick={() => handleNavClick('/pages/court-room')}
          >
            Court Room
          </a>
        </nav>
        <div className={styles.kebabMenuContainer}>
          <KebabMenu />
        </div>
        
        {/* Current page indicator */}
        {currentPage && (
          <div className={styles.pageStatus}>
            <small style={{ color: '#666', fontSize: '0.7rem' }}>
              Page: {currentPage}
            </small>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;