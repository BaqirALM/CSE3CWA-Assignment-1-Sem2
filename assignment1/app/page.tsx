"use client";

import React, { useState, useEffect } from 'react';
import { useDarkMode } from './components/DarkModeProvider';
import styles from './page.module.css';

// Local Storage utility functions
const saveTabsToStorage = (tabs: any[], activeTab: number) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tabs', JSON.stringify(tabs));
    localStorage.setItem('activeTab', activeTab.toString());
  }
};

const loadTabsFromStorage = () => {
  if (typeof window !== 'undefined') {
    const savedTabs = localStorage.getItem('tabs');
    const savedActiveTab = localStorage.getItem('activeTab');
    
    if (savedTabs) {
      return {
        tabs: JSON.parse(savedTabs),
        activeTab: savedActiveTab ? parseInt(savedActiveTab) : 1
      };
    }
  }
  return null;
};

const HomePage = () => {
  const { isDarkMode } = useDarkMode();
  const [tabs, setTabs] = useState([
    { id: 1, title: 'Section 1', content: '' }
  ]);
  const [activeTab, setActiveTab] = useState(1);
  const [output, setOutput] = useState('');

  // Load tabs from Local Storage on component mount
  useEffect(() => {
    const savedData = loadTabsFromStorage();
    if (savedData) {
      setTabs(savedData.tabs);
      setActiveTab(savedData.activeTab);
    }
  }, []);

  // Save tabs to Local Storage whenever tabs or activeTab changes
  useEffect(() => {
    saveTabsToStorage(tabs, activeTab);
  }, [tabs, activeTab]);

  const addTab = () => {
    const newId = tabs.length > 0 ? Math.max(...tabs.map(tab => tab.id)) + 1 : 1;
    const newTabs = [...tabs, { id: newId, title: `Section ${newId}`, content: '' }];
    setTabs(newTabs);
    setActiveTab(newId);
  };

  const removeTab = (id: number) => {
    if (tabs.length > 1) {
      const newTabs = tabs.filter(tab => tab.id !== id);
      
      // Renumber the remaining tabs in correct order
      const renumberedTabs = newTabs.map((tab, index) => ({
        ...tab,
        id: index + 1,
        title: `Section ${index + 1}`
      }));
      
      setTabs(renumberedTabs);
      const newActiveTab = renumberedTabs[0].id;
      setActiveTab(newActiveTab);
    }
  };

  const updateContent = (id: number, content: string) => {
    const newTabs = tabs.map(tab => tab.id === id ? { ...tab, content } : tab);
    setTabs(newTabs);
  };

  const generateCode = () => {
    const html = `<!DOCTYPE html>
<html>
<head>
    <title>Tabs</title>
    <style>
        body { font-family: Arial; margin: 20px; background: #f0f0f0; }
        .tabs { max-width: 800px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .tab-buttons { display: flex; background: #f8f9fa; border-bottom: 1px solid #ddd; }
        .tab-btn { padding: 12px 20px; border: none; background: transparent; cursor: pointer; }
        .tab-btn.active { background: white; color: #007bff; border-bottom: 2px solid #007bff; }
        .tab-content { padding: 20px; }
        .tab-panel { display: none; }
        .tab-panel.active { display: block; }
    </style>
</head>
<body>
    <div class="tabs">
        <div class="tab-buttons">
            ${tabs.map(tab => `<button class="tab-btn ${tab.id === activeTab ? 'active' : ''}" onclick="showTab(${tab.id})">${tab.title}</button>`).join('')}
        </div>
        <div class="tab-content">
            ${tabs.map(tab => `<div class="tab-panel ${tab.id === activeTab ? 'active' : ''}" id="tab-${tab.id}">${tab.content}</div>`).join('')}
        </div>
    </div>
    <script>
        function showTab(tabId) {
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.getElementById('tab-' + tabId).classList.add('active');
            event.target.classList.add('active');
        }
    </script>
</body>
</html>`;
    
    setOutput(html);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(output);
      alert('Copied!');
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : styles.light}`}>
      <h1 className={`${styles.title} ${isDarkMode ? styles.dark : styles.light}`}>Tabs</h1>
      <p className={`${styles.instruction} ${isDarkMode ? styles.dark : styles.light}`}>
        Add/remove tabs and type your content. Click [+] to add, [×] to remove. 
        <br />
        <small style={{ color: '#666', fontStyle: 'italic' }}>
          Your tabs and content are automatically saved and will be restored when you return to this page.
        </small>
      </p>
      
      <div className={styles.mainContent}>
        {/* Left - Input */}
        <div className={`${styles.leftSection} ${isDarkMode ? styles.dark : styles.light}`}>
          <div className={styles.tabInterface}>
            {tabs.map(tab => (
              <div 
                key={tab.id} 
                className={`${styles.tabHeader} ${isDarkMode ? styles.dark : styles.light} ${activeTab === tab.id ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab.id)}
                style={{ cursor: 'pointer' }}
              >
                <span>{tab.title}</span>
                <button 
                  className={styles.removeBtn}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent tab switching when clicking remove
                    removeTab(tab.id);
                  }}
                  disabled={tabs.length === 1}
                >×</button>
              </div>
            ))}
            <button className={styles.addBtn} onClick={addTab}>+</button>
          </div>
          
          <textarea
            className={`${styles.codeInput} ${isDarkMode ? styles.dark : styles.light}`}
            value={tabs.find(tab => tab.id === activeTab)?.content || ''}
            onChange={(e) => updateContent(activeTab, e.target.value)}
            placeholder="Type your HTML, JS, or CSS here..."
          />
          
          <button className={styles.generateBtn} onClick={generateCode}>
            Generate HTML
          </button>
        </div>

        {/* Right - Output */}
        <div className={`${styles.rightSection} ${isDarkMode ? styles.dark : styles.light}`}>
          <h3 className={`${styles.sectionTitle} ${isDarkMode ? styles.dark : styles.light}`}>Generated HTML5 Output</h3>
          <textarea
            className={`${styles.codeOutput} ${isDarkMode ? styles.dark : styles.light}`}
            value={output}
            readOnly
            placeholder="Generated code will appear here..."
          />
          <button 
            className={styles.copyBtn} 
            onClick={copyCode}
            disabled={!output}
          >
            Copy Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;