"use client";

import React, { useState, useEffect } from 'react';
import { useDarkMode } from './DarkModeProvider';
import styles from './KebabMenu.module.css';
import toggleStyles from './DarkModeToggle.module.css';

const KebabMenu: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showMenu) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMenu]);

  const handleToggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleDarkModeToggle = () => {
    toggleDarkMode();
    setShowMenu(false);
  };

  return (
    <div className={styles.kebabContainer}>
      {/* Kebab Menu Button */}
      <button
        onClick={handleToggleMenu}
        className={`${styles.kebabButton} ${isDarkMode ? styles.dark : ''}`}
        aria-label="Menu"
        suppressHydrationWarning
      >
        <div className={styles.kebabLines}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
      </button>
      
      {/* Dropdown Menu */}
      {showMenu && (
        <div className={`${styles.dropdownMenu} ${isDarkMode ? styles.dark : styles.light}`} suppressHydrationWarning>
          <button
            onClick={handleDarkModeToggle}
            className={`${toggleStyles.toggleButton} ${isDarkMode ? toggleStyles.dark : toggleStyles.light}`}
          >
            <span className={toggleStyles.toggleIcon}>
              {isDarkMode ? '☀️' : '🌙'}
            </span>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      )}
    </div>
  );
};

export default KebabMenu;
