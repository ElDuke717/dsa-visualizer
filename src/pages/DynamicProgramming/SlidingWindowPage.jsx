/// src/pages/DynamicProgramming/SlidingWindowPage.jsx
import React, { useState, useEffect } from "react";
import SlidingWindowVisualizer from "../../components/DataStructureVisualizer/SlidingWindowVisualizer";
import CodeSnippet from "../../components/CodeSnippet/CodeSnippet";
import "./DynamicProgramming.css";

const SlidingWindowPage = () => {
  const [array, setArray] = useState([2, 1, 5, 1, 3, 2, 8, 1, 4]);
  const [windowSize, setWindowSize] = useState(3);
  const [windowStart, setWindowStart] = useState(0);
  const [windowEnd, setWindowEnd] = useState(2);
  const [currentSum, setCurrentSum] = useState(null);
  const [maxSum, setMaxSum] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [language, setLanguage] = useState("javascript");

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const generateRandomArray = () => {
    const newArray = Array.from(
      { length: 10 },
      () => Math.floor(Math.random() * 9) + 1,
    );
    setArray(newArray);
    resetVisualization(newArray); // Pass new array to reset
  };

  // Modified reset to accept optional new array and window size
  const resetVisualization = (
    currentArray = array,
    currentWindowSize = windowSize,
  ) => {
    setWindowStart(0);
    // Ensure windowEnd doesn't exceed bounds, especially if windowSize > array.length
    setWindowEnd(Math.min(currentWindowSize - 1, currentArray.length - 1));
    setCurrentSum(null);
    setMaxSum(null);
    // Ensure window size is not larger than the array length
    if (currentWindowSize > currentArray.length) {
      setWindowSize(currentArray.length);
    }
  };

  // Update windowEnd when windowSize changes
  useEffect(() => {
    resetVisualization(array, windowSize);
  }, [windowSize]);

  // Update visualization when array changes
  useEffect(() => {
    resetVisualization(array, windowSize);
  }, [array]);

  const findMaxSumSubarray = async () => {
    if (isRunning || windowSize <= 0 || windowSize > array.length) return; // Add checks
    setIsRunning(true);
    resetVisualization(); // Reset based on current state

    let currentMaxSum = -Infinity; // Use -Infinity for arrays with negative numbers
    let windowSum = 0;
    let start = 0;

    // Calculate sum of first window
    for (let end = 0; end < array.length; end++) {
      windowSum += array[end];
      setWindowEnd(end);
      setCurrentSum(windowSum);
      await sleep(speed); // Show adding elements

      // Check if the window size is reached
      if (end >= windowSize - 1) {
        if (start === 0) {
          // First full window
          currentMaxSum = windowSum;
          setMaxSum(currentMaxSum);
        } else {
          // Subsequent windows
          if (windowSum > currentMaxSum) {
            currentMaxSum = windowSum;
            setMaxSum(currentMaxSum);
          }
        }

        // Slide the window: subtract the element going out
        windowSum -= array[start];
        start++;
        setWindowStart(start);
        // Update currentSum after removing element for clarity, though it's about to be updated again
        setCurrentSum(windowSum);
        await sleep(speed); // Show sliding effect
      }
    }

    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function findMaxSumSubarray(arr, k) {
  if (k <= 0 || k > arr.length) {
    return 0; // Or handle error appropriately
  }

  let maxSum = -Infinity; // Handle negative numbers correctly
  let windowSum = 0;
  let windowStart = 0;

  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd]; // Add the next element

    // Slide the window if we've reached the size k
    if (windowEnd >= k - 1) {
      maxSum = Math.max(maxSum, windowSum); // Update max sum
      windowSum -= arr[windowStart]; // Subtract the element leaving the window
      windowStart++; // Slide the window ahead
    }
  }

  // If maxSum remained -Infinity, it means k might be > arr.length or arr is empty
  // Or if all numbers are negative, maxSum would be the largest negative sum.
  // If the problem requires sum of 0 for empty valid subarrays, adjust logic.
  // For this problem (max sum of size k), if k is valid, maxSum will be updated.
  return maxSum === -Infinity ? 0 : maxSum; // Adjust return based on edge case reqs
}`,
    python: `
import math

def find_max_sum_subarray(arr, k):
    if k <= 0 or k > len(arr):
        return 0 # Or handle error

    max_sum = -math.inf # Handle negative numbers
    window_sum = 0
    window_start = 0

    for window_end in range(len(arr)):
        window_sum += arr[window_end] # Add next element

        # Slide window when size k is reached
        if window_end >= k - 1:
            max_sum = max(max_sum, window_sum) # Update max sum
            window_sum -= arr[window_start] # Subtract leaving element
            window_start += 1 # Slide window

    # Handle edge case where no valid subarray of size k exists or all sums are negative
    return max_sum if max_sum != -math.inf else 0`,
  };

  return (
    <div className="page-container">
      <h1>Sliding Window Pattern</h1>

         <p>
        The Sliding Window pattern is a powerful algorithmic technique used to
        efficiently process contiguous portions (subarrays or substrings) of
        linear data structures like arrays or strings. It works by maintaining
        a "window" of a specific size (fixed or dynamic) that slides over the
        data. As the window moves, calculations are updated incrementally by
        adding the new element entering the window and removing the element
        leaving it, rather than recomputing from scratch for each possible
        subarray. This approach significantly optimizes performance, typically
        reducing time complexity from ( O(N times K)) or ( O(N^2) ) for
        brute-force methods down to ( O(N) ), making it ideal for problems
        involving finding optimal subarrays/substrings under certain
        conditions.
      </p>
   
      <h2>Max Sum Subarray of Size K Problem</h2>
      <p>
        This specific problem involves finding the contiguous subarray of a
        fixed size 'K' within a given array that has the largest sum.
      </p>
      <h3>Objective:</h3>
      <p>
        Given an array of integers `nums` and an integer `k`, find the maximum
        sum of a contiguous subarray of size `k`.
      </p>
      <h3>Constraints:</h3>
      <ul>
        <li>The array can contain both positive and negative numbers.</li>
        <li>{`1 <= k <= nums.length`}</li>
        <li>The array `nums` contains at least `k` elements.</li>
      </ul>
      <h3>Example:</h3>
      <pre>
        {`
Input: nums = [2, 1, 5, 1, 3, 2], k = 3
Output: 9 (because the subarray [5, 1, 3] has the largest sum = 9)

Input: nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4], k = 4
Output: 6 (because the subarray [4, -1, 2, 1] has the largest sum = 6)
        `}
      </pre>

      <section className="visualization">
        <SlidingWindowVisualizer
          array={array}
          windowStart={windowStart}
          windowEnd={windowEnd}
          currentSum={currentSum}
          maxSum={maxSum}
        />
        <div className="controls">
          <div className="input-group">
            <label>Window Size (K):</label>
            <input
              type="number"
              min="1"
              max={array.length} // Ensure max is dynamic based on current array
              value={windowSize}
              onChange={(e) => {
                const newSize = Number(e.target.value);
                // Prevent setting size larger than array length
                if (newSize <= array.length) {
                  setWindowSize(newSize);
                  // resetVisualization will be called by useEffect
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
              max="2000"
              step="100" // Added step for better control
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              disabled={isRunning}
            />
            <span>{speed}ms</span> {/* Display current speed */}
          </div>
          <div className="button-group">
            <button onClick={generateRandomArray} disabled={isRunning}>
              Generate New Array
            </button>
            <button
              onClick={findMaxSumSubarray}
              disabled={
                isRunning || windowSize <= 0 || windowSize > array.length
              } // Disable if k is invalid
            >
              Start Visualization
            </button>
            {/* Reset button is less critical if state resets automatically */}
            {/* <button onClick={() => resetVisualization()} disabled={isRunning}>
              Reset View
            </button> */}
          </div>
        </div>
        {/* Display current/max sum clearly */}
        <div className="sum-display">
          <p>
            Current Window Sum:{" "}
            {currentSum !== null ? currentSum : "N/A"}
          </p>
          <p>
            Maximum Sum Found:{" "}
            {maxSum !== null ? maxSum : "N/A"}
          </p>
        </div>
      </section>

      <section className="explanation">
        <h2>Sliding Window Pattern Explained</h2>
        <p>
          The Sliding Window pattern is particularly useful for problems that
          require examining subsets (like subarrays or substrings) of data.
          Instead of generating all possible subsets and processing them (which
          is often inefficient), we use a 'window' that slides across the data.
        </p>
        <p>
          For the "Max Sum Subarray of Size K" problem:
        </p>
        <ol>
          <li>
            Calculate the sum of the first 'K' elements. This is our initial
            window sum and potentially the maximum sum so far.
          </li>
          <li>
            Slide the window one position to the right:
            <ul>
              <li>Subtract the element that just left the window (at the start).</li>
              <li>Add the new element that just entered the window (at the end).</li>
            </ul>
          </li>
          <li>
            Compare the new window sum with the current maximum sum found, and
            update the maximum if the new sum is greater.
          </li>
          <li>Repeat step 2 and 3 until the window reaches the end of the array.</li>
        </ol>
        <p>
          This avoids redundant calculations, as we only perform one addition
          and one subtraction for each step the window slides.
        </p>

        <div className="features">
          <h3>When to use Sliding Window:</h3>
          <ul>
            <li>
              Problems involving contiguous subarrays, sublists, or substrings.
            </li>
            <li>
              Finding max/min values, counts, or averages over a subset of a
              fixed or variable size.
            </li>
            <li>
              Problems where brute-force involves nested loops to check all
              subsets (e.g., ( O(N^2) ) or ( O(N times K) )).
            </li>
          </ul>

          <h3>Common Problems Solved with Sliding Window:</h3>
          <ul>
            <li>Maximum/Minimum sum subarray of size 'K'</li>
            <li>Longest substring/subarray with 'K' distinct characters</li>
            <li>Smallest subarray with a sum greater than or equal to 'S'</li>
            <li>String anagrams / Permutation in a string</li>
            <li>Minimum window substring (LeetCode Hard)</li>
          </ul>

          <h3>Time Complexity:</h3>
          <ul>
            <li>
              Typically ( O(N) ), where N is the size of the input array or
              string, because each element is processed (added and potentially
              removed from the window) at most a constant number of times.
            </li>
            <li>
              Significantly better than brute-force approaches like \( O(N \times K) \)
              or \( O(N^2) \).
            </li>
          </ul>

          <h3>Space Complexity:</h3>
          <ul>
            <li>
              Usually ( O(1) ) if only a few variables are needed to track the
              window's state (like sum, start/end pointers).
            </li>
            <li>
              Can be ( O(K) ) or ( O(M) ) (where K is window size or M is
              the size of the character set/map) if additional storage is needed,
              e.g., to store elements within the window or track character
              frequencies.
            </li>
          </ul>
        </div>
      </section>

      <section className="implementation">
        <h2>Code Implementation</h2>
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
        <CodeSnippet
          language={language}
          code={implementations[language]}
        />
      </section>
    </div>
  );
};

export default SlidingWindowPage;
