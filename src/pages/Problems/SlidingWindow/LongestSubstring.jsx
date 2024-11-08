// src/pages/Problems/SlidingWindow/LongestSubstring.jsx
import React, { useState } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';

const LongestSubstring = () => {
  const [input, setInput] = useState("abcabcbb");
  const [currentWindow, setCurrentWindow] = useState([]);
  const [maxWindow, setMaxWindow] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState('javascript');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setCurrentWindow([]);
    setMaxWindow([]);
    setCurrentIndex(-1);
  };

  const findLongestSubstring = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();
    
    let left = 0;
    let maxLength = 0;
    const seen = new Map();
    
    for (let right = 0; right < input.length; right++) {
      setCurrentIndex(right);
      const char = input[right];
      
      if (seen.has(char) && seen.get(char) >= left) {
        left = seen.get(char) + 1;
      }
      
      seen.set(char, right);
      const currentSubstring = input.slice(left, right + 1);
      setCurrentWindow([...currentSubstring]);
      
      if (currentSubstring.length > maxLength) {
        maxLength = currentSubstring.length;
        setMaxWindow([...currentSubstring]);
      }
      
      await sleep(speed);
    }
    
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function lengthOfLongestSubstring(s) {
    let maxLength = 0;
    let left = 0;
    const seen = new Map();
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        if (seen.has(char) && seen.get(char) >= left) {
            left = seen.get(char) + 1;
        }
        seen.set(char, right);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}`,
    python: `
def lengthOfLongestSubstring(s: str) -> int:
    max_length = 0
    left = 0
    seen = {}
    
    for right, char in enumerate(s):
        if char in seen and seen[char] >= left:
            left = seen[char] + 1
        seen[char] = right
        max_length = max(max_length, right - left + 1)
    
    return max_length`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Longest Substring Without Repeating Characters</h1>
        <div className="problem-meta">
          <span className="difficulty medium">Medium</span>
          <span className="category">Sliding Window</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          Given a string s, find the length of the longest substring without repeating characters.
        </p>
      </section>

      <section className="examples">
        <h2>Examples</h2>
        <pre>
          {`Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.`}
        </pre>
      </section>

      <section className="visualization">
        <div className="string-visualizer">
          {input.split('').map((char, idx) => (
            <span 
              key={idx}
              className={`char ${
                idx === currentIndex ? 'current' :
                currentWindow.includes(char) ? 'in-window' : ''
              }`}
            >
              {char}
            </span>
          ))}
        </div>
        
        <div className="window-display">
          <div>Current Window: {currentWindow.join('')}</div>
          <div>Max Window: {maxWindow.join('')} (Length: {maxWindow.length})</div>
        </div>

        <div className="controls">
          <div className="input-group">
            <label>Input String:</label>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isRunning}
            />
          </div>
          <div className="input-group">
            <label>Animation Speed (ms):</label>
            <input
              type="range"
              min="100"
              max="1000"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
          </div>
          <div className="button-group">
            <button onClick={findLongestSubstring} disabled={isRunning}>
              Find Longest Substring
            </button>
            <button onClick={resetVisualization} disabled={isRunning}>
              Reset
            </button>
          </div>
        </div>
      </section>

      <section className="approach">
        <h2>Approach</h2>
        <div className="approach-content">
          <h3>Sliding Window Solution</h3>
          <ol>
            <li>Use two pointers (left and right) to define the window</li>
            <li>Use a Map to store character positions</li>
            <li>When finding a duplicate, move left pointer past the previous occurrence</li>
            <li>Keep track of maximum window length</li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(n) where n is the length of the string</p>
          
          <h3>Space Complexity</h3>
          <p>O(min(m, n)) where m is the size of the character set</p>
        </div>
      </section>

      <section className="implementation">
        <h2>Implementation</h2>
        <div className="language-selector">
          <button 
            onClick={() => setLanguage('javascript')}
            className={`lang-button ${language === 'javascript' ? 'active' : ''}`}
          >
            JavaScript
          </button>
          <button 
            onClick={() => setLanguage('python')}
            className={`lang-button ${language === 'python' ? 'active' : ''}`}
          >
            Python
          </button>
        </div>
        <CodeSnippet 
          language={language}
          code={implementations[language]}
        />
      </section>
    </div>
  );
};

export default LongestSubstring;