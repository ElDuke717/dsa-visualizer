// src/pages/LinkedList/SinglyLinkedListPage.jsx
import React, { useState } from 'react';
import LinkedListVisualizer from '../../components/DataStructureVisualizer/LinkedListVisualizer';
import CodeSnippet from '../../components/CodeSnippet/CodeSnippet';
import { singlyLinkedListImplementations } from '../../data/implementations/linkedListImplementations';

const SinglyLinkedListPage = () => {
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

  const append = () => {
    if (newNodeValue) {
      setNodes([...nodes, { value: parseInt(newNodeValue) }]);
      setNewNodeValue('');
    }
  };

  const prepend = () => {
    if (newNodeValue) {
      setNodes([{ value: parseInt(newNodeValue) }, ...nodes]);
      setNewNodeValue('');
    }
  };

  const deleteNode = (value) => {
    setNodes(nodes.filter(node => node.value !== parseInt(value)));
  };

  return (
    <div className="page-container">
      <h1>Singly Linked List</h1>

      <section className="visualization">
        <LinkedListVisualizer
          nodes={nodes}
          type="singly"
          currentNode={currentNode}
          highlightedNodes={highlightedNodes}
        />
        
        <div className="controls">
          <input
            type="number"
            value={newNodeValue}
            onChange={(e) => setNewNodeValue(e.target.value)}
            placeholder="Enter value"
          />
          <button onClick={append}>Append</button>
          <button onClick={prepend}>Prepend</button>
          <button onClick={() => deleteNode(newNodeValue)}>Delete</button>
        </div>
      </section>

      <section className="implementation">
        <div className="language-selector">
          <button 
            onClick={() => setLanguage('javascript')}
            className={language === 'javascript' ? 'active' : ''}
          >
            JavaScript
          </button>
          <button 
            onClick={() => setLanguage('python')}
            className={language === 'python' ? 'active' : ''}
          >
            Python
          </button>
        </div>
        <CodeSnippet 
          language={language}
          code={singlyLinkedListImplementations[language]}
        />
      </section>
    </div>
  );
};

export default SinglyLinkedListPage;