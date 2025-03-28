// src/pages/Problems/LinkedLists/DesignLinkedList.jsx
import React, { useState } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';

const DesignLinkedList = () => {
  const [language, setLanguage] = useState('javascript');

  // Since this is a design problem, visualization is conceptual
  const conceptualVisualization = `
  Singly Linked List Structure:
  
  Head → [Node Val|Next] → [Node Val|Next] → ... → [Node Val|NULL]
  
  Operations:
  - get(index): Traverse to the index-th node and return its value.
  - addAtHead(val): Create a new node, make it the new head.
  - addAtTail(val): Traverse to the last node, append the new node.
  - addAtIndex(index, val): Traverse to the (index-1)-th node, insert the new node.
  - deleteAtIndex(index): Traverse to the (index-1)-th node, update its next pointer to skip the index-th node.
  `;

  const implementations = {
    javascript: `
class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

/**
 * Initialize your data structure here.
 */
class MyLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    /**
     * Helper function to get the node at a specific index.
     * Returns null if index is invalid.
     */
    getNode(index) {
        if (index < 0 || index >= this.size) return null;
        let current = this.head;
        // Traverse index steps from head
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }

    /**
     * Get the value of the index-th node in the linked list. 
     * If the index is invalid, return -1.
     * @param {number} index
     * @return {number}
     */
    get(index) {
        const node = this.getNode(index);
        return node ? node.val : -1;
    }

    /**
     * Add a node of value val before the first element of the linked list. 
     * After the insertion, the new node will be the first node of the linked list.
     * @param {number} val
     * @return {void}
     */
    addAtHead(val) {
        const newNode = new ListNode(val);
        newNode.next = this.head; // New node points to the old head
        this.head = newNode;      // Update head to the new node
        this.size++;              // Increment size
    }

    /**
     * Append a node of value val to the last element of the linked list.
     * @param {number} val
     * @return {void}
     */
    addAtTail(val) {
        const newNode = new ListNode(val);
        if (!this.head) { // If list is empty
            this.head = newNode;
        } else {
            let current = this.head;
            // Traverse to the last node
            while (current.next) {
                current = current.next;
            }
            current.next = newNode; // Append new node
        }
        this.size++; // Increment size
    }

    /**
     * Add a node of value val before the index-th node in the linked list. 
     * If index equals the length of linked list, the node will be appended to the end. 
     * If index is greater than the length, the node will not be inserted.
     * @param {number} index 
     * @param {number} val
     * @return {void}
     */
    addAtIndex(index, val) {
        // Handle invalid index
        if (index < 0 || index > this.size) return; 
        
        // Handle insertion at head
        if (index === 0) {
            this.addAtHead(val);
            return;
        }
        // Handle insertion at tail (covered by loop logic but explicit check is fine too)
        // if (index === this.size) {
        //     this.addAtTail(val);
        //     return;
        // }
        
        const newNode = new ListNode(val);
        // Get the node *before* the target index
        const prevNode = this.getNode(index - 1); 
        
        // Insert the new node
        newNode.next = prevNode.next; 
        prevNode.next = newNode;
        this.size++; // Increment size
    }

    /**
     * Delete the index-th node in the linked list, if the index is valid.
     * @param {number} index
     * @return {void}
     */
    deleteAtIndex(index) {
        // Handle invalid index
        if (index < 0 || index >= this.size) return; 
        
        // Handle deletion of head
        if (index === 0) {
            this.head = this.head.next;
            this.size--;
            return;
        }
        
        // Get the node *before* the target index
        const prevNode = this.getNode(index - 1);
        
        // Update the previous node's next pointer to skip the target node
        if (prevNode && prevNode.next) { 
            prevNode.next = prevNode.next.next;
            this.size--; // Decrement size
        }
    }
}
`,
    python: `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class MyLinkedList:
    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.head = None
        self.size = 0

    def get_node(self, index: int) -> ListNode:
        """ Helper function to get the node at a specific index. """
        if index < 0 or index >= self.size:
            return None
        current = self.head
        for _ in range(index):
            current = current.next
        return current

    def get(self, index: int) -> int:
        """
        Get the value of the index-th node in the linked list. 
        If the index is invalid, return -1.
        """
        node = self.get_node(index)
        return node.val if node else -1

    def addAtHead(self, val: int) -> None:
        """
        Add a node of value val before the first element of the linked list. 
        After the insertion, the new node will be the first node.
        """
        new_node = ListNode(val)
        new_node.next = self.head
        self.head = new_node
        self.size += 1

    def addAtTail(self, val: int) -> None:
        """
        Append a node of value val to the last element of the linked list.
        """
        new_node = ListNode(val)
        if not self.head:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node
        self.size += 1

    def addAtIndex(self, index: int, val: int) -> None:
        """
        Add a node of value val before the index-th node in the linked list. 
        If index equals the length, append to the end. 
        If index is greater than the length, do not insert.
        """
        if index < 0 or index > self.size:
            return
        if index == 0:
            self.addAtHead(val)
            return
        # No need for explicit tail check, loop handles it
            
        new_node = ListNode(val)
        prev_node = self.get_node(index - 1)
        
        new_node.next = prev_node.next
        prev_node.next = new_node
        self.size += 1

    def deleteAtIndex(self, index: int) -> None:
        """
        Delete the index-th node in the linked list, if the index is valid.
        """
        if index < 0 or index >= self.size:
            return
        if index == 0:
            self.head = self.head.next
            self.size -= 1
            return
            
        prev_node = self.get_node(index - 1)
        if prev_node and prev_node.next:
            prev_node.next = prev_node.next.next
            self.size -= 1
`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Design Linked List</h1>
        <div className="problem-meta">
          <span className="difficulty medium">Medium</span>
          <span className="category">Linked List - Design</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          Design your implementation of the linked list. You can choose to use a singly or doubly linked list.
          A node in a singly linked list should have two attributes: <code>val</code> and <code>next</code>. <code>val</code> is the value of the current node, and <code>next</code> is a pointer/reference to the next node.
          If you choose to use a doubly linked list, you will need one more attribute <code>prev</code> to indicate the previous node in the linked list. Assume all values in the linked list are 0-indexed.
        </p>
        <p>Implement the <code>MyLinkedList</code> class:</p>
        <ul>
            <li><code>MyLinkedList()</code> Initializes the <code>MyLinkedList</code> object.</li>
            <li><code>int get(int index)</code> Get the value of the <code>index<sup>th</sup></code> node in the linked list. If the index is invalid, return <code>-1</code>.</li>
            <li><code>void addAtHead(int val)</code> Add a node of value <code>val</code> before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.</li>
            <li><code>void addAtTail(int val)</code> Append a node of value <code>val</code> as the last element of the linked list.</li>
            <li><code>void addAtIndex(int index, int val)</code> Add a node of value <code>val</code> before the <code>index<sup>th</sup></code> node in the linked list. If <code>index</code> equals the length of the linked list, the node will be appended to the end of the linked list. If <code>index</code> is greater than the length, the node will not be inserted.</li>
            <li><code>void deleteAtIndex(int index)</code> Delete the <code>index<sup>th</sup></code> node in the linked list, if the index is valid.</li>
        </ul>
      </section>

      {/* Conceptual Visualization Section */}
      <section className="visualization">
        <h3>Conceptual Structure & Operations</h3>
        <pre className="ascii-art">
          {conceptualVisualization}
        </pre>
        <p>This problem focuses on implementing the core linked list operations correctly rather than visualizing a specific algorithm run.</p>
      </section>


      <section className="approach">
        <h2>Approach (Singly Linked List)</h2>
        <div className="approach-content">
          <h3>Core Idea</h3>
          <p>Maintain a <code>head</code> pointer to the first node and a <code>size</code> counter. Implement each method by carefully traversing the list and manipulating the <code>next</code> pointers.</p>
          
          <h3>Key Implementation Details</h3>
          <ul>
            <li><strong><code>get(index)</code>:</strong> Traverse <code>index</code> steps from the head. Handle invalid indices.</li>
            <li><strong><code>addAtHead(val)</code>:</strong> Create a new node, set its <code>next</code> to the current head, and update the head.</li>
            <li><strong><code>addAtTail(val)</code>:</strong> Traverse to the last node (where <code>current.next</code> is null) and append the new node. Handle the empty list case.</li>
            <li><strong><code>addAtIndex(index, val)</code>:</strong> Handle edge cases (index 0, index == size). Otherwise, traverse to the node at <code>index - 1</code> (the predecessor) and insert the new node after it.</li>
            <li><strong><code>deleteAtIndex(index)</code>:</strong> Handle edge case (index 0). Otherwise, traverse to the node at <code>index - 1</code> (the predecessor) and update its <code>next</code> pointer to skip the node at <code>index</code>.</li>
            <li><strong>Helper Function:</strong> A <code>getNode(index)</code> helper can simplify finding nodes at specific indices.</li>
            <li><strong>Size Management:</strong> Remember to increment/decrement the <code>size</code> attribute in add/delete operations.</li>
          </ul>

          <h3>Time Complexity</h3>
          <ul>
            <li><code>get</code>, <code>addAtIndex</code>, <code>deleteAtIndex</code>: O(k) where k is the index (worst case O(N)).</li>
            <li><code>addAtHead</code>: O(1).</li>
            <li><code>addAtTail</code>: O(N) without a tail pointer, O(1) if a tail pointer is maintained.</li>
          </ul>
          <h3>Space Complexity</h3>
          <p>O(1) for the operations themselves (excluding space for the list nodes).</p>
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

export default DesignLinkedList;
