"use client";

import React from 'react';
import { useDarkMode } from '../../components/DarkModeProvider';
import styles from './page.module.css';

const CourtRoomPage = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : styles.light}`}>
      <h1 className={`${styles.title} ${isDarkMode ? styles.dark : styles.light}`}>Court Room</h1>
      <div className={`${styles.content} ${isDarkMode ? styles.dark : styles.light}`}>
        <p className={`${styles.simpleText} ${isDarkMode ? styles.dark : styles.light}`}>
          This page is under development.
        </p>
      </div>
    </div>
  );
};

export default CourtRoomPage;
