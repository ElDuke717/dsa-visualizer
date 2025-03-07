import React, { useState } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';

const ContainsDuplicateII = () => {
  const [nums, setNums] = useState("1,2,3,1");
  const [k, setK] = useState(3);
  const [currentWindow, setCurrentWindow] = useState([]);
  const [windowSet, setWindowSet] = useState(new Set());
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [duplicateFound, setDuplicateFound] = useState(false);
  const [duplicateValue, setDuplicateValue] = useState(null);
  const [duplicateIndices, setDuplicateIndices] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState('javascript');
  const [windowSteps, setWindowSteps] = useState([]);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setCurrentWindow([]);
    setWindowSet(new Set());
    setCurrentIndex(-1);
    setDuplicateFound(false);
    setDuplicateValue(null);
    setDuplicateIndices([]);
    setWindowSteps([]);
  };

  const parseNums = () => {
    return nums.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
  };

  const checkContainsDuplicate = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();
    
    const numsArray = parseNums();
    const window = new Set();
    const steps = [];
    
    for (let i = 0; i < numsArray.length; i++) {
      setCurrentIndex(i);
      
      // Check if current element is already in the window
      if (window.has(numsArray[i])) {
        // Find the index of the duplicate in the current window
        const duplicateIndex = numsArray.findIndex((val, idx) => val === numsArray[i] && idx < i && idx >= i - k);
        
        setDuplicateFound(true);
        setDuplicateValue(numsArray[i]);
        setDuplicateIndices([duplicateIndex, i]);
        
        steps.push({
          window: [...window],
          currentNum: numsArray[i],
          index: i,
          hasDuplicate: true,
          duplicateIndex: duplicateIndex,
          message: `Duplicate found: ${numsArray[i]} at indices ${duplicateIndex} and ${i}`
        });
        setWindowSteps([...steps]);
        
        await sleep(speed);
        setIsRunning(false);
        return;
      }
      
      // Add the current number to the window
      window.add(numsArray[i]);
      
      // Update the current window array for visualization
      const currentWindowArray = [];
      for (let j = Math.max(0, i - k + 1); j <= i; j++) {
        currentWindowArray.push(numsArray[j]);
      }
      setCurrentWindow(currentWindowArray);
      setWindowSet(new Set(window));
      
      steps.push({
        window: [...window],
        currentNum: numsArray[i],
        index: i,
        hasDuplicate: false,
        message: `Added ${numsArray[i]} to window`
      });
      
      // Slide the window, when window size exceeds k, remove the oldest element
      if (window.size > k) {
        window.delete(numsArray[i - k]);
        steps[steps.length - 1].message += `, removed ${numsArray[i - k]} from window`;
      }
      
      setWindowSteps([...steps]);
      
      await sleep(speed);
    }
    
    // If no duplicates are found
    setDuplicateFound(false);
    steps.push({
      window: [...window],
      currentNum: null,
      index: numsArray.length,
      hasDuplicate: false,
      message: "No duplicates found within distance k"
    });
    setWindowSteps([...steps]);
    
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
    // Declare window, a set that includes all the current elements
    const window = new Set();

    // Iterate through the nums array, if current element is already in the window set, return true
    for (let i = 0; i < nums.length; i++) {
        if (window.has(nums[i])) {
            return true;
        }

        // Add the current number to the window
        window.add(nums[i]);

        // Slide the window, when window size exceeds k, remove the oldest element
        if (window.size > k) {
            window.delete(nums[i - k]);
        }
    }
    
    // If no duplicates are found, return false
    return false;
};`,
    python: `
def containsNearbyDuplicate(nums, k):
    # Create a window set to track elements in the current window
    window = set()
    
    # Iterate through the array
    for i in range(len(nums)):
        # If current element is already in the window, return True
        if nums[i] in window:
            return True
        
        # Add the current element to the window
        window.add(nums[i])
        
        # Slide the window, remove the oldest element if window size exceeds k
        if len(window) > k:
            window.remove(nums[i - k])
    
    # If no duplicates are found, return False
    return False`,
    java: `
class Solution {
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        // Create a HashSet to track elements in the current window
        Set<Integer> window = new HashSet<>();
        
        // Iterate through the array
        for (int i = 0; i < nums.length; i++) {
            // If current element is already in the window, return true
            if (window.contains(nums[i])) {
                return true;
            }
            
            // Add the current element to the window
            window.add(nums[i]);
            
            // Slide the window, remove the oldest element if window size exceeds k
            if (window.size() > k) {
                window.remove(nums[i - k]);
            }
        }
        
        // If no duplicates are found, return false
        return false;
    }
}`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Contains Duplicate II</h1>
        <div className="problem-meta">
          <span className="difficulty easy">Easy</span>
          <span className="category">Sliding Window</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          Given an integer array <code>nums</code> and an integer <code>k</code>, return <code>true</code> if there are two distinct indices <code>i</code> and <code>j</code> in the array such that <code>nums[i] == nums[j]</code> and <code>abs(i - j) &lt;= k</code>.
        </p>
      </section>

      <section className="examples">
        <h2>Examples</h2>
        <pre>
          {`Example 1:
Input: nums = [1,2,3,1], k = 3
Output: true
Explanation: nums[0] = nums[3] and 3 - 0 = 3 <= 3

Example 2:
Input: nums = [1,0,1,1], k = 1
Output: true
Explanation: nums[2] = nums[3] and 3 - 2 = 1 <= 1

Example 3:
Input: nums = [1,2,3,1,2,3], k = 2
Output: false
Explanation: There are no duplicates within distance k of each other.`}
        </pre>
      </section>

      <section className="visualization">
        <div className="string-visualizer">
          {parseNums().map((num, idx) => (
            <span 
              key={idx}
              className={`char ${
                idx === currentIndex ? 'current' :
                duplicateIndices.includes(idx) ? 'in-window' : 
                (idx > currentIndex - k && idx < currentIndex) ? 'in-window' : ''
              }`}
            >
              {num}
            </span>
          ))}
        </div>
        
        <div className="window-display">
          <div>Current Window: {currentWindow.join(', ')}</div>
          <div>Window Set: {[...windowSet].join(', ')}</div>
          <div>
            Result: {
              duplicateFound 
                ? `Duplicate found: ${duplicateValue} at indices ${duplicateIndices.join(' and ')}` 
                : currentIndex >= 0 && currentIndex >= parseNums().length - 1 
                  ? "No duplicates found within distance k" 
                  : "Checking..."
            }
          </div>
        </div>

        <div className="window-steps">
          <h3>Algorithm Steps</h3>
          <div className="steps-container">
            {windowSteps.map((step, idx) => (
              <div key={idx} className={`step-item ${step.hasDuplicate ? 'duplicate-found' : ''}`}>
                <div>Step {idx + 1}: Index {step.index}</div>
                <div>Current Number: {step.currentNum !== null ? step.currentNum : 'N/A'}</div>
                <div>Window: {[...step.window].join(', ')}</div>
                <div>{step.message}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="controls">
          <div className="input-group">
            <label>Numbers (comma-separated):</label>
            <input
              value={nums}
              onChange={(e) => setNums(e.target.value)}
              disabled={isRunning}
            />
          </div>
          <div className="input-group">
            <label>Distance (k):</label>
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
            <button onClick={checkContainsDuplicate} disabled={isRunning}>
              Check Contains Duplicate
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
          <h3>Sliding Window with HashSet Solution</h3>
          <ol>
            <li>Create a sliding window using a HashSet to track elements</li>
            <li>Iterate through the array:
              <ul>
                <li>If the current element is already in the window, return true (duplicate found within distance k)</li>
                <li>Add the current element to the window</li>
                <li>If the window size exceeds k, remove the oldest element</li>
              </ul>
            </li>
            <li>If no duplicates are found, return false</li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(n) where n is the length of the array</p>
          
          <h3>Space Complexity</h3>
          <p>O(min(n, k)) for the sliding window HashSet</p>
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

export default ContainsDuplicateII;
