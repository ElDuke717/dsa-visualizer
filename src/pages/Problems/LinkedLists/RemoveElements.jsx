// src/pages/Problems/LinkedLists/RemoveElements.jsx
import React, { useState } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';

const RemoveElements = () => {
  const [nodes, setNodes] = useState([1, 2, 6, 3, 4, 5, 6]);
  const [valToRemove, setValToRemove] = useState(6);
  const [currentPointer, setCurrentPointer] = useState(-1);
  const [prevPointer, setPrevPointer] = useState(-1); // Using -1 for dummy head initially
  const [removedIndices, setRemovedIndices] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState('javascript');
  const [displayNodes, setDisplayNodes] = useState([1, 2, 6, 3, 4, 5, 6]); // Nodes to display

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setCurrentPointer(-1);
    setPrevPointer(-1);
    setRemovedIndices([]);
    setDisplayNodes([...nodes]); // Reset display nodes to original input
  };

  const startRemoval = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();
    
    let currentDisplayNodes = [...nodes];
    let dummyHead = { val: -1, nextIndex: 0 }; // Dummy node points to the start
    let prevIdx = -1; // Represents the dummy head
    let currentIdx = 0;
    let removed = [];

    setPrevPointer(prevIdx); // Highlight dummy head conceptually

    while (currentIdx < nodes.length) {
      setCurrentPointer(currentIdx);
      await sleep(speed);

      if (nodes[currentIdx] === valToRemove) {
        // Mark for removal
        removed.push(currentIdx);
        setRemovedIndices([...removed]);
        
        // Update dummy/prev's next pointer conceptually (skipping current)
        // In a real list, prev.next = current.next
        // Here, we just move current pointer without updating prev pointer
        
        await sleep(speed); // Pause to show removal
        currentIdx++; // Move to next node in original list
      } else {
        // Keep the node
        // In a real list, prev.next = current; prev = current;
        prevIdx = currentIdx; // Update prev pointer
        setPrevPointer(prevIdx);
        currentIdx++; // Move to next node in original list
      }
    }
    
    // Update display nodes after simulation
    const finalNodes = nodes.filter((_, idx) => !removed.includes(idx));
    setDisplayNodes(finalNodes);

    setCurrentPointer(-1); // Clear pointers
    setPrevPointer(-1);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function removeElements(head, val) {
    // Handle cases where head itself needs removal
    while (head && head.val === val) {
        head = head.next;
    }
    
    let current = head;
    while (current && current.next) {
        if (current.next.val === val) {
            // Skip the node with the target value
            current.next = current.next.next;
        } else {
            // Move to the next node
            current = current.next;
        }
    }
    
    return head;
}

// Alternative using dummy head
function removeElementsWithDummy(head, val) {
    let dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    let current = head;

    while (current) {
        if (current.val === val) {
            prev.next = current.next; // Remove current node
        } else {
            prev = current; // Move prev pointer only if node is kept
        }
        current = current.next; // Always move current pointer
    }

    return dummy.next;
}`,
    python: `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def removeElements(head: ListNode, val: int) -> ListNode:
    # Handle cases where head itself needs removal
    while head and head.val == val:
        head = head.next
        
    current = head
    while current and current.next:
        if current.next.val == val:
            # Skip the node with the target value
            current.next = current.next.next
        else:
            # Move to the next node
            current = current.next
            
    return head

# Alternative using dummy head
def removeElementsWithDummy(head: ListNode, val: int) -> ListNode:
    dummy = ListNode(0)
    dummy.next = head
    prev = dummy
    current = head

    while current:
        if current.val == val:
            prev.next = current.next # Remove current node
        else:
            prev = current # Move prev pointer only if node is kept
        current = current.next # Always move current pointer
        
    return dummy.next`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Remove Linked List Elements</h1>
        <div className="problem-meta">
          <span className="difficulty easy">Easy</span>
          <span className="category">Linked List</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          Given the <code>head</code> of a linked list and an integer <code>val</code>, remove all the nodes of the linked list that has <code>Node.val == val</code>, and return the new head.
        </p>
      </section>

      <section className="visualization">
        <div className="linked-list-visualization">
          <div className="nodes-container">
             {/* Dummy Node Representation */}
             <div className={`node-wrapper ${prevPointer === -1 ? 'prev-pointer-highlight' : ''}`}>
               <div className="node dummy-node">D</div>
               <div className="arrow">→</div>
             </div>

            {displayNodes.map((value, idx) => {
              // Find original index in the initial `nodes` array
              let originalIndex = -1;
              let count = 0;
              for(let i = 0; i < nodes.length; i++) {
                if (!removedIndices.includes(i)) {
                  if (count === idx) {
                    originalIndex = i;
                    break;
                  }
                  count++;
                }
              }

              return (
                <div key={idx} className={`node-wrapper ${removedIndices.includes(originalIndex) ? 'removed' : ''}`}>
                  <div 
                    className={`node ${
                      originalIndex === currentPointer ? 'current-pointer' : ''
                    } ${
                      originalIndex === prevPointer ? 'prev-pointer-highlight' : ''
                    }`}
                  >
                    {value}
                  </div>
                  {idx < displayNodes.length - 1 && (
                    <div className="arrow">→</div>
                  )}
                </div>
              );
            })}
             <div className="node-wrapper">
               <div className="node null-node">NULL</div>
             </div>
          </div>

          <div className="status-message">
            {isRunning ? 'Removing elements...' : 'Click Start to begin removal'}
          </div>

          <div className="pointer-info">
            <div className="prev-info">Previous Pointer: {prevPointer !== -1 ? (prevPointer === -1 ? 'Dummy' : nodes[prevPointer]) : 'Not started'}</div>
            <div className="current-info">Current Pointer: {currentPointer !== -1 ? nodes[currentPointer] : 'Not started'}</div>
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
                  setDisplayNodes(vals); // Update display nodes on input change
                  resetVisualization();
                }
              }}
              disabled={isRunning}
            />
          </div>
          <div className="input-group">
            <label>Value to Remove:</label>
            <input
              type="number"
              value={valToRemove}
              onChange={(e) => setValToRemove(Number(e.target.value))}
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
            <button onClick={startRemoval} disabled={isRunning}>
              Start Removal
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
          <h3>Using a Dummy Head</h3>
          <ol>
            <li>Create a dummy node that points to the original head of the list. This simplifies edge cases like removing the head node itself.</li>
            <li>Initialize two pointers: <code>prev</code> starting at the dummy node and <code>current</code> starting at the original head.</li>
            <li>Iterate through the list using the <code>current</code> pointer.</li>
            <li>If <code>current.val</code> matches the value to remove:
              <ul><li>Update <code>prev.next</code> to skip the <code>current</code> node (<code>prev.next = current.next</code>).</li></ul>
            </li>
            <li>If <code>current.val</code> does not match:
              <ul><li>Move the <code>prev</code> pointer forward (<code>prev = current</code>).</li></ul>
            </li>
            <li>Always move the <code>current</code> pointer forward (<code>current = current.next</code>).</li>
            <li>Return <code>dummy.next</code>, which is the head of the modified list.</li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(n) where n is the number of nodes, as we traverse the list once.</p>
          
          <h3>Space Complexity</h3>
          <p>O(1) constant space (excluding the space for the list itself), as we only use a few pointers.</p>
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

export default RemoveElements;
