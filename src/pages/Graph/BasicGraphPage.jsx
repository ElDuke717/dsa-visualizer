// src/pages/Graph/BasicGraphPage.jsx
import React, { useState } from 'react';
import GraphVisualizer from '../../components/DataStructureVisualizer/GraphVisualizer';
import CodeSnippet from '../../components/CodeSnippet/CodeSnippet';
import './GraphPage.css';

const BasicGraphPage = () => {
  const [language, setLanguage] = useState('javascript');
  const [nodes, setNodes] = useState([
    { id: 1, x: 150, y: 100 },
    { id: 2, x: 300, y: 100 },
    { id: 3, x: 150, y: 250 },
  ]);
  const [edges, setEdges] = useState([
    { source: 1, target: 2 },
    { source: 2, target: 3 },
  ]);
  const [newNodeId, setNewNodeId] = useState('');
  const [sourceNode, setSourceNode] = useState('');
  const [targetNode, setTargetNode] = useState('');

  const addNode = () => {
    if (newNodeId && !nodes.find(n => n.id === parseInt(newNodeId))) {
      const x = Math.random() * 400 + 100;
      const y = Math.random() * 200 + 100;
      setNodes([...nodes, { id: parseInt(newNodeId), x, y }]);
      setNewNodeId('');
    }
  };

  const addEdge = () => {
    if (sourceNode && targetNode) {
      const newEdge = {
        source: parseInt(sourceNode),
        target: parseInt(targetNode)
      };
      if (!edges.find(e => 
        (e.source === newEdge.source && e.target === newEdge.target) ||
        (e.source === newEdge.target && e.target === newEdge.source)
      )) {
        setEdges([...edges, newEdge]);
      }
      setSourceNode('');
      setTargetNode('');
    }
  };

  const removeNode = (nodeId) => {
    setNodes(nodes.filter(n => n.id !== parseInt(nodeId)));
    setEdges(edges.filter(e => 
      e.source !== parseInt(nodeId) && e.target !== parseInt(nodeId)
    ));
  };

  const graphImplementations = {
    javascript: `
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = new Set();
    }
  }

  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1]) {
      this.addVertex(vertex1);
    }
    if (!this.adjacencyList[vertex2]) {
      this.addVertex(vertex2);
    }
    this.adjacencyList[vertex1].add(vertex2);
    this.adjacencyList[vertex2].add(vertex1);
  }

  removeVertex(vertex) {
    if (!this.adjacencyList[vertex]) return;
    
    // Remove all edges connected to this vertex
    for (let neighbor of this.adjacencyList[vertex]) {
      this.adjacencyList[neighbor].delete(vertex);
    }
    
    // Delete the vertex
    delete this.adjacencyList[vertex];
  }

  removeEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1]) {
      this.adjacencyList[vertex1].delete(vertex2);
    }
    if (this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex2].delete(vertex1);
    }
  }

  getNeighbors(vertex) {
    return this.adjacencyList[vertex] || new Set();
  }
}`,
    python: `
class Graph:
    def __init__(self):
        self.adjacency_list = {}
    
    def add_vertex(self, vertex):
        if vertex not in self.adjacency_list:
            self.adjacency_list[vertex] = set()
    
    def add_edge(self, vertex1, vertex2):
        if vertex1 not in self.adjacency_list:
            self.add_vertex(vertex1)
        if vertex2 not in self.adjacency_list:
            self.add_vertex(vertex2)
            
        self.adjacency_list[vertex1].add(vertex2)
        self.adjacency_list[vertex2].add(vertex1)
    
    def remove_vertex(self, vertex):
        if vertex not in self.adjacency_list:
            return
            
        # Remove all edges connected to this vertex
        for neighbor in self.adjacency_list[vertex]:
            self.adjacency_list[neighbor].remove(vertex)
            
        # Delete the vertex
        del self.adjacency_list[vertex]
    
    def remove_edge(self, vertex1, vertex2):
        if vertex1 in self.adjacency_list:
            self.adjacency_list[vertex1].discard(vertex2)
        if vertex2 in self.adjacency_list:
            self.adjacency_list[vertex2].discard(vertex1)
    
    def get_neighbors(self, vertex):
        return self.adjacency_list.get(vertex, set())`
  };

  const GraphExplanation = () => (
    <section className="explanation">
      <h2>Graph Data Structure</h2>
      <p>
        A graph is a non-linear data structure consisting of vertices (nodes) and edges 
        that connect these vertices. Graphs are used to represent networks and relationships 
        between objects.
      </p>

      <div className="features">
        <h3>Key Characteristics:</h3>
        <ul>
          <li>Consists of vertices (nodes) and edges</li>
          <li>Can be directed or undirected</li>
          <li>Can be weighted or unweighted</li>
          <li>Can be cyclic or acyclic</li>
        </ul>

        <h3>Common Applications:</h3>
        <ul>
          <li>Social Networks</li>
          <li>Road Networks and Maps</li>
          <li>Computer Networks</li>
          <li>Dependency Trees</li>
          <li>State Machines</li>
        </ul>

        <h3>Basic Operations:</h3>
        <ul>
          <li>Add Vertex: O(1)</li>
          <li>Add Edge: O(1)</li>
          <li>Remove Vertex: O(|V| + |E|)</li>
          <li>Remove Edge: O(1)</li>
          <li>Find Neighbors: O(1)</li>
        </ul>

        <h3>Implementation Methods:</h3>
        <ul>
          <li>Adjacency List</li>
          <li>Adjacency Matrix</li>
          <li>Edge List</li>
        </ul>
      </div>
    </section>
  );

  return (
    <div className="page-container">
      <h1>Basic Graph Implementation</h1>

      <section className="visualization">
        <GraphVisualizer
          nodes={nodes}
          edges={edges}
        />
        <div className="controls">
          <div className="control-group">
            <input
              type="number"
              value={newNodeId}
              onChange={(e) => setNewNodeId(e.target.value)}
              placeholder="Node ID"
            />
            <button onClick={addNode}>Add Node</button>
            <button onClick={() => removeNode(newNodeId)}>Remove Node</button>
          </div>
          <div className="control-group">
            <input
              type="number"
              value={sourceNode}
              onChange={(e) => setSourceNode(e.target.value)}
              placeholder="Source Node"
            />
            <input
              type="number"
              value={targetNode}
              onChange={(e) => setTargetNode(e.target.value)}
              placeholder="Target Node"
            />
            <button onClick={addEdge}>Add Edge</button>
          </div>
        </div>
      </section>

      <GraphExplanation />

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

export default BasicGraphPage;