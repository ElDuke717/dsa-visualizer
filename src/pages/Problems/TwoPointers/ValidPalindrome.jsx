import React, { useState, useEffect } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';

const ValidPalindrome = () => {
  const [input, setInput] = useState("A man, a plan, a canal: Panama");
  const [processedString, setProcessedString] = useState("");
  const [leftPointer, setLeftPointer] = useState(-1);
  const [rightPointer, setRightPointer] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [isPalindrome, setIsPalindrome] = useState(null);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState('javascript');
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setProcessedString("");
    setLeftPointer(-1);
    setRightPointer(-1);
    setIsPalindrome(null);
    setSteps([]);
    setCurrentStep(0);
  };

  const processString = (str) => {
    return str.toLowerCase().replace(/[\s!?,._:;{}\\'"@#()\[\]-`--]+/g, "");
  };

  const checkPalindrome = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();
    
    const processed = processString(input);
    setProcessedString(processed);
    
    const stepsArray = [];
    
    // Add initial step showing the processed string
    stepsArray.push({
      message: `Processed string: "${processed}"`,
      left: -1,
      right: -1,
      result: null
    });
    
    let left = 0;
    let right = processed.length - 1;
    
    // Initialize pointers
    setLeftPointer(left);
    setRightPointer(right);
    stepsArray.push({
      message: `Initialize left pointer at index ${left} (${processed[left]}) and right pointer at index ${right} (${processed[right]})`,
      left: left,
      right: right,
      result: null
    });
    setSteps([...stepsArray]);
    setCurrentStep(1);
    await sleep(speed);
    
    // Check palindrome
    while (left < right) {
      setLeftPointer(left);
      setRightPointer(right);
      
      stepsArray.push({
        message: `Compare characters at left (${processed[left]}) and right (${processed[right]})`,
        left: left,
        right: right,
        result: null
      });
      setSteps([...stepsArray]);
      setCurrentStep(stepsArray.length - 1);
      await sleep(speed);
      
      if (processed[left] !== processed[right]) {
        stepsArray.push({
          message: `Characters don't match: ${processed[left]} ≠ ${processed[right]}. Not a palindrome.`,
          left: left,
          right: right,
          result: false
        });
        setSteps([...stepsArray]);
        setCurrentStep(stepsArray.length - 1);
        setIsPalindrome(false);
        setIsRunning(false);
        return;
      }
      
      stepsArray.push({
        message: `Characters match: ${processed[left]} = ${processed[right]}. Continue checking.`,
        left: left,
        right: right,
        result: null
      });
      setSteps([...stepsArray]);
      setCurrentStep(stepsArray.length - 1);
      await sleep(speed);
      
      left++;
      right--;
    }
    
    // Palindrome confirmed
    stepsArray.push({
      message: `All characters matched. The string is a palindrome.`,
      left: left,
      right: right,
      result: true
    });
    setSteps([...stepsArray]);
    setCurrentStep(stepsArray.length - 1);
    setIsPalindrome(true);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    // Remove all punctuation and spaces, make letters lowercase
    s = s.toLowerCase().replace(/[\\s!?,._:;{}\\\\'"@#()\\[\\]-\`--]+/g, "");
    
    // Make two pointers, one left and one right
    let left = 0;
    let right = s.length - 1;
    
    // Iterate through the string with a while loop, compare the letter at each pointer's index
    while (left < right) {
        // If they are not the same, return false
        if (s[left] !== s[right]){
            return false;
        }
        // Increment and decrement the pointers
        left++;
        right--;
    }
    
    // Otherwise, return true
    return true;
};`,
    python: `
def isPalindrome(s: str) -> bool:
    # Remove all punctuation and spaces, make letters lowercase
    import re
    s = re.sub(r'[\\s!?,._:;{}\\\\'"@#()\\[\\]-\`--]+', '', s.lower())
    
    # Make two pointers, one left and one right
    left, right = 0, len(s) - 1
    
    # Iterate through the string with a while loop, compare the letter at each pointer's index
    while left < right:
        # If they are not the same, return false
        if s[left] != s[right]:
            return False
        # Increment and decrement the pointers
        left += 1
        right -= 1
    
    # Otherwise, return true
    return True`,
    java: `
class Solution {
    public boolean isPalindrome(String s) {
        // Remove all punctuation and spaces, make letters lowercase
        s = s.toLowerCase().replaceAll("[\\\\s!?,._:;{}\\\\\\\\'\\"@#()\\\\[\\\\]-\`--]+", "");
        
        // Make two pointers, one left and one right
        int left = 0;
        int right = s.length() - 1;
        
        // Iterate through the string with a while loop, compare the letter at each pointer's index
        while (left < right) {
            // If they are not the same, return false
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            // Increment and decrement the pointers
            left++;
            right--;
        }
        
        // Otherwise, return true
        return true;
    }
}`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Valid Palindrome</h1>
        <div className="problem-meta">
          <span className="difficulty easy">Easy</span>
          <span className="category">Two Pointers</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          A phrase is a <strong>palindrome</strong> if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.
        </p>
        <p>
          Given a string <code>s</code>, return <code>true</code> if it is a <strong>palindrome</strong>, or <code>false</code> otherwise.
        </p>
      </section>

      <section className="examples">
        <h2>Examples</h2>
        <pre>
          {`Example 1:
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.

Example 2:
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.

Example 3:
Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.`}
        </pre>
      </section>

      <section className="visualization">
        <h2>Visualization</h2>
        <div className="string-visualizer">
          {processedString && processedString.split('').map((char, idx) => (
            <div 
              key={idx}
              className={`char ${
                idx === leftPointer ? 'current' :
                idx === rightPointer ? 'current' : ''
              }`}
            >
              {char}
            </div>
          ))}
        </div>
        
        <div className="pointer-info">
          {processedString && (
            <>
              <div>Left Pointer: {leftPointer >= 0 ? `${leftPointer} (${processedString[leftPointer]})` : 'N/A'}</div>
              <div>Right Pointer: {rightPointer >= 0 ? `${rightPointer} (${processedString[rightPointer]})` : 'N/A'}</div>
              {isPalindrome !== null && (
                <div className={isPalindrome ? "success" : "error"}>
                  {isPalindrome ? "This is a palindrome!" : "This is not a palindrome."}
                </div>
              )}
            </>
          )}
        </div>

        <div className="steps-container">
          <h3>Algorithm Steps</h3>
          <div className="steps-list">
            {steps.map((step, idx) => (
              <div key={idx} className={`step-item ${idx === currentStep ? 'current-step' : ''}`}>
                <div>Step {idx + 1}:</div>
                <div>{step.message}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="controls">
          <div className="input-group">
            <label>Input String:</label>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isRunning}
              style={{ width: '300px' }}
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
            <button onClick={checkPalindrome} disabled={isRunning}>
              Check Palindrome
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
          <h3>Two-Pointer Solution</h3>
          <ol>
            <li>Preprocess the string:
              <ul>
                <li>Convert all uppercase letters to lowercase</li>
                <li>Remove all non-alphanumeric characters (spaces, punctuation, etc.)</li>
              </ul>
            </li>
            <li>Use two pointers:
              <ul>
                <li>Initialize <code>left</code> pointer at the beginning of the string</li>
                <li>Initialize <code>right</code> pointer at the end of the string</li>
              </ul>
            </li>
            <li>While <code>left</code> is less than <code>right</code>:
              <ul>
                <li>Compare characters at <code>left</code> and <code>right</code> positions</li>
                <li>If they are different, return <code>false</code></li>
                <li>Otherwise, move <code>left</code> pointer one step right and <code>right</code> pointer one step left</li>
              </ul>
            </li>
            <li>If the loop completes without returning <code>false</code>, return <code>true</code></li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(n) where n is the length of the string</p>
          
          <h3>Space Complexity</h3>
          <p>O(1) if we don't count the space for the processed string, otherwise O(n)</p>
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

export default ValidPalindrome;
