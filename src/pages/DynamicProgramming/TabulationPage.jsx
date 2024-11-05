// src/pages/DynamicProgramming/TabulationPage.jsx
import React, { useState } from 'react';
import TabulationVisualizer from '../../components/DataStructureVisualizer/TabulationVisualizer';
import CodeSnippet from '../../components/CodeSnippet/CodeSnippet';
import './DynamicProgramming.css';

const TabulationPage = () => {
  const [n, setN] = useState(7);
  const [dpTable, setDpTable] = useState(Array(n + 1).fill(0));
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [language, setLanguage] = useState('javascript');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setDpTable(Array(n + 1).fill(0));
    setCurrentIndex(null);
  };

  const calculateFibonacci = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    const newDpTable = Array(n + 1).fill(0);
    newDpTable[1] = 1;
    setDpTable([...newDpTable]);
    await sleep(speed);

    for (let i = 2; i <= n; i++) {
      setCurrentIndex(i);
      newDpTable[i] = newDpTable[i - 1] + newDpTable[i - 2];
      setDpTable([...newDpTable]);
      await sleep(speed);
    }

    setCurrentIndex(null);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function fibonacci(n) {
  // Create DP table
  const dp = Array(n + 1).fill(0);
  
  // Base cases
  dp[1] = 1;
  
  // Fill table iteratively
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}`,
    python: `
def fibonacci(n):
    # Create DP table
    dp = [0] * (n + 1)
    
    # Base cases
    dp[1] = 1
    
    # Fill table iteratively
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    
    return dp[n]`
  };

  return (
    <div className="page-container">
      <h1>Tabulation (Bottom-Up Dynamic Programming)</h1>
      <h2>Fibonacci Sequence Problem</h2>
      <p>
        The Fibonacci sequence is a series of numbers where each number is the sum of the two
        preceding ones, usually starting with 0 and 1.
      </p>
      <h3>Objective:</h3>
      <p>
        Given a number n, calculate the nth Fibonacci number efficiently using tabulation.
      </p>
      <h3>Constraints:</h3>
      <ul>
        <li>n is a non-negative integer</li>
        <li>The sequence starts with F(0) = 0, F(1) = 1</li>
      </ul>
      <h3>Example:</h3>
      <pre>
        {`
          Input: n = 6
          Sequence: 0, 1, 1, 2, 3, 5, 8
          Output: 8 (6th Fibonacci number)
        `}
      </pre>

      <section className="visualization">
        <TabulationVisualizer
          dpTable={dpTable}
          currentIndex={currentIndex}
        />
        <div className="controls">
          <div className="input-group">
            <label>N:</label>
            <input
              type="number"
              min="2"
              max="20"
              value={n}
              onChange={(e) => {
                setN(Number(e.target.value));
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
              onClick={calculateFibonacci}
              disabled={isRunning}
            >
              Calculate Fibonacci
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
        <h2>Tabulation Approach</h2>
        <p>
          Tabulation is a bottom-up approach to Dynamic Programming where we solve smaller 
          subproblems first and use their solutions to build up to larger subproblems.
        </p>

        <div className="features">
          <h3>Key Characteristics:</h3>
          <ul>
            <li>Iterative approach (no recursion)</li>
            <li>Starts from the smallest subproblem</li>
            <li>Builds solution in a table</li>
            <li>Usually more efficient than memoization</li>
          </ul>

          <h3>Advantages:</h3>
          <ul>
            <li>No recursion overhead</li>
            <li>Better space complexity</li>
            <li>Easier to analyze space complexity</li>
            <li>Can often be optimized for space</li>
          </ul>

          <h3>Common Problems:</h3>
          <ul>
            <li>Fibonacci Numbers</li>
            <li>Climbing Stairs</li>
            <li>Coin Change</li>
            <li>Longest Common Subsequence</li>
          </ul>

          <h3>Implementation Steps:</h3>
          <ul>
            <li>1. Create DP table with base cases</li>
            <li>2. Identify iteration order</li>
            <li>3. Fill table using previous results</li>
            <li>4. Return final answer from table</li>
          </ul>

          <h3>Time & Space Complexity:</h3>
          <ul>
            <li>Time: O(n) - visit each state once</li>
            <li>Space: O(n) - size of DP table</li>
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

export default TabulationPage;