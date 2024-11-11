// src/pages/Problems/LinkedLists/Cycle.jsx
import React, { useState } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';

const Cycle = () => {
  const [nodes, setNodes] = useState([3, 2, 0, -4]);
  const [cyclePos, setCyclePos] = useState(1); // position where cycle begins
  const [slowPointer, setSlowPointer] = useState(-1);
  const [fastPointer, setFastPointer] = useState(-1);
  const [hasCycle, setHasCycle] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState('javascript');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setSlowPointer(-1);
    setFastPointer(-1);
    setHasCycle(false);
  };

  const detectCycle = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    let slow = 0;
    let fast = 0;

    do {
      // Move slow pointer
      setSlowPointer(slow);
      slow = (slow + 1) % nodes.length;
      await sleep(speed);

      // Move fast pointer twice
      setFastPointer(fast);
      fast = (fast + 1) % nodes.length;
      await sleep(speed/2);
      
      setFastPointer(fast);
      fast = (fast + 1) % nodes.length;
      await sleep(speed/2);

      // Check if pointers meet
      if (slow === fast && slow !== 0) {
        setHasCycle(true);
        break;
      }
    } while (fast !== 0 && fast !== slow);

    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function hasCycle(head) {
    if (!head || !head.next) return false;
    
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) {
            return true;
        }
    }
    
    return false;
}`,
    python: `
def hasCycle(head: ListNode) -> bool:
    if not head or not head.next:
        return False
    
    slow = head
    fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        
        if slow == fast:
            return True
    
    return False`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Linked List Cycle</h1>
        <div className="problem-meta">
          <span className="difficulty easy">Easy</span>
          <span className="category">Linked List - Two Pointers</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          Given head, the head of a linked list, determine if the linked list has a cycle in it.
          There is a cycle in a linked list if there is some node in the list that can be reached again
          by continuously following the next pointer.
        </p>
      </section>

      <section className="visualization">
        <div className="linked-list-visualization">
          <div className="nodes-container">
            {nodes.map((value, idx) => (
              <div key={idx} className="node-wrapper">
                <div 
                  className={`node ${
                    idx === slowPointer ? 'slow-pointer' :
                    idx === fastPointer ? 'fast-pointer' :
                    ''
                  }`}
                >
                  {value}
                </div>
                {idx < nodes.length - 1 && (
                  <div className="arrow">→</div>
                )}
                {idx === nodes.length - 1 && cyclePos !== -1 && (
                  <div className="cycle-arrow">
                    ↩
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="cycle-status">
            {hasCycle ? (
              <div className="cycle-found">Cycle Detected!</div>
            ) : (
              <div className="searching">
                {isRunning ? 'Searching for cycle...' : 'Click Start to detect cycle'}
              </div>
            )}
          </div>

          <div className="pointer-info">
            <div className="slow-info">Slow Pointer: {slowPointer !== -1 ? nodes[slowPointer] : 'Not started'}</div>
            <div className="fast-info">Fast Pointer: {fastPointer !== -1 ? nodes[fastPointer] : 'Not started'}</div>
          </div>
        </div>

        <div className="controls">
          <div className="input-group">
            <label>Nodes (comma-separated):</label>
            <input
              value={nodes.join(',')}
              onChange={(e) => {
                const vals = e.target.value.split(',').map(Number);
                if (vals.every(n => !isNaN(n))) {
                  setNodes(vals);
                }
              }}
              disabled={isRunning}
            />
          </div>
          <div className="input-group">
            <label>Cycle Position:</label>
            <input
              type="number"
              min="-1"
              max={nodes.length - 1}
              value={cyclePos}
              onChange={(e) => setCyclePos(Number(e.target.value))}
              disabled={isRunning}
            />
          </div>
          <div className="input-group">
            <label>Animation Speed (ms):</label>
            <input
              type="range"
              min="100"
              max="1000"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
          </div>
          <div className="button-group">
            <button onClick={detectCycle} disabled={isRunning}>
              Detect Cycle
            </button>
            <button onClick={resetVisualization} disabled={isRunning}>
              Reset
            </button>
          </div>
        </div>
      </section>

      <section className="approach">
        <h2>Approach</h2>
        <div className="approach-content">
          <h3>Floyd's Cycle Finding Algorithm</h3>
          <ol>
            <li>Use two pointers: slow and fast</li>
            <li>Slow pointer moves one step at a time</li>
            <li>Fast pointer moves two steps at a time</li>
            <li>If they meet, there is a cycle</li>
            <li>If fast reaches null, there is no cycle</li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(n) where n is the number of nodes</p>
          
          <h3>Space Complexity</h3>
          <p>O(1) constant space</p>

          <h3>Key Points:</h3>
          <ul>
            <li>Also known as "tortoise and hare" algorithm</li>
            <li>Can be extended to find cycle start point</li>
            <li>Works because if cycle exists, fast pointer will eventually catch up</li>
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

export default Cycle;