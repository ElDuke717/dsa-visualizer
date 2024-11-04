// src/components/DataStructureVisualizer/GraphVisualizer.jsx
import React from 'react';

const GraphVisualizer = ({ 
  nodes, 
  edges, 
  width = 600, 
  height = 400, 
  visitedNodes = new Set(),
  currentNode = null,
  queue = [] 
}) => {
  return (
    <svg width={width} height={height}>
      {/* Draw edges first so they appear behind nodes */}
      {edges.map((edge, index) => {
        const sourceNode = nodes.find(n => n.id === edge.source);
        const targetNode = nodes.find(n => n.id === edge.target);
        return (
          <line
            key={`edge-${index}`}
            x1={sourceNode.x}
            y1={sourceNode.y}
            x2={targetNode.x}
            y2={targetNode.y}
            stroke="#999"
            strokeWidth={2}
          />
        );
      })}

      {/* Draw nodes */}
      {nodes.map((node) => {
        const isVisited = visitedNodes.has(node.id);
        const isCurrent = currentNode === node.id;
        const isInQueue = queue.includes(node.id);

        return (
          <g key={`node-${node.id}`}>
            <circle
              cx={node.x}
              cy={node.y}
              r={25}
              fill={
                isCurrent ? '#ff0000' : 
                isVisited ? '#4CAF50' : 
                isInQueue ? '#FFC107' : 
                '#fff'
              }
              stroke="#333"
              strokeWidth={2}
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dy=".3em"
              fill="#000"
              fontSize="16px"
            >
              {node.id}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default GraphVisualizer;