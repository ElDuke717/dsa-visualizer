// src/pages/Problems/TwoPointers/TwoSum.jsx
import React, { useState } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';

const TwoSum = () => {
  const [numbers, setNumbers] = useState([2, 7, 11, 15]);
  const [target, setTarget] = useState(9);
  const [left, setLeft] = useState(-1);
  const [right, setRight] = useState(-1);
  const [found, setFound] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState('javascript');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setLeft(-1);
    setRight(-1);
    setFound(false);
  };

  const findTwoSum = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    let l = 0;
    let r = numbers.length - 1;

    while (l < r) {
      setLeft(l);
      setRight(r);
      await sleep(speed);

      const sum = numbers[l] + numbers[r];
      
      if (sum === target) {
        setFound(true);
        setIsRunning(false);
        return;
      }
      
      if (sum < target) {
        l++;
      } else {
        r--;
      }
    }

    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function twoSum(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;
    
    while (left < right) {
        const sum = numbers[left] + numbers[right];
        
        if (sum === target) {
            return [left + 1, right + 1]; // 1-based indexing
        }
        
        if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return []; // No solution found
}`,
    python: `
def twoSum(numbers: List[int], target: int) -> List[int]:
    left, right = 0, len(numbers) - 1
    
    while left < right:
        curr_sum = numbers[left] + numbers[right]
        
        if curr_sum == target:
            return [left + 1, right + 1]  # 1-based indexing
        
        if curr_sum < target:
            left += 1
        else:
            right -= 1
            
    return []  # No solution found`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Two Sum II - Input Array Is Sorted</h1>
        <div className="problem-meta">
          <span className="difficulty easy">Easy</span>
          <span className="category">Two Pointers</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, 
          find two numbers such that they add up to a specific target number.
          Return the indices of the two numbers (1-indexed) as an integer array.
        </p>
      </section>

      <section className="visualization">
        <div className="array-visualizer">
          {numbers.map((num, idx) => (
            <div 
              key={idx}
              className={`array-cell ${
                idx === left ? 'left-pointer' :
                idx === right ? 'right-pointer' :
                ''
              } ${found && (idx === left || idx === right) ? 'found' : ''}`}
            >
              {num}
            </div>
          ))}
        </div>

        <div className="pointer-info">
          {left !== -1 && right !== -1 && (
            <>
              <div>Current Sum: {numbers[left] + numbers[right]}</div>
              <div>Target: {target}</div>
              {found && (
                <div className="success">
                  Found! Numbers {numbers[left]} and {numbers[right]} sum to {target}
                </div>
              )}
            </>
          )}
        </div>

        <div className="controls">
          <div className="input-group">
            <label>Numbers (comma-separated):</label>
            <input
              value={numbers.join(',')}
              onChange={(e) => {
                const vals = e.target.value.split(',').map(Number);
                if (vals.every(n => !isNaN(n))) {
                  setNumbers(vals);
                }
              }}
              disabled={isRunning}
            />
          </div>
          <div className="input-group">
            <label>Target:</label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
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
            <button onClick={findTwoSum} disabled={isRunning}>
              Find Two Sum
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
          <h3>Two Pointers Solution</h3>
          <ol>
            <li>Use two pointers: left at start, right at end</li>
            <li>Calculate current sum</li>
            <li>If sum equals target, we found the answer</li>
            <li>If sum is less than target, move left pointer right</li>
            <li>If sum is more than target, move right pointer left</li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(n) where n is the length of the array</p>
          
          <h3>Space Complexity</h3>
          <p>O(1) constant space</p>
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

export default TwoSum;