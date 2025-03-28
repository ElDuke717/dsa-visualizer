// src/pages/Problems/LinkedLists/IntersectionOfTwoLinkedLists.jsx
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

// Helper to build lists from arrays and connect them
const buildLists = (arrA, arrB, commonArr, skipA, skipB) => {
    if (skipA >= arrA.length || skipB >= arrB.length) {
        // Invalid intersection point
        let headA = arrA.length > 0 ? new ListNode(arrA[0]) : null;
        let currentA = headA;
        for (let i = 1; i < arrA.length; i++) {
            currentA.next = new ListNode(arrA[i]);
            currentA = currentA.next;
        }

        let headB = arrB.length > 0 ? new ListNode(arrB[0]) : null;
        let currentB = headB;
        for (let i = 1; i < arrB.length; i++) {
            currentB.next = new ListNode(arrB[i]);
            currentB = currentB.next;
        }
        return { headA, headB, intersectionNode: null };
    }

    let commonHead = null;
    let commonCurrent = null;
    if (commonArr.length > 0) {
        commonHead = new ListNode(commonArr[0]);
        commonCurrent = commonHead;
        for (let i = 1; i < commonArr.length; i++) {
            commonCurrent.next = new ListNode(commonArr[i]);
            commonCurrent = commonCurrent.next;
        }
    }

    let headA = arrA.length > 0 ? new ListNode(arrA[0]) : null;
    let currentA = headA;
    let nodeBeforeIntersectionA = null;
    for (let i = 1; i < arrA.length; i++) {
        if (i === skipA) nodeBeforeIntersectionA = currentA;
        currentA.next = new ListNode(arrA[i]);
        currentA = currentA.next;
    }
    if (skipA === 0 && arrA.length > 0) nodeBeforeIntersectionA = headA; // Handle intersection at head
    if (skipA === arrA.length) nodeBeforeIntersectionA = currentA; // Handle intersection after tail

    let headB = arrB.length > 0 ? new ListNode(arrB[0]) : null;
    let currentB = headB;
    let nodeBeforeIntersectionB = null;
    for (let i = 1; i < arrB.length; i++) {
        if (i === skipB) nodeBeforeIntersectionB = currentB;
        currentB.next = new ListNode(arrB[i]);
        currentB = currentB.next;
    }
     if (skipB === 0 && arrB.length > 0) nodeBeforeIntersectionB = headB; // Handle intersection at head
     if (skipB === arrB.length) nodeBeforeIntersectionB = currentB; // Handle intersection after tail


    // Connect lists to the common part
    if (nodeBeforeIntersectionA) {
        nodeBeforeIntersectionA.next = commonHead;
    } else if (arrA.length === 0) {
         headA = commonHead; // List A starts at common part
    }

    if (nodeBeforeIntersectionB) {
        nodeBeforeIntersectionB.next = commonHead;
    } else if (arrB.length === 0) {
        headB = commonHead; // List B starts at common part
    }


    return { headA, headB, intersectionNode: commonHead };
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


const IntersectionOfTwoLinkedLists = () => {
    // Input states
    const [listAStr, setListAStr] = useState("4,1");
    const [listBStr, setListBStr] = useState("5,6,1");
    const [commonStr, setCommonStr] = useState("8,4,5");
    const [skipA, setSkipA] = useState(2); // Index in A where common part starts
    const [skipB, setSkipB] = useState(3); // Index in B where common part starts

    // Derived list states
    const [listA, setListA] = useState([]);
    const [listB, setListB] = useState([]);
    const [intersectionVal, setIntersectionVal] = useState(null);

    // Visualization states
    const [pointerA, setPointerA] = useState(null); // Node value or null
    const [pointerB, setPointerB] = useState(null); // Node value or null
    const [foundIntersection, setFoundIntersection] = useState(null); // Node value or null
    const [isRunning, setIsRunning] = useState(false);
    const [speed, setSpeed] = useState(500);
    const [language, setLanguage] = useState('javascript');

    // Parse inputs and build lists on input change
    useEffect(() => {
        try {
            const arrA = listAStr.split(',').filter(s => s.trim() !== '').map(Number);
            const arrB = listBStr.split(',').filter(s => s.trim() !== '').map(Number);
            const commonArr = commonStr.split(',').filter(s => s.trim() !== '').map(Number);

            if (arrA.some(isNaN) || arrB.some(isNaN) || commonArr.some(isNaN)) {
                throw new Error("Invalid number format");
            }

            const { headA, headB, intersectionNode } = buildLists(arrA, arrB, commonArr, skipA, skipB);
            setListA(getListArray(headA));
            setListB(getListArray(headB));
            setIntersectionVal(intersectionNode ? intersectionNode.val : null);
            resetVisualization(); // Reset viz when inputs change
        } catch (error) {
            console.error("Error parsing input:", error);
            // Handle error state if needed
        }
    }, [listAStr, listBStr, commonStr, skipA, skipB]);


    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const resetVisualization = () => {
        setPointerA(null);
        setPointerB(null);
        setFoundIntersection(null);
    };

    const findIntersection = async () => {
        if (isRunning) return;
        setIsRunning(true);
        resetVisualization();

        const arrA = listAStr.split(',').filter(s => s.trim() !== '').map(Number);
        const arrB = listBStr.split(',').filter(s => s.trim() !== '').map(Number);
        const commonArr = commonStr.split(',').filter(s => s.trim() !== '').map(Number);
        const { headA, headB } = buildLists(arrA, arrB, commonArr, skipA, skipB);

        let pA = headA;
        let pB = headB;
        let currentValA = pA ? pA.val : null;
        let currentValB = pB ? pB.val : null;

        while (pA !== pB) {
            setPointerA(currentValA);
            setPointerB(currentValB);
            await sleep(speed);

            pA = pA ? pA.next : headB; // If pA reaches end, switch to headB
            pB = pB ? pB.next : headA; // If pB reaches end, switch to headA

            currentValA = pA ? pA.val : null;
            currentValB = pB ? pB.val : null;

             // Highlight final state before loop ends or intersection is found
             setPointerA(currentValA);
             setPointerB(currentValB);
             await sleep(speed / 2); // Shorter pause for final state
        }

        setFoundIntersection(pA ? pA.val : null); // pA (or pB) is the intersection node or null
        setIsRunning(false);
    };

    const implementations = {
        javascript: `
function getIntersectionNode(headA, headB) {
    if (!headA || !headB) return null;

    let pA = headA;
    let pB = headB;

    // Traverse both lists. If a pointer reaches the end,
    // switch it to the head of the other list.
    // They will meet at the intersection or at null if no intersection.
    while (pA !== pB) {
        pA = pA === null ? headB : pA.next;
        pB = pB === null ? headA : pB.next;
    }
    
    // pA (or pB) is the intersection node or null
    return pA; 
}`,
        python: `
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

def getIntersectionNode(headA: ListNode, headB: ListNode) -> ListNode:
    if not headA or not headB:
        return None

    pA = headA
    pB = headB

    # Traverse both lists. If a pointer reaches the end,
    # switch it to the head of the other list.
    # They will meet at the intersection or at null if no intersection.
    while pA != pB:
        pA = headB if pA is None else pA.next
        pB = headA if pB is None else pB.next
        
    # pA (or pB) is the intersection node or None
    return pA`
    };

    // Helper to render a list for visualization
    const renderList = (listData, pointerVal, listName) => (
        <div className={`list-container ${listName}`}>
            <span className="list-label">{listName}:</span>
            {listData.map((value, idx) => (
                <React.Fragment key={`${listName}-${idx}`}>
                    <div className={`node ${value === pointerVal ? 'current-pointer' : ''} ${value === foundIntersection ? 'intersection-node' : ''}`}>
                        {value}
                    </div>
                    {idx < listData.length - 1 && <div className="arrow">→</div>}
                </React.Fragment>
            ))}
            {listData.length === 0 && <div className="node null-node">NULL</div>}
        </div>
    );


    return (
        <div className="problem-page">
            <header className="problem-header">
                <h1>Intersection of Two Linked Lists</h1>
                <div className="problem-meta">
                    <span className="difficulty easy">Easy</span>
                    <span className="category">Linked List - Two Pointers</span>
                </div>
            </header>

            <section className="problem-statement">
                <h2>Problem Statement</h2>
                <p>
                    Given the heads of two singly linked-lists <code>headA</code> and <code>headB</code>, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return <code>null</code>.
                </p>
                <p>
                    The lists are guaranteed to preserve their original structure after the function returns.
                </p>
            </section>

            <section className="visualization">
                <div className="linked-list-intersection-visualization">
                    {renderList(listA, pointerA, 'List A')}
                    {renderList(listB, pointerB, 'List B')}
                </div>

                <div className="status-message">
                    {isRunning ? 'Finding intersection...' :
                     foundIntersection !== null ? `Intersection found at node with value: ${foundIntersection}` :
                     (pointerA === null && pointerB === null && !isRunning) ? 'Click Start to find intersection' : 'No intersection found'}
                </div>

                 <div className="pointer-info">
                    <div className="pointer-a-info">Pointer A: {pointerA !== null ? pointerA : 'NULL'}</div>
                    <div className="pointer-b-info">Pointer B: {pointerB !== null ? pointerB : 'NULL'}</div>
                </div>


                <div className="controls">
                    <div className="input-group">
                        <label>List A Nodes (before common):</label>
                        <input value={listAStr} onChange={(e) => setListAStr(e.target.value)} disabled={isRunning} />
                    </div>
                     <div className="input-group">
                        <label>List B Nodes (before common):</label>
                        <input value={listBStr} onChange={(e) => setListBStr(e.target.value)} disabled={isRunning} />
                    </div>
                    <div className="input-group">
                        <label>Common Nodes:</label>
                        <input value={commonStr} onChange={(e) => setCommonStr(e.target.value)} disabled={isRunning} />
                    </div>
                     <div className="input-group">
                        <label>Skip A (index before common):</label>
                        <input type="number" min="0" value={skipA} onChange={(e) => setSkipA(Number(e.target.value))} disabled={isRunning} />
                    </div>
                     <div className="input-group">
                        <label>Skip B (index before common):</label>
                        <input type="number" min="0" value={skipB} onChange={(e) => setSkipB(Number(e.target.value))} disabled={isRunning} />
                    </div>
                    <div className="input-group">
                        <label>Animation Speed (ms):</label>
                        <input type="range" min="100" max="1000" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
                    </div>
                    <div className="button-group">
                        <button onClick={findIntersection} disabled={isRunning}>
                            Find Intersection
                        </button>
                        <button onClick={resetVisualization} disabled={isRunning}>
                            Reset Pointers
                        </button>
                    </div>
                </div>
            </section>

            <section className="approach">
                <h2>Approach</h2>
                <div className="approach-content">
                    <h3>Two Pointers Technique</h3>
                    <ol>
                        <li>Initialize two pointers, <code>pA</code> to the head of list A and <code>pB</code> to the head of list B.</li>
                        <li>Traverse both lists simultaneously with <code>pA</code> and <code>pB</code>.</li>
                        <li>If <code>pA</code> reaches the end of list A, redirect it to the head of list B.</li>
                        <li>If <code>pB</code> reaches the end of list B, redirect it to the head of list A.</li>
                        <li>Continue traversing. If the lists intersect, the pointers <code>pA</code> and <code>pB</code> will meet at the intersection node.</li>
                        <li>If the lists do not intersect, both pointers will reach the end (become <code>null</code>) simultaneously after traversing A + B nodes and B + A nodes respectively.</li>
                        <li>Return the node where they meet (which will be the intersection node or <code>null</code>).</li>
                    </ol>
                    <p>This works because both pointers travel the same total distance (lengthA + lengthB) before meeting, effectively compensating for any difference in list lengths before the intersection point.</p>

                    <h3>Time Complexity</h3>
                    <p>O(m + n) where m and n are the lengths of the two lists, as we traverse each list at most twice.</p>

                    <h3>Space Complexity</h3>
                    <p>O(1) constant space, as we only use two pointers.</p>
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

export default IntersectionOfTwoLinkedLists;
