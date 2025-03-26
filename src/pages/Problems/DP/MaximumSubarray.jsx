// src/pages/Problems/DP/MaximumSubarray.jsx
import React, { useState } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';
import './MaximumSubarray.css';

const MaximumSubarray = () => {
  const [nums, setNums] = useState([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentSum, setCurrentSum] = useState(0);
  const [maxSum, setMaxSum] = useState(0);
  const [subArrayStart, setSubArrayStart] = useState(0);
  const [subArrayEnd, setSubArrayEnd] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState('javascript');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setCurrentIndex(-1);
    setCurrentSum(0);
    setMaxSum(0);
    setSubArrayStart(0);
    setSubArrayEnd(0);
  };

  const handleNumsChange = (e) => {
    try {
      const newNums = e.target.value.split(',').map(num => parseInt(num.trim()));
      if (newNums.some(isNaN)) {
        return; // Don't update if any value is not a number
      }
      setNums(newNums);
      resetVisualization();
    } catch (error) {
      console.error('Invalid input:', error);
    }
  };

  const findMaxSubArray = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    let localMaxSum = nums[0];
    let globalMaxSum = nums[0];
    let start = 0;
    let tempStart = 0;
    let end = 0;
    
    setCurrentSum(localMaxSum);
    setMaxSum(globalMaxSum);
    setSubArrayStart(start);
    setSubArrayEnd(end);
    setCurrentIndex(0);
    await sleep(speed);

    for (let i = 1; i < nums.length; i++) {
      setCurrentIndex(i);
      await sleep(speed);

      // If current element is greater than the running sum + current element,
      // start a new subarray from current element
      if (nums[i] > localMaxSum + nums[i]) {
        localMaxSum = nums[i];
        tempStart = i;
      } else {
        // Otherwise, extend the existing subarray
        localMaxSum = localMaxSum + nums[i];
      }
      
      setCurrentSum(localMaxSum);
      await sleep(speed / 2);

      // Update global maximum sum and subarray bounds if needed
      if (localMaxSum > globalMaxSum) {
        globalMaxSum = localMaxSum;
        start = tempStart;
        end = i;
        
        setMaxSum(globalMaxSum);
        setSubArrayStart(start);
        setSubArrayEnd(end);
        await sleep(speed / 2);
      }
    }

    setCurrentIndex(-1);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function maxSubArray(nums) {
    if (nums.length === 0) return 0;
    
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        // Either start a new subarray or extend the existing one
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        
        // Update max sum if needed
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}`,
    python: `
def maxSubArray(nums: list[int]) -> int:
    if not nums:
        return 0
        
    max_sum = nums[0]
    current_sum = nums[0]
    
    for i in range(1, len(nums)):
        # Either start a new subarray or extend the existing one
        current_sum = max(nums[i], current_sum + nums[i])
        
        # Update max sum if needed
        max_sum = max(max_sum, current_sum)
    
    return max_sum`,
    java: `
public int maxSubArray(int[] nums) {
    if (nums.length == 0) return 0;
    
    int maxSum = nums[0];
    int currentSum = nums[0];
    
    for (int i = 1; i < nums.length; i++) {
        // Either start a new subarray or extend the existing one
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        
        // Update max sum if needed
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Maximum Subarray</h1>
        <div className="problem-meta">
          <span className="difficulty medium">Medium</span>
          <span className="category">Dynamic Programming</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          Given an integer array <code>nums</code>, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.
        </p>
        <p>
          A <strong>subarray</strong> is a contiguous part of an array.
        </p>
        <p>
          Example: For nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4], the contiguous subarray [4, -1, 2, 1] has the largest sum = 6.
        </p>
      </section>

      <section className="visualization">
        <div className="subarray-visualization">
          <div className="array-display">
            {nums.map((num, idx) => (
              <div 
                key={idx}
                className={`array-cell ${idx === currentIndex ? 'current' : ''} ${idx >= subArrayStart && idx <= subArrayEnd ? 'selected' : ''}`}
              >
                {num}
              </div>
            ))}
          </div>

          <div className="subarray-info">
            <div className="info-item">
              <div className="info-label">Current Sum:</div>
              <div className="info-value">{currentSum}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Maximum Sum:</div>
              <div className="info-value">{maxSum}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Maximum Subarray:</div>
              <div className="info-value">
                {currentIndex !== -1 ? 
                  `[${nums.slice(subArrayStart, subArrayEnd + 1).join(', ')}]` : 
                  '-'}
              </div>
            </div>
          </div>
        </div>

        <div className="controls">
          <div className="input-group">
            <label>Array (comma-separated):</label>
            <input
              type="text"
              value={nums.join(', ')}
              onChange={handleNumsChange}
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
            <button onClick={findMaxSubArray} disabled={isRunning}>
              Find Maximum Subarray
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
          <h3>Kadane's Algorithm</h3>
          <ol>
            <li>Initialize variables:
              <ul>
                <li>currentSum = first element</li>
                <li>maxSum = first element</li>
              </ul>
            </li>
            <li>Iterate through the array starting from the second element:
              <ul>
                <li>At each step, decide whether to start a new subarray or extend the existing one:
                  <ul>
                    <li>currentSum = max(current element, currentSum + current element)</li>
                  </ul>
                </li>
                <li>Update maxSum if the currentSum is greater:
                  <ul>
                    <li>maxSum = max(maxSum, currentSum)</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(n) where n is the length of the array</p>
          
          <h3>Space Complexity</h3>
          <p>O(1) - we only use a constant amount of extra space</p>

          <h3>Key Points:</h3>
          <ul>
            <li>This is a classic example of Kadane's algorithm</li>
            <li>The algorithm makes a single pass through the array</li>
            <li>At each step, we make a decision: start a new subarray or extend the current one</li>
            <li>This is a dynamic programming approach where we're using previous results to make current decisions</li>
          </ul>
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
          language={language}
          code={implementations[language]}
        />
      </section>
    </div>
  );
};

export default MaximumSubarray;
