import React, { useState } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css'; // Reusing general problem styles

const FourSumII = () => {
  const [nums1, setNums1] = useState([1, 2]);
  const [nums2, setNums2] = useState([-2, -1]);
  const [nums3, setNums3] = useState([-1, 2]);
  const [nums4, setNums4] = useState([0, 2]);
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [language, setLanguage] = useState('javascript');

  const resetVisualization = () => {
    setCount(0);
  };

  const parseArrayInput = (input) => {
    return input.split(',').map(s => s.trim()).filter(s => s !== '').map(Number).filter(n => !isNaN(n));
  }

  const handleArrayChange = (setter) => (e) => {
    try {
      const newNums = parseArrayInput(e.target.value);
      setter(newNums);
      resetVisualization();
    } catch (error) {
      console.error('Invalid input:', error);
    }
  };

  const calculateFourSumCount = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    const map = new Map();
    let currentCount = 0;

    // Store sums of pairs from nums1 and nums2 and their frequencies
    for (const n1 of nums1) {
      for (const n2 of nums2) {
        const sum = n1 + n2;
        map.set(sum, (map.get(sum) || 0) + 1);
      }
    }

    // Check sums of pairs from nums3 and nums4 against the map
    for (const n3 of nums3) {
      for (const n4 of nums4) {
        const target = -(n3 + n4);
        if (map.has(target)) {
          currentCount += map.get(target);
        }
      }
    }

    setCount(currentCount);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function fourSumCount(nums1, nums2, nums3, nums4) {
    const map = new Map();
    let count = 0;

    // Store sums of pairs from nums1 and nums2
    for (const n1 of nums1) {
        for (const n2 of nums2) {
            const sum = n1 + n2;
            map.set(sum, (map.get(sum) || 0) + 1);
        }
    }

    // Check sums of pairs from nums3 and nums4
    for (const n3 of nums3) {
        for (const n4 of nums4) {
            const target = -(n3 + n4);
            if (map.has(target)) {
                count += map.get(target);
            }
        }
    }

    return count;
}`,
    python: `
from typing import List
from collections import Counter

def fourSumCount(nums1: List[int], nums2: List[int], nums3: List[int], nums4: List[int]) -> int:
    # Use Counter for efficient frequency mapping
    map_sum12 = Counter(n1 + n2 for n1 in nums1 for n2 in nums2)
    count = 0

    # Check sums of pairs from nums3 and nums4
    for n3 in nums3:
        for n4 in nums4:
            target = -(n3 + n4)
            if target in map_sum12:
                count += map_sum12[target]
                
    return count`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>4Sum II</h1>
        <div className="problem-meta">
          <span className="difficulty medium">Medium</span>
          <span className="category">Hash Tables</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          Given four integer arrays <code>nums1</code>, <code>nums2</code>, <code>nums3</code>, and <code>nums4</code> all of length <code>n</code>,
          return the number of tuples <code>(i, j, k, l)</code> such that:
        </p>
        <ul>
            <li><code>{'0 <= i, j, k, l < n'}</code></li>
            <li><code>{'nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0'}</code></li>
        </ul>
        <p><strong>LeetCode #454</strong></p>
        <p>
          Example: <code>nums1 = [1, 2]</code>, <code>nums2 = [-2, -1]</code>, <code>nums3 = [-1, 2]</code>, <code>nums4 = [0, 2]</code> → Output: <code>2</code>
        </p>
        <p>Explanation: The two tuples are:</p>
        <ol>
            <li>(0, 0, 0, 1) results in nums1[0] + nums2[0] + nums3[0] + nums4[1] = 1 + (-2) + (-1) + 2 = 0</li>
            <li>(1, 1, 0, 0) results in nums1[1] + nums2[1] + nums3[0] + nums4[0] = 2 + (-1) + (-1) + 0 = 0</li>
        </ol>
      </section>

      <section className="visualization">
        {/* Basic display of arrays and result count */}
        <h3>Input Arrays</h3>
        <div className="array-display"><strong>nums1:</strong> [{nums1.join(', ')}]</div>
        <div className="array-display"><strong>nums2:</strong> [{nums2.join(', ')}]</div>
        <div className="array-display"><strong>nums3:</strong> [{nums3.join(', ')}]</div>
        <div className="array-display"><strong>nums4:</strong> [{nums4.join(', ')}]</div>

        <h3>Result</h3>
        <div className="result-message success">Count of tuples summing to zero: {count}</div>

        <div className="controls">
          {/* Input fields for the four arrays */}
          <div className="input-group">
            <label>nums1 (comma-separated):</label>
            <input value={nums1.join(',')} onChange={handleArrayChange(setNums1)} disabled={isRunning} />
          </div>
           <div className="input-group">
            <label>nums2 (comma-separated):</label>
            <input value={nums2.join(',')} onChange={handleArrayChange(setNums2)} disabled={isRunning} />
          </div>
           <div className="input-group">
            <label>nums3 (comma-separated):</label>
            <input value={nums3.join(',')} onChange={handleArrayChange(setNums3)} disabled={isRunning} />
          </div>
           <div className="input-group">
            <label>nums4 (comma-separated):</label>
            <input value={nums4.join(',')} onChange={handleArrayChange(setNums4)} disabled={isRunning} />
          </div>

          <div className="button-group">
            <button onClick={calculateFourSumCount} disabled={isRunning}>
              Calculate Count
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
          <h3>Hash Table (Map) Approach</h3>
          <p>
            Instead of checking all n<sup>4</sup> combinations, we can optimize using a hash map. The idea is to split the four arrays into two groups (e.g., nums1/nums2 and nums3/nums4) and store the sums of pairs from the first group in a hash map.
          </p>
          <ol>
            <li>Create a hash map (<code>Map</code> in JavaScript, <code>dict</code> or <code>Counter</code> in Python) to store the sums of pairs from <code>nums1</code> and <code>nums2</code> and their frequencies.</li>
            <li>Iterate through all pairs <code>(n1, n2)</code> where <code>n1</code> is from <code>nums1</code> and <code>n2</code> is from <code>nums2</code>.</li>
            <li>Calculate the sum <code>s = n1 + n2</code>.</li>
            <li>Store this sum <code>s</code> as a key in the hash map and increment its frequency count.</li>
            <li>Initialize a <code>count</code> variable to 0.</li>
            <li>Iterate through all pairs <code>(n3, n4)</code> where <code>n3</code> is from <code>nums3</code> and <code>n4</code> is from <code>nums4</code>.</li>
            <li>Calculate the target sum needed from the first group: <code>target = -(n3 + n4)</code>.</li>
            <li>Check if this <code>target</code> sum exists as a key in the hash map created in step 4.</li>
            <li>If the <code>target</code> exists in the map, add its frequency (<code>map.get(target)</code>) to the <code>count</code>. This frequency represents how many pairs from the first group sum up to the required <code>target</code>.</li>
            <li>After iterating through all pairs from the second group, the final <code>count</code> will be the total number of tuples summing to zero.</li>
          </ol>

          <h3>Time Complexity</h3>
          <p>{`O(n²) where n is the length of each array. We have two nested loops to build the map (O(n²)) and two nested loops to check against the map (O(n²)). Map lookups are O(1) on average.`}</p>

          <h3>Space Complexity</h3>
          <p>{`O(n²) in the worst case for the hash map, as there could be up to n² unique sums of pairs from the first two arrays.`}</p>
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

export default FourSumII;
