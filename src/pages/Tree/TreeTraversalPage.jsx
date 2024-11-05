// src/pages/Tree/TreeTraversalPage.jsx
import React, { useState } from 'react';
import TreeTraversalVisualizer from '../../components/DataStructureVisualizer/TreeTraversalVisualizer';
import CodeSnippet from '../../components/CodeSnippet/CodeSnippet';
import './TreeTraversalPage.css';

const TreeTraversalPage = () => {
  const [traversalType, setTraversalType] = useState('inorder');
  const [language, setLanguage] = useState('javascript');
  const [currentNode, setCurrentNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [traversalPath, setTraversalPath] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  // Sample binary tree
  const sampleTree = {
    value: 1,
    left: {
      value: 2,
      left: { value: 4, left: null, right: null },
      right: { value: 5, left: null, right: null }
    },
    right: {
      value: 3,
      left: { value: 6, left: null, right: null },
      right: { value: 7, left: null, right: null }
    }
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setCurrentNode(null);
    setVisitedNodes([]);
    setTraversalPath([]);
  };

  const updateVisualization = async (node) => {
    setCurrentNode(node);
    await sleep(1000);
    setVisitedNodes(prev => [...prev, node]);
    setTraversalPath(prev => [...prev, node]);
  };

  const inorderTraversal = async (node) => {
    if (!node) return;
    
    await inorderTraversal(node.left);
    await updateVisualization(node.value);
    await inorderTraversal(node.right);
  };

  const preorderTraversal = async (node) => {
    if (!node) return;
    
    await updateVisualization(node.value);
    await preorderTraversal(node.left);
    await preorderTraversal(node.right);
  };

  const postorderTraversal = async (node) => {
    if (!node) return;
    
    await postorderTraversal(node.left);
    await postorderTraversal(node.right);
    await updateVisualization(node.value);
  };

  const levelOrderTraversal = async (root) => {
    if (!root) return;
    
    const queue = [root];
    
    while (queue.length > 0) {
      const node = queue.shift();
      await updateVisualization(node.value);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  };

  const startTraversal = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    switch (traversalType) {
      case 'inorder':
        await inorderTraversal(sampleTree);
        break;
      case 'preorder':
        await preorderTraversal(sampleTree);
        break;
      case 'postorder':
        await postorderTraversal(sampleTree);
        break;
      case 'levelorder':
        await levelOrderTraversal(sampleTree);
        break;
      default:
        break;
    }

    setCurrentNode(null);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
// Tree Node class
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Tree Traversal implementations
class TreeTraversal {
  // Depth-First Search Traversals
  inorderTraversal(root) {
    const result = [];
    
    const traverse = (node) => {
      if (!node) return;
      
      traverse(node.left);
      result.push(node.value);
      traverse(node.right);
    };
    
    traverse(root);
    return result;
  }

  preorderTraversal(root) {
    const result = [];
    
    const traverse = (node) => {
      if (!node) return;
      
      result.push(node.value);
      traverse(node.left);
      traverse(node.right);
    };
    
    traverse(root);
    return result;
  }

  postorderTraversal(root) {
    const result = [];
    
    const traverse = (node) => {
      if (!node) return;
      
      traverse(node.left);
      traverse(node.right);
      result.push(node.value);
    };
    
    traverse(root);
    return result;
  }

  // Breadth-First Search Traversal
  levelOrderTraversal(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
      const node = queue.shift();
      result.push(node.value);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    return result;
  }
}`,
    python: `
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class TreeTraversal:
    # Depth-First Search Traversals
    def inorder_traversal(self, root):
        result = []
        
        def traverse(node):
            if not node:
                return
                
            traverse(node.left)
            result.append(node.value)
            traverse(node.right)
        
        traverse(root)
        return result
    
    def preorder_traversal(self, root):
        result = []
        
        def traverse(node):
            if not node:
                return
                
            result.append(node.value)
            traverse(node.left)
            traverse(node.right)
        
        traverse(root)
        return result
    
    def postorder_traversal(self, root):
        result = []
        
        def traverse(node):
            if not node:
                return
                
            traverse(node.left)
            traverse(node.right)
            result.append(node.value)
        
        traverse(root)
        return result
    
    # Breadth-First Search Traversal
    def level_order_traversal(self, root):
        if not root:
            return []
            
        result = []
        queue = [root]
        
        while queue:
            node = queue.pop(0)
            result.append(node.value)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        return result`
  };

  return (
    <div className="page-container">
      <h1>Tree Traversal Algorithms</h1>

      <section className="visualization">
        <TreeTraversalVisualizer
            tree={sampleTree}
            currentNode={currentNode}
            visitedNodes={visitedNodes}
            traversalPath={traversalPath}
        />
        <div className="controls">
            <div className="current-selection">
            Selected Method: <span>{
                traversalType === 'inorder' ? 'Inorder (DFS)' :
                traversalType === 'preorder' ? 'Preorder (DFS)' :
                traversalType === 'postorder' ? 'Postorder (DFS)' :
                'Level Order (BFS)'
            }</span>
            </div>
            <div className="traversal-selector">
            <button
                className={traversalType === 'inorder' ? 'active' : ''}
                onClick={() => {
                setTraversalType('inorder');
                resetVisualization();
                }}
                disabled={isRunning}
            >
                Inorder (DFS)
            </button>
            <button
                className={traversalType === 'preorder' ? 'active' : ''}
                onClick={() => {
                setTraversalType('preorder');
                resetVisualization();
                }}
                disabled={isRunning}
            >
                Preorder (DFS)
            </button>
            <button
                className={traversalType === 'postorder' ? 'active' : ''}
                onClick={() => {
                setTraversalType('postorder');
                resetVisualization();
                }}
                disabled={isRunning}
            >
                Postorder (DFS)
            </button>
            <button
                className={traversalType === 'levelorder' ? 'active' : ''}
                onClick={() => {
                setTraversalType('levelorder');
                resetVisualization();
                }}
                disabled={isRunning}
            >
                Level Order (BFS)
            </button>
            </div>
            <div className="action-buttons">
            <button
                onClick={startTraversal}
                disabled={isRunning}
            >
                {isRunning ? 'Traversing...' : 'Start Traversal'}
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

      <section className="explanation">
        <h2>Tree Traversal Algorithms</h2>
        <div className="traversal-types">
          <div className="traversal-type">
            <h3>Depth-First Search (DFS)</h3>
            <p>Explores as far as possible along each branch before backtracking.</p>
            <h4>Variants:</h4>
            <ul>
              <li>
                <strong>Inorder (Left → Root → Right):</strong>
                <br />
                Used for binary search trees to get elements in sorted order
              </li>
              <li>
                <strong>Preorder (Root → Left → Right):</strong>
                <br />
                Used to create a copy of the tree or get prefix expression
              </li>
              <li>
                <strong>Postorder (Left → Right → Root):</strong>
                <br />
                Used to delete the tree or get postfix expression
              </li>
            </ul>
          </div>

          <div className="traversal-type">
            <h3>Breadth-First Search (BFS)</h3>
            <p>Explores all nodes at present depth before moving to nodes at next depth level.</p>
            <h4>Characteristics:</h4>
            <ul>
              <li>Also called Level Order Traversal</li>
              <li>Uses a queue to track nodes</li>
              <li>Visits nodes level by level</li>
              <li>Useful for finding shortest paths</li>
            </ul>
          </div>
        </div>

        <div className="complexity">
          <h3>Time & Space Complexity</h3>
          <ul>
            <li>Time Complexity: O(n) for all traversals</li>
            <li>Space Complexity:
              <ul>
                <li>DFS: O(h) where h is height of tree (recursive stack)</li>
                <li>BFS: O(w) where w is maximum width of tree (queue size)</li>
              </ul>
            </li>
          </ul>
        </div>
      </section>

      <section className="implementation">
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

export default TreeTraversalPage;