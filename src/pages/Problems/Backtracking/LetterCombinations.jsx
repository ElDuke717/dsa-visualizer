// src/pages/Problems/Backtracking/LetterCombinations.jsx
import React, { useState } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';
import './LetterCombinations.css';

const LetterCombinations = () => {
  const [digits, setDigits] = useState('23');
  const [currentCombination, setCurrentCombination] = useState('');
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [allCombinations, setAllCombinations] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState('javascript');

  // Phone keypad mapping
  const digitToLetters = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz'
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setCurrentCombination('');
    setCurrentIndex(-1);
    setAllCombinations([]);
  };

  const findCombinations = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    const combinations = [];

    const backtrack = async (index = 0, current = '') => {
      // Base case: we've processed all digits
      if (index === digits.length) {
        if (current.length > 0) {
          setAllCombinations([...combinations, current]);
          combinations.push(current);
        }
        return;
      }

      // Get the letters corresponding to the current digit
      const letters = digitToLetters[digits[index]] || '';
      
      // Try each letter
      for (let i = 0; i < letters.length; i++) {
        setCurrentIndex(index);
        setCurrentCombination(current + letters[i]);
        await sleep(speed);
        
        // Recursively build combinations
        await backtrack(index + 1, current + letters[i]);
      }
    };

    if (digits.length > 0) {
      await backtrack();
    }
    
    setCurrentIndex(-1);
    setCurrentCombination('');
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function letterCombinations(digits) {
    if (digits.length === 0) return [];
    
    const digitToLetters = {
        '2': 'abc',
        '3': 'def',
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'pqrs',
        '8': 'tuv',
        '9': 'wxyz'
    };
    
    const result = [];
    
    function backtrack(index = 0, current = '') {
        // Base case: we've processed all digits
        if (index === digits.length) {
            result.push(current);
            return;
        }
        
        // Get the letters corresponding to the current digit
        const letters = digitToLetters[digits[index]];
        
        // Try each letter
        for (let i = 0; i < letters.length; i++) {
            // Add the letter to our current combination
            // and move to the next digit
            backtrack(index + 1, current + letters[i]);
        }
    }
    
    backtrack();
    return result;
}`,
    python: `
def letter_combinations(digits):
    if not digits:
        return []
    
    digit_to_letters = {
        '2': 'abc',
        '3': 'def',
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'pqrs',
        '8': 'tuv',
        '9': 'wxyz'
    }
    
    result = []
    
    def backtrack(index=0, current=""):
        # Base case: we've processed all digits
        if index == len(digits):
            result.append(current)
            return
        
        # Get the letters corresponding to the current digit
        letters = digit_to_letters[digits[index]]
        
        # Try each letter
        for letter in letters:
            # Add the letter to our current combination
            # and move to the next digit
            backtrack(index + 1, current + letter)
    
    backtrack()
    return result`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Letter Combinations of a Phone Number</h1>
        <div className="problem-meta">
          <span className="difficulty medium">Medium</span>
          <span className="category">Backtracking</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.
        </p>
        <p>
          A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.
        </p>
        <div className="phone-keypad">
          <div className="keypad-row">
            <div className="key">1</div>
            <div className="key">2 <span className="letters">abc</span></div>
            <div className="key">3 <span className="letters">def</span></div>
          </div>
          <div className="keypad-row">
            <div className="key">4 <span className="letters">ghi</span></div>
            <div className="key">5 <span className="letters">jkl</span></div>
            <div className="key">6 <span className="letters">mno</span></div>
          </div>
          <div className="keypad-row">
            <div className="key">7 <span className="letters">pqrs</span></div>
            <div className="key">8 <span className="letters">tuv</span></div>
            <div className="key">9 <span className="letters">wxyz</span></div>
          </div>
          <div className="keypad-row">
            <div className="key">*</div>
            <div className="key">0</div>
            <div className="key">#</div>
          </div>
        </div>
        <p>
          Example: Input: digits = "23"<br />
          Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
        </p>
      </section>

      <section className="visualization">
        <div className="letter-combinations-container">
          <div className="input-display">
            <div className="digits-display">
              {digits.split('').map((digit, idx) => (
                <div 
                  key={idx}
                  className={`digit ${idx === currentIndex ? 'current' : ''}`}
                >
                  {digit}
                </div>
              ))}
            </div>
            
            <div className="current-combination">
              Current: <span className="combination-text">{currentCombination}</span>
            </div>
          </div>

          <div className="combinations-grid">
            <h3>Combinations Found ({allCombinations.length}):</h3>
            <div className="combinations-list">
              {allCombinations.map((combo, idx) => (
                <div 
                  key={idx}
                  className={`combination-item ${
                    combo === currentCombination ? 'current-combination' : ''
                  }`}
                >
                  {combo}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="controls">
          <div className="input-group">
            <label>Digits (2-9):</label>
            <input
              value={digits}
              onChange={(e) => {
                const value = e.target.value.replace(/[^2-9]/g, '');
                setDigits(value);
              }}
              maxLength={4}
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
            <button onClick={findCombinations} disabled={isRunning}>
              Generate Combinations
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
          <h3>Backtracking Solution</h3>
          <ol>
            <li>Create a mapping from digits to their corresponding letters</li>
            <li>Use backtracking to generate all possible combinations</li>
            <li>For each digit, try all possible letters and recursively build the combinations</li>
            <li>When we've processed all digits, add the current combination to the result</li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(4^n) where n is the number of digits in the input. In the worst case, each digit maps to 4 letters (e.g., digit 7 maps to 'pqrs').</p>
          
          <h3>Space Complexity</h3>
          <p>O(n) for the recursion stack, where n is the number of digits in the input.</p>
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

export default LetterCombinations;
