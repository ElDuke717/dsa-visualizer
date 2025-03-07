import React, { useState } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';

const MaximumAverageSubarray = () => {
  const [nums, setNums] = useState("1,12,-5,-6,50,3");
  const [k, setK] = useState(4);
  const [currentWindow, setCurrentWindow] = useState([]);
  const [currentSum, setCurrentSum] = useState(0);
  const [currentAvg, setCurrentAvg] = useState(0);
  const [maxAvg, setMaxAvg] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState('javascript');
  const [windowResults, setWindowResults] = useState([]);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setCurrentWindow([]);
    setCurrentSum(0);
    setCurrentAvg(0);
    setMaxAvg(0);
    setCurrentIndex(-1);
    setWindowResults([]);
  };

  const parseNums = () => {
    return nums.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num));
  };

  const findMaxAverage = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();
    
    const numsArray = parseNums();
    let sum = 0;
    const results = [];
    
    // Calculate sum for the first window
    for (let i = 0; i < Math.min(k, numsArray.length); i++) {
      setCurrentIndex(i);
      sum += numsArray[i];
      const currentNums = numsArray.slice(0, i + 1);
      setCurrentWindow(currentNums);
      setCurrentSum(sum);
      
      await sleep(speed);
    }
    
    // Calculate average for the first window
    let windowAvg = sum / k;
    let maxAverage = windowAvg;
    
    setCurrentAvg(windowAvg);
    setMaxAvg(maxAverage);
    
    results.push({
      window: numsArray.slice(0, k),
      sum: sum,
      avg: windowAvg,
      maxAvg: maxAverage
    });
    setWindowResults([...results]);
    
    // Slide the window
    for (let i = k; i < numsArray.length; i++) {
      setCurrentIndex(i);
      
      // Remove the leftmost element from the sum
      sum -= numsArray[i - k];
      
      // Add the rightmost element to the sum
      sum += numsArray[i];
      
      const currentNums = numsArray.slice(i - k + 1, i + 1);
      setCurrentWindow(currentNums);
      setCurrentSum(sum);
      
      // Calculate the average of the current window
      windowAvg = sum / k;
      setCurrentAvg(windowAvg);
      
      // Update maxAvg if needed
      if (windowAvg > maxAverage) {
        maxAverage = windowAvg;
        setMaxAvg(maxAverage);
      }
      
      results.push({
        window: [...currentNums],
        sum: sum,
        avg: windowAvg,
        maxAvg: maxAverage
      });
      setWindowResults([...results]);
      
      await sleep(speed);
    }
    
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function(nums, k) {
    // Calculate the sum of the first window
    let sum = 0;
    for (let i = 0; i < k; i++) {
        sum += nums[i];
    }
    
    // Initialize maxAvg with the average of the first window
    let maxAvg = sum / k;
    
    // Slide the window and update maxAvg if a higher average is found
    for (let i = k; i < nums.length; i++) {
        // Remove the leftmost element and add the rightmost element
        sum = sum - nums[i - k] + nums[i];
        
        // Calculate the average of the current window
        let windowAvg = sum / k;
        
        // Update maxAvg if the current window has a higher average
        if (windowAvg > maxAvg) {
            maxAvg = windowAvg;
        }
    }
    
    return maxAvg;
};`,
    python: `
class Solution:
    def findMaxAverage(self, nums: List[int], k: int) -> float:
        # Calculate the sum of the first window
        window_sum = sum(nums[:k])
        
        # Initialize max_avg with the average of the first window
        max_avg = window_sum / k
        
        # Slide the window and update max_avg if a higher average is found
        for i in range(k, len(nums)):
            # Remove the leftmost element and add the rightmost element
            window_sum = window_sum - nums[i - k] + nums[i]
            
            # Calculate the average of the current window
            window_avg = window_sum / k
            
            # Update max_avg if the current window has a higher average
            max_avg = max(max_avg, window_avg)
        
        return max_avg`,
    java: `
class Solution {
    public double findMaxAverage(int[] nums, int k) {
        // Calculate the sum of the first window
        double sum = 0;
        for (int i = 0; i < k; i++) {
            sum += nums[i];
        }
        
        // Initialize maxAvg with the average of the first window
        double maxAvg = sum / k;
        
        // Slide the window and update maxAvg if a higher average is found
        for (int i = k; i < nums.length; i++) {
            // Remove the leftmost element and add the rightmost element
            sum = sum - nums[i - k] + nums[i];
            
            // Calculate the average of the current window
            double windowAvg = sum / k;
            
            // Update maxAvg if the current window has a higher average
            maxAvg = Math.max(maxAvg, windowAvg);
        }
        
        return maxAvg;
    }
}`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Maximum Average Subarray I</h1>
        <div className="problem-meta">
          <span className="difficulty easy">Easy</span>
          <span className="category">Sliding Window</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          You are given an integer array <code>nums</code> consisting of <code>n</code> elements, and an integer <code>k</code>.
        </p>
        <p>
          Find a contiguous subarray whose length is equal to <code>k</code> that has the maximum average value and return this value. Any answer with a calculation error less than 10<sup>-5</sup> will be accepted.
        </p>
      </section>

      <section className="examples">
        <h2>Examples</h2>
        <pre>
          {`Example 1:
Input: nums = [1,12,-5,-6,50,3], k = 4
Output: 12.75000
Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75

Example 2:
Input: nums = [5], k = 1
Output: 5.00000`}
        </pre>
      </section>

      <section className="visualization">
        <div className="string-visualizer">
          {parseNums().map((num, idx) => (
            <span 
              key={idx}
              className={`char ${
                idx === currentIndex ? 'current' :
                currentWindow.includes(num) ? 'in-window' : ''
              }`}
            >
              {num}
            </span>
          ))}
        </div>
        
        <div className="window-display">
          <div>Current Window: {currentWindow.join(', ')} (Sum: {currentSum.toFixed(2)})</div>
          <div>Current Average: {currentAvg.toFixed(2)}</div>
          <div>Maximum Average: {maxAvg.toFixed(2)}</div>
        </div>

        <div className="window-results">
          <h3>Window Evaluations</h3>
          <div className="results-container">
            {windowResults.map((result, idx) => (
              <div key={idx} className="result-item">
                <div>Window {idx + 1}: [{result.window.join(', ')}]</div>
                <div>Sum: {result.sum.toFixed(2)}</div>
                <div>Average: {result.avg.toFixed(2)}</div>
                <div>Max Average: {result.maxAvg.toFixed(2)}</div>
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
            <button onClick={findMaxAverage} disabled={isRunning}>
              Find Max Average
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
            <li>Calculate the sum of the first k elements</li>
            <li>Initialize the maximum average with the average of the first window</li>
            <li>Slide the window through the array:
              <ul>
                <li>Remove the leftmost element from the sum</li>
                <li>Add the rightmost element to the sum</li>
                <li>Calculate the average of the current window</li>
                <li>Update the maximum average if the current average is higher</li>
              </ul>
            </li>
            <li>Return the maximum average</li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(n) where n is the length of the array</p>
          
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

export default MaximumAverageSubarray;
