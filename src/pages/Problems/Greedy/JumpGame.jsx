import React, { useState } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css'; // Reusing general problem styles

const JumpGame = () => {
  const [nums, setNums] = useState([2, 3, 1, 1, 4]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [maxReachable, setMaxReachable] = useState(-1);
  const [canReachEnd, setCanReachEnd] = useState(null); // null: not run, true: yes, false: no
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState('javascript');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setCurrentIndex(-1);
    setMaxReachable(-1);
    setCanReachEnd(null);
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

  const checkCanJump = async () => {
    if (isRunning || nums.length === 0) return;
    setIsRunning(true);
    resetVisualization();

    let currentMaxReachable = 0;
    setMaxReachable(0);

    for (let i = 0; i < nums.length; i++) {
      setCurrentIndex(i);
      await sleep(speed);

      // If the current index is beyond the max reachable index, we can't proceed
      if (i > currentMaxReachable) {
        setCanReachEnd(false);
        setIsRunning(false);
        setCurrentIndex(-1); // Indicate completion
        return;
      }

      // Update the maximum index reachable from the current position
      currentMaxReachable = Math.max(currentMaxReachable, i + nums[i]);
      setMaxReachable(currentMaxReachable);
      await sleep(speed / 2);

      // If the max reachable index is at or beyond the last index, we can reach the end
      if (currentMaxReachable >= nums.length - 1) {
        setCanReachEnd(true);
        setIsRunning(false);
        setCurrentIndex(nums.length - 1); // Highlight the end
        await sleep(speed);
        setCurrentIndex(-1); // Indicate completion
        return;
      }
    }

    // If the loop finishes and we haven't returned true, it means we couldn't reach the end
    // (This case might be redundant due to the check inside the loop, but included for clarity)
    setCanReachEnd(currentMaxReachable >= nums.length - 1);
    setIsRunning(false);
    setCurrentIndex(-1); // Indicate completion
  };

  const implementations = {
    javascript: `
function canJump(nums) {
    let maxReachable = 0;
    for (let i = 0; i < nums.length; i++) {
        // If the current index is not reachable, return false
        if (i > maxReachable) {
            return false;
        }
        // Update the maximum index we can reach
        maxReachable = Math.max(maxReachable, i + nums[i]);
        
        // If we can reach or exceed the last index, return true
        if (maxReachable >= nums.length - 1) {
            return true;
        }
    }
    // Should not be reached if nums.length > 0, but handles empty array case implicitly
    return maxReachable >= nums.length - 1; 
}`,
    python: `
from typing import List

def canJump(nums: List[int]) -> bool:
    max_reachable = 0
    for i, jump_length in enumerate(nums):
        # If the current index is not reachable, return False
        if i > max_reachable:
            return False
        # Update the maximum index we can reach
        max_reachable = max(max_reachable, i + jump_length)
        
        # If we can reach or exceed the last index, return True
        if max_reachable >= len(nums) - 1:
            return True
            
    # If loop finishes, it means we reached the end (or array was empty/single element)
    return True # Or check max_reachable >= len(nums) - 1 if needed for edge cases
`
  };

  // Basic visualization showing the array, current index, and max reachable index
  const renderArrayCells = () => {
    return nums.map((num, idx) => {
      let cellClass = 'array-cell jump-cell';
      if (idx === currentIndex) cellClass += ' current';
      if (idx <= maxReachable && maxReachable !== -1) cellClass += ' reachable';
      if (idx === nums.length - 1 && canReachEnd === true) cellClass += ' end-reached';
       if (idx === currentIndex && canReachEnd === false) cellClass += ' stuck';


      return (
        <div key={idx} className={cellClass} title={`Max jump: ${num}`}>
          {num}
          <div className="index-label">{idx}</div>
        </div>
      );
    });
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Jump Game</h1>
        <div className="problem-meta">
          <span className="difficulty medium">Medium</span>
          <span className="category">Greedy Algorithms</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          You are given an integer array <code>nums</code>. You are initially positioned at the array's first index,
          and each element in the array represents your maximum jump length at that position.
        </p>
        <p>
          Return <code>true</code> if you can reach the last index, or <code>false</code> otherwise.
        </p>
        <p><strong>LeetCode #55</strong></p>
        <p>
          Example 1: <code>nums = [2, 3, 1, 1, 4]</code> → <code>true</code> (Jump 1 step from index 0 to 1, then 3 steps to the last index).
        </p>
         <p>
          Example 2: <code>nums = [3, 2, 1, 0, 4]</code> → <code>false</code> (You will always arrive at index 3. Its maximum jump length is 0, which makes it impossible to reach the last index).
        </p>
      </section>

      <section className="visualization">
        <div className="array-visualizer jump-visualizer">
          {renderArrayCells()}
        </div>
        <div className="jump-info">
          {currentIndex !== -1 && <div>Current Index: {currentIndex}</div>}
          {maxReachable !== -1 && <div>Max Reachable Index: {maxReachable}</div>}
          {canReachEnd !== null && (
            <div className={`result-message ${canReachEnd ? 'success' : 'failure'}`}>
              {canReachEnd ? 'Can reach the end!' : 'Cannot reach the end!'}
            </div>
          )}
        </div>

        <div className="controls">
          <div className="input-group">
            <label>Nums (comma-separated):</label>
            <input
              type="text"
              value={nums.join(',')}
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
            <button onClick={checkCanJump} disabled={isRunning}>
              Check Can Jump
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
          <h3>Greedy Approach</h3>
          <p>
            The core idea is to iterate through the array and keep track of the maximum index we can reach so far.
            At each position, we check if the current position is reachable. If it is, we update the maximum reachable index based on the jump length from the current position.
          </p>
          <ol>
            <li>Initialize <code>maxReachable = 0</code>. This represents the farthest index we can currently reach.</li>
            <li>Iterate through the array with index <code>i</code> from 0 to <code>nums.length - 1</code>.</li>
            <li>At each index <code>i</code>, check if <code>i</code> is greater than <code>maxReachable</code>. If it is, it means the current index <code>i</code> is unreachable from the previous positions, so we cannot reach the end. Return <code>false</code>.</li>
            <li>Update <code>maxReachable</code> by taking the maximum of its current value and <code>i + nums[i]</code> (the farthest we can reach from the current index).</li>
            <li>If at any point <code>maxReachable</code> becomes greater than or equal to the last index (<code>nums.length - 1</code>), it means we can reach the end. Return <code>true</code>.</li>
            <li>If the loop completes without returning <code>false</code>, it means we could reach the last index (or the array was empty/single element). Return <code>true</code>.</li>
          </ol>

          <h3>Why is this Greedy?</h3>
          <p>
            At each step <code>i</code>, we are greedily updating the maximum reach possible. We don't need to explore all possible jump combinations. We only care about the farthest point we can get to. If this farthest point ever falls short of the current index we are trying to visit, we know it's impossible.
          </p>

          <h3>Time Complexity</h3>
          <p>O(n) where n is the length of the <code>nums</code> array, as we make a single pass.</p>

          <h3>Space Complexity</h3>
          <p>O(1) - we only use a constant amount of extra space.</p>
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

export default JumpGame;
