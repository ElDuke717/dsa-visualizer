// src/pages/Tree/BinaryTreePage.jsx
import React, { useState } from 'react';
import TreeVisualizer from '../../components/DataStructureVisualizer/TreeVisualizer';
import CodeSnippet from '../../components/CodeSnippet/CodeSnippet';
import './TreePage.css';

const BinaryTreePage = () => {
  const [language, setLanguage] = useState('javascript');
  const [nodes, setNodes] = useState([
    {
      value: 50,
      left: {
        value: 30,
        left: { value: 20, left: null, right: null },
        right: { value: 40, left: null, right: null }
      },
      right: {
        value: 70,
        left: { value: 60, left: null, right: null },
        right: { value: 80, left: null, right: null }
      }
    }
  ]);
  const [newValue, setNewValue] = useState('');
  const [currentNode, setCurrentNode] = useState(null);

  const insertNode = (value) => {
    const newNode = { value: parseInt(value), left: null, right: null };
    
    if (nodes.length === 0) {
      setNodes([newNode]);
      return;
    }

    const insert = (node) => {
      if (newNode.value < node.value) {
        if (!node.left) {
          node.left = newNode;
        } else {
          insert(node.left);
        }
      } else {
        if (!node.right) {
          node.right = newNode;
        } else {
          insert(node.right);
        }
      }
    };

    const updatedNodes = [...nodes];
    insert(updatedNodes[0]);
    setNodes(updatedNodes);
    setNewValue('');
  };

  const treeImplementations = {
    javascript: `
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    const insertNode = (node, newNode) => {
      if (newNode.value < node.value) {
        if (!node.left) {
          node.left = newNode;
        } else {
          insertNode(node.left, newNode);
        }
      } else {
        if (!node.right) {
          node.right = newNode;
        } else {
          insertNode(node.right, newNode);
        }
      }
    };

    insertNode(this.root, newNode);
  }

  inorderTraversal(node = this.root) {
    if (!node) return [];
    
    return [
      ...this.inorderTraversal(node.left),
      node.value,
      ...this.inorderTraversal(node.right)
    ];
  }

  preorderTraversal(node = this.root) {
    if (!node) return [];
    
    return [
      node.value,
      ...this.preorderTraversal(node.left),
      ...this.preorderTraversal(node.right)
    ];
  }

  postorderTraversal(node = this.root) {
    if (!node) return [];
    
    return [
      ...this.postorderTraversal(node.left),
      ...this.postorderTraversal(node.right),
      node.value
    ];
  }
}`,
    python: `
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BinaryTree:
    def __init__(self):
        self.root = None
    
    def insert(self, value):
        new_node = Node(value)
        
        if not self.root:
            self.root = new_node
            return
        
        def insert_node(node, new_node):
            if new_node.value < node.value:
                if not node.left:
                    node.left = new_node
                else:
                    insert_node(node.left, new_node)
            else:
                if not node.right:
                    node.right = new_node
                else:
                    insert_node(node.right, new_node)
        
        insert_node(self.root, new_node)
    
    def inorder_traversal(self, node=None):
        if node is None:
            node = self.root
        if not node:
            return []
        
        return (
            self.inorder_traversal(node.left) +
            [node.value] +
            self.inorder_traversal(node.right)
        )
    
    def preorder_traversal(self, node=None):
        if node is None:
            node = self.root
        if not node:
            return []
        
        return (
            [node.value] +
            self.preorder_traversal(node.left) +
            self.preorder_traversal(node.right)
        )
    
    def postorder_traversal(self, node=None):
        if node is None:
            node = self.root
        if not node:
            return []
        
        return (
            self.postorder_traversal(node.left) +
            self.postorder_traversal(node.right) +
            [node.value]
        )`
  };

  const TreeExplanation = () => (
    <section className="explanation">
      <h2>Binary Tree</h2>
      <p>
        A binary tree is a hierarchical data structure where each node has at most two children, 
        referred to as the left child and the right child.
      </p>

      <div className="features">
        <h3>Key Characteristics:</h3>
        <ul>
          <li>Each node has at most two children</li>
          <li>Nodes are connected by edges</li>
          <li>Has a single root node</li>
          <li>Can be empty (null)</li>
        </ul>

        <h3>Types of Binary Trees:</h3>
        <ul>
          <li>Full Binary Tree: Each node has 0 or 2 children</li>
          <li>Complete Binary Tree: All levels filled except possibly last level</li>
          <li>Perfect Binary Tree: All internal nodes have 2 children and leaves are at same level</li>
          <li>Balanced Binary Tree: Height difference of left and right subtrees is at most 1</li>
        </ul>

        <h3>Common Operations:</h3>
        <ul>
          <li>Insertion: O(h) where h is height</li>
          <li>Traversal: O(n)</li>
          <li>Search: O(h)</li>
          <li>Deletion: O(h)</li>
        </ul>

        <h3>Traversal Methods:</h3>
        <ul>
          <li>Inorder (Left, Root, Right)</li>
          <li>Preorder (Root, Left, Right)</li>
          <li>Postorder (Left, Right, Root)</li>
          <li>Level Order (Breadth-First)</li>
        </ul>
      </div>
    </section>
  );

  return (
    <div className="page-container">
      <h1>Binary Tree Implementation</h1>

      <section className="visualization">
        <TreeVisualizer
          nodes={nodes}
          currentNode={currentNode}
        />
        <div className="controls">
          <input
            type="number"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Enter value"
          />
          <button onClick={() => insertNode(newValue)}>
            Insert Node
          </button>
        </div>
      </section>

      <TreeExplanation />

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
          code={treeImplementations[language]}
        />
      </section>
    </div>
  );
};

export default BinaryTreePage;