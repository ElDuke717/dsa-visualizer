// src/pages/DynamicProgramming/TwoPointersPage.jsx
import React, { useState } from "react";
import TwoPointersVisualizer from "../../components/DataStructureVisualizer/TwoPointersVisualizer";
import CodeSnippet from "../../components/CodeSnippet/CodeSnippet";
import "./DynamicProgramming.css";

const TwoPointersPage = () => {
  const [array, setArray] = useState([-4, -1, 0, 1, 2, 3]);
  const [targetSum, setTargetSum] = useState(0);
  const [leftPointer, setLeftPointer] = useState(0);
  const [rightPointer, setRightPointer] = useState(array.length - 1);
  const [result, setResult] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [language, setLanguage] = useState("javascript");

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const generateRandomArray = () => {
    const newArray = Array.from(
      { length: 8 },
      () => Math.floor(Math.random() * 20) - 10
    ).sort((a, b) => a - b);
    setArray(newArray);
    resetVisualization();
  };

  const resetVisualization = () => {
    setLeftPointer(0);
    setRightPointer(array.length - 1);
    setResult([]);
  };

  const findPairWithSum = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    let left = 0;
    let right = array.length - 1;

    while (left < right) {
      setLeftPointer(left);
      setRightPointer(right);
      await sleep(speed);

      const currentSum = array[left] + array[right];

      if (currentSum === targetSum) {
        setResult([array[left], array[right]]);
        break;
      } else if (currentSum < targetSum) {
        left++;
      } else {
        right--;
      }
    }

    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function findPairWithSum(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    const currentSum = arr[left] + arr[right];
    
    if (currentSum === target) {
      return [arr[left], arr[right]];
    } else if (currentSum < target) {
      left++;
    } else {
      right--;
    }
  }
  
  return []; // No pair found
}`,
    python: `
def find_pair_with_sum(arr, target):
    left = 0
    right = len(arr) - 1
    
    while left < right:
        current_sum = arr[left] + arr[right]
        
        if current_sum == target:
            return [arr[left], arr[right]]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    
    return []  # No pair found`,
  };

  return (
    <div className="page-container">
      <h1>Two Pointers Pattern</h1>
      
      <p>
        The Two Pointers pattern is an efficient technique that uses two pointers to iterate through a data structure, 
        typically an array or linked list. These pointers can start at different positions and move toward each other 
        or in the same direction at different speeds. This approach is particularly effective for solving problems 
        involving sorted arrays, searching for pairs with specific constraints, or when we need to compare elements 
        from different positions. By using two pointers instead of nested loops, we can often reduce the time complexity 
        from O(n²) to O(n), making it a powerful optimization technique for many algorithmic problems.
      </p>
      
      <h2>Find Pair with Target Sum Problem</h2>
    <p>
      The Find Pair with Target Sum problem involves finding two numbers in a given array that add up to a
      specific target sum.
    </p>
    <h3>Objective:</h3>
    <p>
      Given an array of integers and a target sum, return the indices of the two numbers such that they add up
      to the target sum.
    </p>
    <h3>Constraints:</h3>
    <ul>
      <li>Each input has exactly one solution.</li>
      <li>You cannot use the same element twice.</li>
      <li>Return the result as an array of two indices.</li>
    </ul>
    <h3>Example:</h3>
    <pre>
      {`
        Input: nums = [2, 7, 11, 15], target = 9
        Output: [0, 1] (because nums[0] + nums[1] = 2 + 7 = 9)
      `}
    </pre>
      <section className="visualization">
      
        <TwoPointersVisualizer
          array={array}
          leftPointer={leftPointer}
          rightPointer={rightPointer}
          result={result}
        />
        <div className="controls">
          <div className="input-group">
            <label>Target Sum:</label>
            <input
              type="number"
              value={targetSum}
              onChange={(e) => {
                setTargetSum(Number(e.target.value));
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
            <button onClick={generateRandomArray} disabled={isRunning}>
              Generate New Array
            </button>
            <button onClick={findPairWithSum} disabled={isRunning}>
              Find Pair
            </button>
            <button onClick={resetVisualization} disabled={isRunning}>
              Reset
            </button>
          </div>
        </div>
      </section>

      <section className="explanation">
        <h2>Two Pointers Pattern</h2>
        <p>
          The Two Pointers pattern uses two pointers to iterate through an array
          or sequence from different positions. This pattern is particularly
          useful for solving problems involving sorted arrays or when searching
          for pairs with certain constraints.
        </p>

        <div className="features">
          <h3>When to use Two Pointers:</h3>
          <ul>
            <li>Dealing with sorted arrays</li>
            <li>Finding pairs in an array</li>
            <li>Comparing strings from start and end</li>
            <li>Searching for triplets or subarrays</li>
          </ul>

          <h3>Common Problems:</h3>
          <ul>
            <li>Two Sum II (sorted array)</li>
            <li>Remove Duplicates</li>
            <li>Squaring a Sorted Array</li>
            <li>Triplet Sum to Zero</li>
            <li>Dutch National Flag Problem</li>
          </ul>

          <h3>Time Complexity:</h3>
          <ul>
            <li>Usually O(n) where n is the size of the input</li>
            <li>Much better than nested loop approach O(n²)</li>
          </ul>

          <h3>Space Complexity:</h3>
          <ul>
            <li>Usually O(1) as we only use two pointers</li>
            <li>May be O(n) if we need to store results</li>
          </ul>

          <h3>Key Characteristics:</h3>
          <ul>
            <li>Input is often sorted</li>
            <li>In-place operations possible</li>
            <li>Linear time complexity</li>
            <li>Constant space complexity</li>
          </ul>
        </div>
      </section>

      <section className="implementation">
        <div className="language-selector">
          <button
            onClick={() => setLanguage("javascript")}
            className={`lang-button ${
              language === "javascript" ? "active" : ""
            }`}
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

export default TwoPointersPage;
