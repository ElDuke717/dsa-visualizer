// src/pages/Problems/Graphs/CloneGraph.jsx
import React, { useState, useEffect } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';

const CloneGraph = () => {
  const [originalGraph, setOriginalGraph] = useState([
    [2, 4],     // Node 1's neighbors
    [1, 3],     // Node 2's neighbors
    [2, 4],     // Node 3's neighbors
    [1, 3]      // Node 4's neighbors
  ]);
  const [currentNode, setCurrentNode] = useState(null);
  const [clonedNodes, setClonedNodes] = useState(new Set());
  const [processingEdge, setProcessingEdge] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [language, setLanguage] = useState('javascript');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setCurrentNode(null);
    setClonedNodes(new Set());
    setProcessingEdge(null);
  };

  const cloneGraph = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    const visited = new Map();
    
    const dfs = async (node) => {
      if (visited.has(node)) return visited.get(node);
      
      setCurrentNode(node);
      await sleep(speed);
      
      const clone = node;
      visited.set(node, clone);
      setClonedNodes(new Set(visited.keys()));
      
      for (const neighbor of originalGraph[node - 1]) {
        setProcessingEdge([node, neighbor]);
        await sleep(speed);
        
        const clonedNeighbor = await dfs(neighbor);
        setProcessingEdge(null);
      }
      
      return clone;
    };

    await dfs(1);
    setCurrentNode(null);
    setProcessingEdge(null);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
/**
 * Definition for Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */
function cloneGraph(node) {
    if (!node) return null;
    
    const visited = new Map();
    
    function dfs(node) {
        if (visited.has(node)) {
            return visited.get(node);
        }
        
        const clone = new Node(node.val);
        visited.set(node, clone);
        
        for (const neighbor of node.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }
        
        return clone;
    }
    
    return dfs(node);
}`,
    python: `
"""
# Definition for a Node.
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
"""
def cloneGraph(self, node: 'Node') -> 'Node':
    if not node:
        return None
        
    visited = {}
    
    def dfs(node):
        if node in visited:
            return visited[node]
            
        clone = Node(node.val)
        visited[node] = clone
        
        for neighbor in node.neighbors:
            clone.neighbors.append(dfs(neighbor))
            
        return clone
    
    return dfs(node)`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Clone Graph</h1>
        <div className="problem-meta">
          <span className="difficulty medium">Medium</span>
          <span className="category">Graph - DFS</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.
          Each node in the graph contains a value (int) and a list of its neighbors.
        </p>
      </section>

      <section className="visualization">
        <div className="graph-visualization">
          <svg width="600" height="400" viewBox="0 0 600 400">
            {/* Draw original graph */}
            <g transform="translate(150, 200)">
              <text x="-50" y="-180" className="graph-label">Original Graph</text>
              {originalGraph.map((neighbors, idx) => {
                const angle = (2 * Math.PI * idx) / originalGraph.length;
                const x = Math.cos(angle) * 80;
                const y = Math.sin(angle) * 80;
                return (
                  <g key={idx}>
                    {/* Draw edges */}
                    {neighbors.map((neighbor, i) => {
                      const neighborAngle = (2 * Math.PI * (neighbor - 1)) / originalGraph.length;
                      const nx = Math.cos(neighborAngle) * 80;
                      const ny = Math.sin(neighborAngle) * 80;
                      return (
                        <line
                          key={i}
                          x1={x}
                          y1={y}
                          x2={nx}
                          y2={ny}
                          stroke={
                            processingEdge && 
                            ((processingEdge[0] === idx + 1 && processingEdge[1] === neighbor) ||
                             (processingEdge[1] === idx + 1 && processingEdge[0] === neighbor))
                              ? "#FF4081"
                              : "#999"
                          }
                          strokeWidth="2"
                        />
                      );
                    })}
                    {/* Draw nodes */}
                    <circle
                      cx={x}
                      cy={y}
                      r="20"
                      fill={currentNode === idx + 1 ? "#2196F3" : 
                            clonedNodes.has(idx + 1) ? "#4CAF50" : "#fff"}
                      stroke="#333"
                      strokeWidth="2"
                    />
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dy=".3em"
                      fill={currentNode === idx + 1 || clonedNodes.has(idx + 1) ? "#fff" : "#000"}
                    >
                      {idx + 1}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Draw cloned graph */}
            <g transform="translate(450, 200)">
              <text x="-50" y="-180" className="graph-label">Cloned Graph</text>
              {originalGraph.map((neighbors, idx) => {
                const angle = (2 * Math.PI * idx) / originalGraph.length;
                const x = Math.cos(angle) * 80;
                const y = Math.sin(angle) * 80;
                return (
                  <g key={idx}>
                    {clonedNodes.has(idx + 1) && (
                      <>
                        {/* Draw edges for cloned nodes */}
                        {neighbors.map((neighbor, i) => {
                          if (!clonedNodes.has(neighbor)) return null;
                          const neighborAngle = (2 * Math.PI * (neighbor - 1)) / originalGraph.length;
                          const nx = Math.cos(neighborAngle) * 80;
                          const ny = Math.sin(neighborAngle) * 80;
                          return (
                            <line
                              key={i}
                              x1={x}
                              y1={y}
                              x2={nx}
                              y2={ny}
                              stroke="#4CAF50"
                              strokeWidth="2"
                            />
                          );
                        })}
                        {/* Draw cloned nodes */}
                        <circle
                          cx={x}
                          cy={y}
                          r="20"
                          fill="#4CAF50"
                          stroke="#333"
                          strokeWidth="2"
                        />
                        <text
                          x={x}
                          y={y}
                          textAnchor="middle"
                          dy=".3em"
                          fill="#fff"
                        >
                          {idx + 1}
                        </text>
                      </>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        <div className="controls">
          <div className="input-group">
            <label>Animation Speed (ms):</label>
            <input
              type="range"
              min="100"
              max="2000"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
          </div>
          <div className="button-group">
            <button onClick={cloneGraph} disabled={isRunning}>
              Clone Graph
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
          <h3>DFS Solution</h3>
          <ol>
            <li>Use a hash map to store visited nodes and their clones</li>
            <li>For each node:
              <ul>
                <li>If already visited, return the clone from map</li>
                <li>Create a new clone node</li>
                <li>Add to visited map</li>
                <li>Recursively clone all neighbors</li>
              </ul>
            </li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(N + E) where N is the number of nodes and E is the number of edges</p>
          
          <h3>Space Complexity</h3>
          <p>O(N) for the visited hash map</p>
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

export default CloneGraph;