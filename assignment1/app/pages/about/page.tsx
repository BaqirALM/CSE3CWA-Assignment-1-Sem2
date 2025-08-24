"use client";

import React from 'react';
import styles from './page.module.css';

const AboutPage = () => {
  console.log("Hello from AboutPage");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        About This Project
      </h1>
      <div className={styles.content}>
        {/* Video walkthrough */}
        <div>
          <h2 className={styles.sectionTitle}>
            How to Use This Website
          </h2>
          <p className={styles.description}>
            This video provides a walkthrough of the application's features and how to generate code.
          </p>
          <div className={styles.videoContainer}>
            <p className={styles.videoPlaceholder}>Video</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
