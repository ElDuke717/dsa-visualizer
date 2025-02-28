import React, { useState } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';

const MaxVowels = () => {
  const [input, setInput] = useState("abciiidef");
  const [k, setK] = useState(3);
  const [currentWindow, setCurrentWindow] = useState([]);
  const [maxWindow, setMaxWindow] = useState([]);
  const [currentVowelCount, setCurrentVowelCount] = useState(0);
  const [maxVowelCount, setMaxVowelCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState('javascript');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const isVowel = (char) => {
    return ['a', 'e', 'i', 'o', 'u'].includes(char.toLowerCase());
  };

  const resetVisualization = () => {
    setCurrentWindow([]);
    setMaxWindow([]);
    setCurrentVowelCount(0);
    setMaxVowelCount(0);
    setCurrentIndex(-1);
  };

  const findMaxVowels = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();
    
    let maxCount = 0;
    let count = 0;
    
    // Count vowels in the first window of size k
    for (let i = 0; i < Math.min(k, input.length); i++) {
      setCurrentIndex(i);
      if (isVowel(input[i])) {
        count++;
      }
      const currentSubstring = input.slice(0, i + 1);
      setCurrentWindow([...currentSubstring]);
      setCurrentVowelCount(count);
      
      await sleep(speed);
    }
    
    maxCount = count;
    setMaxVowelCount(maxCount);
    setMaxWindow([...input.slice(0, k)]);
    
    // Slide the window
    for (let i = k; i < input.length; i++) {
      setCurrentIndex(i);
      
      // Remove the leftmost character from the count
      if (isVowel(input[i - k])) {
        count--;
      }
      
      // Add the rightmost character to the count
      if (isVowel(input[i])) {
        count++;
      }
      
      const currentSubstring = input.slice(i - k + 1, i + 1);
      setCurrentWindow([...currentSubstring]);
      setCurrentVowelCount(count);
      
      // Update max count if needed
      if (count > maxCount) {
        maxCount = count;
        setMaxVowelCount(maxCount);
        setMaxWindow([...currentSubstring]);
      }
      
      await sleep(speed);
    }
    
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
function maxVowels(s, k) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    let maxCount = 0;
    let count = 0;
    
    // Count vowels in the first window of size k
    for (let i = 0; i < k; i++) {
        if (vowels.has(s[i])) {
            count++;
        }
    }
    
    maxCount = count;
    
    // Slide the window
    for (let i = k; i < s.length; i++) {
        // Remove the leftmost character from the count
        if (vowels.has(s[i - k])) {
            count--;
        }
        
        // Add the rightmost character to the count
        if (vowels.has(s[i])) {
            count++;
        }
        
        // Update max count if needed
        maxCount = Math.max(maxCount, count);
    }
    
    return maxCount;
}`,
    python: `
class Solution:
    def maxVowels(self, s: str, k: int) -> int:
        vowels = set(['a', 'e', 'i', 'o', 'u'])
        max_count = 0
        count = 0
        
        # Count vowels in the first window of size k
        for i in range(min(k, len(s))):
            if s[i] in vowels:
                count += 1
        
        max_count = count
        
        # Slide the window
        for i in range(k, len(s)):
            # Remove the leftmost character from the count
            if s[i - k] in vowels:
                count -= 1
            
            # Add the rightmost character to the count
            if s[i] in vowels:
                count += 1
            
            # Update max count if needed
            max_count = max(max_count, count)
        
        return max_count`,
    java: `
class Solution {
    public int maxVowels(String s, int k) {
        Set<Character> vowels = Set.of('a', 'e', 'i', 'o', 'u');
        int maxCount = 0;
        int count = 0;
        
        // Count vowels in the first window of size k
        for (int i = 0; i < k && i < s.length(); i++) {
            if (vowels.contains(s.charAt(i))) {
                count++;
            }
        }
        
        maxCount = count;
        
        // Slide the window
        for (int i = k; i < s.length(); i++) {
            // Remove the leftmost character from the count
            if (vowels.contains(s.charAt(i - k))) {
                count--;
            }
            
            // Add the rightmost character to the count
            if (vowels.contains(s.charAt(i))) {
                count++;
            }
            
            // Update max count if needed
            maxCount = Math.max(maxCount, count);
        }
        
        return maxCount;
    }
}`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Maximum Number of Vowels in a Substring of Given Length</h1>
        <div className="problem-meta">
          <span className="difficulty medium">Medium</span>
          <span className="category">Sliding Window</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          Given a string <code>s</code> and an integer <code>k</code>, return the maximum number of vowel letters in any substring of <code>s</code> with length <code>k</code>.
        </p>
        <p>
          Vowel letters in English are 'a', 'e', 'i', 'o', and 'u'.
        </p>
      </section>

      <section className="examples">
        <h2>Examples</h2>
        <pre>
          {`Example 1:
Input: s = "abciiidef", k = 3
Output: 3
Explanation: The substring "iii" contains 3 vowel letters.

Example 2:
Input: s = "aeiou", k = 2
Output: 2
Explanation: Any substring of length 2 contains 2 vowels.

Example 3:
Input: s = "leetcode", k = 3
Output: 2
Explanation: "lee", "eet" and "tco" contain 2 vowels.`}
        </pre>
      </section>

      <section className="visualization">
        <div className="string-visualizer">
          {input.split('').map((char, idx) => (
            <span 
              key={idx}
              className={`char ${
                idx === currentIndex ? 'current' :
                currentWindow.includes(input[idx]) ? 'in-window' : ''
              }`}
            >
              {char}
            </span>
          ))}
        </div>
        
        <div className="window-display">
          <div>Current Window: {currentWindow.join('')} (Vowels: {currentVowelCount})</div>
          <div>Max Vowels Window: {maxWindow.join('')} (Vowels: {maxVowelCount})</div>
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
            <label>Window Size (k):</label>
            <input
              type="number"
              min="1"
              value={k}
              onChange={(e) => setK(parseInt(e.target.value) || 1)}
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
            <button onClick={findMaxVowels} disabled={isRunning}>
              Find Max Vowels
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
            <li>Initialize a counter for vowels in the current window</li>
            <li>Count vowels in the first window of size k</li>
            <li>Slide the window through the string:
              <ul>
                <li>Remove the contribution of the character leaving the window</li>
                <li>Add the contribution of the character entering the window</li>
                <li>Update the maximum vowel count if needed</li>
              </ul>
            </li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(n) where n is the length of the string</p>
          
          <h3>Space Complexity</h3>
          <p>O(1) as we only use a fixed amount of space regardless of input size</p>
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
          <button 
            onClick={() => setLanguage('java')}
            className={`lang-button ${language === 'java' ? 'active' : ''}`}
          >
            Java
          </button>
        </div>
        <CodeSnippet 
          language={language === 'java' ? 'java' : language}
          code={implementations[language]}
        />
      </section>
    </div>
  );
};

export default MaxVowels;
