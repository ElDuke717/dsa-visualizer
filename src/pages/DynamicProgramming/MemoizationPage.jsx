// src/pages/DynamicProgramming/MemoizationPage.jsx
import React, { useState } from 'react';
import MemoizationVisualizer from '../../components/DataStructureVisualizer/MemoizationVisualizer';
import CodeSnippet from '../../components/CodeSnippet/CodeSnippet';
import './DynamicProgramming.css';

const MemoizationPage = () => {
  const [n, setN] = useState(7);
  const [memoTable, setMemoTable] = useState(Array(n + 1).fill(null));
  const [callStack, setCallStack] = useState([]);
  const [currentCall, setCurrentCall] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [language, setLanguage] = useState('javascript');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setMemoTable(Array(n + 1).fill(null));
    setCallStack([]);
    setCurrentCall(null);
  };

  const calculateFibonacci = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    const memo = Array(n + 1).fill(null);
    memo[0] = 0;
    memo[1] = 1;
    setMemoTable([...memo]);

    const fib = async (num) => {
      setCallStack(prev => [...prev, num]);
      setCurrentCall(num);
      await sleep(speed);

      if (memo[num] !== null) {
        setCallStack(prev => prev.slice(0, -1));
        return memo[num];
      }

      const result = await fib(num - 1) + await fib(num - 2);
      memo[num] = result;
      setMemoTable([...memo]);
      await sleep(speed);
      
      setCallStack(prev => prev.slice(0, -1));
      return result;
    };

    await fib(n);
    setCurrentCall(null);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function fibonacci(n, memo = {}) {
  // Base cases
  if (n <= 1) return n;
  
  // Check if already computed
  if (memo[n] !== undefined) {
    return memo[n];
  }
  
  // Compute and store result
  memo[n] = fibonacci(n - 1, memo) + 
            fibonacci(n - 2, memo);
  
  return memo[n];
}`,
    python: `
def fibonacci(n, memo=None):
    if memo is None:
        memo = {}
    
    # Base cases
    if n <= 1:
        return n
    
    # Check if already computed
    if n in memo:
        return memo[n]
    
    # Compute and store result
    memo[n] = fibonacci(n - 1, memo) + \
              fibonacci(n - 2, memo)
    
    return memo[n]`
  };

  return (
    <div className="page-container">
      <h1>Memoization (Top-Down Dynamic Programming)</h1>
      <h2>Fibonacci Sequence Problem</h2>
      <p>
        This implementation demonstrates how memoization can optimize recursive solutions
        by storing and reusing previously calculated results.
      </p>
      <h3>Objective:</h3>
      <p>
        Calculate the nth Fibonacci number using a recursive approach with memoization
        to avoid redundant calculations.
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
          
          Without memoization:
          - fib(6) would recalculate fib(4) multiple times
          
          With memoization:
          - Each value is calculated only once
          - Subsequent calls use the stored result
        `}
      </pre>

      <section className="visualization">
        <MemoizationVisualizer
          memoTable={memoTable}
          callStack={callStack}
          currentCall={currentCall}
        />
        <div className="controls">
          <div className="input-group">
            <label>N:</label>
            <input
              type="number"
              min="2"
              max="10"
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
        <h2>Memoization Approach</h2>
        <p>
          Memoization is a top-down approach to Dynamic Programming where we solve the bigger
          problem first, which typically breaks down into smaller subproblems. We store the 
          results of subproblems to avoid redundant calculations.
        </p>

        <div className="features">
          <h3>Key Characteristics:</h3>
          <ul>
            <li>Recursive approach with caching</li>
            <li>Starts from the main problem</li>
            <li>Stores results in a memo table</li>
            <li>Lazy evaluation - only computes needed values</li>
          </ul>

          <h3>Advantages:</h3>
          <ul>
            <li>Only calculates required subproblems</li>
            <li>Natural recursive implementation</li>
            <li>Good for problems with many unused subproblems</li>
            <li>Easier to implement than tabulation</li>
          </ul>

          <h3>Common Applications:</h3>
          <ul>
            <li>Fibonacci Numbers</li>
            <li>Path Finding Problems</li>
            <li>Recursive String Problems</li>
            <li>Tree-based Dynamic Programming</li>
          </ul>

          <h3>Implementation Steps:</h3>
          <ul>
            <li>1. Create memo storage (array/object)</li>
            <li>2. Check memo before calculation</li>
            <li>3. Store results after calculation</li>
            <li>4. Return memoized results when available</li>
          </ul>

          <h3>Time & Space Complexity:</h3>
          <ul>
            <li>Time: O(n) - each subproblem solved once</li>
            <li>Space: O(n) - memo table + recursion stack</li>
          </ul>

          <h3>Comparison with Tabulation:</h3>
          <ul>
            <li>More intuitive for some problems</li>
            <li>Extra space for recursion stack</li>
            <li>May have stack overflow for large inputs</li>
            <li>Better for sparse problems</li>
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

export default MemoizationPage;