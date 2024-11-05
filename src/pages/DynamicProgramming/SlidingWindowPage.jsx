// src/pages/DynamicProgramming/SlidingWindowPage.jsx
import React, { useState, useEffect } from 'react';
import SlidingWindowVisualizer from '../../components/DataStructureVisualizer/SlidingWindowVisualizer';
import CodeSnippet from '../../components/CodeSnippet/CodeSnippet';
import './DynamicProgramming.css';

const SlidingWindowPage = () => {
  const [array, setArray] = useState([2, 1, 5, 1, 3, 2, 8, 1, 4]);
  const [windowSize, setWindowSize] = useState(3);
  const [windowStart, setWindowStart] = useState(0);
  const [windowEnd, setWindowEnd] = useState(2);
  const [currentSum, setCurrentSum] = useState(null);
  const [maxSum, setMaxSum] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [language, setLanguage] = useState('javascript');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const generateRandomArray = () => {
    const newArray = Array.from({ length: 10 }, () => 
      Math.floor(Math.random() * 9) + 1
    );
    setArray(newArray);
    resetVisualization();
  };

  const resetVisualization = () => {
    setWindowStart(0);
    setWindowEnd(windowSize - 1);
    setCurrentSum(null);
    setMaxSum(null);
  };

  const findMaxSumSubarray = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    let maxSum = 0;
    let windowSum = 0;

    // Calculate sum of first window
    for (let i = 0; i < windowSize; i++) {
      windowSum += array[i];
    }
    maxSum = windowSum;
    setCurrentSum(windowSum);
    setMaxSum(maxSum);
    await sleep(speed);

    // Slide window and update sums
    for (let i = windowSize; i < array.length; i++) {
      windowSum = windowSum - array[i - windowSize] + array[i];
      setWindowStart(i - windowSize + 1);
      setWindowEnd(i);
      setCurrentSum(windowSum);
      
      if (windowSum > maxSum) {
        maxSum = windowSum;
        setMaxSum(maxSum);
      }
      
      await sleep(speed);
    }

    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function findMaxSumSubarray(arr, k) {
  let maxSum = 0;
  let windowSum = 0;
  
  // Calculate sum of first window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;
  
  // Slide window and update sums
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }
  
  return maxSum;
}`,
    python: `
def find_max_sum_subarray(arr, k):
    max_sum = 0
    window_sum = 0
    
    # Calculate sum of first window
    for i in range(k):
        window_sum += arr[i]
    max_sum = window_sum
    
    # Slide window and update sums
    for i in range(k, len(arr)):
        window_sum = window_sum - arr[i - k] + arr[i]
        max_sum = max(max_sum, window_sum)
    
    return max_sum`
  };

  return (
    <div className="page-container">
      <h1>Sliding Window Pattern</h1>
      <h2>Max Sum Subarray Problem</h2>
    <p>
      The Max Sum Subarray problem involves finding the contiguous subarray (containing at least one number)
      within a given array, which has the largest sum.
    </p>
    <h3>Objective:</h3>
    <p>
      Given an array of integers, find the contiguous subarray with the maximum sum and return that sum.
    </p>
    <h3>Constraints:</h3>
    <ul>
      <li>The array can contain both positive and negative numbers.</li>
      <li>There is at least one number in the array.</li>
    </ul>
    <h3>Example:</h3>
    <pre>
      {`
        Input: nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
        Output: 6 (because the subarray [4, -1, 2, 1] has the largest sum = 6)
      `}
    </pre>

      <section className="visualization">
        <SlidingWindowVisualizer
          array={array}
          windowStart={windowStart}
          windowEnd={windowEnd}
          currentSum={currentSum}
          maxSum={maxSum}
        />
        <div className="controls">
          <div className="input-group">
            <label>Window Size:</label>
            <input
              type="number"
              min="1"
              max={array.length}
              value={windowSize}
              onChange={(e) => {
                setWindowSize(Number(e.target.value));
                resetVisualization();
              }}
              disabled={isRunning}
            />
          </div>
          <div className="input-group">
            <label>Animation Speed (ms):</label>
            <input
              type="range"
              min="100"
              max="2000"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              disabled={isRunning}
            />
          </div>
          <div className="button-group">
            <button
              onClick={generateRandomArray}
              disabled={isRunning}
            >
              Generate New Array
            </button>
            <button
              onClick={findMaxSumSubarray}
              disabled={isRunning}
            >
              Start
            </button>
            <button
              onClick={resetVisualization}
              disabled={isRunning}
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      <section className="explanation">
        <h2>Sliding Window Pattern</h2>
        <p>
          The Sliding Window pattern is used to perform operations on a specific window size of an array or linked list, 
          such as finding the longest subarray with a given sum or the maximum sum subarray of size 'K'.
        </p>

        <div className="features">
          <h3>When to use Sliding Window:</h3>
          <ul>
            <li>Problems dealing with contiguous subarrays or sublists</li>
            <li>When asked to find maximum/minimum sum of any contiguous subarray</li>
            <li>When the problem involves calculating something among all subarrays of a given size</li>
          </ul>

          <h3>Common Problems:</h3>
          <ul>
            <li>Maximum sum subarray of size 'K'</li>
            <li>Longest substring with 'K' distinct characters</li>
            <li>String anagrams</li>
            <li>Minimum window substring</li>
          </ul>

          <h3>Time Complexity:</h3>
          <ul>
            <li>Usually O(n) where n is the size of the input</li>
            <li>Significantly better than brute force approach O(n*k)</li>
          </ul>

          <h3>Space Complexity:</h3>
          <ul>
            <li>Usually O(1) as we only use a few variables</li>
            <li>May be O(k) if we need to store the window</li>
          </ul>
        </div>
      </section>

      <section className="implementation">
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

export default SlidingWindowPage;