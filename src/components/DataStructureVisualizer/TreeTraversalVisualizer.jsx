// src/components/DataStructureVisualizer/TreeTraversalVisualizer.jsx
import React from 'react';
import './TreeTraversalVisualizer.css';

const TreeTraversalVisualizer = ({
  tree,
  currentNode = null,
  visitedNodes = [],
  traversalPath = [],
  width = 800,
  height = 400
}) => {
  const calculateNodePosition = (node, level, startX, endX) => {
    const verticalSpacing = height / 6;
    return {
      x: (startX + endX) / 2,
      y: (level + 1) * verticalSpacing
    };
  };

  const renderNode = (node, level = 0, startX = 0, endX = width) => {
    if (!node) return null;

    const position = calculateNodePosition(node, level, startX, endX);
    const isCurrentNode = currentNode === node.value;
    const isVisited = visitedNodes.includes(node.value);

    return (
      <g key={node.value}>
        {/* Draw lines to children */}
        {node.left && (
          <line
            x1={position.x}
            y1={position.y}
            x2={calculateNodePosition(node.left, level + 1, startX, position.x).x}
            y2={calculateNodePosition(node.left, level + 1, startX, position.x).y}
            stroke="#666"
            strokeWidth="2"
          />
        )}
        {node.right && (
          <line
            x1={position.x}
            y1={position.y}
            x2={calculateNodePosition(node.right, level + 1, position.x, endX).x}
            y2={calculateNodePosition(node.right, level + 1, position.x, endX).y}
            stroke="#666"
            strokeWidth="2"
          />
        )}

        {/* Draw node */}
        <circle
          cx={position.x}
          cy={position.y}
          r={25}
          fill={isCurrentNode ? '#ff0000' : isVisited ? '#4CAF50' : '#fff'}
          stroke="#333"
          strokeWidth="2"
        />
        <text
          x={position.x}
          y={position.y}
          textAnchor="middle"
          dy=".3em"
          fill={isCurrentNode || isVisited ? '#fff' : '#000'}
        >
          {node.value}
        </text>

        {/* Recursively render children */}
        {node.left && renderNode(node.left, level + 1, startX, position.x)}
        {node.right && renderNode(node.right, level + 1, position.x, endX)}
      </g>
    );
  };

  return (
    <div className="tree-traversal-visualizer">
      <svg width={width} height={height}>
        <g transform={`translate(0, 20)`}>
          {tree && renderNode(tree)}
        </g>
      </svg>
      <div className="traversal-path">
        <h3>Traversal Path:</h3>
        <div className="path-nodes">
          {traversalPath.map((value, index) => (
            <span 
              key={index} 
              className={`path-node ${currentNode === value ? 'current' : ''}`}
            >
              {value}
              {index < traversalPath.length - 1 ? ' → ' : ''}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TreeTraversalVisualizer;