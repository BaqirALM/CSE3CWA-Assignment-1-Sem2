"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useDarkMode } from './DarkModeProvider';
import styles from './Header.module.css';
import KebabMenu from './KebabMenu';

const Header = () => {
  const { isDarkMode } = useDarkMode();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('');
  const [isClient, setIsClient] = useState(false);

  // Simple cookie functions - only run on client
  const setCookie = (name: string, value: string, days: number = 7) => {
    if (typeof window === 'undefined') return;
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  const getCookie = (name: string) => {
    if (typeof window === 'undefined') return null;
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (const c of ca) {
      let trimmedC = c;
      while (trimmedC.charAt(0) === ' ') trimmedC = trimmedC.substring(1, trimmedC.length);
      if (trimmedC.startsWith(nameEQ)) return trimmedC.substring(nameEQ.length, trimmedC.length);
    }
    return null;
  };

  // Function to determine if a link is active
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname === path;
  };

  // Handle navigation click and save to cookie
  const handleNavClick = (path: string) => {
    let tabName = '';
    if (path === '/') tabName = 'tabs';
    else if (path === '/pages/about') tabName = 'about';
    else if (path === '/pages/escape-room') tabName = 'escape-room';
    else if (path === '/coding-races') tabName = 'coding-races';
    else if (path === '/pages/court-room') tabName = 'court-room';
    
    setActiveTab(tabName);
    setCookie('activeTab', tabName);
  };

  // Set client flag and load active tab from cookie
  useEffect(() => {
    setIsClient(true);
    const savedTab = getCookie('activeTab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  // Save current page to cookie when pathname changes
  useEffect(() => {
    if (isClient) {
      let tabName = '';
      if (pathname === '/') tabName = 'tabs';
      else if (pathname === '/pages/about') tabName = 'about';
      else if (pathname === '/pages/escape-room') tabName = 'escape-room';
      else if (pathname === '/coding-races') tabName = 'coding-races';
      else if (pathname === '/pages/court-room') tabName = 'court-room';
      
      if (tabName) {
        setActiveTab(tabName);
        setCookie('activeTab', tabName);
      }
    }
  }, [pathname, isClient]);

  // Helper function to build className without nested template literals
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
        
        {/* Simple cookie status indicator - only show on client */}
        {isClient && activeTab && (
          <div className={styles.cookieStatus}>
            <small style={{ color: '#666', fontSize: '0.7rem' }}>
              Active: {activeTab}
            </small>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;