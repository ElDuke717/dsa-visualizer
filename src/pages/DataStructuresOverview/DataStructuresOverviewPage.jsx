import React from 'react';
import { Link } from 'react-router-dom';
import CodeSnippet from '../../components/CodeSnippet/CodeSnippet';
import './DataStructuresOverviewPage.css';

const DataStructuresOverviewPage = () => {
  return (
    <div className="overview-page-container">
      <h1>Data Structures & Algorithms Overview</h1>
      
      <div className="overview-nav">
        <a href="#graphs">Graphs</a>
        <a href="#linked-lists">Linked Lists</a>
        <a href="#trees">Trees</a>
        <a href="#sorting">Sorting Algorithms</a>
        <a href="#hash-tables">Hash Tables</a>
      </div>

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
     D   E     F
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

      <section id="sorting" className="overview-section">
        <h2>Sorting Algorithms</h2>
        <pre className="ascii-art">
          {`  [5, 3, 8, 4, 2] → [2, 3, 4, 5, 8]
   Unsorted Array    Sorted Array`}
        </pre>
        <div className="overview-content">
          <div className="overview-description">
            <h3>What are Sorting Algorithms?</h3>
            <p>
              Sorting algorithms are methods for reorganizing a sequence of items in a certain order, typically 
              ascending or descending. Different algorithms use different strategies and have varying efficiency.
            </p>
            
            <h3>Why are Sorting Algorithms used?</h3>
            <p>
              Sorting is a fundamental operation in computer science that makes data easier to search, analyze, 
              and visualize. It's often a prerequisite for many other algorithms.
            </p>
            
            <h3>Where are Sorting Algorithms used?</h3>
            <ul>
              <li>Database operations (ORDER BY clauses)</li>
              <li>Search algorithms (binary search requires sorted data)</li>
              <li>Data analysis and visualization</li>
              <li>Priority queues and scheduling</li>
              <li>Finding duplicates or unique elements</li>
            </ul>
          </div>
          
          <div className="overview-links">
            <h3>Explore Sorting Algorithms</h3>
            <ul>
              <li><Link to="/sorting/bubble">Bubble Sort</Link></li>
              <li><Link to="/sorting/insertion">Insertion Sort</Link></li>
              <li><Link to="/sorting/quick">Quick Sort</Link></li>
              <li><Link to="/sorting/merge">Merge Sort</Link></li>
              <li><Link to="/sorting/heap">Heap Sort</Link></li>
              <li><Link to="/sorting/counting">Counting Sort</Link></li>
              <li><Link to="/sorting/radix">Radix Sort</Link></li>
              <li><Link to="/sorting/bucket">Bucket Sort</Link></li>
            </ul>
          </div>
        </div>

        <div className="sorting-algorithms">
          <div className="sorting-algorithm">
            <h3>Bubble Sort</h3>
            <pre className="ascii-art">
              {`[5,3,8,4,2] → [3,5,4,2,8] → [3,4,2,5,8] → [3,2,4,5,8] → [2,3,4,5,8]
  ↑ ↑         ↑ ↑         ↑ ↑         ↑ ↑         Sorted!
 swap        swap        swap        swap`}
            </pre>
            <p>
              A simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, 
              and swaps them if they're in the wrong order.
            </p>
            <ul>
              <li><strong>Time Complexity:</strong> O(n²) average and worst case</li>
              <li><strong>Space Complexity:</strong> O(1)</li>
              <li><strong>Best for:</strong> Small datasets or nearly sorted data</li>
            </ul>
            <Link to="/sorting/bubble" className="learn-more">Learn More</Link>
          </div>

          <div className="sorting-algorithm">
            <h3>Insertion Sort</h3>
            <pre className="ascii-art">
              {`[5,3,8,4,2] → [3,5,8,4,2] → [3,5,8,4,2] → [3,4,5,8,2] → [2,3,4,5,8]
    ^           ^             ^             ^             ^
 insert 3     insert 8     insert 4     insert 2`}
            </pre>
            <p>
              Builds the sorted array one item at a time by repeatedly taking the next element and inserting it into 
              its correct position among the previously sorted elements.
            </p>
            <ul>
              <li><strong>Time Complexity:</strong> O(n²) average and worst case, O(n) best case</li>
              <li><strong>Space Complexity:</strong> O(1)</li>
              <li><strong>Best for:</strong> Small datasets or nearly sorted data</li>
            </ul>
            <Link to="/sorting/insertion" className="learn-more">Learn More</Link>
          </div>

          <div className="sorting-algorithm">
            <h3>Quick Sort</h3>
            <pre className="ascii-art">
              {`[5,3,8,4,2] → Choose pivot: 5
[3,2,4] [5] [8]  → Partition around pivot
[2,3,4] [5] [8]  → Sort subarrays
[2,3,4,5,8]      → Combine`}
            </pre>
            <p>
              A divide-and-conquer algorithm that selects a 'pivot' element and partitions the array around it, 
              then recursively sorts the sub-arrays.
            </p>
            <ul>
              <li><strong>Time Complexity:</strong> O(n log n) average, O(n²) worst case</li>
              <li><strong>Space Complexity:</strong> O(log n)</li>
              <li><strong>Best for:</strong> General-purpose sorting with good average performance</li>
            </ul>
            <Link to="/sorting/quick" className="learn-more">Learn More</Link>
          </div>

          <div className="sorting-algorithm">
            <h3>Merge Sort</h3>
            <pre className="ascii-art">
              {`[5,3,8,4,2]           → Original array
[5,3] [8,4,2]          → Split into subarrays
[5] [3] [8] [4,2]      → Split until single elements
[3,5] [2,4,8]          → Merge and sort
[2,3,4,5,8]            → Final sorted array`}
            </pre>
            <p>
              A divide-and-conquer algorithm that divides the array into halves, sorts each half, then merges 
              the sorted halves back together.
            </p>
            <ul>
              <li><strong>Time Complexity:</strong> O(n log n) in all cases</li>
              <li><strong>Space Complexity:</strong> O(n)</li>
              <li><strong>Best for:</strong> Stable sorting and guaranteed performance</li>
            </ul>
            <Link to="/sorting/merge" className="learn-more">Learn More</Link>
          </div>

          <div className="sorting-algorithm">
            <h3>Heap Sort</h3>
            <pre className="ascii-art">
              {`[5,3,8,4,2]         → Original array
      5             → Build max heap
     / \\
    3   8
   / \\
  4   2
      8             → Heapify
     / \\
    4   5
   / \\
  3   2
[2,3,4,5,8]         → Extract max elements`}
            </pre>
            <p>
              Uses a binary heap data structure to build a max-heap, then repeatedly extracts the maximum element 
              and rebuilds the heap.
            </p>
            <ul>
              <li><strong>Time Complexity:</strong> O(n log n) in all cases</li>
              <li><strong>Space Complexity:</strong> O(1)</li>
              <li><strong>Best for:</strong> Memory-constrained environments</li>
            </ul>
            <Link to="/sorting/heap" className="learn-more">Learn More</Link>
          </div>

          <div className="sorting-algorithm">
            <h3>Counting Sort</h3>
            <pre className="ascii-art">
              {`Array: [5,3,8,4,2]
Count: [0,0,1,1,1,1,0,0,1]  → Count occurrences
       [0,1,2,3,4,5,6,7,8]  → Indices
Output: [2,3,4,5,8]         → Place elements`}
            </pre>
            <p>
              A non-comparison-based algorithm that works by counting the occurrences of each element and using 
              that information to place elements in their correct positions.
            </p>
            <ul>
              <li><strong>Time Complexity:</strong> O(n + k) where k is the range of input</li>
              <li><strong>Space Complexity:</strong> O(n + k)</li>
              <li><strong>Best for:</strong> Integer data with a small range</li>
            </ul>
            <Link to="/sorting/counting" className="learn-more">Learn More</Link>
          </div>

          <div className="sorting-algorithm">
            <h3>Radix Sort</h3>
            <pre className="ascii-art">
              {`Original: [170, 45, 75, 90, 802, 24, 2, 66]
Sort by 1s digit:
[170, 90, 802, 2, 24, 45, 75, 66]
Sort by 10s digit:
[802, 2, 24, 45, 66, 170, 75, 90]
Sort by 100s digit:
[2, 24, 45, 66, 75, 90, 170, 802]`}
            </pre>
            <p>
              A non-comparison-based algorithm that sorts integers by processing individual digits, starting from 
              the least significant digit to the most significant.
            </p>
            <ul>
              <li><strong>Time Complexity:</strong> O(d * (n + k)) where d is the number of digits</li>
              <li><strong>Space Complexity:</strong> O(n + k)</li>
              <li><strong>Best for:</strong> Integer or string data with fixed-length keys</li>
            </ul>
            <Link to="/sorting/radix" className="learn-more">Learn More</Link>
          </div>

          <div className="sorting-algorithm">
            <h3>Bucket Sort</h3>
            <pre className="ascii-art">
              {`Array: [0.42, 0.32, 0.73, 0.12, 0.54, 0.19]
Buckets:
[0.0-0.2]: [0.12, 0.19]
[0.2-0.4]: [0.32]
[0.4-0.6]: [0.42, 0.54]
[0.6-0.8]: [0.73]
[0.8-1.0]: []
Result: [0.12, 0.19, 0.32, 0.42, 0.54, 0.73]`}
            </pre>
            <p>
              Distributes elements into a number of buckets, sorts each bucket individually (often with another algorithm), 
              then concatenates the sorted buckets.
            </p>
            <ul>
              <li><strong>Time Complexity:</strong> O(n + k) average, O(n²) worst case</li>
              <li><strong>Space Complexity:</strong> O(n + k)</li>
              <li><strong>Best for:</strong> Uniformly distributed data over a range</li>
            </ul>
            <Link to="/sorting/bucket" className="learn-more">Learn More</Link>
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
