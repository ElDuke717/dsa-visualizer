// src/pages/Queue/QueuePage.jsx
import React, { useState } from 'react';
import QueueVisualizer from '../../components/DataStructureVisualizer/QueueVisualizer';
import CodeSnippet from '../../components/CodeSnippet/CodeSnippet';
import { queueImplementations } from '../../data/implementations/queueImplementations';
import './QueuePage.css';

const QueuePage = () => {
  const [language, setLanguage] = useState('javascript');
  const [queue, setQueue] = useState([]);
  const [currentOperation, setCurrentOperation] = useState(null);
  const [isDequeuing, setIsDequeuing] = useState(false);
  const [isEnqueuing, setIsEnqueuing] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [inputValue, setInputValue] = useState('');

  const enqueue = () => {
    if (inputValue.trim() === '') return;
    
    setNewItem(inputValue);
    setIsEnqueuing(true);
    setCurrentOperation('enqueue');
    
    setTimeout(() => {
      setQueue([...queue, inputValue]);
      setIsEnqueuing(false);
      setInputValue('');
    }, 500);
  };

  const dequeue = () => {
    if (queue.length === 0) return;
    
    setIsDequeuing(true);
    setCurrentOperation('dequeue');
    
    setTimeout(() => {
      setQueue(queue.slice(1));
      setIsDequeuing(false);
    }, 500);
  };

  const peek = () => {
    if (queue.length === 0) return;
    
    setCurrentOperation('peek');
    
    setTimeout(() => {
      setCurrentOperation(null);
    }, 1000);
  };

  const clear = () => {
    setCurrentOperation('clear');
    
    setTimeout(() => {
      setQueue([]);
      setCurrentOperation(null);
    }, 500);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      enqueue();
    }
  };

  return (
    <div className="page-container">
      <h1>Queue Data Structure</h1>
      
      <section className="visualization">
        <QueueVisualizer
          queue={queue}
          currentOperation={currentOperation}
          isDequeuing={isDequeuing}
          isEnqueuing={isEnqueuing}
          newItem={newItem}
        />
        <div className="controls">
          <div className="input-group">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter value to enqueue"
              className="queue-input"
            />
            <button onClick={enqueue} className="control-button">Enqueue</button>
          </div>
          <div className="button-group">
            <button onClick={dequeue} className="control-button" disabled={queue.length === 0}>Dequeue</button>
            <button onClick={peek} className="control-button" disabled={queue.length === 0}>Peek</button>
            <button onClick={clear} className="control-button" disabled={queue.length === 0}>Clear</button>
          </div>
        </div>
      </section>

      <section className="explanation">
        <h2>Queue Data Structure</h2>
        <p>
          A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle. Elements
          are added at one end (rear) and removed from the other end (front).
        </p>
        
        <div className="features">
          <h3>Key Characteristics:</h3>
          <ul>
            <li>FIFO (First-In-First-Out) principle</li>
            <li>Elements are added at the rear and removed from the front</li>
            <li>Only the front element can be accessed directly</li>
            <li>Time Complexity: O(1) for enqueue, O(1) for dequeue (amortized)</li>
            <li>Space Complexity: O(n) where n is the number of elements</li>
          </ul>
          
          <h3>Common Applications:</h3>
          <ul>
            <li>Task scheduling in operating systems</li>
            <li>Breadth-first search algorithm</li>
            <li>Print job spooling</li>
            <li>Message buffers and data streams</li>
            <li>Request handling in web servers</li>
          </ul>
          
          <h3>Key Operations:</h3>
          <ul>
            <li><strong>Enqueue:</strong> Add an element to the rear of the queue</li>
            <li><strong>Dequeue:</strong> Remove the element from the front of the queue</li>
            <li><strong>Front/Peek:</strong> View the front element without removing it</li>
            <li><strong>isEmpty:</strong> Check if the queue is empty</li>
            <li><strong>Size:</strong> Get the number of elements in the queue</li>
          </ul>
          
          <h3>Advantages:</h3>
          <ul>
            <li>Simple and intuitive to implement</li>
            <li>Efficient for managing data with FIFO access pattern</li>
            <li>Ensures fair processing of elements in order of arrival</li>
            <li>Useful for buffering and batch processing</li>
          </ul>
          
          <h3>Variations:</h3>
          <ul>
            <li>Circular Queue: Efficient use of fixed-size array</li>
            <li>Double-ended Queue (Deque): Insertion/deletion at both ends</li>
            <li>Priority Queue: Elements have priority values</li>
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
          code={queueImplementations[language]}
        />
      </section>
    </div>
  );
};

export default QueuePage;
