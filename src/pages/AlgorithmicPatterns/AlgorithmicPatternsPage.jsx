import React from 'react';
import { Link } from 'react-router-dom';
import './AlgorithmicPatternsPage.css';

const AlgorithmicPatternsPage = () => {
  return (
    <div className="overview-page-container">
      <h1>Algorithmic Patterns Overview</h1>
      
      <div className="overview-nav">
        <a href="#tree-graph-traversal">Tree/Graph Traversal</a>
        <a href="#two-pointers">Two Pointers</a>
        <a href="#sliding-window">Sliding Window</a>
        <a href="#binary-search">Binary Search</a>
        <a href="#dynamic-programming">Dynamic Programming</a>
        <a href="#backtracking">Backtracking</a>
        <a href="#heap">Heap/Priority Queue</a>
        <a href="#greedy">Greedy Algorithms</a>
        <a href="#merge-intervals">Merge Intervals</a>
        <a href="#subsets-combinations-permutations">Subsets/Combinations/Permutations</a>
        <a href="#divide-conquer">Divide & Conquer</a>
        <a href="#in-place-reversal">In-place Reversal of Linked List</a>
        <a href="#cyclic-sort">Cyclic Sort</a>
      </div>

      <section id="tree-graph-traversal" className="overview-section">
        <h2>Tree/Graph Traversal (BFS & DFS)</h2>
        <pre className="ascii-art">
          {`  BFS (Level Order):
         1
       /   \\
      2     3    →  [1, 2, 3, 4, 5, 6, 7]
     / \\   / \\
    4   5 6   7
  
  DFS (Pre-order):
         1
       /   \\
      2     3    →  [1, 2, 4, 5, 3, 6, 7]
     / \\   / \\
    4   5 6   7`}
        </pre>
        <div className="overview-content">
          <div className="overview-description">
            <h3>What is Tree/Graph Traversal?</h3>
            <p>
              Tree and graph traversal algorithms are methods for visiting every node in a tree or graph data structure.
              The two main approaches are Breadth-First Search (BFS) and Depth-First Search (DFS).
            </p>
            
            <h3>Breadth-First Search (BFS)</h3>
            <p>
              BFS explores a tree or graph level by level, visiting all nodes at the current depth before moving to nodes at the next depth.
              It uses a queue data structure to keep track of nodes to visit next.
            </p>
            
            <h3>Depth-First Search (DFS)</h3>
            <p>
              DFS explores as far as possible along each branch before backtracking. It can be implemented using recursion or a stack.
              There are three common DFS traversal orders for trees:
            </p>
            <ul>
              <li><strong>Pre-order:</strong> Visit root, then left subtree, then right subtree</li>
              <li><strong>In-order:</strong> Visit left subtree, then root, then right subtree</li>
              <li><strong>Post-order:</strong> Visit left subtree, then right subtree, then root</li>
            </ul>
            
            <h3>When to use BFS vs DFS</h3>
            <ul>
              <li><strong>Use BFS when:</strong> Finding the shortest path in an unweighted graph, level-order processing, or when the solution is likely to be closer to the source</li>
              <li><strong>Use DFS when:</strong> Exploring all possible paths, detecting cycles, topological sorting, or when the solution is likely to be far from the source</li>
            </ul>
          </div>
          
          <div className="overview-links">
            <h3>Time & Space Complexity</h3>
            <ul>
              <li><strong>Time Complexity:</strong> O(V + E) for both BFS and DFS, where V is the number of vertices and E is the number of edges</li>
              <li><strong>Space Complexity:</strong> O(V) for both BFS and DFS in the worst case</li>
            </ul>
            
            <h3>Explore Implementations</h3>
            <ul>
              <li><Link to="/graph/bfs">BFS Implementation</Link></li>
              <li><Link to="/graph/dfs">DFS Implementation</Link></li>
              <li><Link to="/tree/traversal">Tree Traversal</Link></li>
            </ul>
            
            <h3>Related Problems</h3>
            <ul>
              <li><Link to="/problems/graphs/number-of-islands">Number of Islands</Link></li>
              <li><Link to="/problems/trees/level-order">Level Order Traversal</Link></li>
              <li><Link to="/problems/trees/binary-tree-paths">Binary Tree Paths</Link></li>
            </ul>
          </div>
        </div>
      </section>

      <section id="two-pointers" className="overview-section">
        <h2>Two Pointers</h2>
        <pre className="ascii-art">
          {`  Array: [1, 2, 4, 6, 8, 9, 14, 15]
  
  Two Pointers (Opposite Ends):
  [1, 2, 4, 6, 8, 9, 14, 15]
   ↑                     ↑
  left                 right
  
  Two Pointers (Same Direction):
  [3, 1, 4, 2, 5, 8, 7, 9]
   ↑     ↑
  slow   fast`}
        </pre>
        <div className="overview-content">
          <div className="overview-description">
            <h3>What is the Two Pointers Pattern?</h3>
            <p>
              The Two Pointers pattern uses two pointers to iterate through a data structure (usually an array or linked list)
              in a single pass. This technique is particularly useful for solving problems with sorted arrays or when searching for pairs.
            </p>
            
            <h3>Types of Two Pointers Approaches</h3>
            <ul>
              <li><strong>Opposite Ends:</strong> One pointer starts at the beginning, the other at the end, and they move toward each other</li>
              <li><strong>Fast and Slow:</strong> Both pointers start at the beginning, but one moves faster than the other</li>
              <li><strong>Sliding Window:</strong> Both pointers move in the same direction, maintaining a "window" between them</li>
            </ul>
            
            <h3>When to Use Two Pointers</h3>
            <p>
              The Two Pointers pattern is effective for:
            </p>
            <ul>
              <li>Finding pairs in a sorted array with a specific sum</li>
              <li>Detecting cycles in a linked list</li>
              <li>Removing duplicates from a sorted array</li>
              <li>Palindrome verification</li>
              <li>Three-sum and k-sum problems</li>
              <li>Partitioning arrays (e.g., Dutch National Flag problem)</li>
            </ul>
          </div>
          
          <div className="overview-links">
            <h3>Time & Space Complexity</h3>
            <ul>
              <li><strong>Time Complexity:</strong> Usually O(n) as we traverse the array once</li>
              <li><strong>Space Complexity:</strong> Usually O(1) as we only use two pointers</li>
            </ul>
            
            <h3>Explore Implementations</h3>
            <ul>
              <li><Link to="/dp/two-pointers">Two Pointers Techniques</Link></li>
            </ul>
            
            <h3>Related Problems</h3>
            <ul>
              <li><Link to="/problems/two-pointers/two-sum">Two Sum II</Link></li>
              <li><Link to="/problems/two-pointers/three-sum">3Sum</Link></li>
              <li><Link to="/problems/two-pointers/valid-palindrome">Valid Palindrome</Link></li>
              <li><Link to="/problems/two-pointers/move-zeroes">Move Zeroes</Link></li>
              <li><Link to="/problems/two-pointers/sort-colors">Sort Colors</Link></li>
            </ul>
          </div>
        </div>
      </section>

      <section id="sliding-window" className="overview-section">
        <h2>Sliding Window</h2>
        <pre className="ascii-art">
          {`  Array: [2, 1, 5, 1, 3, 2]
  
  Fixed Window (size k=3):
  [2, 1, 5], 1, 3, 2  → Sum: 8
   1, [5, 1, 3], 2    → Sum: 9
   1, 5, [1, 3, 2]    → Sum: 6
  
  Dynamic Window:
  [2], 1, 5, 1, 3, 2
  [2, 1], 5, 1, 3, 2
  [2, 1, 5], 1, 3, 2
  2, [1, 5, 1], 3, 2
  2, 1, [5, 1, 3], 2
  2, 1, 5, [1, 3, 2]`}
        </pre>
        <div className="overview-content">
          <div className="overview-description">
            <h3>What is the Sliding Window Pattern?</h3>
            <p>
              The Sliding Window pattern is a technique for processing arrays or lists by maintaining a "window" of elements
              and sliding it through the data structure. This approach is particularly useful for solving problems involving
              subarrays or sublists.
            </p>
            
            <h3>Types of Sliding Windows</h3>
            <ul>
              <li><strong>Fixed-Size Window:</strong> The window size remains constant throughout the traversal</li>
              <li><strong>Dynamic-Size Window:</strong> The window size can grow or shrink based on certain conditions</li>
            </ul>
            
            <h3>When to Use Sliding Window</h3>
            <p>
              The Sliding Window pattern is effective for:
            </p>
            <ul>
              <li>Finding subarrays with a specific sum</li>
              <li>Finding the longest/shortest subarray with a specific property</li>
              <li>Finding the maximum/minimum sum subarray of a fixed size</li>
              <li>String problems like finding anagrams or longest substring without repeating characters</li>
              <li>Problems involving contiguous sequences</li>
            </ul>
          </div>
          
          <div className="overview-links">
            <h3>Time & Space Complexity</h3>
            <ul>
              <li><strong>Time Complexity:</strong> Usually O(n) as we traverse the array once</li>
              <li><strong>Space Complexity:</strong> Usually O(1) for fixed-size windows or O(k) where k is the window size for dynamic windows</li>
            </ul>
            
            <h3>Explore Implementations</h3>
            <ul>
              <li><Link to="/dp/sliding-window">Sliding Window Techniques</Link></li>
            </ul>
            
            <h3>Related Problems</h3>
            <ul>
              <li><Link to="/problems/sliding-window/max-vowels">Maximum Vowels in a Substring</Link></li>
              <li><Link to="/problems/sliding-window/longest-substring">Longest Substring Without Repeating Characters</Link></li>
              <li><Link to="/problems/sliding-window/maximum-average-subarray">Maximum Average Subarray</Link></li>
              <li><Link to="/problems/sliding-window/diet-plan-performance">Diet Plan Performance</Link></li>
              <li><Link to="/problems/sliding-window/contains-duplicate-ii">Contains Duplicate II</Link></li>
            </ul>
          </div>
        </div>
      </section>

      <section id="binary-search" className="overview-section">
        <h2>Binary Search</h2>
        <pre className="ascii-art">
          {`  Array: [1, 3, 5, 7, 9, 11, 13, 15, 17]
  Target: 7
  
  Step 1: mid = (0 + 8) / 2 = 4, arr[4] = 9 > 7
  [1, 3, 5, 7], 9, 11, 13, 15, 17
                 ↑
                mid
  
  Step 2: mid = (0 + 3) / 2 = 1, arr[1] = 3 < 7
  1, 3, [5, 7], 9, 11, 13, 15, 17
        ↑
       mid
  
  Step 3: mid = (2 + 3) / 2 = 2, arr[2] = 5 < 7
  1, 3, 5, [7], 9, 11, 13, 15, 17
           ↑
          mid
  
  Step 4: mid = (3 + 3) / 2 = 3, arr[3] = 7 == 7
  Found at index 3!`}
        </pre>
        <div className="overview-content">
          <div className="overview-description">
            <h3>What is Binary Search?</h3>
            <p>
              Binary Search is a divide-and-conquer algorithm that efficiently finds a target value within a sorted collection.
              It repeatedly divides the search space in half, eliminating half of the remaining elements at each step.
            </p>
            
            <h3>How Binary Search Works</h3>
            <ol>
              <li>Start with the middle element of the sorted array</li>
              <li>If the target value equals the middle element, return the index</li>
              <li>If the target value is less than the middle element, search the left half</li>
              <li>If the target value is greater than the middle element, search the right half</li>
              <li>Repeat until the target is found or the search space is empty</li>
            </ol>
            
            <h3>Variations of Binary Search</h3>
            <ul>
              <li><strong>Standard Binary Search:</strong> Find an exact match in a sorted array</li>
              <li><strong>Lower Bound:</strong> Find the first element greater than or equal to the target</li>
              <li><strong>Upper Bound:</strong> Find the first element greater than the target</li>
              <li><strong>Rotated Array:</strong> Binary search in a rotated sorted array</li>
              <li><strong>Matrix Binary Search:</strong> Binary search in a 2D sorted matrix</li>
              <li><strong>Binary Search on Answer:</strong> Using binary search to find an optimal value</li>
            </ul>
          </div>
          
          <div className="overview-links">
            <h3>Time & Space Complexity</h3>
            <ul>
              <li><strong>Time Complexity:</strong> O(log n) - Each step eliminates half of the remaining elements</li>
              <li><strong>Space Complexity:</strong> O(1) for iterative implementation, O(log n) for recursive implementation due to call stack</li>
            </ul>
            
            <h3>When to Use Binary Search</h3>
            <ul>
              <li>Searching in sorted arrays</li>
              <li>Finding boundaries (first/last occurrence)</li>
              <li>Optimization problems with monotonic functions</li>
              <li>Finding a peak or valley in an array</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="dynamic-programming" className="overview-section">
        <h2>Dynamic Programming</h2>
        <pre className="ascii-art">
          {`  Fibonacci Sequence:
  
  Top-Down (Memoization):
  fib(5)
  ├── fib(4)
  │   ├── fib(3) [cached]
  │   └── fib(2) [cached]
  └── fib(3)
      ├── fib(2) [cached]
      └── fib(1) [cached]
  
  Bottom-Up (Tabulation):
  dp[0] = 0, dp[1] = 1
  dp[2] = dp[1] + dp[0] = 1
  dp[3] = dp[2] + dp[1] = 2
  dp[4] = dp[3] + dp[2] = 3
  dp[5] = dp[4] + dp[3] = 5`}
        </pre>
        <div className="overview-content">
          <div className="overview-description">
            <h3>What is Dynamic Programming?</h3>
            <p>
              Dynamic Programming (DP) is a method for solving complex problems by breaking them down into simpler subproblems.
              It is applicable when the problem has overlapping subproblems and optimal substructure properties.
            </p>
            
            <h3>Key Concepts in Dynamic Programming</h3>
            <ul>
              <li><strong>Overlapping Subproblems:</strong> Same subproblems are solved multiple times</li>
              <li><strong>Optimal Substructure:</strong> Optimal solution to the problem contains optimal solutions to its subproblems</li>
              <li><strong>State:</strong> A set of variables that can sufficiently describe a scenario</li>
              <li><strong>State Transition:</strong> The process of moving from one state to another</li>
              <li><strong>Base Case:</strong> The simplest scenario with a known answer</li>
            </ul>
            
            <h3>Approaches to Dynamic Programming</h3>
            <ul>
              <li><strong>Top-Down (Memoization):</strong> Recursive approach with caching of results</li>
              <li><strong>Bottom-Up (Tabulation):</strong> Iterative approach building from base cases</li>
            </ul>
            
            <h3>When to Use Dynamic Programming</h3>
            <p>
              Dynamic Programming is effective for:
            </p>
            <ul>
              <li>Optimization problems (finding maximum/minimum value)</li>
              <li>Counting problems (finding the number of ways to do something)</li>
              <li>Problems with recursive solutions with overlapping subproblems</li>
              <li>Problems that can be broken down into stages with decisions at each stage</li>
            </ul>
          </div>
          
          <div className="overview-links">
            <h3>Time & Space Complexity</h3>
            <ul>
              <li><strong>Time Complexity:</strong> Usually O(n²) or O(n*m) depending on the state space</li>
              <li><strong>Space Complexity:</strong> Usually O(n) or O(n*m) for storing the DP table or memoization cache</li>
            </ul>
            
            <h3>Explore Implementations</h3>
            <ul>
              <li><Link to="/dp/memoization">Memoization Techniques</Link></li>
              <li><Link to="/dp/tabulation">Tabulation Techniques</Link></li>
            </ul>
            
            <h3>Related Problems</h3>
            <ul>
              <li><Link to="/problems/dp/climbing-stairs">Climbing Stairs</Link></li>
              <li><Link to="/problems/dp/coin-change">Coin Change</Link></li>
              <li><Link to="/problems/dp/house-robber">House Robber</Link></li>
              <li><Link to="/problems/dp/maximum-subarray">Maximum Subarray</Link></li>
              <li><Link to="/problems/dp/best-time-to-buy-and-sell-stock">Best Time to Buy and Sell Stock</Link></li>
            </ul>
          </div>
        </div>
      </section>

      <section id="backtracking" className="overview-section">
        <h2>Backtracking</h2>
        <pre className="ascii-art">
          {`  N-Queens Problem (N=4):
  
  Step 1: Place queen at (0,0)
  [Q][_][_][_]
  [_][_][_][_]
  [_][_][_][_]
  [_][_][_][_]
  
  Step 2: Try placing queen at (1,2)
  [Q][_][_][_]
  [_][_][Q][_]
  [_][_][_][_]
  [_][_][_][_]
  
  Step 3: Try placing queen at (2,?)
  No valid position → Backtrack
  
  Step 4: Try placing queen at (1,3)
  [Q][_][_][_]
  [_][_][_][Q]
  [_][Q][_][_]
  [_][_][_][_]
  
  Solution found:
  [_][Q][_][_]
  [_][_][_][Q]
  [Q][_][_][_]
  [_][_][Q][_]`}
        </pre>
        <div className="overview-content">
          <div className="overview-description">
            <h3>What is Backtracking?</h3>
            <p>
              Backtracking is an algorithmic technique for solving problems recursively by trying to build a solution incrementally,
              abandoning a path as soon as it determines that it cannot lead to a valid solution, and then backtracking to try another path.
            </p>
            
            <h3>How Backtracking Works</h3>
            <ol>
              <li>Choose: Select a candidate for the solution</li>
              <li>Constraint: Check if the candidate satisfies all constraints</li>
              <li>Goal: Check if the current state represents a complete solution</li>
              <li>If constraints are violated or the goal is not reached, backtrack and try another candidate</li>
            </ol>
            
            <h3>When to Use Backtracking</h3>
            <p>
              Backtracking is effective for:
            </p>
            <ul>
              <li>Combinatorial problems (generating all possible combinations/permutations)</li>
              <li>Constraint satisfaction problems</li>
              <li>Puzzles (Sudoku, N-Queens, etc.)</li>
              <li>Path finding problems</li>
              <li>Problems where you need to explore all possible solutions</li>
            </ul>
          </div>
          
          <div className="overview-links">
            <h3>Time & Space Complexity</h3>
            <ul>
              <li><strong>Time Complexity:</strong> Often exponential O(b^d) where b is the branching factor and d is the maximum depth</li>
              <li><strong>Space Complexity:</strong> Usually O(d) for the recursion stack where d is the maximum depth</li>
            </ul>
            
            <h3>Explore Implementations</h3>
            <ul>
              <li><Link to="/dp/backtracking">Backtracking Techniques</Link></li>
            </ul>
            
            <h3>Related Problems</h3>
            <ul>
              <li><Link to="/problems/backtracking/subsets">Subsets</Link></li>
              <li><Link to="/problems/backtracking/permutations">Permutations</Link></li>
              <li><Link to="/problems/backtracking/combination-sum">Combination Sum</Link></li>
              <li><Link to="/problems/backtracking/letter-combinations">Letter Combinations of a Phone Number</Link></li>
              <li><Link to="/problems/backtracking/binary-watch">Binary Watch</Link></li>
            </ul>
          </div>
        </div>
      </section>

      <section id="heap" className="overview-section">
        <h2>Heap (Priority Queue)</h2>
        <pre className="ascii-art">
          {`  Max Heap:
         10
        /  \\
       8    9
      / \\  /
     4  7 5
  
  Operations:
  Insert 12:
         12
        /  \\
       8    10
      / \\  / \\
     4  7 5   9
  
  Extract Max:
         10
        /  \\
       8    9
      / \\  /
     4  7 5`}
        </pre>
        <div className="overview-content">
          <div className="overview-description">
            <h3>What is a Heap?</h3>
            <p>
              A heap is a specialized tree-based data structure that satisfies the heap property. In a max heap, 
              for any given node, the value of the node is greater than or equal to the values of its children. 
              In a min heap, the value of the node is less than or equal to the values of its children.
            </p>
            
            <h3>Heap as a Priority Queue</h3>
            <p>
              A priority queue is an abstract data type that operates similar to a regular queue but where each element
              has a "priority" associated with it. Elements with higher priority are served before elements with lower priority.
              Heaps are commonly used to implement priority queues.
            </p>
            
            <h3>When to Use Heap/Priority Queue</h3>
            <p>
              Heaps and priority queues are effective for:
            </p>
            <ul>
              <li>Finding the k largest/smallest elements</li>
              <li>Implementing scheduling algorithms</li>
              <li>Graph algorithms (Dijkstra's, Prim's)</li>
              <li>Median maintenance</li>
              <li>Event-driven simulation</li>
              <li>Huffman coding</li>
            </ul>
          </div>
          
          <div className="overview-links">
            <h3>Time Complexity</h3>
            <ul>
              <li><strong>Insert:</strong> O(log n)</li>
              <li><strong>Extract Max/Min:</strong> O(log n)</li>
              <li><strong>Peek (Get Max/Min):</strong> O(1)</li>
              <li><strong>Heapify:</strong> O(n)</li>
              <li><strong>Delete:</strong> O(log n)</li>
            </ul>
            
            <h3>Explore Implementations</h3>
            <ul>
              <li><Link to="/tree/heap">Heap Implementation</Link></li>
            </ul>
            
            <h3>Heap Sort</h3>
            <ul>
              <li><Link to="/sorting/heap">Heap Sort Algorithm</Link></li>
            </ul>
          </div>
        </div>
      </section>

      <section id="greedy" className="overview-section">
        <h2>Greedy Algorithms</h2>
        <pre className="ascii-art">
          {`  Coin Change (Greedy):
  Amount: 63 cents
  Coins: [25, 10, 5, 1]
  
  Step 1: Take 25¢ (63 - 25 = 38)
  Step 2: Take 25¢ (38 - 25 = 13)
  Step 3: Take 10¢ (13 - 10 = 3)
  Step 4: Take 1¢ (3 - 1 = 2)
  Step 5: Take 1¢ (2 - 1 = 1)
  Step 6: Take 1¢ (1 - 1 = 0)
  
  Result: [25, 25, 10, 1, 1, 1] (6 coins)
  
  Note: Greedy doesn't always give optimal solution!`}
        </pre>
        <div className="overview-content">
          <div className="overview-description">
            <h3>What are Greedy Algorithms?</h3>
            <p>
              Greedy algorithms make locally optimal choices at each step with the hope of finding a global optimum.
              They make the best choice at the moment without considering the future consequences.
            </p>
            
            <h3>How Greedy Algorithms Work</h3>
            <ol>
              <li>Make the locally optimal choice at each step</li>
              <li>Hope that these local choices lead to a globally optimal solution</li>
            </ol>
            
            <h3>When to Use Greedy Algorithms</h3>
            <p>
              Greedy algorithms are effective when:
            </p>
            <ul>
              <li>The problem has "greedy choice property" (local optimal choice leads to global optimal solution)</li>
              <li>The problem has "optimal substructure" (optimal solution contains optimal solutions to subproblems)</li>
              <li>You need a simple, efficient algorithm and can prove its correctness</li>
            </ul>
            
            <h3>Limitations of Greedy Algorithms</h3>
            <p>
              Greedy algorithms don't always yield optimal solutions. They can fail when:
            </p>
            <ul>
              <li>The problem doesn't have the greedy choice property</li>
              <li>Local optimality doesn't lead to global optimality</li>
              <li>Future choices depend on past choices in complex ways</li>
            </ul>
          </div>
          
          <div className="overview-links">
            <h3>Time & Space Complexity</h3>
            <ul>
              <li><strong>Time Complexity:</strong> Usually O(n log n) or better</li>
              <li><strong>Space Complexity:</strong> Usually O(1) or O(n)</li>
            </ul>
            
            <h3>Classic Greedy Problems</h3>
            <ul>
              <li>Activity Selection Problem</li>
              <li>Huffman Coding</li>
              <li>Fractional Knapsack Problem</li>
              <li>Minimum Spanning Tree (Kruskal's, Prim's)</li>
              <li>Dijkstra's Shortest Path Algorithm</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="merge-intervals" className="overview-section">
        <h2>Merge Intervals</h2>
        <pre className="ascii-art">
          {`  Intervals: [[1,3], [2,6], [8,10], [15,18]]
  
  Sort by start time:
  [1,3], [2,6], [8,10], [15,18]
  
  Merge overlapping intervals:
  [1,3], [2,6] → [1,6]  (overlap: 2-3)
  [1,6], [8,10] → No overlap
  [8,10], [15,18] → No overlap
  
  Result: [[1,6], [8,10], [15,18]]`}
        </pre>
        <div className="overview-content">
          <div className="overview-description">
            <h3>What is the Merge Intervals Pattern?</h3>
            <p>
              The Merge Intervals pattern deals with problems involving overlapping intervals. It typically involves
              sorting intervals by their start times and then merging or processing them in order.
            </p>
            
            <h3>Common Operations in Merge Intervals</h3>
            <ul>
              <li><strong>Merging Overlapping Intervals:</strong> Combining intervals that overlap into a single interval</li>
              <li><strong>Finding Non-overlapping Intervals:</strong> Identifying intervals that don't overlap with others</li>
              <li><strong>Interval Insertion:</strong> Adding a new interval to a set of non-overlapping intervals</li>
              <li><strong>Interval Intersection:</strong> Finding the overlap between two sets of intervals</li>
            </ul>
            
            <h3>When to Use Merge Intervals</h3>
            <p>
              The Merge Intervals pattern is effective for:
            </p>
            <ul>
              <li>Meeting room scheduling</li>
              <li>Job scheduling</li>
              <li>Interval-based data processing</li>
              <li>Time-based event processing</li>
              <li>Range-based queries</li>
            </ul>
          </div>
          
          <div className="overview-links">
            <h3>Time & Space Complexity</h3>
            <ul>
              <li><strong>Time Complexity:</strong> Usually O(n log n) due to the initial sorting</li>
              <li><strong>Space Complexity:</strong> Usually O(n) to store the result</li>
            </ul>
            
            <h3>Common Merge Interval Problems</h3>
            <ul>
              <li>Merge Overlapping Intervals</li>
              <li>Insert Interval</li>
              <li>Meeting Rooms (Can a person attend all meetings?)</li>
              <li>Meeting Rooms II (Minimum number of meeting rooms required)</li>
              <li>Employee Free Time</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="subsets-combinations-permutations" className="overview-section">
        <h2>Subsets, Combinations & Permutations</h2>
        <pre className="ascii-art">
          {`  Set: [1, 2, 3]
  
  Subsets (Power Set):
  [], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]
  
  Combinations (k=2):
  [1,2], [1,3], [2,3]
  
  Permutations:
  [1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]`}
        </pre>
        <div className="overview-content">
          <div className="overview-description">
            <h3>What are Subsets, Combinations, and Permutations?</h3>
            <p>
              These patterns involve generating all possible arrangements or selections from a set of elements:
            </p>
            <ul>
              <li><strong>Subsets:</strong> All possible combinations of elements (including empty set and full set)</li>
              <li><strong>Combinations:</strong> Ways to select k elements from a set, order doesn't matter</li>
              <li><strong>Permutations:</strong> All possible arrangements of elements, order matters</li>
            </ul>
            
            <h3>Approaches to Generate These Patterns</h3>
            <ul>
              <li><strong>Recursive Backtracking:</strong> Build solutions incrementally and backtrack when needed</li>
              <li><strong>Iterative:</strong> Build solutions by adding one element at a time</li>
              <li><strong>Bit Manipulation:</strong> Use binary representation to generate subsets</li>
            </ul>
            
            <h3>When to Use These Patterns</h3>
            <p>
              These patterns are effective for:
            </p>
            <ul>
              <li>Combinatorial problems</li>
              <li>Exhaustive search problems</li>
              <li>Problems requiring exploration of all possible states</li>
              <li>Game-playing scenarios</li>
              <li>Cryptography and password generation</li>
            </ul>
          </div>
          
          <div className="overview-links">
            <h3>Time & Space Complexity</h3>
            <ul>
              <li><strong>Subsets:</strong> O(2^n) time and space</li>
              <li><strong>Combinations:</strong> O(n choose k) time and space</li>
              <li><strong>Permutations:</strong> O(n!) time and space</li>
            </ul>
            
            <h3>Explore Implementations</h3>
            <ul>
              <li><Link to="/dp/backtracking">Backtracking Techniques</Link></li>
            </ul>
            
            <h3>Related Problems</h3>
            <ul>
              <li><Link to="/problems/backtracking/subsets">Subsets</Link></li>
              <li><Link to="/problems/backtracking/permutations">Permutations</Link></li>
              <li><Link to="/problems/backtracking/combination-sum">Combination Sum</Link></li>
            </ul>
          </div>
        </div>
      </section>

      <section id="divide-conquer" className="overview-section">
        <h2>Divide and Conquer</h2>
        <pre className="ascii-art">
          {`  Merge Sort:
  
  [38, 27, 43, 3, 9, 82, 10]
           /            \\
  [38, 27, 43, 3]    [9, 82, 10]
      /     \\          /     \\
  [38, 27]  [43, 3]  [9]  [82, 10]
   /   \\     /   \\        /    \\
 [38] [27] [43] [3]     [82]  [10]
   \\   /     \\   /        \\    /
  [27,38]   [3,43]       [10,82]
      \\       /             /
     [3,27,38,43]      [9,10,82]
           \\              /
         [3,9,10,27,38,43,82]`}
        </pre>
        <div className="overview-content">
          <div className="overview-description">
            <h3>What is Divide and Conquer?</h3>
            <p>
              Divide and Conquer is an algorithmic paradigm that breaks a problem into smaller subproblems, 
              solves each subproblem independently, and then combines the solutions to solve the original problem.
            </p>
            
            <h3>Steps in Divide and Conquer</h3>
            <ol>
              <li><strong>Divide:</strong> Break the problem into smaller subproblems</li>
              <li><strong>Conquer:</strong> Solve the subproblems recursively</li>
              <li><strong>Combine:</strong> Merge the solutions of subproblems to create a solution to the original problem</li>
            </ol>
            
            <h3>When to Use Divide and Conquer</h3>
            <p>
              Divide and Conquer is effective for:
            </p>
            <ul>
              <li>Problems that can be broken down into similar, smaller subproblems</li>
              <li>Problems where combining solutions is relatively straightforward</li>
              <li>Problems that benefit from parallel processing</li>
              <li>Problems with overlapping subproblems (when combined with dynamic programming)</li>
            </ul>
          </div>
          
          <div className="overview-links">
            <h3>Time & Space Complexity</h3>
            <ul>
              <li><strong>Time Complexity:</strong> Often O(n log n) for efficient implementations</li>
              <li><strong>Space Complexity:</strong> Varies, but often O(n) or O(log n) for the recursion stack</li>
            </ul>
            
            <h3>Classic Divide and Conquer Algorithms</h3>
            <ul>
              <li>Merge Sort</li>
              <li>Quick Sort</li>
              <li>Binary Search</li>
              <li>Closest Pair of Points</li>
              <li>Strassen's Matrix Multiplication</li>
              <li>Karatsuba Algorithm for Fast Multiplication</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="in-place-reversal" className="overview-section">
        <h2>In-place Reversal of a Linked List</h2>
        <pre className="ascii-art">
          {`  Original List:
  1 → 2 → 3 → 4 → 5 → NULL
  
  Step 1: Initialize prev=NULL, curr=1, next=2
  NULL ← 1   2 → 3 → 4 → 5 → NULL
  prev  curr next
  
  Step 2: curr.next = prev, prev = curr, curr = next
  NULL ← 1   2 → 3 → 4 → 5 → NULL
         prev curr next
  
  Step 3: curr.next = prev, prev = curr, curr = next
  NULL ← 1 ← 2   3 → 4 → 5 → NULL
             prev curr next
  
  Final Result:
  NULL ← 1 ← 2 ← 3 ← 4 ← 5
                      head`}
        </pre>
        <div className="overview-content">
          <div className="overview-description">
            <h3>What is In-place Reversal of a Linked List?</h3>
            <p>
              This pattern involves reversing the direction of a linked list by changing the next pointers of its nodes,
              without using extra space for another list. It's a technique to efficiently reverse a linked list or parts of it.
            </p>
            
            <h3>How In-place Reversal Works</h3>
            <ol>
              <li>Initialize three pointers: previous (initially NULL), current (head), and next</li>
              <li>Iterate through the list, at each step:</li>
              <li>Save the next node</li>
              <li>Reverse the current node's pointer to point to the previous node</li>
              <li>Move previous and current pointers one step forward</li>
              <li>Return the new head (which was the last node)</li>
            </ol>
            
            <h3>Variations of In-place Reversal</h3>
            <ul>
              <li><strong>Reverse Entire List:</strong> Change the direction of all nodes</li>
              <li><strong>Reverse a Sublist:</strong> Reverse nodes from position m to n</li>
              <li><strong>Reverse in k-Groups:</strong> Reverse every k nodes at a time</li>
              <li><strong>Reverse Alternating k-Groups:</strong> Reverse every alternate k nodes</li>
            </ul>
          </div>
          
          <div className="overview-links">
            <h3>Time & Space Complexity</h3>
            <ul>
              <li><strong>Time Complexity:</strong> O(n) where n is the number of nodes</li>
              <li><strong>Space Complexity:</strong> O(1) as we only use a constant amount of extra space</li>
            </ul>
            
            <h3>Common Problems</h3>
            <ul>
              <li>Reverse a Linked List</li>
              <li>Reverse a Sublist</li>
              <li>Reverse Nodes in k-Group</li>
              <li>Reverse Alternating k Elements</li>
              <li>Reorder List</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="cyclic-sort" className="overview-section">
        <h2>Cyclic Sort</h2>
        <pre className="ascii-art">
          {`  Array: [3, 1, 5, 4, 2]
  
  Step 1: Check if nums[0] is at correct position
  [3, 1, 5, 4, 2]  → 3 should be at index 2, swap
   ↑
  
  Step 2: After swap
  [5, 1, 3, 4, 2]  → 5 should be at index 4, swap
   ↑
  
  Step 3: After swap
  [2, 1, 3, 4, 5]  → 2 should be at index 1, swap
   ↑
  
  Step 4: After swap
  [1, 2, 3, 4, 5]  → 1 is at correct position, move to next
   ↑
  
  Result: [1, 2, 3, 4, 5]`}
        </pre>
        <div className="overview-content">
          <div className="overview-description">
            <h3>What is Cyclic Sort?</h3>
            <p>
              Cyclic Sort is an efficient in-place sorting algorithm specifically designed for problems where the array
              contains numbers in a given range (usually 1 to n or 0 to n-1). It works by placing each number at its correct index.
            </p>
            
            <h3>How Cyclic Sort Works</h3>
            <ol>
              <li>Iterate through the array</li>
              <li>For each element, check if it's at the correct position (usually nums[i] should be at index nums[i]-1 or nums[i])</li>
              <li>If not, swap it with the element at its correct position</li>
              <li>Stay at the same index until the current position has the correct element</li>
              <li>Move to the next index when the current position has the correct element</li>
            </ol>
            
            <h3>When to Use Cyclic Sort</h3>
            <p>
              Cyclic Sort is particularly useful for:
            </p>
            <ul>
              <li>Arrays containing numbers in range 1 to n</li>
              <li>Finding missing numbers</li>
              <li>Finding duplicate numbers</li>
              <li>Finding the smallest missing positive number</li>
              <li>Problems where array elements have a natural position</li>
            </ul>
          </div>
          
          <div className="overview-links">
            <h3>Time & Space Complexity</h3>
            <ul>
              <li><strong>Time Complexity:</strong> O(n) where n is the size of the array</li>
              <li><strong>Space Complexity:</strong> O(1) as it sorts in-place</li>
            </ul>
            
            <h3>Common Problems</h3>
            <ul>
              <li>Find Missing Number</li>
              <li>Find All Missing Numbers</li>
              <li>Find the Duplicate Number</li>
              <li>Find All Duplicates</li>
              <li>First Missing Positive</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AlgorithmicPatternsPage;
