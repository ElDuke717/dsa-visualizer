import React, { useState } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css'; // Assuming a shared CSS file for problems

const IntersectionOfTwoArrays = () => {
  const [nums1, setNums1] = useState([1, 2, 2, 1]);
  const [nums2, setNums2] = useState([2, 2]);
  const [intersection, setIntersection] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [language, setLanguage] = useState('javascript');

  const resetVisualization = () => {
    setIntersection([]);
  };

  const findIntersection = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    // Use a Set for efficient lookup
    const set1 = new Set(nums1);
    const result = [];

    for (const num of nums2) {
      if (set1.has(num)) {
        result.push(num);
        set1.delete(num); // Ensure uniqueness in the result
      }
    }

    setIntersection(result);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function intersection(nums1, nums2) {
    const set1 = new Set(nums1);
    const resultSet = new Set();

    for (const num of nums2) {
        if (set1.has(num)) {
            resultSet.add(num);
        }
    }

    return Array.from(resultSet);
}`,
    python: `
from typing import List

def intersection(nums1: List[int], nums2: List[int]) -> List[int]:
    set1 = set(nums1)
    result_set = set()

    for num in nums2:
        if num in set1:
            result_set.add(num)

    return list(result_set)`
  };

  const parseArrayInput = (input) => {
    return input.split(',').map(s => s.trim()).filter(s => s !== '').map(Number).filter(n => !isNaN(n));
  }

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Intersection of Two Arrays</h1>
        <div className="problem-meta">
          <span className="difficulty easy">Easy</span>
          <span className="category">Hash Tables</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          Given two integer arrays <code>nums1</code> and <code>nums2</code>, return an array of their intersection.
          Each element in the result must be unique and you may return the result in any order.
        </p>
        <p><strong>LeetCode #349</strong></p>
      </section>

      <section className="visualization">
        <h3>Input Arrays</h3>
        <div className="array-display">
          <strong>nums1:</strong> [{nums1.join(', ')}]
        </div>
        <div className="array-display">
          <strong>nums2:</strong> [{nums2.join(', ')}]
        </div>

        <h3>Resulting Intersection</h3>
        <div className="array-display result">
          <strong>Intersection:</strong> [{intersection.join(', ')}]
        </div>

        <div className="controls">
          <div className="input-group">
            <label>nums1 (comma-separated):</label>
            <input
              value={nums1.join(',')}
              onChange={(e) => setNums1(parseArrayInput(e.target.value))}
              disabled={isRunning}
            />
          </div>
          <div className="input-group">
            <label>nums2 (comma-separated):</label>
            <input
              value={nums2.join(',')}
              onChange={(e) => setNums2(parseArrayInput(e.target.value))}
              disabled={isRunning}
            />
          </div>
          <div className="button-group">
            <button onClick={findIntersection} disabled={isRunning}>
              Find Intersection
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
          <h3>Hash Set Solution</h3>
          <ol>
            <li>Create a hash set (<code>Set</code> in JavaScript, <code>set</code> in Python) from the first array (<code>nums1</code>) for efficient O(1) average time lookups.</li>
            <li>Initialize an empty hash set to store the unique intersection results.</li>
            <li>Iterate through the second array (<code>nums2</code>).</li>
            <li>For each number in <code>nums2</code>, check if it exists in the hash set created from <code>nums1</code>.</li>
            <li>If it exists, add the number to the result hash set. Using a set for results automatically handles uniqueness.</li>
            <li>Finally, convert the result hash set to an array (or list in Python) and return it.</li>
          </ol>

          <h3>Time Complexity</h3>
          <p>O(n + m), where n is the length of <code>nums1</code> and m is the length of <code>nums2</code>. Building the initial set takes O(n) time, and iterating through <code>nums2</code> takes O(m) time. Set lookups and insertions are O(1) on average.</p>

          <h3>Space Complexity</h3>
          <p>O(min(n, m)) in the best case (if we optimize by creating the set from the smaller array) or O(n + m) in the worst case (if the intersection contains all elements and we store both sets).</p>
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

export default IntersectionOfTwoArrays;
