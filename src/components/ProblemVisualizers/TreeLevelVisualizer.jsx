// src/components/ProblemVisualizers/TreeLevelVisualizer.jsx
import React from 'react';
import './TreeLevelVisualizer.css';

const TreeLevelVisualizer = ({
  tree,
  currentLevel = null,
  visitedNodes = new Set(),
  levelResults = [],
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
    const isCurrentLevel = level === currentLevel;
    const isVisited = visitedNodes.has(node.val);

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
          fill={isCurrentLevel ? '#ff0000' : isVisited ? '#4CAF50' : '#fff'}
          stroke="#333"
          strokeWidth="2"
        />
        <text
          x={position.x}
          y={position.y}
          textAnchor="middle"
          dy=".3em"
          fill={isCurrentLevel || isVisited ? '#fff' : '#000'}
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
        {levelResults.map((level, index) => (
          <div 
            key={index} 
            className={`level-row ${index === currentLevel ? 'current' : ''}`}
          >
            <span className="level-label">Level {index}:</span>
            <span className="level-values">[{level.join(', ')}]</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreeLevelVisualizer;