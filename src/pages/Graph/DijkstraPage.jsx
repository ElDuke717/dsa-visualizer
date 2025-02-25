import React, { useState } from 'react';
import GraphVisualizer from '../../components/DataStructureVisualizer/GraphVisualizer';
import CodeSnippet from '../../components/CodeSnippet/CodeSnippet';
import './GraphPage.css';

const DijkstraPage = () => {
  const [language, setLanguage] = useState('javascript');
  // Define nodes with better spacing
  const [nodes] = useState([
    { id: 1, x: 150, y: 100 },
    { id: 2, x: 300, y: 100 },
    { id: 3, x: 150, y: 250 },
    { id: 4, x: 300, y: 250 },
    { id: 5, x: 450, y: 175 },
  ]);
  
  // Define weighted edges
  const [edges] = useState([
    { source: 1, target: 2, weight: 4 },
    { source: 1, target: 3, weight: 2 },
    { source: 2, target: 4, weight: 5 },
    { source: 2, target: 5, weight: 10 },
    { source: 3, target: 4, weight: 8 },
    { source: 4, target: 5, weight: 3 },
  ]);

  const [visitedNodes, setVisitedNodes] = useState(new Set());
  const [currentNode, setCurrentNode] = useState(null);
  const [distances, setDistances] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const [startNode, setStartNode] = useState(1);
  const [path, setPath] = useState([]);

  // Create adjacency list from edges
  const createAdjacencyList = () => {
    const adjacencyList = {};
    nodes.forEach(node => {
      adjacencyList[node.id] = [];
    });
    edges.forEach(edge => {
      adjacencyList[edge.source].push({ node: edge.target, weight: edge.weight });
      adjacencyList[edge.target].push({ node: edge.source, weight: edge.weight });
    });
    return adjacencyList;
  };

  const resetVisualization = () => {
    setVisitedNodes(new Set());
    setCurrentNode(null);
    setDistances({});
    setPath([]);
    setIsRunning(false);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const runDijkstra = async (start) => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    const adjacencyList = createAdjacencyList();
    const dist = {};
    const prev = {};
    const pq = []; // Priority queue

    // Initialize distances
    nodes.forEach(node => {
      dist[node.id] = node.id === start ? 0 : Infinity;
      prev[node.id] = null;
      pq.push(node.id);
    });

    setDistances({ ...dist });

    while (pq.length > 0) {
      // Find node with minimum distance
      let minDist = Infinity;
      let minNode = null;
      let minIndex = -1;

      for (let i = 0; i < pq.length; i++) {
        const nodeId = pq[i];
        if (dist[nodeId] < minDist) {
          minDist = dist[nodeId];
          minNode = nodeId;
          minIndex = i;
        }
      }

      if (minNode === null) break;

      // Remove min node from priority queue
      pq.splice(minIndex, 1);

      setCurrentNode(minNode);
      await sleep(1000);

      // Mark as visited
      const visited = new Set(visitedNodes);
      visited.add(minNode);
      setVisitedNodes(visited);

      // Update distances to neighbors
      for (const { node: neighbor, weight } of adjacencyList[minNode]) {
        if (pq.includes(neighbor)) {
          const alt = dist[minNode] + weight;
          if (alt < dist[neighbor]) {
            dist[neighbor] = alt;
            prev[neighbor] = minNode;
            setDistances({ ...dist });
            await sleep(500);
          }
        }
      }
    }

    // Reconstruct path to each node
    const paths = {};
    for (const node of nodes) {
      const nodeId = node.id;
      if (nodeId !== start && prev[nodeId] !== null) {
        const path = [];
        let current = nodeId;
        while (current !== null) {
          path.unshift(current);
          current = prev[current];
        }
        paths[nodeId] = path;
      }
    }

    // Display path to node 5 as an example
    if (paths[5]) {
      setPath(paths[5]);
    }

    setCurrentNode(null);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function dijkstra(graph, start) {
  // Create a distances object
  const distances = {};
  // Create a previous object
  const previous = {};
  // Create a nodes array from the graph
  const nodes = new PriorityQueue();
  // Create a path object to return at the end
  const path = [];
  // Initialize variables
  let smallest;

  // Build up initial state
  for (let vertex in graph) {
    if (vertex === start) {
      distances[vertex] = 0;
      nodes.enqueue(vertex, 0);
    } else {
      distances[vertex] = Infinity;
      nodes.enqueue(vertex, Infinity);
    }
    previous[vertex] = null;
  }

  // As long as there are nodes to visit
  while (nodes.values.length) {
    smallest = nodes.dequeue().val;

    // If we've reached the finish node, build the path and exit
    if (smallest === finish) {
      while (previous[smallest]) {
        path.push(smallest);
        smallest = previous[smallest];
      }
      break;
    }

    if (smallest || distances[smallest] !== Infinity) {
      for (let neighbor in graph[smallest]) {
        // Calculate new distance to neighboring node
        let candidate = distances[smallest] + graph[smallest][neighbor];
        if (candidate < distances[neighbor]) {
          // Updating new smallest distance to neighbor
          distances[neighbor] = candidate;
          // Updating previous - How we got to neighbor
          previous[neighbor] = smallest;
          // Enqueue in priority queue with new priority
          nodes.enqueue(neighbor, candidate);
        }
      }
    }
  }

  return path.concat(smallest).reverse();
}

// Simple Priority Queue implementation
class PriorityQueue {
  constructor() {
    this.values = [];
  }
  
  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }
  
  dequeue() {
    return this.values.shift();
  }
  
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}`,
    python: `
import heapq

def dijkstra(graph, start):
    # Initialize distances dictionary
    distances = {vertex: float('infinity') for vertex in graph}
    distances[start] = 0
    
    # Initialize previous dictionary
    previous = {vertex: None for vertex in graph}
    
    # Priority queue
    pq = [(0, start)]
    
    while pq:
        current_distance, current_vertex = heapq.heappop(pq)
        
        # If current distance is greater than the known distance, skip
        if current_distance > distances[current_vertex]:
            continue
            
        # Check all neighbors of current vertex
        for neighbor, weight in graph[current_vertex].items():
            distance = current_distance + weight
            
            # If we found a shorter path to the neighbor
            if distance < distances[neighbor]:
                # Update distance
                distances[neighbor] = distance
                # Update previous
                previous[neighbor] = current_vertex
                # Add to priority queue
                heapq.heappush(pq, (distance, neighbor))
    
    return distances, previous

# Reconstruct path from start to end
def reconstruct_path(previous, start, end):
    path = []
    current = end
    
    while current != start:
        path.append(current)
        current = previous[current]
        if current is None:
            return []  # No path exists
    
    path.append(start)
    return path[::-1]  # Reverse to get path from start to end`
  };

  // Custom edge renderer to show weights
  const renderEdges = () => {
    return edges.map((edge, index) => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);
      
      // Calculate midpoint for weight label
      const midX = (sourceNode.x + targetNode.x) / 2;
      const midY = (sourceNode.y + targetNode.y) / 2;
      
      // Check if this edge is part of the path
      const isPathEdge = path.length > 1 && path.some((node, i) => 
        i < path.length - 1 && 
        ((path[i] === edge.source && path[i+1] === edge.target) || 
         (path[i] === edge.target && path[i+1] === edge.source))
      );
      
      return (
        <g key={`edge-${index}`}>
          <line
            x1={sourceNode.x}
            y1={sourceNode.y}
            x2={targetNode.x}
            y2={targetNode.y}
            stroke={isPathEdge ? "#4CAF50" : "#999"}
            strokeWidth={isPathEdge ? 4 : 2}
          />
          <circle
            cx={midX}
            cy={midY}
            r={12}
            fill="#fff"
            stroke="#333"
          />
          <text
            x={midX}
            y={midY}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12px"
          >
            {edge.weight}
          </text>
        </g>
      );
    });
  };

  // Custom node renderer to show distances
  const renderNodes = () => {
    return nodes.map((node) => {
      const isVisited = visitedNodes.has(node.id);
      const isCurrent = currentNode === node.id;
      const isInPath = path.includes(node.id);
      const distance = distances[node.id];
      
      return (
        <g key={`node-${node.id}`}>
          <circle
            cx={node.x}
            cy={node.y}
            r={25}
            fill={
              isCurrent ? '#ff0000' : 
              isInPath ? '#4CAF50' :
              isVisited ? '#2196F3' : 
              '#fff'
            }
            stroke="#333"
            strokeWidth={2}
          />
          <text
            x={node.x}
            y={node.y - 5}
            textAnchor="middle"
            fill="#000"
            fontSize="16px"
          >
            {node.id}
          </text>
          {distance !== undefined && (
            <text
              x={node.x}
              y={node.y + 15}
              textAnchor="middle"
              fill="#000"
              fontSize="12px"
            >
              {distance === Infinity ? "∞" : distance}
            </text>
          )}
        </g>
      );
    });
  };

  const DijkstraExplanation = () => (
    <section className="explanation">
      <h2>Dijkstra's Algorithm</h2>
      <p>
        Dijkstra's algorithm is a graph search algorithm that solves the single-source shortest path problem 
        for a graph with non-negative edge weights, producing a shortest-path tree.
      </p>
  
      <div className="features">
        <h3>Key Characteristics:</h3>
        <ul>
          <li>Finds the shortest path from a source node to all other nodes</li>
          <li>Uses a priority queue for efficient node selection</li>
          <li>Works only with non-negative edge weights</li>
          <li>Time Complexity: O((V + E) log V) with binary heap</li>
          <li>Space Complexity: O(V)</li>
        </ul>
  
        <h3>Common Applications:</h3>
        <ul>
          <li>GPS navigation systems</li>
          <li>Network routing protocols</li>
          <li>Flight scheduling</li>
          <li>Robot navigation</li>
          <li>Telecommunications networks</li>
        </ul>
  
        <h3>How It Works:</h3>
        <ol>
          <li>Initialize distances: set source to 0, all others to infinity</li>
          <li>Initialize a priority queue with all nodes</li>
          <li>While the queue is not empty:
            <ul>
              <li>Select node with minimum distance (greedy approach)</li>
              <li>For each neighbor of the selected node:
                <ul>
                  <li>Calculate tentative distance through current node</li>
                  <li>If this distance is less than the current distance, update it</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>Return the distances and paths</li>
        </ol>
  
        <h3>Advantages:</h3>
        <ul>
          <li>Guarantees the shortest path in weighted graphs with non-negative edges</li>
          <li>Efficient with proper data structures (priority queue)</li>
          <li>Can be modified to find paths between specific nodes</li>
        </ul>
  
        <h3>Disadvantages:</h3>
        <ul>
          <li>Doesn't work with negative edge weights</li>
          <li>Can be slower than other algorithms for unweighted graphs</li>
          <li>May explore unnecessary nodes when finding a path to a specific target</li>
        </ul>
      </div>
    </section>
  );

  return (
    <div className="page-container">
      <h1>Dijkstra's Algorithm Visualization</h1>
      
      <section className="visualization">
        <svg width={600} height={400}>
          {renderEdges()}
          {renderNodes()}
        </svg>
        <div className="controls">
          <div className="input-group">
            <label>Start Node:</label>
            <select 
              value={startNode} 
              onChange={(e) => setStartNode(Number(e.target.value))}
              disabled={isRunning}
            >
              {nodes.map(node => (
                <option key={node.id} value={node.id}>Node {node.id}</option>
              ))}
            </select>
          </div>
          <button 
            onClick={() => runDijkstra(startNode)} 
            disabled={isRunning}
            className="control-button"
          >
            Run Dijkstra's Algorithm
          </button>
          <button 
            onClick={resetVisualization}
            disabled={!visitedNodes.size}
            className="control-button"
          >
            Reset
          </button>
        </div>
        {path.length > 0 && (
          <div className="path-display">
            <h3>Shortest Path to Node 5:</h3>
            <p>{path.join(' → ')}</p>
            <p>Total Distance: {distances[5]}</p>
          </div>
        )}
      </section>
  
      <DijkstraExplanation />
  
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
          code={implementations[language]}
        />
      </section>
    </div>
  );
};

export default DijkstraPage;
