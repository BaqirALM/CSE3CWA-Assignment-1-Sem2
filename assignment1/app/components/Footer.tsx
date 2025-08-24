"use client";

import React from 'react';
import { useDarkMode } from './DarkModeProvider';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  // Use a consistent date format to avoid hydration mismatch
  const currentDate = new Date().toISOString().split('T')[0].split('-').reverse().join('/');
  const { isDarkMode } = useDarkMode();

  return (
    <footer className={`${styles.footer} ${isDarkMode ? styles.dark : styles.light}`} suppressHydrationWarning>
      Copyright © {currentYear} | Baqir Al Musawi | 21612428 | <span suppressHydrationWarning>{currentDate}</span>
    </footer>
  );
};

export default Footer;