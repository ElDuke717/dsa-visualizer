// src/pages/Problems/Trees/MaximumDepth.jsx
import React, { useState } from 'react';
import TreeLevelVisualizer from '../../../components/ProblemVisualizers/TreeLevelVisualizer';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';

const MaximumDepth = () => {
  const [tree, setTree] = useState({
    val: 3,
    left: {
      val: 9,
      left: null,
      right: null
    },
    right: {
      val: 20,
      left: {
        val: 15,
        left: null,
        right: null
      },
      right: {
        val: 7,
        left: null,
        right: null
      }
    }
  });

  const [currentPath, setCurrentPath] = useState([]);
  const [maxDepth, setMaxDepth] = useState(0);
  const [currentDepth, setCurrentDepth] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [language, setLanguage] = useState('javascript');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setCurrentPath([]);
    setMaxDepth(0);
    setCurrentDepth(0);
  };

  const findMaxDepth = async (node = tree, depth = 1) => {
    if (!node) return 0;

    setCurrentPath(prev => [...prev, node.val]);
    setCurrentDepth(depth);
    await sleep(speed);

    const leftDepth = node.left ? await findMaxDepth(node.left, depth + 1) : 0;
    const rightDepth = node.right ? await findMaxDepth(node.right, depth + 1) : 0;

    const maxChildDepth = Math.max(leftDepth, rightDepth);
    const currentMaxDepth = maxChildDepth + 1;
    setMaxDepth(Math.max(maxDepth, currentMaxDepth));

    setCurrentPath(prev => prev.slice(0, -1));
    await sleep(speed);

    return currentMaxDepth;
  };

  const startVisualization = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();
    await findMaxDepth();
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function maxDepth(root) {
    if (!root) return 0;
    
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    
    return Math.max(leftDepth, rightDepth) + 1;
}`,
    python: `
def maxDepth(root):
    if not root:
        return 0
    
    left_depth = maxDepth(root.left)
    right_depth = maxDepth(root.right)
    
    return max(left_depth, right_depth) + 1`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Maximum Depth of Binary Tree</h1>
        <div className="problem-meta">
          <span className="difficulty easy">Easy</span>
          <span className="category">Tree - DFS</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          Given the root of a binary tree, return its maximum depth.
          A binary tree's maximum depth is the number of nodes along the longest 
          path from the root node down to the farthest leaf node.
        </p>
      </section>

      <section className="examples">
        <h2>Example</h2>
        <pre>
          {`Input: root = [3,9,20,null,null,15,7]
Output: 3
Explanation: The maximum depth is 3:
- Path: 3 → 20 → 15 (or 3 → 20 → 7)`}
        </pre>
      </section>

      <section className="visualization">
        <div className="stats">
          <div>Current Depth: {currentDepth}</div>
          <div>Max Depth: {maxDepth}</div>
        </div>
        <TreeLevelVisualizer
          tree={tree}
          currentPath={currentPath}
          highlightedNodes={new Set(currentPath)}
        />
        <div className="controls">
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
            <button
              onClick={startVisualization}
              disabled={isRunning}
            >
              Find Max Depth
            </button>
            <button
              onClick={resetVisualization}
              disabled={isRunning}
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      <section className="approach">
        <h2>Approach</h2>
        <div className="approach-content">
          <h3>Recursive DFS Solution</h3>
          <ol>
            <li>Base case: if node is null, return 0</li>
            <li>Recursively find the depth of left and right subtrees</li>
            <li>Return the maximum of left and right depths plus 1</li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(n) where n is the number of nodes in the tree</p>
          
          <h3>Space Complexity</h3>
          <p>O(h) where h is the height of the tree (recursion stack)</p>

          <h3>Key Points:</h3>
          <ul>
            <li>Uses depth-first search (DFS)</li>
            <li>Bottom-up approach</li>
            <li>Recursive solution is concise and intuitive</li>
            <li>Can also be solved iteratively using a stack or queue</li>
          </ul>
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

export default MaximumDepth;