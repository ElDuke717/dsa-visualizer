// src/pages/Problems/Trees/LowestCommonAncestor.jsx
import React, { useState } from 'react';
import TreeLevelVisualizer from '../../../components/ProblemVisualizers/TreeLevelVisualizer';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';

const LowestCommonAncestor = () => {
  const [tree, setTree] = useState({
    val: 6,
    left: {
      val: 2,
      left: {
        val: 0,
        left: null,
        right: null
      },
      right: {
        val: 4,
        left: {
          val: 3,
          left: null,
          right: null
        },
        right: {
          val: 5,
          left: null,
          right: null
        }
      }
    },
    right: {
      val: 8,
      left: {
        val: 7,
        left: null,
        right: null
      },
      right: {
        val: 9,
        left: null,
        right: null
      }
    }
  });

  const [p, setP] = useState(2);
  const [q, setQ] = useState(8);
  const [currentPath, setCurrentPath] = useState([]);
  const [pPath, setPPath] = useState([]);
  const [qPath, setQPath] = useState([]);
  const [lca, setLca] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [language, setLanguage] = useState('javascript');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setCurrentPath([]);
    setPPath([]);
    setQPath([]);
    setLca(null);
  };

  const findPath = async (node, target, path = []) => {
    if (!node) return false;

    path.push(node.val);
    setCurrentPath([...path]);
    await sleep(speed);

    if (node.val === target) {
      return true;
    }

    if (node.left && await findPath(node.left, target, path)) {
      return true;
    }

    if (node.right && await findPath(node.right, target, path)) {
      return true;
    }

    path.pop();
    setCurrentPath([...path]);
    await sleep(speed);
    return false;
  };

  const findLCA = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    // Find path to p
    const pathToP = [];
    await findPath(tree, p, pathToP);
    setPPath([...pathToP]);
    
    // Find path to q
    const pathToQ = [];
    setCurrentPath([]);
    await findPath(tree, q, pathToQ);
    setQPath([...pathToQ]);

    // Find LCA
    let i = 0;
    while (i < pathToP.length && i < pathToQ.length && pathToP[i] === pathToQ[i]) {
      setLca(pathToP[i]);
      i++;
      await sleep(speed);
    }

    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function lowestCommonAncestor(root, p, q) {
    if (!root || root === p || root === q) {
        return root;
    }
    
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    
    if (left && right) {
        return root; // Found LCA
    }
    
    return left || right; // Return non-null value
}`,
    python: `
def lowestCommonAncestor(root, p, q):
    if not root or root == p or root == q:
        return root
    
    left = lowestCommonAncestor(root.left, p, q)
    right = lowestCommonAncestor(root.right, p, q)
    
    if left and right:
        return root  # Found LCA
    
    return left or right  # Return non-null value`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Lowest Common Ancestor of a Binary Tree</h1>
        <div className="problem-meta">
          <span className="difficulty medium">Medium</span>
          <span className="category">Tree - DFS</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.
          The lowest common ancestor is defined between two nodes p and q as the lowest node in T 
          that has both p and q as descendants (where we allow a node to be a descendant of itself).
        </p>
      </section>

      <section className="examples">
        <h2>Example</h2>
        <pre>
          {`Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6
Explanation: The LCA of nodes 2 and 8 is 6.`}
        </pre>
      </section>

      <section className="visualization">
        <div className="stats">
          <div>Node P: {p}</div>
          <div>Node Q: {q}</div>
          <div>LCA: {lca !== null ? lca : '-'}</div>
        </div>
        <TreeLevelVisualizer
          tree={tree}
          currentPath={currentPath}
          highlightedNodes={new Set([
            ...pPath,
            ...qPath,
            ...(lca !== null ? [lca] : [])
          ])}
          specialNodes={new Set([p, q])}
        />
        <div className="controls">
          <div className="input-group">
            <label>Node P:</label>
            <input
              type="number"
              value={p}
              onChange={(e) => setP(Number(e.target.value))}
              disabled={isRunning}
            />
            <label>Node Q:</label>
            <input
              type="number"
              value={q}
              onChange={(e) => setQ(Number(e.target.value))}
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
            <button
              onClick={findLCA}
              disabled={isRunning}
            >
              Find LCA
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
          <h3>Path Finding Solution</h3>
          <ol>
            <li>Find path from root to node p</li>
            <li>Find path from root to node q</li>
            <li>Compare paths to find last common node</li>
          </ol>
          
          <h3>Recursive Solution</h3>
          <ol>
            <li>If root is null or equals p or q, return root</li>
            <li>Recursively search in left and right subtrees</li>
            <li>If both left and right return non-null, root is LCA</li>
            <li>Otherwise, return non-null value</li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(n) where n is the number of nodes in the tree</p>
          
          <h3>Space Complexity</h3>
          <p>O(h) where h is the height of the tree</p>

          <h3>Key Points:</h3>
          <ul>
            <li>Node can be descendant of itself</li>
            <li>Both nodes are guaranteed to exist in the tree</li>
            <li>All node values are unique</li>
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

export default LowestCommonAncestor;