import React, { useState } from "react";
import CodeSnippet from "../../../components/CodeSnippet/CodeSnippet";
import "../Problems.css";
import "./Permutations.css";

const Permutations = () => {
  const [nums, setNums] = useState([1, 2, 3]);
  const [currentPermutation, setCurrentPermutation] = useState([]);
  const [used, setUsed] = useState([]);
  const [results, setResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState("javascript");

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setCurrentPermutation([]);
    setUsed(new Array(nums.length).fill(false));
    setResults([]);
  };

  const findPermutations = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    const result = [];
    const usedArray = new Array(nums.length).fill(false);
    setUsed(usedArray);

    const backtrack = async (temp) => {
      if (temp.length === nums.length) {
        result.push([...temp]);
        setResults([...result]);
        await sleep(speed);
        return;
      }

      for (let i = 0; i < nums.length; i++) {
        if (usedArray[i]) continue;

        usedArray[i] = true;
        temp.push(nums[i]);
        
        setUsed([...usedArray]);
        setCurrentPermutation([...temp]);
        await sleep(speed);

        await backtrack(temp);

        usedArray[i] = false;
        temp.pop();
        
        setUsed([...usedArray]);
        setCurrentPermutation([...temp]);
        await sleep(speed);
      }
    };

    await backtrack([]);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `/**
 * @param {number[]} nums - The input is an array of distinct integers.
 * @return {number[][]} - Return all possible permutations of the array.
 * 
 * Explanation:
 * - The output is an array of arrays of numbers.
 * - Iterate through each element in the array.
 * - For each element, iterate through the rest of the array.
 */

var permute = function(nums) {
  // Result is an array to store the permutations
  const result = [];
  
  // Used is an array to keep track of which elements have been used
  const used = new Array(nums.length).fill(false);
  
  // backtrack is a recursive function to generate the permutations
  const backtrack = (temp) => {
    // If the temp array is the same length as nums, add it to the result and return.
    if (temp.length === nums.length) {
      // If the temp array length is the same as nums, add the elements to an array then push to results
      result.push([...temp]);
      return;
    }
    
    // Iterate through the array
    for (let i = 0; i < nums.length; i++) {
      // If the current element is already used, skip to the next iteration of the loop
      if (used[i]) continue;
      
      // Mark the current element as used
      used[i] = true;
      
      // Push the current element of nums to the temp array
      temp.push(nums[i]);
      
      // Recursively call backtrack, iterate again
      backtrack(temp);
      
      // Pop off the last element of the temp array
      temp.pop();
      
      // Mark the current element as not used for future iterations
      used[i] = false;
    }
  };
  
  // Invoke backtrack with an empty array to be filled
  backtrack([]);
  
  // Return the result array when all elements have been added.
  return result;
};

console.log(permute([1,2,3]));`,
    python: `class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        result = []
        def backtrack(temp):
            if len(temp) == len(nums):
                result.append(list(temp))
                return
            for num in nums:
                if num in temp:
                    continue
                temp.append(num)
                backtrack(temp)
                temp.pop()
        backtrack([])
        return result`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Permutations</h1>
        <div className="problem-meta">
          <span className="difficulty medium">Medium</span>
          <span className="category">Backtracking</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          Given an array of distinct integers, return all the possible permutations.
        </p>
        <p>You can return the answer in any order.</p>
        <div className="example">
          <h3>Example:</h3>
          <div className="example-content">
            <p>Input: nums = [1,2,3]</p>
            <p>
              Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
            </p>
          </div>
        </div>
      </section>

      <section className="approach">
        <h2>Approach</h2>
        <div className="approach-content">
          <h3>Backtracking</h3>
          <ol>
            <li>Perform a depth-first search using backtracking.</li>
            <li>
              Add an unused element to the current permutation at each recursive call.
            </li>
            <li>
              When the current permutation reaches the length of nums, add a copy to the result.
            </li>
            <li>
              Backtrack by removing the last element and marking it as unused, then continue the process.
            </li>
          </ol>
          <h3>Time Complexity</h3>
          <p>O(N!), where N is the number of elements.</p>
        </div>
      </section>

      <section className="visualization">
        <div className="permutations-container">
          <div className="array-visualizer">
            <div className="array-row">
              {nums.map((num, idx) => (
                <div
                  key={idx}
                  className={`array-cell ${used[idx] ? 'used' : ''} ${
                    currentPermutation[currentPermutation.length - 1] === num ? 'current' : ''
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>
            <div className="current-permutation">
              {currentPermutation.map((num, idx) => (
                <div key={idx} className="permutation-cell">
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
              <button onClick={findPermutations} disabled={isRunning}>
                Find Permutations
              </button>
              <button onClick={resetVisualization} disabled={isRunning}>
                Reset
              </button>
            </div>
          </div>

          <div className="permutations-grid">
            {results.map((perm, idx) => (
              <div
                key={idx}
                className={`permutation-item ${
                  JSON.stringify(perm) === JSON.stringify(currentPermutation)
                    ? 'current'
                    : ''
                }`}
              >
                [{perm.join(',')}]
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

export default Permutations;
