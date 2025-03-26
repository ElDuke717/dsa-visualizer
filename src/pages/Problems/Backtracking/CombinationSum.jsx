import React, { useState } from "react";
import CodeSnippet from "../../../components/CodeSnippet/CodeSnippet";
import "../Problems.css";
import "./CombinationSum.css";

const CombinationSum = () => {
  const [candidates, setCandidates] = useState([2, 3, 6, 7]);
  const [target, setTarget] = useState(7);
  const [currentCombination, setCurrentCombination] = useState([]);
  const [currentSum, setCurrentSum] = useState(0);
  const [results, setResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState("javascript");

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setCurrentCombination([]);
    setCurrentSum(0);
    setResults([]);
  };

  const findCombinations = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    const result = [];

    const backtrack = async (startIndex, remaining, temp) => {
      if (remaining === 0) {
        result.push([...temp]);
        setResults([...result]);
        await sleep(speed);
        return;
      }
      
      if (remaining < 0) return;

      for (let i = startIndex; i < candidates.length; i++) {
        temp.push(candidates[i]);
        setCurrentCombination([...temp]);
        setCurrentSum(target - remaining + candidates[i]);
        await sleep(speed);

        await backtrack(i, remaining - candidates[i], temp);

        temp.pop();
        setCurrentCombination([...temp]);
        setCurrentSum(target - remaining);
        await sleep(speed);
      }
    };

    await backtrack(0, target, []);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
/**
 * @param {number[]} candidates - Array of candidate numbers.
 * @param {number} target - Target sum to achieve with combinations.
 * @return {number[][]} - All unique combinations that add up to the target.
 */
function combinationSum(candidates, target) {
  // Array to store all valid combinations
  const result = [];
  
  /**
   * backtrack recursively builds combinations.
   * @param {number} startIndex - The index to start iterating from.
   * @param {number} remaining - Remaining value to reach the target.
   * @param {number[]} temp - Temporary array holding the current combination.
   */
  function backtrack(startIndex, remaining, temp) {
    // If remaining equals 0, we've found a valid combination
    if (remaining === 0) {
      result.push([...temp]);
      return;
    }
    
    // If remaining is less than 0, the current combination exceeds the target; stop exploring this path
    if (remaining < 0) return;
    
    // Iterate through candidates starting from the current startIndex
    for (let i = startIndex; i < candidates.length; i++) {
      // Add the candidate to the current combination
      temp.push(candidates[i]);
      // Recursively call backtrack with the updated remaining value
      // We pass "i" as the startIndex to allow the same candidate to be reused
      backtrack(i, remaining - candidates[i], temp);
      // Backtrack: remove the last candidate added and try the next one in the loop
      temp.pop();
    }
  }
  
  // Start the backtracking with an empty combination and the full target
  backtrack(0, target, []);
  // Return all valid combinations found
  return result;
}


console.log(combinationSum([2,3,6,7], 7));`,
    python: `class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        result = []
        
        def backtrack(start_index, remaining, temp):
            if remaining == 0:
                result.append(list(temp))
                return
            
            if remaining < 0:
                return
                
            for i in range(start_index, len(candidates)):
                temp.append(candidates[i])
                backtrack(i, remaining - candidates[i], temp)
                temp.pop()
        
        backtrack(0, target, [])
        return result`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Combination Sum</h1>
        <div className="problem-meta">
          <span className="difficulty medium">Medium</span>
          <span className="category">Backtracking</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          Given an array of distinct integers candidates and a target integer target,
          return a list of all unique combinations of candidates where the chosen numbers sum to target.
        </p>
        <p>
          You may return the combinations in any order.
        </p>
        <p>
          The same number may be chosen from candidates an unlimited number of times.
        </p>
        <div className="example">
          <h3>Example:</h3>
          <div className="example-content">
            <p>Input: candidates = [2,3,6,7], target = 7</p>
            <p>Output: [[2,2,3],[7]]</p>
            <p>Explanation:</p>
            <ul>
              <li>2 + 2 + 3 = 7</li>
              <li>7 = 7</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="approach">
        <h2>Approach</h2>
        <div className="approach-content">
          <h3>Backtracking</h3>
          <ol>
            <li>Use backtracking to try different combinations of numbers.</li>
            <li>
              At each step, try using the current number multiple times by keeping the same start index.
            </li>
            <li>
              When the remaining sum becomes 0, we've found a valid combination.
            </li>
            <li>
              If the remaining sum becomes negative, we backtrack.
            </li>
          </ol>
          <h3>Time Complexity</h3>
          <p>O(N^(T/M)), where N is the number of candidates, T is the target value, and M is the minimal value among candidates.</p>
        </div>
      </section>

      <section className="visualization">
        <div className="combination-container">
          <div className="array-visualizer">
            <div className="array-row">
              {candidates.map((num, idx) => (
                <div
                  key={idx}
                  className={`array-cell ${
                    currentCombination.includes(num) ? 'used' : ''
                  } ${
                    currentCombination[currentCombination.length - 1] === num ? 'current' : ''
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>
            <div className="target-sum">
              Target: {target} | Current Sum: {currentSum}
            </div>
            <div className="current-combination">
              {currentCombination.map((num, idx) => (
                <div key={idx} className="combination-cell">
                  {num}
                </div>
              ))}
            </div>
          </div>

          <div className="controls">
            <div className="input-group">
              <label>Animation Speed (ms):</label>
              <input
                type="range"
                min="100"
                max="1000"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                disabled={isRunning}
              />
            </div>
            <div className="button-group">
              <button onClick={findCombinations} disabled={isRunning}>
                Find Combinations
              </button>
              <button onClick={resetVisualization} disabled={isRunning}>
                Reset
              </button>
            </div>
          </div>

          <div className="combinations-grid">
            {results.map((comb, idx) => (
              <div
                key={idx}
                className={`combination-item ${
                  JSON.stringify(comb) === JSON.stringify(currentCombination)
                    ? 'current'
                    : ''
                }`}
              >
                [{comb.join(',')}]
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="implementation">
        <h2>Implementation</h2>
        <div className="language-selector">
          <button
            onClick={() => setLanguage("javascript")}
            className={`lang-button ${language === "javascript" ? "active" : ""}`}
          >
            JavaScript
          </button>
          <button
            onClick={() => setLanguage("python")}
            className={`lang-button ${language === "python" ? "active" : ""}`}
          >
            Python
          </button>
        </div>
        <CodeSnippet language={language} code={implementations[language]} />
      </section>
    </div>
  );
};

export default CombinationSum;
