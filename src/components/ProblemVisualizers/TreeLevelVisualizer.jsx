// src/components/ProblemVisualizers/TreeLevelVisualizer.jsx
import React from 'react';
import './TreeLevelVisualizer.css';

const TreeLevelVisualizer = ({
  tree,
  currentPath = [],
  highlightedNodes = new Set(),
  specialNodes = new Set(), // Add this prop
  width = 800,
  height = 400
}) => {
  const calculateNodePosition = (node, level, startX, endX) => {
    const verticalSpacing = height / (level + 3);
    return {
      x: (startX + endX) / 2,
      y: (level + 1) * verticalSpacing
    };
  };

  const renderNode = (node, level = 0, startX = 0, endX = width) => {
    if (!node) return null;

    const position = calculateNodePosition(node, level, startX, endX);
    const isHighlighted = highlightedNodes.has(node.val);
    const isSpecialNode = specialNodes.has(node.val); // Add this line
    const isInCurrentPath = currentPath.includes(node.val);

    return (
      <g key={`${level}-${position.x}-${position.y}`}>
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
          fill={
            isSpecialNode ? '#ff9800' :  // Special nodes (p and q)
            isInCurrentPath ? '#ff0000' : // Current path being explored
            isHighlighted ? '#4CAF50' :   // Highlighted nodes (found paths)
            '#fff'                        // Default color
          }
          stroke={isSpecialNode ? '#f57c00' : '#333'}
          strokeWidth={isSpecialNode ? "3" : "2"}
        />
        <text
          x={position.x}
          y={position.y}
          textAnchor="middle"
          dy=".3em"
          fill={isSpecialNode || isInCurrentPath || isHighlighted ? '#fff' : '#000'}
          fontSize="14"
        >
          {node.val}
        </text>

        {/* Recursively render children */}
        {node.left && renderNode(node.left, level + 1, startX, position.x)}
        {node.right && renderNode(node.right, level + 1, position.x, endX)}
      </g>
    );
  };

  return (
    <div className="tree-level-visualizer">
      <svg width={width} height={height}>
        <g transform={`translate(0, 20)`}>
          {tree && renderNode(tree)}
        </g>
      </svg>
      <div className="level-results">
        {currentPath.length > 0 && (
          <div className="current-path">
            Current Path: [{currentPath.join(' → ')}]
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeLevelVisualizer;