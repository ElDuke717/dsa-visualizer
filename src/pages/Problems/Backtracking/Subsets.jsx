// src/pages/Problems/Backtracking/Subsets.jsx
import React, { useState } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';

const Subsets = () => {
  const [nums, setNums] = useState([1, 2, 3]);
  const [currentSubset, setCurrentSubset] = useState([]);
  const [allSubsets, setAllSubsets] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState('javascript');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setCurrentSubset([]);
    setAllSubsets([]);
    setCurrentIndex(-1);
  };

  const findSubsets = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    const backtrack = async (start = 0, current = []) => {
      // Add current subset to results
      setCurrentSubset([...current]);
      setAllSubsets(prev => [...prev, [...current]]);
      await sleep(speed);

      // Try adding each remaining number
      for (let i = start; i < nums.length; i++) {
        setCurrentIndex(i);
        await sleep(speed);

        // Include current number
        current.push(nums[i]);
        // Recursively find subsets with this number
        await backtrack(i + 1, current);
        // Backtrack by removing the number
        current.pop();
      }
    };

    await backtrack();
    setCurrentIndex(-1);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
  function subsets(nums) {
      const result = [];
      
      function backtrack(start = 0, current = []) {
          result.push([...current]);
          
          for (let i = start; i < nums.length; i++) {
              current.push(nums[i]);
              backtrack(i + 1, current);
              current.pop();
          }
      }
      
      backtrack();
      return result;
  }`,
    python: `
  def subsets(nums: List[int]) -> List[List[int]]:
      result = []
      
      def backtrack(start = 0, current = []):
          result.append(current[:])
          
          for i in range(start, len(nums)):
              current.append(nums[i])
              backtrack(i + 1, current)
              current.pop()
      
      backtrack()
      return result`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Subsets</h1>
        <div className="problem-meta">
          <span className="difficulty medium">Medium</span>
          <span className="category">Backtracking</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          Given an integer array nums of unique elements, return all possible subsets (the power set).
          The solution set must not contain duplicate subsets. Return the solution in any order.
        </p>
        <p>
          Example: For nums = [1,2,3], the power set is: 
          [[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]
        </p>
      </section>

      <section className="visualization">
        <div className="array-state">
          <div className="array-display">
            {nums.map((num, idx) => (
              <div 
                key={idx}
                className={`array-cell ${
                  idx === currentIndex ? 'current' :
                  currentSubset.includes(num) ? 'selected' : ''
                }`}
              >
                {num}
              </div>
            ))}
          </div>
          
          <div className="subset-info">
            <div>Current Subset: [{currentSubset.join(', ')}]</div>
          </div>

          <div className="all-subsets">
            <h3>All Subsets Found:</h3>
            <div className="subsets-grid">
              {allSubsets.map((subset, idx) => (
                <div 
                  key={idx}
                  className={`subset-item ${
                    JSON.stringify(subset) === JSON.stringify(currentSubset) 
                      ? 'current-subset' 
                      : ''
                  }`}
                >
                  [{subset.join(', ')}]
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="controls">
          <div className="input-group">
            <label>Numbers (comma-separated):</label>
            <input
              value={nums.join(',')}
              onChange={(e) => {
                const vals = e.target.value.split(',').map(Number);
                if (vals.every(n => !isNaN(n))) {
                  setNums(vals);
                }
              }}
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
            <button onClick={findSubsets} disabled={isRunning}>
              Generate Subsets
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
          <h3>Backtracking Solution</h3>
          <ol>
            <li>Start with empty subset</li>
            <li>For each number, we have two choices:
              <ul>
                <li>Include it in the current subset</li>
                <li>Skip it and move to next number</li>
              </ul>
            </li>
            <li>Use backtracking to try all possibilities</li>
            <li>Add each valid subset to result</li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(2^n) where n is the length of the input array</p>
          
          <h3>Space Complexity</h3>
          <p>O(n) for the recursion stack</p>
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

export default Subsets;