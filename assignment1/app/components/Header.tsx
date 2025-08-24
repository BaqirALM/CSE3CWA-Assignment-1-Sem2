"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { useDarkMode } from './DarkModeProvider';
import styles from './Header.module.css';
import KebabMenu from './KebabMenu';

const Header = () => {
  const { isDarkMode } = useDarkMode();
  const pathname = usePathname();

  // Function to determine if a link is active
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname === path;
  };

  return (
    <header className={`${styles.header} ${isDarkMode ? styles.dark : styles.light}`} suppressHydrationWarning>
      <div className={styles.headerContent}>
        <div className={`${styles.studentId} ${isDarkMode ? styles.dark : styles.light}`} suppressHydrationWarning>
          Student ID: 21612428
        </div>
        <h1 className={`${styles.title} ${isDarkMode ? styles.dark : styles.light}`} suppressHydrationWarning>
          Assignment 1 CSE3CWA
        </h1>
        <nav className={styles.navigation}>
          <a 
            href="/" 
            className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
          >
            Tabs
          </a>
          <a 
            href="/pages/about" 
            className={`${styles.navLink} ${isActive('/pages/about') ? styles.active : ''}`}
          >
            About
          </a>
          <a 
            href="/pages/escape-room" 
            className={`${styles.navLink} ${isActive('/pages/escape-room') ? styles.active : ''}`}
          >
            Escape Room
          </a>
          <a 
            href="/coding-races" 
            className={`${styles.navLink} ${isActive('/coding-races') ? styles.active : ''}`}
          >
            Coding Races
          </a>
          <a 
            href="/pages/court-room" 
            className={`${styles.navLink} ${isActive('/pages/court-room') ? styles.active : ''}`}
          >
            Court Room
          </a>
        </nav>
        <div className={styles.kebabMenuContainer}>
          <KebabMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;