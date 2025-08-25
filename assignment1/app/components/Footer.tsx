"use client";

import React, { useState, useEffect } from 'react';
import { useDarkMode } from './DarkModeProvider';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const [currentYear, setCurrentYear] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Only set these values on the client side
    setCurrentYear(new Date().getFullYear().toString());
    setCurrentDate(new Date().toLocaleDateString('en-AU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }));
  }, []);

  return (
    <footer className={`${styles.footer} ${isDarkMode ? styles.dark : styles.light}`}>
      <div className={styles.footerContent}>
        <div className={styles.mainInfo}>
          Copyright © {currentYear || '2025'} | Baqir Al Musawi | 21612428 | {currentDate || '25/08/2025'}
        </div>
        <div className={styles.cookieNotice}>
          This website uses cookies for navigation
        </div>
      </div>
    </footer>
  );
};

export default Footer;