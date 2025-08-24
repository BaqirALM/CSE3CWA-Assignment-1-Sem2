"use client";

import React, { useState } from 'react';
import styles from './page.module.css';

const TabsPage = () => {
  const [tabs, setTabs] = useState([
    { id: 1, title: 'Section 1', content: '' }
  ]);
  const [activeTab, setActiveTab] = useState(1);
  const [output, setOutput] = useState('');

  const addTab = () => {
    const newId = Math.max(...tabs.map(tab => tab.id)) + 1;
    setTabs([...tabs, { id: newId, title: `Section ${newId}`, content: '' }]);
    setActiveTab(newId);
  };

  const removeTab = (id: number) => {
    if (tabs.length > 1) {
      const newTabs = tabs.filter(tab => tab.id !== id);
      setTabs(newTabs);
      setActiveTab(newTabs[0].id);
    }
  };

  const updateContent = (id: number, content: string) => {
    setTabs(tabs.map(tab => tab.id === id ? { ...tab, content } : tab));
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
    <div className={styles.container}>
      <h1 className={styles.title}>Tabs</h1>
      <p className={styles.instruction}>Add/remove tabs and type your content. Click [+] to add, [×] to remove.</p>
      
      <div className={styles.mainContent}>
        {/* Left - Input */}
        <div className={styles.leftSection}>
          <div className={styles.tabInterface}>
            {tabs.map(tab => (
              <div key={tab.id} className={styles.tabHeader}>
                <span>{tab.title}</span>
                <button 
                  className={styles.removeBtn}
                  onClick={() => removeTab(tab.id)}
                  disabled={tabs.length === 1}
                >×</button>
              </div>
            ))}
            <button className={styles.addBtn} onClick={addTab}>+</button>
          </div>
          
          <textarea
            className={styles.codeInput}
            value={tabs.find(tab => tab.id === activeTab)?.content || ''}
            onChange={(e) => updateContent(activeTab, e.target.value)}
            placeholder="Type your HTML, JS, or CSS here..."
          />
          
          <button className={styles.generateBtn} onClick={generateCode}>
            Generate HTML
          </button>
        </div>

        {/* Right - Output */}
        <div className={styles.rightSection}>
          <h3>Generated HTML5 Output</h3>
          <textarea
            className={styles.codeOutput}
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

export default TabsPage;
