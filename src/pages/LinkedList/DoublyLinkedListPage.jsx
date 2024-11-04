// src/pages/LinkedList/DoublyLinkedListPage.jsx
import React, { useState } from 'react';
import LinkedListVisualizer from '../../components/DataStructureVisualizer/LinkedListVisualizer';
import CodeSnippet from '../../components/CodeSnippet/CodeSnippet';
import { doublyLinkedListImplementations } from '../../data/implementations/linkedListImplementations';
import './LinkedListPage.css';

const DoublyLinkedListPage = () => {
  const [language, setLanguage] = useState('javascript');
  const [nodes, setNodes] = useState([
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 }
  ]);
  const [currentNode, setCurrentNode] = useState(null);
  const [highlightedNodes, setHighlightedNodes] = useState(new Set());
  const [newNodeValue, setNewNodeValue] = useState('');

  const append = async () => {
    if (newNodeValue) {
      // Highlight each node to show traversal to the end
      for (let i = 0; i < nodes.length; i++) {
        setCurrentNode(i);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      setNodes([...nodes, { value: parseInt(newNodeValue) }]);
      setNewNodeValue('');
      setCurrentNode(null);
    }
  };

  const prepend = async () => {
    if (newNodeValue) {
      setCurrentNode(0);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setNodes([{ value: parseInt(newNodeValue) }, ...nodes]);
      setNewNodeValue('');
      setCurrentNode(null);
    }
  };

  const deleteNode = async (value) => {
    const valueToDelete = parseInt(value);
    // Highlight nodes until we find the one to delete
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].value === valueToDelete) {
        setCurrentNode(i);
        await new Promise(resolve => setTimeout(resolve, 500));
        setNodes(nodes.filter((_, index) => index !== i));
        setCurrentNode(null);
        break;
      }
      setCurrentNode(i);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    setNewNodeValue('');
  };

  const traverseForward = async () => {
    for (let i = 0; i < nodes.length; i++) {
      setCurrentNode(i);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    setCurrentNode(null);
  };

  const traverseBackward = async () => {
    for (let i = nodes.length - 1; i >= 0; i--) {
      setCurrentNode(i);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    setCurrentNode(null);
  };

  return (
    <div className="page-container">
      <h1>Doubly Linked List</h1>

      <section className="visualization">
        <LinkedListVisualizer
          nodes={nodes}
          type="doubly"
          currentNode={currentNode}
          highlightedNodes={highlightedNodes}
        />
        
        <div className="controls">
          <div className="input-group">
            <input
              type="number"
              value={newNodeValue}
              onChange={(e) => setNewNodeValue(e.target.value)}
              placeholder="Enter value"
              className="node-input"
            />
          </div>
          
          <div className="button-group">
            <button onClick={append} className="control-button">
              Append
            </button>
            <button onClick={prepend} className="control-button">
              Prepend
            </button>
            <button 
              onClick={() => deleteNode(newNodeValue)} 
              className="control-button"
            >
              Delete
            </button>
          </div>
          
          <div className="button-group">
            <button 
              onClick={traverseForward} 
              className="control-button traverse"
            >
              Traverse Forward →
            </button>
            <button 
              onClick={traverseBackward} 
              className="control-button traverse"
            >
              ← Traverse Backward
            </button>
          </div>
        </div>
      </section>

      <section className="explanation">
        <h2>About Doubly Linked Lists</h2>
        <p>
          A doubly linked list is a type of linked list where each node contains
          data and two references (links) - one to the next node and another to
          the previous node. This bidirectional linking allows for traversal in
          both forward and backward directions.
        </p>
        <div className="features">
          <h3>Key Features:</h3>
          <ul>
            <li>Bidirectional traversal</li>
            <li>O(1) insertion at beginning and end</li>
            <li>O(1) deletion when node reference is known</li>
            <li>More memory usage due to extra reference</li>
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
          code={doublyLinkedListImplementations[language]}
        />
      </section>
    </div>
  );
};

export default DoublyLinkedListPage;