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
          
          {/* Quick usage guide */}
          <div className={styles.usageGuide}>
            <h3 className={styles.usageTitle}>Quick Start:</h3>
            <ul className={styles.usageList}>
              <li>Navigate to the <strong>Coding Races</strong> page to start coding challenges</li>
              <li>Use the <strong>Escape Room</strong> for interactive problem-solving</li>
              <li>Check the <strong>Court Room</strong> for legal-themed coding scenarios</li>
              <li>Explore the <strong>Tabs</strong> for generating code you may click on the sections and then click on the code you want to generate</li>
              <li>Switch between light and dark themes using the top righttoggle in the header</li>
            </ul>
          </div>
          
          <div className={styles.videoContainer}>
            <iframe
              className={styles.video}
              src="https://www.youtube.com/embed/D85kHCWnhco"
              title="Website Walkthrough Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
