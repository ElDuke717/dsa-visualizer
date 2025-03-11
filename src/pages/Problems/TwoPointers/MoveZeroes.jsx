import React, { useState } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';

const MoveZeroes = () => {
  const [nums, setNums] = useState("0,1,0,3,12");
  const [currentArray, setCurrentArray] = useState([]);
  const [lastNonZeroIndex, setLastNonZeroIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState('javascript');
  const [steps, setSteps] = useState([]);
  const [phase, setPhase] = useState('moving'); // 'moving' or 'filling'

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setCurrentArray([]);
    setLastNonZeroIndex(0);
    setCurrentIndex(-1);
    setSteps([]);
    setPhase('moving');
  };

  const parseNums = () => {
    return nums.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
  };

  const moveZeroes = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();
    
    const numsArray = parseNums();
    setCurrentArray([...numsArray]);
    
    const stepsArray = [];
    let nonZeroIdx = 0;
    
    // Phase 1: Move non-zero elements to the front
    setPhase('moving');
    for (let i = 0; i < numsArray.length; i++) {
      setCurrentIndex(i);
      
      stepsArray.push({
        array: [...numsArray],
        currentIndex: i,
        lastNonZeroIndex: nonZeroIdx,
        message: `Examining element at index ${i}: ${numsArray[i]}`
      });
      
      if (numsArray[i] !== 0) {
        const nonZero = numsArray[i];
        
        // Swap only if indices are different
        if (i !== nonZeroIdx) {
          numsArray[nonZeroIdx] = nonZero;
          stepsArray.push({
            array: [...numsArray],
            currentIndex: i,
            lastNonZeroIndex: nonZeroIdx,
            message: `Moving non-zero element ${nonZero} to index ${nonZeroIdx}`
          });
        } else {
          stepsArray.push({
            array: [...numsArray],
            currentIndex: i,
            lastNonZeroIndex: nonZeroIdx,
            message: `Element ${nonZero} is already at the correct position (index ${nonZeroIdx})`
          });
        }
        
        nonZeroIdx++;
        setLastNonZeroIndex(nonZeroIdx);
      } else {
        stepsArray.push({
          array: [...numsArray],
          currentIndex: i,
          lastNonZeroIndex: nonZeroIdx,
          message: `Element is zero, skipping`
        });
      }
      
      setCurrentArray([...numsArray]);
      setSteps([...stepsArray]);
      await sleep(speed);
    }
    
    // Phase 2: Fill remaining positions with zeroes
    setPhase('filling');
    for (let i = nonZeroIdx; i < numsArray.length; i++) {
      setCurrentIndex(i);
      
      numsArray[i] = 0;
      stepsArray.push({
        array: [...numsArray],
        currentIndex: i,
        lastNonZeroIndex: nonZeroIdx,
        message: `Filling index ${i} with zero`
      });
      
      setCurrentArray([...numsArray]);
      setSteps([...stepsArray]);
      await sleep(speed);
    }
    
    setCurrentIndex(-1);
    stepsArray.push({
      array: [...numsArray],
      currentIndex: -1,
      lastNonZeroIndex: nonZeroIdx,
      message: `All zeroes moved to the end of the array`
    });
    setSteps([...stepsArray]);
    
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  // Initialize lastNonZeroIndex, will track non-zero numbers.
  let lastNonZeroIndex = 0;
  
  // Iterate through the array
  for (let i = 0; i < nums.length; i++) {
    // If the current element is not zero, move it forward
    if (nums[i] !== 0) {
      // Variable to hold the current element
      let nonZero = nums[i];
      // Assign the element at lastNonZeroIndex to the value of the current element
      nums[lastNonZeroIndex] = nonZero;
      // Increment the lastNonZeroIndex - will be taken by the next non-zero number
      lastNonZeroIndex++;
    }
  } 
  
  // Fill in the remaining zeroes
  for (let i = lastNonZeroIndex; i < nums.length; i++) {
    nums[i] = 0;
  }
  
  // Nothing is returned
};`,
    python: `
def moveZeroes(nums):
    """
    :type nums: List[int]
    :rtype: None Do not return anything, modify nums in-place instead.
    """
    # Initialize lastNonZeroIndex, will track non-zero numbers
    lastNonZeroIndex = 0
    
    # Iterate through the array
    for i in range(len(nums)):
        # If the current element is not zero, move it forward
        if nums[i] != 0:
            # Move the non-zero element to the lastNonZeroIndex position
            nums[lastNonZeroIndex] = nums[i]
            # Increment the lastNonZeroIndex
            lastNonZeroIndex += 1
    
    # Fill in the remaining zeroes
    for i in range(lastNonZeroIndex, len(nums)):
        nums[i] = 0`,
    java: `
class Solution {
    public void moveZeroes(int[] nums) {
        // Initialize lastNonZeroIndex, will track non-zero numbers
        int lastNonZeroIndex = 0;
        
        // Iterate through the array
        for (int i = 0; i < nums.length; i++) {
            // If the current element is not zero, move it forward
            if (nums[i] != 0) {
                // Move the non-zero element to the lastNonZeroIndex position
                nums[lastNonZeroIndex] = nums[i];
                // Increment the lastNonZeroIndex
                lastNonZeroIndex++;
            }
        }
        
        // Fill in the remaining zeroes
        for (int i = lastNonZeroIndex; i < nums.length; i++) {
            nums[i] = 0;
        }
    }
}`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Move Zeroes</h1>
        <div className="problem-meta">
          <span className="difficulty easy">Easy</span>
          <span className="category">Two Pointers</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          Given an integer array <code>nums</code>, move all <code>0</code>'s to the end of it while maintaining the relative order of the non-zero elements.
        </p>
        <p>
          <strong>Note</strong> that you must do this in-place without making a copy of the array.
        </p>
      </section>

      <section className="examples">
        <h2>Examples</h2>
        <pre>
          {`Example 1:
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]

Example 2:
Input: nums = [0]
Output: [0]`}
        </pre>
      </section>

      <section className="visualization">
        <div className="array-visualizer">
          {currentArray.map((num, idx) => (
            <div 
              key={idx}
              className={`array-cell ${
                idx === currentIndex ? 'current' :
                idx < lastNonZeroIndex ? 'left-pointer' : ''
              }`}
            >
              {num}
            </div>
          ))}
        </div>
        
        <div className="pointer-info">
          <div>Current Index: {currentIndex >= 0 ? currentIndex : 'N/A'}</div>
          <div>Last Non-Zero Index: {lastNonZeroIndex}</div>
          <div>Phase: {phase === 'moving' ? 'Moving non-zeroes forward' : 'Filling remaining positions with zeroes'}</div>
        </div>

        <div className="steps-container">
          <h3>Algorithm Steps</h3>
          <div className="steps-list">
            {steps.map((step, idx) => (
              <div key={idx} className="step-item">
                <div>Step {idx + 1}:</div>
                <div>Array: [{step.array.join(', ')}]</div>
                <div>Current Index: {step.currentIndex}</div>
                <div>Last Non-Zero Index: {step.lastNonZeroIndex}</div>
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
            <button onClick={moveZeroes} disabled={isRunning}>
              Move Zeroes
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
            <li>Use two pointers:
              <ul>
                <li><code>lastNonZeroIndex</code>: Tracks where the next non-zero element should be placed</li>
                <li><code>i</code>: Iterates through the array</li>
              </ul>
            </li>
            <li>Iterate through the array:
              <ul>
                <li>If a non-zero element is encountered, move it to the position indicated by <code>lastNonZeroIndex</code></li>
                <li>Increment <code>lastNonZeroIndex</code> after each non-zero element is placed</li>
              </ul>
            </li>
            <li>After all non-zero elements are moved to the front, fill the remaining positions with zeroes</li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(n) where n is the length of the array</p>
          
          <h3>Space Complexity</h3>
          <p>O(1) as we modify the array in-place without using extra space</p>
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

export default MoveZeroes;
