// src/pages/Problems/Trees/LevelOrderTraversal.jsx
import React, { useState } from 'react';
import TreeLevelVisualizer from '../../../components/ProblemVisualizers/TreeLevelVisualizer';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';

const LevelOrderTraversal = () => {
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

  const [currentLevel, setCurrentLevel] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState(new Set());
  const [levelResults, setLevelResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [language, setLanguage] = useState('javascript');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setCurrentLevel(null);
    setVisitedNodes(new Set());
    setLevelResults([]);
  };

  const performLevelOrder = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    if (!tree) {
      setIsRunning(false);
      return;
    }

    const result = [];
    const queue = [{ node: tree, level: 0 }];
    const visited = new Set();

    while (queue.length > 0) {
      const levelSize = queue.length;
      const currentLevelNodes = [];
      setCurrentLevel(result.length);

      // Process all nodes at current level
      for (let i = 0; i < levelSize; i++) {
        const { node, level } = queue.shift();
        
        currentLevelNodes.push(node.val);
        visited.add(node.val);
        setVisitedNodes(new Set(visited));
        
        await sleep(speed);

        if (node.left) {
          queue.push({ node: node.left, level: level + 1 });
        }
        if (node.right) {
          queue.push({ node: node.right, level: level + 1 });
        }
      }

      result.push(currentLevelNodes);
      setLevelResults([...result]);
      await sleep(speed);
    }

    setCurrentLevel(null);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function levelOrder(root) {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];
    
    // Process all nodes at current level
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(currentLevel);
  }
  
  return result;
}`,
    python: `
def levelOrder(root):
    if not root:
        return []
    
    result = []
    queue = [root]
    
    while queue:
        level_size = len(queue)
        current_level = []
        
        # Process all nodes at current level
        for _ in range(level_size):
            node = queue.pop(0)
            current_level.append(node.val)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        result.append(current_level)
    
    return result`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Binary Tree Level Order Traversal</h1>
        <div className="problem-meta">
          <span className="difficulty medium">Medium</span>
          <span className="category">Tree - BFS</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          Given the root of a binary tree, return the level order traversal of its nodes' values.
          (i.e., from left to right, level by level).
        </p>
      </section>

      <section className="examples">
        <h2>Examples</h2>
        <pre>
          {`Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
Explanation: The binary tree has 3 levels:
- Level 0: [3]
- Level 1: [9,20]
- Level 2: [15,7]`}
        </pre>
      </section>

      <section className="visualization">
        <TreeLevelVisualizer
          tree={tree}
          currentLevel={currentLevel}
          visitedNodes={visitedNodes}
          levelResults={levelResults}
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
              onClick={performLevelOrder}
              disabled={isRunning}
            >
              Start Traversal
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
          <h3>BFS Solution</h3>
          <ol>
            <li>Use a queue to store nodes at each level</li>
            <li>For each level:
              <ul>
                <li>Get the number of nodes at current level</li>
                <li>Process all nodes at current level</li>
                <li>Add their children to queue for next level</li>
                <li>Store current level's values in result</li>
              </ul>
            </li>
            <li>Continue until queue is empty</li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(n) where n is the number of nodes in the tree</p>
          
          <h3>Space Complexity</h3>
          <p>O(w) where w is the maximum width of the tree</p>
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

export default LevelOrderTraversal;