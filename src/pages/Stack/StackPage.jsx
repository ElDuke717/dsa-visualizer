// src/pages/Stack/StackPage.jsx
import React, { useState, useEffect } from 'react';
import StackVisualizer from '../../components/DataStructureVisualizer/StackVisualizer';
import CodeSnippet from '../../components/CodeSnippet/CodeSnippet';
import { stackImplementations } from '../../data/implementations/stackImplementations';
import './StackPage.css';

const StackPage = () => {
  const [language, setLanguage] = useState('javascript');
  const [stack, setStack] = useState([]);
  const [currentOperation, setCurrentOperation] = useState(null);
  const [isPopping, setIsPopping] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [inputValue, setInputValue] = useState('');

  const push = () => {
    if (inputValue.trim() === '') return;
    
    setNewItem(inputValue);
    setIsPushing(true);
    setCurrentOperation('push');
    
    setTimeout(() => {
      setStack([...stack, inputValue]);
      setIsPushing(false);
      setInputValue('');
    }, 500);
  };

  const pop = () => {
    if (stack.length === 0) return;
    
    setIsPopping(true);
    setCurrentOperation('pop');
    
    setTimeout(() => {
      setStack(stack.slice(0, -1));
      setIsPopping(false);
    }, 500);
  };

  const peek = () => {
    if (stack.length === 0) return;
    
    setCurrentOperation('peek');
    
    setTimeout(() => {
      setCurrentOperation(null);
    }, 1000);
  };

  const clear = () => {
    setCurrentOperation('clear');
    
    setTimeout(() => {
      setStack([]);
      setCurrentOperation(null);
    }, 500);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      push();
    }
  };

  return (
    <div className="page-container">
      <h1>Stack Data Structure</h1>
      
      <section className="visualization">
        <StackVisualizer
          stack={stack}
          currentOperation={currentOperation}
          isPopping={isPopping}
          isPushing={isPushing}
          newItem={newItem}
        />
        <div className="controls">
          <div className="input-group">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter value to push"
              className="stack-input"
            />
            <button onClick={push} className="control-button">Push</button>
          </div>
          <div className="button-group">
            <button onClick={pop} className="control-button" disabled={stack.length === 0}>Pop</button>
            <button onClick={peek} className="control-button" disabled={stack.length === 0}>Peek</button>
            <button onClick={clear} className="control-button" disabled={stack.length === 0}>Clear</button>
          </div>
        </div>
      </section>

      <section className="explanation">
        <h2>Stack Data Structure</h2>
        <p>
          A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. Elements
          are added to and removed from the same end, called the top of the stack.
        </p>
        
        <div className="features">
          <h3>Key Characteristics:</h3>
          <ul>
            <li>LIFO (Last-In-First-Out) principle</li>
            <li>Elements are added and removed from the same end</li>
            <li>Only the top element is accessible at any time</li>
            <li>Time Complexity: O(1) for push, pop, peek operations</li>
            <li>Space Complexity: O(n) where n is the number of elements</li>
          </ul>
          
          <h3>Common Applications:</h3>
          <ul>
            <li>Function call management (call stack)</li>
            <li>Expression evaluation and syntax parsing</li>
            <li>Undo mechanisms in applications</li>
            <li>Backtracking algorithms</li>
            <li>Browser history navigation</li>
          </ul>
          
          <h3>Key Operations:</h3>
          <ul>
            <li><strong>Push:</strong> Add an element to the top of the stack</li>
            <li><strong>Pop:</strong> Remove the top element from the stack</li>
            <li><strong>Peek/Top:</strong> View the top element without removing it</li>
            <li><strong>isEmpty:</strong> Check if the stack is empty</li>
            <li><strong>Size:</strong> Get the number of elements in the stack</li>
          </ul>
          
          <h3>Advantages:</h3>
          <ul>
            <li>Simple and easy to implement</li>
            <li>Efficient for managing data with LIFO access pattern</li>
            <li>Memory efficient for operations that need to track state</li>
            <li>Useful for solving recursive problems iteratively</li>
          </ul>
          
          <h3>Limitations:</h3>
          <ul>
            <li>Limited access (only top element is accessible)</li>
            <li>No random access to elements</li>
            <li>Fixed size in array implementations (unless using dynamic arrays)</li>
            <li>Potential for stack overflow in fixed-size implementations</li>
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
          code={stackImplementations[language]}
        />
      </section>
    </div>
  );
};

export default StackPage;
