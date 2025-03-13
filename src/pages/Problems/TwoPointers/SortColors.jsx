import React, { useState, useEffect } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';

const SortColors = () => {
  const [nums, setNums] = useState("2,0,2,1,1,0");
  const [currentArray, setCurrentArray] = useState([]);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [current, setCurrent] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState('javascript');
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    const parsedNums = parseNums();
    setCurrentArray([...parsedNums]);
    setLeft(0);
    setRight(parsedNums.length - 1);
    setCurrent(0);
    setSteps([]);
    setCurrentStep(0);
  };

  const parseNums = () => {
    return nums.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
  };

  useEffect(() => {
    resetVisualization();
  }, [nums]);

  const sortColors = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();
    
    const numsArray = parseNums();
    setCurrentArray([...numsArray]);
    
    const stepsArray = [];
    let p0 = 0; // pointer for 0
    let curr = 0; // current pointer
    let p2 = numsArray.length - 1; // pointer for 2
    
    // Add initial step
    stepsArray.push({
      array: [...numsArray],
      p0,
      curr,
      p2,
      message: `Initial array: [${numsArray.join(', ')}]`
    });
    setSteps([...stepsArray]);
    setCurrentStep(0);
    setLeft(p0);
    setCurrent(curr);
    setRight(p2);
    await sleep(speed);
    
    // Main algorithm
    while (curr <= p2) {
      if (numsArray[curr] === 0) {
        // If current element is 0, swap with p0 and increment both pointers
        stepsArray.push({
          array: [...numsArray],
          p0,
          curr,
          p2,
          message: `Found 0 at index ${curr}, swapping with element at index ${p0}`
        });
        setSteps([...stepsArray]);
        setCurrentStep(stepsArray.length - 1);
        await sleep(speed);
        
        [numsArray[p0], numsArray[curr]] = [numsArray[curr], numsArray[p0]];
        
        stepsArray.push({
          array: [...numsArray],
          p0,
          curr,
          p2,
          message: `Swapped elements, incrementing p0 and curr`
        });
        setSteps([...stepsArray]);
        setCurrentStep(stepsArray.length - 1);
        setCurrentArray([...numsArray]);
        await sleep(speed);
        
        p0++;
        curr++;
        setLeft(p0);
        setCurrent(curr);
      } else if (numsArray[curr] === 2) {
        // If current element is 2, swap with p2 and decrement p2
        stepsArray.push({
          array: [...numsArray],
          p0,
          curr,
          p2,
          message: `Found 2 at index ${curr}, swapping with element at index ${p2}`
        });
        setSteps([...stepsArray]);
        setCurrentStep(stepsArray.length - 1);
        await sleep(speed);
        
        [numsArray[curr], numsArray[p2]] = [numsArray[p2], numsArray[curr]];
        
        stepsArray.push({
          array: [...numsArray],
          p0,
          curr,
          p2,
          message: `Swapped elements, decrementing p2`
        });
        setSteps([...stepsArray]);
        setCurrentStep(stepsArray.length - 1);
        setCurrentArray([...numsArray]);
        await sleep(speed);
        
        p2--;
        setRight(p2);
        // Note: curr is not incremented here as we need to check the swapped element
      } else {
        // If current element is 1, just move forward
        stepsArray.push({
          array: [...numsArray],
          p0,
          curr,
          p2,
          message: `Found 1 at index ${curr}, keeping it in place and moving forward`
        });
        setSteps([...stepsArray]);
        setCurrentStep(stepsArray.length - 1);
        await sleep(speed);
        
        curr++;
        setCurrent(curr);
      }
    }
    
    // Final result
    stepsArray.push({
      array: [...numsArray],
      p0,
      curr,
      p2,
      message: `Sorting complete: [${numsArray.join(', ')}]`
    });
    setSteps([...stepsArray]);
    setCurrentStep(stepsArray.length - 1);
    setCurrentArray([...numsArray]);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// Sort in place, arrange numbers in chronological order
// Use an approach that uses three pointers, a variant on two pointers
// Make three regions, a pointer called low that will be the boundary for zeroes
// A mid region that scans through the array (iterates using a loop)
// A high pointer that marks the boundary before all twos
// Iterate with the mid pointer
// If element at pointer is a zero, swap it with the element at the low pointer and move low and mid together
// If element is a two, swap with element at the high pointer and move the high pointer backward - do not move mid immediately
// If you encounter a one, move mid forward
// Continue until mid passes high

var sortColors = function(nums) {
    // First pointer, low, is the index of the end of the zero region
    let low = 0;
    // Mid pointer starts at zero
    let mid = 0;
    //  Third pointer, high, is the index of the left edge of the twos region
    let high = nums.length - 1;
    // Iterate through the nums array with a while loop
    while (mid <= high) {
        if (nums[mid] === 0) {
            // Swap nums[low] and nums[high] 
            [nums[low ], nums[mid]] = [nums[mid], nums[low]];
            // Increment low and mid
            low+=1;
            mid+=1;
        } else if (nums[mid] === 1) {
            // Increment mid
            mid += 1;
        } else {
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            // Decrement high
            high-=1;
            // Note: DO NOT increment mid here. The swapped element at mid needs to be processed in the next iteration
        }
    }
};`,
    python: `class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        # Dutch national flag problem
        # Use three pointers: p0, curr, and p2
        p0 = 0  # pointer for 0
        curr = 0  # current pointer
        p2 = len(nums) - 1  # pointer for 2
        
        while curr <= p2:
            if nums[curr] == 0:
                # If current element is 0, swap with p0 and increment both pointers
                nums[p0], nums[curr] = nums[curr], nums[p0]
                p0 += 1
                curr += 1
            elif nums[curr] == 2:
                # If current element is 2, swap with p2 and decrement p2
                nums[curr], nums[p2] = nums[p2], nums[curr]
                p2 -= 1
                # Note: curr is not incremented here as we need to check the swapped element
            else:
                # If current element is 1, just move forward
                curr += 1`,
    java: `class Solution {
    public void sortColors(int[] nums) {
        // Dutch national flag problem
        // Use three pointers: p0, curr, and p2
        int p0 = 0; // pointer for 0
        int curr = 0; // current pointer
        int p2 = nums.length - 1; // pointer for 2
        
        while (curr <= p2) {
            if (nums[curr] == 0) {
                // If current element is 0, swap with p0 and increment both pointers
                int temp = nums[p0];
                nums[p0] = nums[curr];
                nums[curr] = temp;
                p0++;
                curr++;
            } else if (nums[curr] == 2) {
                // If current element is 2, swap with p2 and decrement p2
                int temp = nums[curr];
                nums[curr] = nums[p2];
                nums[p2] = temp;
                p2--;
                // Note: curr is not incremented here as we need to check the swapped element
            } else {
                // If current element is 1, just move forward
                curr++;
            }
        }
    }
}`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Sort Colors</h1>
        <div className="problem-meta">
          <span className="difficulty medium">Medium</span>
          <span className="category">Two Pointers</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          Given an array <code>nums</code> with <code>n</code> objects colored red, white, or blue, sort them <strong>in-place</strong> so that objects of the same color are adjacent, with the colors in the order red, white, and blue.
        </p>
        <p>
          We will use the integers <code>0</code>, <code>1</code>, and <code>2</code> to represent the color red, white, and blue, respectively.
        </p>
        <p>
          You must solve this problem without using the library's sort function.
        </p>
      </section>

      <section className="examples">
        <h2>Examples</h2>
        <pre>
          {`Example 1:
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]

Example 2:
Input: nums = [2,0,1]
Output: [0,1,2]`}
        </pre>
      </section>

      <section className="visualization">
        <h2>Visualization</h2>
        <div className="array-visualizer">
          {currentArray.map((num, idx) => (
            <div 
              key={idx}
              className={`array-cell ${
                idx === left ? 'left-pointer' :
                idx === current ? 'current' :
                idx === right ? 'right-pointer' : ''
              } ${
                num === 0 ? 'color-red' :
                num === 1 ? 'color-white' :
                'color-blue'
              }`}
            >
              {num}
            </div>
          ))}
        </div>

        <div className="pointer-info">
          <div>p0 (red pointer): {left}</div>
          <div>curr (current): {current}</div>
          <div>p2 (blue pointer): {right}</div>
        </div>

        <div className="steps-container">
          <h3>Algorithm Steps</h3>
          <div className="steps-list">
            {steps.map((step, idx) => (
              <div key={idx} className={`step-item ${idx === currentStep ? 'current-step' : ''}`}>
                <div>Step {idx + 1}:</div>
                <div>Array: [{step.array.join(', ')}]</div>
                <div>p0: {step.p0}, curr: {step.curr}, p2: {step.p2}</div>
                <div>{step.message}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="controls">
          <div className="input-group">
            <label>Input Array (comma-separated):</label>
            <input
              value={nums}
              onChange={(e) => setNums(e.target.value)}
              disabled={isRunning}
              style={{ width: '300px' }}
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
            <button onClick={sortColors} disabled={isRunning}>
              Sort Colors
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
          <h3>Dutch National Flag Algorithm</h3>
          <p>
            This problem is a variation of the famous "Dutch National Flag problem" proposed by Edsger W. Dijkstra. The solution uses a three-way partitioning approach with three pointers:
          </p>
          <ol>
            <li>Use three pointers:
              <ul>
                <li><code>p0</code>: Points to the rightmost boundary of 0s (red)</li>
                <li><code>curr</code>: Current element being examined</li>
                <li><code>p2</code>: Points to the leftmost boundary of 2s (blue)</li>
              </ul>
            </li>
            <li>Iterate through the array with <code>curr</code> until it crosses <code>p2</code>:
              <ul>
                <li>If <code>nums[curr] == 0</code>: Swap with <code>nums[p0]</code>, increment both <code>p0</code> and <code>curr</code></li>
                <li>If <code>nums[curr] == 2</code>: Swap with <code>nums[p2]</code>, decrement <code>p2</code> (don't increment <code>curr</code> as we need to check the swapped element)</li>
                <li>If <code>nums[curr] == 1</code>: Just increment <code>curr</code></li>
              </ul>
            </li>
          </ol>

          <h3>Time Complexity</h3>
          <p>O(n) where n is the length of the array. We traverse the array once.</p>
          
          <h3>Space Complexity</h3>
          <p>O(1) as we sort the array in-place without using extra space.</p>
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
          <button 
            onClick={() => setLanguage('java')}
            className={`lang-button ${language === 'java' ? 'active' : ''}`}
          >
            Java
          </button>
        </div>
        <CodeSnippet 
          language={language === 'java' ? 'java' : language}
          code={implementations[language]}
        />
      </section>
    </div>
  );
};

export default SortColors;
