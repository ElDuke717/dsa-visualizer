// src/pages/Graph/GraphPage.jsx
import React, { useState } from 'react';
import GraphVisualizer from '../../components/DataStructureVisualizer/GraphVisualizer';
import CodeSnippet from '../../components/CodeSnippet/CodeSnippet';
import { graphImplementations } from '../../data/implementations/graphImplementations';

const GraphPage = ({algorithm = 'bfs'}) => {
  const [language, setLanguage] = useState('javascript');
  // Define nodes with better spacing
  const [nodes] = useState([
    { id: 1, x: 150, y: 100 },
    { id: 2, x: 300, y: 100 },
    { id: 3, x: 150, y: 250 },
    { id: 4, x: 300, y: 250 },
    { id: 5, x: 450, y: 175 },
  ]);
  
  // Define edges to create a more connected graph
  const [edges] = useState([
    { source: 1, target: 2 },
    { source: 1, target: 3 },
    { source: 2, target: 4 },
    { source: 2, target: 5 },
    { source: 3, target: 4 },
    { source: 4, target: 5 },
  ]);

  const [visitedNodes, setVisitedNodes] = useState(new Set());
  const [currentNode, setCurrentNode] = useState(null);
  const [queue, setQueue] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  // Create adjacency list from edges
  const createAdjacencyList = () => {
    const adjacencyList = {};
    nodes.forEach(node => {
      adjacencyList[node.id] = [];
    });
    edges.forEach(edge => {
      adjacencyList[edge.source].push(edge.target);
      adjacencyList[edge.target].push(edge.source);
    });
    return adjacencyList;
  };

  const resetVisualization = () => {
    setVisitedNodes(new Set());
    setCurrentNode(null);
    setQueue([]);
    setIsRunning(false);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const runBFS = async (startNode) => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    const adjacencyList = createAdjacencyList();
    const visited = new Set();
    const q = [startNode];
    
    while (q.length > 0) {
      const node = q.shift();
      
      if (!visited.has(node)) {
        setCurrentNode(node);
        setQueue([...q]);
        
        // Wait for animation
        await sleep(1000);
        
        visited.add(node);
        setVisitedNodes(new Set(visited));

        // Get unvisited neighbors
        const neighbors = adjacencyList[node];
        for (let neighbor of neighbors) {
          if (!visited.has(neighbor) && !q.includes(neighbor)) {
            q.push(neighbor);
          }
        }
        
        setQueue([...q]);
      }
    }
    
    setCurrentNode(null);
    setIsRunning(false);
  };

  const runDFS = async (startNode) => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    const adjacencyList = createAdjacencyList();
    const visited = new Set();

    const dfsHelper = async (node) => {
      if (visited.has(node)) return;

      setCurrentNode(node);
      await sleep(1000);

      visited.add(node);
      setVisitedNodes(new Set(visited));

      const neighbors = adjacencyList[node];
      for (let neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          await dfsHelper(neighbor);
        }
      }
    };

    await dfsHelper(startNode);
    setCurrentNode(null);
    setIsRunning(false);
  };

  // Add this section in GraphPage.jsx for BFS
const BFSExplanation = () => (
    <section className="explanation">
      <h2>Breadth-First Search (BFS)</h2>
      <p>
        Breadth-First Search is a graph traversal algorithm that explores a graph level by level, 
        visiting all neighbors of a node before moving to the next level of nodes.
      </p>
  
      <div className="features">
        <h3>Key Characteristics:</h3>
        <ul>
          <li>Explores nodes in layers or levels</li>
          <li>Uses a queue data structure</li>
          <li>Guarantees shortest path in unweighted graphs</li>
          <li>Time Complexity: O(V + E) where V is vertices and E is edges</li>
          <li>Space Complexity: O(V) for the queue</li>
        </ul>
  
        <h3>Common Applications:</h3>
        <ul>
          <li>Finding shortest path in unweighted graphs</li>
          <li>Social networking (finding people within k connections)</li>
          <li>Web crawlers</li>
          <li>GPS Navigation systems</li>
          <li>Broadcasting in network</li>
        </ul>
  
        <h3>How It Works:</h3>
        <ol>
          <li>Start at a selected node (root)</li>
          <li>Add the node to a queue</li>
          <li>While queue is not empty:
            <ul>
              <li>Remove first node from queue</li>
              <li>Process the node (mark as visited)</li>
              <li>Add all unvisited neighbors to queue</li>
            </ul>
          </li>
          <li>Repeat until queue is empty</li>
        </ol>
  
        <h3>Advantages:</h3>
        <ul>
          <li>Guarantees shortest path in unweighted graphs</li>
          <li>Good for searching nearby nodes</li>
          <li>Memory efficient for shallow, wide graphs</li>
        </ul>
  
        <h3>Disadvantages:</h3>
        <ul>
          <li>Uses more memory than DFS</li>
          <li>Less suitable for deep graphs</li>
          <li>May be slower than DFS for finding a specific target</li>
        </ul>
      </div>
    </section>
  );

  // Add this section in GraphPage.jsx for DFS
const DFSExplanation = () => (
    <section className="explanation">
      <h2>Depth-First Search (DFS)</h2>
      <p>
        Depth-First Search is a graph traversal algorithm that explores as far as possible along each branch 
        before backtracking. It goes deep into the graph before exploring neighboring nodes.
      </p>
  
      <div className="features">
        <h3>Key Characteristics:</h3>
        <ul>
          <li>Explores as far as possible along each branch</li>
          <li>Uses a stack (or recursion)</li>
          <li>Memory efficient for deep graphs</li>
          <li>Time Complexity: O(V + E) where V is vertices and E is edges</li>
          <li>Space Complexity: O(h) where h is height of tree/graph</li>
        </ul>
  
        <h3>Common Applications:</h3>
        <ul>
          <li>Topological Sorting</li>
          <li>Detecting cycles in graphs</li>
          <li>Solving puzzles with only one solution</li>
          <li>Finding connected components</li>
          <li>Maze generation and solving</li>
        </ul>
  
        <h3>How It Works:</h3>
        <ol>
          <li>Start at a selected node (root)</li>
          <li>Mark current node as visited</li>
          <li>Recursively visit any unvisited neighbor:
            <ul>
              <li>Select an unvisited neighbor</li>
              <li>Recursively apply DFS to that neighbor</li>
              <li>Backtrack when no unvisited neighbors remain</li>
            </ul>
          </li>
          <li>Repeat until all nodes are visited</li>
        </ol>
  
        <h3>Advantages:</h3>
        <ul>
          <li>Memory efficient for deep graphs</li>
          <li>Good for exploring all possible paths</li>
          <li>Natural for recursive problems</li>
          <li>Used in garbage collection (mark-and-sweep)</li>
        </ul>
  
        <h3>Disadvantages:</h3>
        <ul>
          <li>May get stuck in deep portions of graph</li>
          <li>Does not guarantee shortest path</li>
          <li>Can be inefficient for shallow, wide graphs</li>
        </ul>
  
        <h3>Variants:</h3>
        <ul>
          <li>Pre-order DFS</li>
          <li>Post-order DFS</li>
          <li>In-order DFS (for binary trees)</li>
        </ul>
      </div>
    </section>
  );

  // In your GraphPage.jsx, update the return statement to conditionally render the explanation:

return (
    <div className="page-container">
      <h1>Graph Data Structure - {algorithm.toUpperCase()} Visualization</h1>
      
      <section className="visualization">
        <GraphVisualizer
          nodes={nodes}
          edges={edges}
          visitedNodes={visitedNodes}
          currentNode={currentNode}
          queue={queue}
        />
        <div className="controls">
          <button 
            onClick={() => algorithm === 'bfs' ? runBFS(1) : runDFS(1)} 
            disabled={isRunning}
            className="control-button"
          >
            Run {algorithm.toUpperCase()}
          </button>
          <button 
            onClick={resetVisualization}
            disabled={!isRunning}
            className="control-button"
          >
            Reset
          </button>
        </div>
      </section>
  
      {/* Conditionally render the appropriate explanation */}
      {algorithm === 'bfs' ? <BFSExplanation /> : <DFSExplanation />}
  
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
          code={graphImplementations[language]}
        />
      </section>
    </div>
  );
};

export default GraphPage;