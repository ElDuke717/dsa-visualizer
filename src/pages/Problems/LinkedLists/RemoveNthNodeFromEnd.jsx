// src/pages/Problems/LinkedLists/RemoveNthNodeFromEnd.jsx
import React, { useState, useEffect } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';

// Basic ListNode definition for structure
class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

// Helper to build list from array
const buildList = (arr) => {
    if (!arr || arr.length === 0) return null;
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
};

// Helper to get node array for visualization
const getListArray = (head) => {
    const arr = [];
    let current = head;
    while (current) {
        arr.push(current.val);
        current = current.next;
    }
    return arr;
};

const RemoveNthNodeFromEnd = () => {
    // Input states
    const [listStr, setListStr] = useState("1,2,3,4,5");
    const [nValue, setNValue] = useState(2);

    // Derived list state
    const [nodes, setNodes] = useState([]);

    // Visualization states
    const [slowPointerIdx, setSlowPointerIdx] = useState(-1); // Index or -1 for dummy
    const [fastPointerIdx, setFastPointerIdx] = useState(-1); // Index
    const [removedIdx, setRemovedIdx] = useState(-1); // Index of the node *before* the one removed
    const [finalList, setFinalList] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [speed, setSpeed] = useState(500);
    const [language, setLanguage] = useState('javascript');

    // Parse inputs and build list on input change
    useEffect(() => {
        try {
            const arr = listStr.split(',').filter(s => s.trim() !== '').map(Number);
            if (arr.some(isNaN)) {
                throw new Error("Invalid number format");
            }
            const head = buildList(arr);
            setNodes(getListArray(head));
            setFinalList(getListArray(head)); // Initialize final list
            resetVisualization(); // Reset viz when inputs change
        } catch (error) {
            console.error("Error parsing input:", error);
            // Handle error state if needed
        }
    }, [listStr, nValue]);

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const resetVisualization = () => {
        setSlowPointerIdx(-1);
        setFastPointerIdx(-1);
        setRemovedIdx(-1);
        setFinalList([...nodes]); // Reset final list display
    };

    const removeNthFromEnd = async () => {
        if (isRunning || nValue <= 0) return;
        setIsRunning(true);
        resetVisualization();

        const arr = listStr.split(',').filter(s => s.trim() !== '').map(Number);
        const n = nValue;
        const listLength = arr.length;

        if (n > listLength) {
             console.error("n is greater than the length of the list");
             setIsRunning(false);
             return; // Or handle appropriately
        }

        // Use dummy head concept for visualization indices
        let slowIdx = -1; // Represents dummy head
        let fastIdx = -1; // Represents dummy head initially

        setSlowPointerIdx(slowIdx);
        setFastPointerIdx(fastIdx);
        await sleep(speed);

        // Advance fast pointer n steps
        for (let i = 0; i < n; i++) {
            fastIdx++;
            if (fastIdx >= listLength) {
                 console.error("Error advancing fast pointer");
                 setIsRunning(false);
                 return;
            }
            setFastPointerIdx(fastIdx);
            await sleep(speed);
        }

        // Move both pointers until fast reaches the end
        while (fastIdx < listLength - 1) {
            slowIdx++;
            fastIdx++;
            setSlowPointerIdx(slowIdx);
            setFastPointerIdx(fastIdx);
            await sleep(speed);
        }

        // Now slowIdx points to the node *before* the one to be removed
        setRemovedIdx(slowIdx); // Highlight the node before removal target
        await sleep(speed * 1.5); // Pause to show which node's 'next' is changing

        // Calculate final list after removal
        const newFinalList = [];
        let head = buildList(arr);
        let dummy = new ListNode(0, head);
        let tempSlow = dummy;
        for(let i = 0; i < slowIdx + 1; i++) { // slowIdx is 0-based from dummy
             if (tempSlow) tempSlow = tempSlow.next;
        }

        if (tempSlow && tempSlow.next) {
             tempSlow.next = tempSlow.next.next; // Perform removal
        }
        setFinalList(getListArray(dummy.next)); // Update display list


        // Optional: Clear pointers after completion
        // setSlowPointerIdx(-1);
        // setFastPointerIdx(-1);

        setIsRunning(false);
    };

    const implementations = {
        javascript: `
function removeNthFromEnd(head, n) {
    let dummy = new ListNode(0);
    dummy.next = head;
    let fast = dummy;
    let slow = dummy;

    // Advance fast pointer n steps ahead
    for (let i = 0; i < n; i++) {
        if (!fast.next) return head; // Handle cases where n > length
        fast = fast.next;
    }

    // Move both pointers until fast reaches the last node
    while (fast.next !== null) {
        slow = slow.next;
        fast = fast.next;
    }

    // slow is now pointing to the node before the target node
    // Remove the nth node from the end
    if (slow.next) {
        slow.next = slow.next.next;
    }

    return dummy.next; // Return the head of the modified list
}`,
        python: `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def removeNthFromEnd(head: ListNode, n: int) -> ListNode:
    dummy = ListNode(0)
    dummy.next = head
    fast = dummy
    slow = dummy

    # Advance fast pointer n steps ahead
    for _ in range(n):
        if not fast.next:
            return head # Should not happen based on constraints, but good practice
        fast = fast.next

    # Move both pointers until fast reaches the last node
    while fast.next:
        slow = slow.next
        fast = fast.next

    # slow is now pointing to the node before the target node
    # Remove the nth node from the end
    if slow.next:
        slow.next = slow.next.next

    return dummy.next # Return the head of the modified list`
    };

    // Helper to render the list for visualization
    const renderListViz = (listData, slowIdx, fastIdx, removedBeforeIdx) => (
        <div className="nodes-container">
            {/* Dummy Node Representation */}
            <div className={`node-wrapper ${slowIdx === -1 ? 'slow-pointer-highlight' : ''} ${fastIdx === -1 ? 'fast-pointer-highlight' : ''}`}>
                <div className="node dummy-node">D</div>
                <div className="arrow">→</div>
            </div>

            {listData.map((value, idx) => (
                <React.Fragment key={idx}>
                    <div className={`node-wrapper ${idx === removedBeforeIdx + 1 ? 'removed' : ''}`}>
                        <div className={`node 
                            ${idx === slowIdx ? 'slow-pointer' : ''} 
                            ${idx === fastIdx ? 'fast-pointer' : ''}
                            ${idx === removedBeforeIdx ? 'prev-pointer-highlight' : ''} 
                        `}>
                            {value}
                        </div>
                    </div>
                    {idx < listData.length - 1 && <div className={`arrow ${idx === removedBeforeIdx ? 'removed-arrow' : ''}`}>→</div>}
                </React.Fragment>
            ))}
             <div className="node-wrapper">
               <div className="node null-node">NULL</div>
             </div>
        </div>
    );


    return (
        <div className="problem-page">
            <header className="problem-header">
                <h1>Remove Nth Node From End of List</h1>
                <div className="problem-meta">
                    <span className="difficulty medium">Medium</span>
                    <span className="category">Linked List - Two Pointers</span>
                </div>
            </header>

            <section className="problem-statement">
                <h2>Problem Statement</h2>
                <p>
                    Given the <code>head</code> of a linked list, remove the <code>n<sup>th</sup></code> node from the end of the list and return its head.
                </p>
            </section>

            <section className="visualization">
                <div className="linked-list-visualization">
                    {renderListViz(finalList, slowPointerIdx, fastPointerIdx, removedIdx)}
                </div>

                <div className="status-message">
                    {isRunning ? 'Running algorithm...' :
                     removedIdx !== -1 ? `Removed node after index ${removedIdx} (original list)` :
                     'Click Start to begin'}
                </div>

                 <div className="pointer-info">
                    <div className="slow-info">Slow Pointer Index: {slowPointerIdx}</div>
                    <div className="fast-info">Fast Pointer Index: {fastPointerIdx}</div>
                 </div>


                <div className="controls">
                    <div className="input-group">
                        <label>List Nodes (comma-separated):</label>
                        <input value={listStr} onChange={(e) => setListStr(e.target.value)} disabled={isRunning} />
                    </div>
                     <div className="input-group">
                        <label>N (from end):</label>
                        <input type="number" min="1" value={nValue} onChange={(e) => setNValue(Number(e.target.value))} disabled={isRunning} />
                    </div>
                    <div className="input-group">
                        <label>Animation Speed (ms):</label>
                        <input type="range" min="100" max="1000" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
                    </div>
                    <div className="button-group">
                        <button onClick={removeNthFromEnd} disabled={isRunning || nValue <= 0}>
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
                    <h3>Two Pointers Technique (One Pass)</h3>
                    <ol>
                        <li>Create a dummy node and point its <code>next</code> to the head of the list. This handles edge cases like removing the head.</li>
                        <li>Initialize two pointers, <code>slow</code> and <code>fast</code>, both starting at the dummy node.</li>
                        <li>Advance the <code>fast</code> pointer <code>n</code> steps forward.</li>
                        <li>Now, move both <code>slow</code> and <code>fast</code> pointers one step at a time until <code>fast</code> reaches the last node of the list (i.e., <code>fast.next</code> is <code>null</code>).</li>
                        <li>At this point, the <code>slow</code> pointer will be pointing to the node just before the Nth node from the end.</li>
                        <li>Update <code>slow.next</code> to skip the Nth node: <code>slow.next = slow.next.next</code>.</li>
                        <li>Return <code>dummy.next</code>, which is the head of the modified list.</li>
                    </ol>

                    <h3>Time Complexity</h3>
                    <p>O(L) where L is the length of the linked list, as we traverse the list once.</p>

                    <h3>Space Complexity</h3>
                    <p>O(1) constant space, as we only use a few pointers.</p>
                </div>
            </section>

            <section className="implementation">
                <h2>Implementation</h2>
                <div className="language-selector">
                    <button onClick={() => setLanguage('javascript')} className={`lang-button ${language === 'javascript' ? 'active' : ''}`}>JavaScript</button>
                    <button onClick={() => setLanguage('python')} className={`lang-button ${language === 'python' ? 'active' : ''}`}>Python</button>
                </div>
                <CodeSnippet language={language} code={implementations[language]} />
            </section>
        </div>
    );
};

export default RemoveNthNodeFromEnd;
