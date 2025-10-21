"use client";
import React from 'react';
import { useDarkMode } from '../../components/DarkModeProvider'; 
import styles from './page.module.css';

const stages = [
  {
    id: 1,
    title: 'Stage 1: The First Hurdle',
    description: 'To begin, you must prove your worth by formatting this code correctly. Proper indentation is key.',
    puzzle: 'function hello() {\nconsole.log("Hello, World!");\n}',
    solution: 'function hello() {\n  console.log("Hello, World!");\n}',
  },
  {
    id: 2,
    title: 'Stage 2: The Syntax Scramble',
    description: 'The syntax of this code is incorrect, preventing it from running. Fix the syntax to reveal the next clue.',
    puzzle: 'let message = "You are one step closer; \nconsole.log(message)',
    solution: 'let message = "You are one step closer"; \nconsole.log(message);',
  },
  {
    id: 3,
    title: 'Stage 3: The Final Gate',
    description: 'Write a function to generate numbers from 0 to 10. This is the final key to your escape.',
    puzzle: '// Your code here',
    solution: 'for (let i = 0; i <= 10; i++) {\n  console.log(i);\n}',
  },
];

const EscapeRoomPage = () => {
  const { isDarkMode } = useDarkMode();
  const [timeLeft, setTimeLeft] = React.useState(600);
  const [isActive, setIsActive] = React.useState(false);
  const [currentStage, setCurrentStage] = React.useState(0);
  const [userCode, setUserCode] = React.useState(stages[0].puzzle);

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if(interval) clearInterval(interval);
      alert("Time's up! You have failed to escape.");
    }
    return () => {
      if(interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const handleTimerToggle = () => {
    setIsActive(!isActive);
  };

  const handleTimerReset = () => {
    setIsActive(false);
    setTimeLeft(600);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    // Normalize by removing all whitespace for a more flexible comparison
    const normalizedUserCode = userCode.replace(/\s/g, '');
    const normalizedSolution = stages[currentStage].solution.replace(/\s/g, '');

    if (normalizedUserCode === normalizedSolution) {
      if (currentStage < stages.length - 1) {
        alert('Correct! Proceed to the next stage.');
        const nextStage = currentStage + 1;
        setCurrentStage(nextStage);
        setUserCode(stages[nextStage].puzzle);
      } else {
        alert('Congratulations! You have escaped!');
        setIsActive(false);
      }
    } else {
      alert('Incorrect. Please try again.');
    }
  };

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : styles.light}`}>
      <h1 className={`${styles.title} ${isDarkMode ? styles.dark : styles.light}`}>Escape Room</h1>
      
      <div className={`${styles.timerContainer} ${isDarkMode ? styles.dark : styles.light}`}>
        <div className={styles.timerDisplay}>{formatTime(timeLeft)}</div>
        <div className={styles.timerControls}>
          <button onClick={handleTimerToggle} className={styles.button}>
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button onClick={handleTimerReset} className={styles.button}>
            Reset
          </button>
        </div>
      </div>

      <div className={`${styles.content} ${isDarkMode ? styles.dark : styles.light}`}>
        <h2 className={styles.stageTitle}>{stages[currentStage].title}</h2>
        <p className={styles.stageDescription}>{stages[currentStage].description}</p>
        
        <textarea
          className={`${styles.codeInput} ${isDarkMode ? styles.dark : styles.light}`}
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
        />

        <button onClick={handleSubmit} className={styles.submitButton}>
          Submit Code
        </button>
      </div>
    </div>
  );
};

export default EscapeRoomPage;