// src/pages/Problems/Trees/BinaryTreePaths.jsx
import React, { useState, useEffect, useRef } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';
import './BinaryTreePaths.css';

const BinaryTreePaths = () => {
  const [treeData, setTreeData] = useState({
    val: 1,
    left: {
      val: 2,
      left: null,
      right: {
        val: 5,
        left: null,
        right: null
      }
    },
    right: {
      val: 3,
      left: null,
      right: null
    }
  });

  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [language, setLanguage] = useState('javascript');

  const canvasRef = useRef(null);

  // Function to draw the binary tree
  const drawTree = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const nodeRadius = 20;
    const levelHeight = 80;

    // Function to calculate the width of a subtree
    const getTreeWidth = (node, level) => {
      if (!node) return 0;
      if (!node.left && !node.right) return 1;

      const leftWidth = getTreeWidth(node.left, level + 1);
      const rightWidth = getTreeWidth(node.right, level + 1);

      return leftWidth + rightWidth;
    };

    // Function to draw a node
    const drawNode = (node, x, y, parentX, parentY, level, horizontalSpacing) => {
      if (!node) return;

      // Draw line from parent to this node
      if (parentX !== null && parentY !== null) {
        ctx.beginPath();
        ctx.moveTo(parentX, parentY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw node
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);

      // Highlight node if it's in the current path
      if (currentPath.includes(node.val)) {
        ctx.fillStyle = '#4CAF50';
      } else if (visitedNodes.includes(node.val)) {
        ctx.fillStyle = '#FFC107';
      } else {
        ctx.fillStyle = '#fff';
      }

      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      // Draw node value
      ctx.fillStyle = '#000';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.val, x, y);

      // Calculate positions for children
      const leftWidth = node.left ? getTreeWidth(node.left, level + 1) : 0;
      const rightWidth = node.right ? getTreeWidth(node.right, level + 1) : 0;

      const leftX = x - horizontalSpacing * (rightWidth > 0 ? 1 : 0.5);
      const rightX = x + horizontalSpacing * (leftWidth > 0 ? 1 : 0.5);
      const childY = y + levelHeight;

      // Draw children
      if (node.left) {
        drawNode(node.left, leftX, childY, x, y, level + 1, horizontalSpacing / 2);
      }

      if (node.right) {
        drawNode(node.right, rightX, childY, x, y, level + 1, horizontalSpacing / 2);
      }
    };

    // Start drawing from the root
    const totalWidth = getTreeWidth(treeData, 0);
    const horizontalSpacing = canvas.width / (totalWidth + 1) / 2;
    drawNode(treeData, canvas.width / 2, 50, null, null, 0, horizontalSpacing);
  };

  // Redraw the tree whenever the tree data or current path changes
  useEffect(() => {
    drawTree();
  }, [treeData, currentPath, visitedNodes]);

  // Sleep function for animation
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Function to find all paths in the binary tree
  const findPaths = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setPaths([]);
    setCurrentPath([]);
    setVisitedNodes([]);

    const result = [];

    const dfs = async (node, path) => {
      if (!node) return;

      // Add current node to path
      const newPath = [...path, node.val];
      setCurrentPath(newPath);
      setVisitedNodes(prev => [...prev, node.val]);
      await sleep(speed);

      // If it's a leaf node, we've found a path
      if (!node.left && !node.right) {
        const pathStr = newPath.join('->');
        result.push(pathStr);
        setPaths(prev => [...prev, pathStr]);
        await sleep(speed);
      }

      // Continue DFS on left and right children
      if (node.left) {
        await dfs(node.left, newPath);
      }

      if (node.right) {
        await dfs(node.right, newPath);
      }

      // Backtrack
      setCurrentPath(path);
      await sleep(speed);
    };

    await dfs(treeData, []);

    setCurrentPath([]);
    setIsRunning(false);
    return result;
  };

  // Function to reset the visualization
  const resetVisualization = () => {
    setPaths([]);
    setCurrentPath([]);
    setVisitedNodes([]);
  };

  // Function to handle tree input changes
  const handleTreeInputChange = (e) => {
    try {
      const newTreeData = JSON.parse(e.target.value);
      setTreeData(newTreeData);
      resetVisualization();
    } catch (error) {
      console.error('Invalid JSON format for tree data');
    }
  };

  const implementations = {
    javascript: `
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
function binaryTreePaths(root) {
    if (!root) return [];
    
    const result = [];
    
    function dfs(node, path) {
        // Add current node to path
        path.push(node.val);
        
        // If it's a leaf node, we've found a path
        if (!node.left && !node.right) {
                result.push(path.join('->'));
        }
        
        // Continue DFS on left and right children
        if (node.left) {
            dfs(node.left, [...path]);
        }
        
        if (node.right) {
            dfs(node.right, [...path]);
        }
    }
    
    dfs(root, []);
    return result;
}`,
    python: `
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def binaryTreePaths(self, root: Optional[TreeNode]) -> List[str]:
        if not root:
            return []
        
        result = []
        
        def dfs(node, path):
            # Add current node to path
            path.append(str(node.val))
            
            # If it's a leaf node, we've found a path
            if not node.left and not node.right:
                result.append('->'.join(path))
            
            # Continue DFS on left and right children
            if node.left:
                dfs(node.left, path.copy())
            
            if node.right:
                dfs(node.right, path.copy())
        
        dfs(root, [])
        return result`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Binary Tree Paths</h1>
        <div className="problem-meta">
          <span className="difficulty easy">Easy</span>
          <span className="category">Trees</span>
          <span className="category">Backtracking</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          Given the root of a binary tree, return all root-to-leaf paths in any order.
        </p>
        <p>
          A leaf is a node with no children.
        </p>
        <div className="example">
          <h3>Example:</h3>
          <div className="example-content">
            <p>Input: root = [1,2,3,null,5]</p>
            <p>Output: ["1-&gt;2-&gt;5","1-&gt;3"]</p>
            <p>Explanation: All root-to-leaf paths are: 1-&gt;2-&gt;5, 1-&gt;3</p>
          </div>
        </div>
      </section>

      <section className="visualization">
        <h2>Visualization</h2>
        <div className="tree-visualization">
          <canvas ref={canvasRef} width="600" height="300" className="tree-canvas"></canvas>

          <div className="paths-display">
            <h3>Paths Found ({paths.length}):</h3>
            <div className="paths-list">
              {paths.map((path, index) => (
                <div key={index} className="path-item">
                  {path}
                </div>
              ))}
            </div>
          </div>

          <div className="controls">
            <div className="input-group">
              <label>Tree Input (JSON):</label>
              <textarea
                value={JSON.stringify(treeData, null, 2)}
                onChange={handleTreeInputChange}
                disabled={isRunning}
                rows={5}
                className="tree-input"
              />
            </div>

            <div className="input-group">
              <label>Animation Speed (ms):</label>
              <input
                type="range"
                min="200"
                max="2000"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                disabled={isRunning}
              />
              <span>{speed}ms</span>
            </div>

            <div className="button-group">
              <button
                onClick={findPaths}
                disabled={isRunning}
                className="find-paths-btn"
              >
                Find Paths
              </button>
              <button
                onClick={resetVisualization}
                disabled={isRunning}
                className="reset-btn"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="approach">
        <h2>Approach</h2>
        <div className="approach-content">
          <h3>Depth-First Search (DFS) with Backtracking</h3>
          <ol>
            <li>Start DFS from the root node with an empty path.</li>
            <li>For each node, add it to the current path.</li>
            <li>If the node is a leaf (no children), add the current path to the result.</li>
            <li>Recursively explore the left and right children, passing the updated path.</li>
            <li>When backtracking, remove the current node from the path.</li>
          </ol>

          <h3>Time Complexity</h3>
          <p>O(N), where N is the number of nodes in the binary tree. We visit each node exactly once.</p>

          <h3>Space Complexity</h3>
          <p>O(H), where H is the height of the tree. This is the space used by the recursion stack. In the worst case (skewed tree), H can be O(N).</p>
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

export default BinaryTreePaths;
