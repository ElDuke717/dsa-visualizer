import React from 'react';
import { Link } from 'react-router-dom';
import CodeSnippet from '../../components/CodeSnippet/CodeSnippet';
import './DataStructuresOverviewPage.css';

const DataStructuresOverviewPage = () => {
  return (
    <div className="overview-page-container">
      <h1>Data Structures Overview</h1>
      
      <div className="overview-nav">
        <a href="#arrays">Arrays</a>
        <a href="#strings">Strings</a>
        <a href="#linked-lists">Linked Lists</a>
        <a href="#stacks">Stacks</a>
        <a href="#queues">Queues</a>
        <a href="#trees">Trees</a>
        <a href="#heaps">Heaps</a>
        <a href="#hash-tables">Hash Tables</a>
        <a href="#sets">Sets</a>
        <a href="#graphs">Graphs</a>
      </div>

      <section id="arrays" className="overview-section">
        <h2>Arrays & Dynamic Arrays</h2>
        <pre className="ascii-art">
          {`  Static Array:
  [10] [20] [30] [40] [50]
              0    1    2    3    4   ← Indices
  
  Dynamic Array (ArrayList/Vector):
  [10] [20] [30] [40] [50] [__] [__] [__]
   ↑                   ↑     ↑         ↑
  Used elements      Size   Reserved capacity`}
        </pre>
        <div className="overview-content">
          <div className="overview-description">
            <h3>What are Arrays?</h3>
            <p>
              Arrays are a fundamental data structure that store elements of the same type in contiguous memory locations.
              Static arrays have a fixed size determined at creation, while dynamic arrays (like ArrayList in Java or Vector in C++)
              can resize automatically as elements are added or removed.
            </p>
            
            <h3>Why are Arrays used?</h3>
            <p>
              Arrays provide fast random access to elements via indices, making them efficient for scenarios where
              direct access to elements is frequent. They form the foundation for many other data structures and algorithms.
            </p>
            
            <h3>Where are Arrays used?</h3>
            <ul>
              <li>Storing and manipulating collections of similar items</li>
              <li>Implementation of other data structures (stacks, queues, heaps)</li>
              <li>Matrix operations and multi-dimensional data</li>
              <li>Buffer pools and memory management</li>
              <li>Lookup tables and caching</li>
            </ul>
            
            <h3>Key Elements of Arrays</h3>
            <ul>
              <li><strong>Elements:</strong> Individual items stored in the array</li>
              <li><strong>Index:</strong> Position of an element (usually zero-based)</li>
              <li><strong>Length/Size:</strong> Number of elements in the array</li>
              <li><strong>Capacity:</strong> Maximum number of elements (for dynamic arrays)</li>
              <li><strong>Contiguous Memory:</strong> Elements stored in adjacent memory locations</li>
            </ul>
          </div>
          
          <div className="overview-links">
            <h3>Array Operations</h3>
            <ul>
              <li>Access: O(1) - Constant time</li>
              <li>Search: O(n) - Linear time (unsorted), O(log n) - Binary search (sorted)</li>
              <li>Insert/Delete at end: O(1) - Amortized for dynamic arrays</li>
              <li>Insert/Delete at arbitrary position: O(n) - Linear time</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="strings" className="overview-section">
        <h2>Strings</h2>
        <pre className="ascii-art">
          {`  "Hello, World!"
   
   H  e  l  l  o  ,     W  o  r  l  d  !
              0  1  2  3  4  5  6  7  8  9  10 11 12  ← Indices
   
   Immutable String: Create new on change
   "Hello" + " World" → New "Hello World"`}
        </pre>
        <div className="overview-content">
          <div className="overview-description">
            <h3>What are Strings?</h3>
            <p>
              Strings are sequences of characters used to represent text. In most programming languages, 
              strings are either immutable (cannot be changed after creation) or mutable (can be modified).
            </p>
            
            <h3>Why are Strings used?</h3>
            <p>
              Strings are essential for representing, storing, and manipulating text data. They provide
              specialized operations for text processing and are one of the most commonly used data types.
            </p>
            
            <h3>Where are Strings used?</h3>
            <ul>
              <li>Text processing and manipulation</li>
              <li>User input and output</li>
              <li>File I/O and data serialization</li>
              <li>Network communication and protocols</li>
              <li>Regular expressions and pattern matching</li>
            </ul>
            
            <h3>Key Elements of Strings</h3>
            <ul>
              <li><strong>Characters:</strong> Individual units (letters, digits, symbols)</li>
              <li><strong>Length:</strong> Number of characters in the string</li>
              <li><strong>Encoding:</strong> Representation of characters (ASCII, UTF-8, etc.)</li>
              <li><strong>Immutability:</strong> Whether strings can be modified after creation</li>
              <li><strong>String Pool:</strong> Memory optimization for string literals (in some languages)</li>
            </ul>
          </div>
          
          <div className="overview-links">
            <h3>Common String Operations</h3>
            <ul>
              <li>Concatenation: Joining strings together</li>
              <li>Substring: Extracting a portion of a string</li>
              <li>Search: Finding characters or patterns</li>
              <li>Replace: Substituting characters or patterns</li>
              <li>Split/Join: Converting between strings and arrays</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="graphs" className="overview-section">
        <h2>Graphs</h2>
        <pre className="ascii-art">
          {`           (A)----(B)
           / \\     |
          /   \\    |
        (C)    \\   |
         |      \\  |
         |       \\ |
        (D)------(E)`}
        </pre>
        <div className="overview-content">
          <div className="overview-description">
            <h3>What is a Graph?</h3>
            <p>
              A graph is a non-linear data structure consisting of nodes (vertices) and edges that connect these nodes. 
              Graphs can be directed (edges have direction) or undirected (edges have no direction), and weighted (edges have values) or unweighted.
            </p>
            
            <h3>Why are Graphs used?</h3>
            <p>
              Graphs are versatile structures that model relationships and connections between objects. They're ideal for representing 
              networks, hierarchies, paths, and any scenario where entities are interconnected.
            </p>
            
            <h3>Where are Graphs used?</h3>
            <ul>
              <li>Social networks (connections between users)</li>
              <li>Maps and navigation systems (roads connecting locations)</li>
              <li>Recommendation systems (relationships between products/users)</li>
              <li>Network routing (connections between devices)</li>
              <li>Dependency resolution (package dependencies)</li>
            </ul>
            
            <h3>Key Elements of Graphs</h3>
            <ul>
              <li><strong>Vertices (Nodes):</strong> The fundamental units of a graph</li>
              <li><strong>Edges:</strong> Connections between vertices</li>
              <li><strong>Adjacency:</strong> Relationship between vertices connected by an edge</li>
              <li><strong>Path:</strong> Sequence of vertices connected by edges</li>
              <li><strong>Cycle:</strong> Path that starts and ends at the same vertex</li>
            </ul>
          </div>
          
          <div className="overview-links">
            <h3>Explore Graphs</h3>
            <ul>
              <li><Link to="/graph/basic">Basic Graph</Link></li>
              <li><Link to="/graph/bfs">Breadth-First Search (BFS)</Link></li>
              <li><Link to="/graph/dfs">Depth-First Search (DFS)</Link></li>
              <li><Link to="/graph/dijkstra">Dijkstra's Algorithm</Link></li>
            </ul>
            
            <h3>Graph Problems</h3>
            <ul>
              <li><Link to="/problems/graphs/number-of-islands">Number of Islands</Link></li>
              <li><Link to="/problems/graphs/max-area-island">Max Area of Island</Link></li>
              <li><Link to="/problems/graphs/clone-graph">Clone Graph</Link></li>
              <li><Link to="/problems/graphs/open-the-lock">Open The Lock</Link></li>
            </ul>
          </div>
        </div>
      </section>

      <section id="stacks" className="overview-section">
        <h2>Stacks</h2>
        <pre className="ascii-art">
          {`  LIFO: Last In, First Out
  
  Push →  ┌───┐
                │ D │ ← Top
          ├───┤
          │ C │
          ├───┤
          │ B │
          ├───┤
          │ A │
  Pop  ←  └───┘`}
        </pre>
        <div className="overview-content">
          <div className="overview-description">
            <h3>What is a Stack?</h3>
            <p>
              A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. Elements
              are added to and removed from the same end, called the top of the stack.
            </p>
            
            <h3>Why are Stacks used?</h3>
            <p>
              Stacks provide a simple and efficient way to manage data with LIFO access pattern. They are
              particularly useful for tracking state in recursive algorithms and managing execution context.
            </p>
            
            <h3>Where are Stacks used?</h3>
            <ul>
              <li>Function call management (call stack)</li>
              <li>Expression evaluation and syntax parsing</li>
              <li>Undo mechanisms in applications</li>
              <li>Backtracking algorithms</li>
              <li>Browser history navigation</li>
            </ul>
            
            <h3>Key Operations of Stacks</h3>
            <ul>
              <li><strong>Push:</strong> Add an element to the top (O(1))</li>
              <li><strong>Pop:</strong> Remove the top element (O(1))</li>
              <li><strong>Peek/Top:</strong> View the top element without removing it (O(1))</li>
              <li><strong>isEmpty:</strong> Check if the stack is empty (O(1))</li>
              <li><strong>Size:</strong> Get the number of elements (O(1))</li>
            </ul>
          </div>
          
          <div className="overview-links">
            <h3>Stack Implementation</h3>
            <ul>
              <li>Array-based implementation</li>
              <li>Linked list-based implementation</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="queues" className="overview-section">
        <h2>Queues</h2>
        <pre className="ascii-art">
          {`  FIFO: First In, First Out
  
          ┌───┬───┬───┬───┐
  Enqueue → A │ B │ C │ D → Dequeue
          └───┴───┴───┴───┘
           Front         Rear`}
        </pre>
        <div className="overview-content">
          <div className="overview-description">
            <h3>What is a Queue?</h3>
            <p>
              A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle. Elements
              are added at one end (rear) and removed from the other end (front).
            </p>
            
            <h3>Why are Queues used?</h3>
            <p>
              Queues model real-world waiting lines and are ideal for scenarios where resources need to be
              processed in the order they arrive, ensuring fairness and sequential processing.
            </p>
            
            <h3>Where are Queues used?</h3>
            <ul>
              <li>Task scheduling in operating systems</li>
              <li>Breadth-first search algorithm</li>
              <li>Print job spooling</li>
              <li>Message buffers and data streams</li>
              <li>Request handling in web servers</li>
            </ul>
            
            <h3>Key Operations of Queues</h3>
            <ul>
              <li><strong>Enqueue:</strong> Add an element to the rear (O(1))</li>
              <li><strong>Dequeue:</strong> Remove the element from the front (O(1))</li>
              <li><strong>Front/Peek:</strong> View the front element without removing it (O(1))</li>
              <li><strong>isEmpty:</strong> Check if the queue is empty (O(1))</li>
              <li><strong>Size:</strong> Get the number of elements (O(1))</li>
            </ul>
          </div>
          
          <div className="overview-links">
            <h3>Queue Variations</h3>
            <ul>
              <li>Circular Queue: Efficient use of fixed-size array</li>
              <li>Double-ended Queue (Deque): Insertion/deletion at both ends</li>
              <li>Priority Queue: Elements have priority values</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="linked-lists" className="overview-section">
        <h2>Linked Lists</h2>
        <pre className="ascii-art">
          {`  HEAD
   |
          [A] -> [B] -> [C] -> [D] -> NULL
  |      |      |      |
  data   data   data   data`}
        </pre>
        <div className="overview-content">
          <div className="overview-description">
            <h3>What is a Linked List?</h3>
            <p>
              A linked list is a linear data structure where elements (nodes) are not stored in contiguous memory locations. 
              Each node contains data and a reference (link) to the next node in the sequence.
            </p>
            
            <h3>Why are Linked Lists used?</h3>
            <p>
              Linked lists provide dynamic memory allocation, efficient insertions and deletions, and are useful when the 
              size of the data is unknown or likely to change frequently.
            </p>
            
            <h3>Where are Linked Lists used?</h3>
            <ul>
              <li>Implementation of stacks and queues</li>
              <li>Symbol tables in compiler design</li>
              <li>Dynamic memory allocation</li>
              <li>Representing sparse matrices</li>
              <li>Undo functionality in applications</li>
            </ul>
            
            <h3>Key Elements of Linked Lists</h3>
            <ul>
              <li><strong>Node:</strong> Contains data and reference to next node</li>
              <li><strong>Head:</strong> First node in the list</li>
              <li><strong>Tail:</strong> Last node in the list (points to null)</li>
              <li><strong>Singly Linked:</strong> Each node points to the next node</li>
              <li><strong>Doubly Linked:</strong> Each node points to both next and previous nodes</li>
            </ul>
          </div>
          
          <div className="overview-links">
            <h3>Explore Linked Lists</h3>
            <ul>
              <li><Link to="/linked-list/singly">Singly Linked List</Link></li>
              <li><Link to="/linked-list/doubly">Doubly Linked List</Link></li>
            </ul>
            
            <h3>Linked List Problems</h3>
            <ul>
              <li><Link to="/problems/linked-lists/cycle">Linked List Cycle</Link></li>
            </ul>
          </div>
        </div>
      </section>

      <section id="trees" className="overview-section">
        <h2>Trees</h2>
        <pre className="ascii-art">
          {`         A
         / \\
        /   \\
       B     C
       / \\     \\
       D   E    F
                / \\
                G   H`}
        </pre>
        <div className="overview-content">
          <div className="overview-description">
            <h3>What is a Tree?</h3>
            <p>
              A tree is a hierarchical data structure consisting of nodes connected by edges. Each tree has a root node, 
              and every node (except the root) has exactly one parent node and zero or more child nodes.
            </p>
            
            <h3>Why are Trees used?</h3>
            <p>
              Trees provide an efficient way to organize hierarchical data, enable fast search operations, 
              and represent relationships where each item has a single parent but potentially multiple children.
            </p>
            
            <h3>Where are Trees used?</h3>
            <ul>
              <li>File systems (directories and files)</li>
              <li>Database indexing (B-trees, B+ trees)</li>
              <li>DOM in web browsers</li>
              <li>Decision trees in machine learning</li>
              <li>Syntax trees in compilers</li>
            </ul>
            
            <h3>Key Elements of Trees</h3>
            <ul>
              <li><strong>Node:</strong> Contains data and references to child nodes</li>
              <li><strong>Root:</strong> Top node with no parent</li>
              <li><strong>Leaf:</strong> Node with no children</li>
              <li><strong>Subtree:</strong> Tree formed by a node and its descendants</li>
              <li><strong>Depth/Height:</strong> Distance from root to node/leaf</li>
            </ul>
          </div>
          
          <div className="overview-links">
            <h3>Explore Trees</h3>
            <ul>
              <li><Link to="/tree/binary">Binary Tree</Link></li>
              <li><Link to="/tree/heap">Heap</Link></li>
              <li><Link to="/tree/traversal">Tree Traversal</Link></li>
            </ul>
            
            <h3>Tree Problems</h3>
            <ul>
              <li><Link to="/problems/trees/level-order">Level Order Traversal</Link></li>
              <li><Link to="/problems/trees/max-depth">Maximum Depth</Link></li>
              <li><Link to="/problems/trees/binary-tree-paths">Binary Tree Paths</Link></li>
            </ul>
          </div>
        </div>
      </section>

      <section id="heaps" className="overview-section">
        <h2>Heaps (Priority Queues)</h2>
        <pre className="ascii-art">
          {`  Max Heap:
         10
        /  \\
       8    9
      / \\  /
     4  7 5
  
  Parent always greater than children
  Efficient for finding max/min element`}
        </pre>
        <div className="overview-content">
          <div className="overview-description">
            <h3>What is a Heap?</h3>
            <p>
              A heap is a specialized tree-based data structure that satisfies the heap property. In a max heap, 
              for any given node, the value of the node is greater than or equal to the values of its children. 
              In a min heap, the value of the node is less than or equal to the values of its children.
            </p>
            
            <h3>Why are Heaps used?</h3>
            <p>
              Heaps provide efficient access to the maximum or minimum element, making them ideal for priority-based
              operations. They are the foundation for priority queues and certain sorting algorithms.
            </p>
            
            <h3>Where are Heaps used?</h3>
            <ul>
              <li>Priority queue implementation</li>
              <li>Heap sort algorithm</li>
              <li>Graph algorithms (Dijkstra's, Prim's)</li>
              <li>Task scheduling by priority</li>
              <li>Finding kth largest/smallest elements</li>
            </ul>
            
            <h3>Key Operations of Heaps</h3>
            <ul>
              <li><strong>Insert:</strong> Add an element to the heap (O(log n))</li>
              <li><strong>Extract Max/Min:</strong> Remove and return the max/min element (O(log n))</li>
              <li><strong>Peek:</strong> View the max/min element without removing it (O(1))</li>
              <li><strong>Heapify:</strong> Convert an array into a heap (O(n))</li>
              <li><strong>Delete:</strong> Remove a specific element (O(log n))</li>
            </ul>
          </div>
          
          <div className="overview-links">
            <h3>Explore Heaps</h3>
            <ul>
              <li><Link to="/tree/heap">Heap Implementation</Link></li>
            </ul>
          </div>
        </div>
      </section>

      <section id="sets" className="overview-section">
        <h2>Sets</h2>
        <pre className="ascii-art">
          {`  Set: {1, 2, 3, 4, 5}
  
  Operations:
  Union:  {1,2,3} ∪ {3,4,5} = {1,2,3,4,5}
Intersection: {1,2,3} ∩ {3,4,5} = {3}
  Difference:   {1,2,3} - {3,4,5} = {1,2}
  
  No duplicates allowed!`}
        </pre>
        <div className="overview-content">
          <div className="overview-description">
            <h3>What is a Set?</h3>
            <p>
              A set is a collection of distinct elements with no duplicates. Sets typically don't maintain any specific order
              of elements and focus on the membership of elements rather than their position or count.
            </p>
            
            <h3>Why are Sets used?</h3>
            <p>
              Sets are ideal for scenarios where you need to track unique items, test for membership, or perform
              mathematical set operations like union, intersection, and difference.
            </p>
            
            <h3>Where are Sets used?</h3>
            <ul>
              <li>Removing duplicates from collections</li>
              <li>Membership testing (e.g., checking if an element exists)</li>
              <li>Mathematical set operations</li>
              <li>Tracking visited nodes in graph algorithms</li>
              <li>Implementing associative arrays (with HashSet)</li>
            </ul>
            
            <h3>Key Operations of Sets</h3>
            <ul>
              <li><strong>Add/Insert:</strong> Add an element to the set (O(1) average for HashSet)</li>
              <li><strong>Remove:</strong> Remove an element from the set (O(1) average for HashSet)</li>
              <li><strong>Contains:</strong> Check if an element exists in the set (O(1) average for HashSet)</li>
              <li><strong>Union:</strong> Combine two sets</li>
              <li><strong>Intersection:</strong> Find common elements between two sets</li>
            </ul>
          </div>
          
          <div className="overview-links">
            <h3>Set Implementations</h3>
            <ul>
              <li>HashSet: Uses hash table, unordered, O(1) average operations</li>
              <li>TreeSet: Uses balanced tree, ordered, O(log n) operations</li>
              <li>LinkedHashSet: Maintains insertion order with hash table</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="hash-tables" className="overview-section">
        <h2>Hash Tables</h2>
        <pre className="ascii-art">
          {`  Key → Hash Function → Index
          
  [ 0 ] → ["apple": "red"]
  [ 1 ] → ["banana": "yellow"]
  [ 2 ] → ["grape": "purple"]
  [ 3 ] → ["orange": "orange"]
  [ 4 ] → null
  [ 5 ] → ["kiwi": "green", "lime": "green"]  ← Collision`}
        </pre>
        <div className="overview-content">
          <div className="overview-description">
            <h3>What is a Hash Table?</h3>
            <p>
              A hash table is a data structure that implements an associative array abstract data type, a structure that can map keys to values. 
              It uses a hash function to compute an index into an array of buckets or slots.
            </p>
            
            <h3>Why are Hash Tables used?</h3>
            <p>
              Hash tables provide fast access to data using keys, with average-case constant time complexity for insertions, 
              deletions, and lookups, making them ideal for scenarios requiring quick data retrieval.
            </p>
            
            <h3>Where are Hash Tables used?</h3>
            <ul>
              <li>Database indexing</li>
              <li>Caching systems</li>
              <li>Symbol tables in compilers and interpreters</li>
              <li>Associative arrays in programming languages</li>
              <li>Implementing sets and dictionaries</li>
            </ul>
            
            <h3>Key Elements of Hash Tables</h3>
            <ul>
              <li><strong>Hash Function:</strong> Converts keys into array indices</li>
              <li><strong>Buckets/Slots:</strong> Array elements that store key-value pairs</li>
              <li><strong>Collision Resolution:</strong> Techniques to handle when different keys hash to the same index</li>
              <li><strong>Load Factor:</strong> Ratio of filled slots to total slots, affecting performance</li>
              <li><strong>Rehashing:</strong> Resizing the hash table when the load factor exceeds a threshold</li>
            </ul>
          </div>
          
          <div className="overview-links">
            <h3>Explore Hash Tables</h3>
            <ul>
              <li><Link to="/hash-table">Hash Table Implementation</Link></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DataStructuresOverviewPage;
