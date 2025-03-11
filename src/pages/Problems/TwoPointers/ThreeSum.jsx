import React, { useState, useEffect } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';

const ThreeSum = () => {
  const [numbers, setNumbers] = useState([-1, 0, 1, 2, -1, -4]);
  const [sortedNumbers, setSortedNumbers] = useState([]);
  const [i, setI] = useState(-1);
  const [left, setLeft] = useState(-1);
  const [right, setRight] = useState(-1);
  const [triplets, setTriplets] = useState([]);
  const [currentTriplet, setCurrentTriplet] = useState([]);
  const [currentSum, setCurrentSum] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState('javascript');
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setSortedNumbers([...numbers].sort((a, b) => a - b));
    setI(-1);
    setLeft(-1);
    setRight(-1);
    setTriplets([]);
    setCurrentTriplet([]);
    setCurrentSum(null);
    setSteps([]);
    setCurrentStep(0);
  };

  useEffect(() => {
    resetVisualization();
  }, [numbers]);

  const findThreeSum = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();
    
    const sorted = [...numbers].sort((a, b) => a - b);
    setSortedNumbers(sorted);
    
    const stepsArray = [];
    const tripletsArray = [];
    
    // Add initial step
    stepsArray.push({
      message: `Sorted array: [${sorted.join(', ')}]`,
      i: -1,
      left: -1,
      right: -1,
      currentSum: null,
      currentTriplet: [],
      triplets: []
    });
    setSteps([...stepsArray]);
    setCurrentStep(0);
    await sleep(speed);
    
    // Handle edge case
    if (sorted.length < 3) {
      stepsArray.push({
        message: `Array has less than 3 elements, returning empty result.`,
        i: -1,
        left: -1,
        right: -1,
        currentSum: null,
        currentTriplet: [],
        triplets: []
      });
      setSteps([...stepsArray]);
      setCurrentStep(1);
      setIsRunning(false);
      return;
    }
    
    // Main algorithm
    for (let idx = 0; idx < sorted.length - 2; idx++) {
      // Skip duplicates for the first element
      if (idx > 0 && sorted[idx] === sorted[idx - 1]) {
        stepsArray.push({
          message: `Skipping duplicate value at index ${idx} (${sorted[idx]})`,
          i: idx,
          left: -1,
          right: -1,
          currentSum: null,
          currentTriplet: [],
          triplets: [...tripletsArray]
        });
        setSteps([...stepsArray]);
        setCurrentStep(stepsArray.length - 1);
        setI(idx);
        await sleep(speed);
        continue;
      }
      
      setI(idx);
      let l = idx + 1;
      let r = sorted.length - 1;
      
      stepsArray.push({
        message: `Setting i=${idx} (${sorted[idx]}), left=${l} (${sorted[l]}), right=${r} (${sorted[r]})`,
        i: idx,
        left: l,
        right: r,
        currentSum: null,
        currentTriplet: [sorted[idx], sorted[l], sorted[r]],
        triplets: [...tripletsArray]
      });
      setSteps([...stepsArray]);
      setCurrentStep(stepsArray.length - 1);
      setLeft(l);
      setRight(r);
      setCurrentTriplet([sorted[idx], sorted[l], sorted[r]]);
      await sleep(speed);
      
      while (l < r) {
        setLeft(l);
        setRight(r);
        setCurrentTriplet([sorted[idx], sorted[l], sorted[r]]);
        
        const sum = sorted[idx] + sorted[l] + sorted[r];
        setCurrentSum(sum);
        
        stepsArray.push({
          message: `Calculating sum: ${sorted[idx]} + ${sorted[l]} + ${sorted[r]} = ${sum}`,
          i: idx,
          left: l,
          right: r,
          currentSum: sum,
          currentTriplet: [sorted[idx], sorted[l], sorted[r]],
          triplets: [...tripletsArray]
        });
        setSteps([...stepsArray]);
        setCurrentStep(stepsArray.length - 1);
        await sleep(speed);
        
        if (sum === 0) {
          // Found a triplet
          const newTriplet = [sorted[idx], sorted[l], sorted[r]];
          tripletsArray.push(newTriplet);
          
          stepsArray.push({
            message: `Found triplet: [${newTriplet.join(', ')}]`,
            i: idx,
            left: l,
            right: r,
            currentSum: sum,
            currentTriplet: newTriplet,
            triplets: [...tripletsArray]
          });
          setSteps([...stepsArray]);
          setCurrentStep(stepsArray.length - 1);
          setTriplets([...tripletsArray]);
          await sleep(speed);
          
          // Skip duplicates for left pointer
          let originalLeft = l;
          while (l < r && sorted[l] === sorted[l + 1]) {
            l++;
          }
          
          if (l > originalLeft) {
            stepsArray.push({
              message: `Skipping duplicate values for left pointer`,
              i: idx,
              left: l,
              right: r,
              currentSum: sum,
              currentTriplet: [sorted[idx], sorted[l], sorted[r]],
              triplets: [...tripletsArray]
            });
            setSteps([...stepsArray]);
            setCurrentStep(stepsArray.length - 1);
            setLeft(l);
            await sleep(speed);
          }
          
          // Skip duplicates for right pointer
          let originalRight = r;
          while (l < r && sorted[r] === sorted[r - 1]) {
            r--;
          }
          
          if (r < originalRight) {
            stepsArray.push({
              message: `Skipping duplicate values for right pointer`,
              i: idx,
              left: l,
              right: r,
              currentSum: sum,
              currentTriplet: [sorted[idx], sorted[l], sorted[r]],
              triplets: [...tripletsArray]
            });
            setSteps([...stepsArray]);
            setCurrentStep(stepsArray.length - 1);
            setRight(r);
            await sleep(speed);
          }
          
          // Move both pointers
          l++;
          r--;
          
          stepsArray.push({
            message: `Moving both pointers: left=${l}, right=${r}`,
            i: idx,
            left: l,
            right: r,
            currentSum: null,
            currentTriplet: l < r ? [sorted[idx], sorted[l], sorted[r]] : [],
            triplets: [...tripletsArray]
          });
          setSteps([...stepsArray]);
          setCurrentStep(stepsArray.length - 1);
          setLeft(l);
          setRight(r);
          if (l < r) {
            setCurrentTriplet([sorted[idx], sorted[l], sorted[r]]);
          } else {
            setCurrentTriplet([]);
          }
          await sleep(speed);
        } else if (sum < 0) {
          // Sum is too small, move left pointer
          stepsArray.push({
            message: `Sum ${sum} < 0, moving left pointer`,
            i: idx,
            left: l,
            right: r,
            currentSum: sum,
            currentTriplet: [sorted[idx], sorted[l], sorted[r]],
            triplets: [...tripletsArray]
          });
          setSteps([...stepsArray]);
          setCurrentStep(stepsArray.length - 1);
          await sleep(speed);
          
          l++;
          
          stepsArray.push({
            message: `New left pointer: ${l} (${sorted[l]})`,
            i: idx,
            left: l,
            right: r,
            currentSum: null,
            currentTriplet: [sorted[idx], sorted[l], sorted[r]],
            triplets: [...tripletsArray]
          });
          setSteps([...stepsArray]);
          setCurrentStep(stepsArray.length - 1);
          setLeft(l);
          setCurrentTriplet([sorted[idx], sorted[l], sorted[r]]);
          await sleep(speed);
        } else {
          // Sum is too large, move right pointer
          stepsArray.push({
            message: `Sum ${sum} > 0, moving right pointer`,
            i: idx,
            left: l,
            right: r,
            currentSum: sum,
            currentTriplet: [sorted[idx], sorted[l], sorted[r]],
            triplets: [...tripletsArray]
          });
          setSteps([...stepsArray]);
          setCurrentStep(stepsArray.length - 1);
          await sleep(speed);
          
          r--;
          
          stepsArray.push({
            message: `New right pointer: ${r} (${sorted[r]})`,
            i: idx,
            left: l,
            right: r,
            currentSum: null,
            currentTriplet: [sorted[idx], sorted[l], sorted[r]],
            triplets: [...tripletsArray]
          });
          setSteps([...stepsArray]);
          setCurrentStep(stepsArray.length - 1);
          setRight(r);
          setCurrentTriplet([sorted[idx], sorted[l], sorted[r]]);
          await sleep(speed);
        }
      }
    }
    
    // Final result
    stepsArray.push({
      message: `Algorithm complete. Found ${tripletsArray.length} triplets.`,
      i: -1,
      left: -1,
      right: -1,
      currentSum: null,
      currentTriplet: [],
      triplets: [...tripletsArray]
    });
    setSteps([...stepsArray]);
    setCurrentStep(stepsArray.length - 1);
    setI(-1);
    setLeft(-1);
    setRight(-1);
    setCurrentTriplet([]);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// Returns an array of arrays containing unique triplets that add up to zero
// Sort the array
// Iterate with one index using a for loop
// Use the element iterated in the for loop to as static number, use it's negative to compare with two other numbers
//  Use two pointers to compare with the number indexed in the for loop
//  If the sum of the two pointers is too low, move the left pointer to the right
// If the sum of the two pointers is too high, move the right pointer left
// After finding a triplet, ensure that you don't reuse the same values (map them)
var threeSum = (numbers) => {
    // Handle edge cases
    if (numbers.length < 3) return [];
    // Sort the array
    const sorted = numbers.sort((a,b) => a - b);
    
    // Initiate an array to hold the arrays of triplet values
    const triplets = [];    
    for (let i = 0; i < sorted.length; i++) {
        // Skip duplicates for the first element
        if (i > 0 && sorted[i] === sorted[i-1]) continue;
        // Make a pointer for each direction
        let left = i + 1;
        // Iterate through the array
        let right = sorted.length - 1;
       

        while ( left < right) {    
            
            // currentSum is the sum of  the current elements
            let currentSum = sorted[i] + sorted[left] + sorted[right]; 
            // Add all of the current elements together to determine if equals zero
            if (currentSum === 0) {
                triplets.push([sorted[i], sorted[left], sorted[right]]);
                
                // Skip duplicates for left pointer
                while (left < right && sorted[left] === sorted[left+1]) left++;
                
                // Skip duplicates for right pointer
                while (left < right && sorted[right] === sorted[right-1]) right--;
                
                // Move both pointers
                left++;
                right--;
            }
            // If all values added together are less than zero, then move the left pointer right
            else if (currentSum < 0){
                // Increment left
                left++;
            }
            // If all values added together are greater than zero, then move the right pointer left
            else {
                // Add the current elements to an array and push 
                right--;
            }
        }
    }
  // Return triplets
  return triplets;
}`,
    python: `class Solution:
    def threeSum(self, nums):
        # nums is a list of integers
        # returns a list of lists of integers
        # Handle edge cases
        if len(nums) < 3:
            return []
            
        # Sort the array
        nums.sort()
        
        # Initialize result array
        triplets = []
        
        # Iterate through the array
        for i in range(len(nums) - 2):
            # Skip duplicates for the first element
            if i > 0 and nums[i] == nums[i-1]:
                continue
                
            # Set two pointers
            left = i + 1
            right = len(nums) - 1
            
            while left < right:
                # Calculate current sum
                current_sum = nums[i] + nums[left] + nums[right]
                
                # Check if sum is zero
                if current_sum == 0:
                    triplets.append([nums[i], nums[left], nums[right]])
                    
                    # Skip duplicates for left pointer
                    while left < right and nums[left] == nums[left+1]:
                        left += 1
                        
                    # Skip duplicates for right pointer
                    while left < right and nums[right] == nums[right-1]:
                        right -= 1
                        
                    # Move both pointers
                    left += 1
                    right -= 1
                    
                # If sum is too small, move left pointer
                elif current_sum < 0:
                    left += 1
                    
                # If sum is too large, move right pointer
                else:
                    right -= 1
                    
        return triplets`,
    java: `class Solution {
    public ArrayList<ArrayList<Integer>> threeSum(int[] nums) {
        // Handle edge cases
        if (nums.length < 3) {
            return new ArrayList<>();
        }
        
        // Sort the array
        Arrays.sort(nums);
        
        // Initialize result list
        ArrayList<ArrayList<Integer>> triplets = new ArrayList<>();
        
        // Iterate through the array
        for (int i = 0; i < nums.length - 2; i++) {
            // Skip duplicates for the first element
            if (i > 0 && nums[i] == nums[i-1]) {
                continue;
            }
            
            // Set two pointers
            int left = i + 1;
            int right = nums.length - 1;
            
            while (left < right) {
                // Calculate current sum
                int currentSum = nums[i] + nums[left] + nums[right];
                
                // Check if sum is zero
                if (currentSum == 0) {
                    triplets.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    
                    // Skip duplicates for left pointer
                    while (left < right && nums[left] == nums[left+1]) {
                        left++;
                    }
                    
                    // Skip duplicates for right pointer
                    while (left < right && nums[right] == nums[right-1]) {
                        right--;
                    }
                    
                    // Move both pointers
                    left++;
                    right--;
                    
                // If sum is too small, move left pointer
                } else if (currentSum < 0) {
                    left++;
                    
                // If sum is too large, move right pointer
                } else {
                    right--;
                }
            }
        }
        
        return triplets;
    }
}`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>3Sum</h1>
        <div className="problem-meta">
          <span className="difficulty medium">Medium</span>
          <span className="category">Two Pointers</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          Given an integer array <code>nums</code>, return all the triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, and <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.
        </p>
        <p>
          Notice that the solution set must not contain duplicate triplets.
        </p>
      </section>

      <section className="examples">
        <h2>Examples</h2>
        <pre>
          {`Example 1:
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.

Example 2:
Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.

Example 3:
Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.`}
        </pre>
      </section>

      <section className="visualization">
        <h2>Visualization</h2>
        <div className="array-visualizer">
          {sortedNumbers.map((num, idx) => (
            <div 
              key={idx}
              className={`array-cell ${
                idx === i ? 'i-pointer' :
                idx === left ? 'left-pointer' :
                idx === right ? 'right-pointer' :
                ''
              } ${currentTriplet.includes(num) && (idx === i || idx === left || idx === right) ? 'current-triplet' : ''}`}
            >
              {num}
            </div>
          ))}
        </div>

        <div className="pointer-info">
          {i !== -1 && (
            <>
              <div>i: {i} ({sortedNumbers[i]})</div>
              {left !== -1 && <div>left: {left} ({sortedNumbers[left]})</div>}
              {right !== -1 && <div>right: {right} ({sortedNumbers[right]})</div>}
              {currentSum !== null && <div>Current Sum: {currentSum}</div>}
            </>
          )}
        </div>

        <div className="triplets-container">
          <h3>Found Triplets</h3>
          <div className="triplets-list">
            {triplets.map((triplet, idx) => (
              <div key={idx} className="triplet-item">
                [{triplet.join(', ')}]
              </div>
            ))}
            {triplets.length === 0 && <div>No triplets found yet</div>}
          </div>
        </div>

        <div className="steps-container">
          <h3>Algorithm Steps</h3>
          <div className="steps-list">
            {steps.map((step, idx) => (
              <div key={idx} className={`step-item ${idx === currentStep ? 'current-step' : ''}`}>
                <div>Step {idx + 1}:</div>
                <div>{step.message}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="controls">
          <div className="input-group">
            <label>Input Array (comma-separated):</label>
            <input
              value={numbers.join(',')}
              onChange={(e) => {
                const vals = e.target.value.split(',').map(v => parseInt(v.trim()));
                if (vals.every(n => !isNaN(n))) {
                  setNumbers(vals);
                }
              }}
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
            <button onClick={findThreeSum} disabled={isRunning}>
              Find Triplets
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
          <h3>Two-Pointer Solution</h3>
          <ol>
            <li>Sort the array in ascending order.</li>
            <li>Iterate through the array with a pointer <code>i</code>:
              <ul>
                <li>Skip duplicate values for <code>i</code> to avoid duplicate triplets.</li>
                <li>For each <code>i</code>, use two pointers (<code>left</code> and <code>right</code>) to find pairs that sum to <code>-nums[i]</code>.</li>
              </ul>
            </li>
            <li>For each <code>i</code>, initialize <code>left = i + 1</code> and <code>right = n - 1</code>.</li>
            <li>While <code>left &lt; right</code>:
              <ul>
                <li>Calculate <code>currentSum = nums[i] + nums[left] + nums[right]</code>.</li>
                <li>If <code>currentSum == 0</code>, we found a triplet:
                  <ul>
                    <li>Add the triplet to the result.</li>
                    <li>Skip duplicate values for <code>left</code> and <code>right</code>.</li>
                    <li>Move both pointers: <code>left++</code> and <code>right--</code>.</li>
                  </ul>
                </li>
                <li>If <code>currentSum &lt; 0</code>, move <code>left</code> pointer right: <code>left++</code>.</li>
                <li>If <code>currentSum &gt; 0</code>, move <code>right</code> pointer left: <code>right--</code>.</li>
              </ul>
            </li>
          </ol>

          <h3>Time Complexity</h3>
          <p>O(n²) where n is the length of the array. Sorting takes O(n log n), and the two-pointer approach takes O(n²).</p>
          
          <h3>Space Complexity</h3>
          <p>O(1) auxiliary space (not counting the output array).</p>
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

export default ThreeSum;
