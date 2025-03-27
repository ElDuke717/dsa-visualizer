import React from 'react';
import { Link } from 'react-router-dom';
import './SortingAlgorithmsOverviewPage.css'; // Import the CSS

const SortingAlgorithmsOverviewPage = () => {
    return (
        <div className="sorting-overview-page">
            <h1>Sorting Algorithms</h1>
            
            <div className="overview-section">
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
            </div>

            <div className="algorithms-grid">
                <div className="algorithm-card">
                    <h2>Bubble Sort</h2>
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

                <div className="algorithm-card">
                    <h2>Insertion Sort</h2>
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

                <div className="algorithm-card">
                    <h2>Quick Sort</h2>
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

                <div className="algorithm-card">
                    <h2>Merge Sort</h2>
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

                <div className="algorithm-card">
                    <h2>Heap Sort</h2>
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

                <div className="algorithm-card">
                    <h2>Counting Sort</h2>
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

                <div className="algorithm-card">
                    <h2>Radix Sort</h2>
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

                <div className="algorithm-card">
                    <h2>Bucket Sort</h2>
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
        </div>
    );
};

export default SortingAlgorithmsOverviewPage;
