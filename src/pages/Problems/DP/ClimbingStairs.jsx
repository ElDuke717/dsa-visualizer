// src/pages/Problems/DP/ClimbingStairs.jsx
import React, { useState } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';

const ClimbingStairs = () => {
  const [n, setN] = useState(5);
  const [currentStep, setCurrentStep] = useState(-1);
  const [dp, setDp] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState('javascript');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setCurrentStep(-1);
    setDp([]);
  };

  const climbStairs = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    // Initialize dp array
    const dpArray = new Array(n + 1).fill(0);
    dpArray[0] = 1;  // base case
    dpArray[1] = 1;  // base case
    setDp([...dpArray]);
    await sleep(speed);

    // Fill dp array
    for (let i = 2; i <= n; i++) {
      setCurrentStep(i);
      dpArray[i] = dpArray[i-1] + dpArray[i-2];
      setDp([...dpArray]);
      await sleep(speed);
    }

    setCurrentStep(-1);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function climbStairs(n) {
    if (n <= 1) return 1;
    
    // Initialize dp array
    const dp = new Array(n + 1);
    dp[0] = 1;  // base case
    dp[1] = 1;  // base case
    
    // Fill dp array
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    
    return dp[n];
}`,
    python: `
def climbStairs(n: int) -> int:
    if n <= 1:
        return 1
        
    # Initialize dp array
    dp = [0] * (n + 1)
    dp[0] = 1  # base case
    dp[1] = 1  # base case
    
    # Fill dp array
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Climbing Stairs</h1>
        <div className="problem-meta">
          <span className="difficulty easy">Easy</span>
          <span className="category">Dynamic Programming</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          You are climbing a staircase. It takes n steps to reach the top.
          Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
        </p>
        <p>
          Example: For n = 3, there are 3 ways:
          <ul>
            <li>1 step + 1 step + 1 step</li>
            <li>1 step + 2 steps</li>
            <li>2 steps + 1 step</li>
          </ul>
        </p>
      </section>

      <section className="visualization">
        <div className="stairs-visualization">
          <div className="stairs">
            {[...Array(n + 1)].map((_, idx) => (
              <div 
                key={idx}
                className={`stair ${idx === currentStep ? 'current' : ''}`}
              >
                <div className="stair-step">
                  Step {idx}
                </div>
                <div className="stair-value">
                  {dp[idx] || 0} ways
                </div>
              </div>
            ))}
          </div>

          <div className="dp-array">
            <h3>DP Array:</h3>
            <div className="dp-cells">
              {dp.map((value, idx) => (
                <div 
                  key={idx}
                  className={`dp-cell ${idx === currentStep ? 'current' : ''}`}
                >
                  <div className="dp-index">dp[{idx}]</div>
                  <div className="dp-value">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="controls">
          <div className="input-group">
            <label>Number of Steps (n):</label>
            <input
              type="number"
              min="1"
              max="10"
              value={n}
              onChange={(e) => setN(Number(e.target.value))}
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
            <button onClick={climbStairs} disabled={isRunning}>
              Calculate Ways
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
          <h3>Dynamic Programming Solution</h3>
          <ol>
            <li>Base cases:
              <ul>
                <li>dp[0] = 1 (one way to climb zero steps)</li>
                <li>dp[1] = 1 (one way to climb one step)</li>
              </ul>
            </li>
            <li>For each step i from 2 to n:
              <ul>
                <li>dp[i] = dp[i-1] + dp[i-2]</li>
                <li>This represents ways to reach step i from (i-1) and (i-2)</li>
              </ul>
            </li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(n) where n is the number of steps</p>
          
          <h3>Space Complexity</h3>
          <p>O(n) for the dp array</p>

          <h3>Key Points:</h3>
          <ul>
            <li>Similar to Fibonacci sequence</li>
            <li>Can be optimized to O(1) space</li>
            <li>Bottom-up approach avoids recursion overhead</li>
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
        </div>
        <CodeSnippet 
          language={language}
          code={implementations[language]}
        />
      </section>
    </div>
  );
};

export default ClimbingStairs;