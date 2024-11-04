// src/components/DataStructureVisualizer/TreeVisualizer.jsx
import React from 'react';
import './TreeVisualizer.css';

const TreeVisualizer = ({ 
  nodes, 
  currentNode = null,
  highlightedNodes = new Set(),
  width = 800,
  height = 400
}) => {
  const calculateNodePosition = (node, level, startX, endX) => {
    const verticalSpacing = height / 6; // Adjust for better vertical spacing
    return {
      x: (startX + endX) / 2,
      y: (level + 1) * verticalSpacing
    };
  };

  const renderNode = (node, level = 0, startX = 0, endX = width) => {
    if (!node) return null;

    const position = calculateNodePosition(node, level, startX, endX);
    const nodeSpacing = (endX - startX) / Math.pow(2, level + 2);

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
          fill={
            currentNode === node.value ? '#ff0000' :
            highlightedNodes.has(node.value) ? '#4CAF50' :
            '#fff'
          }
          stroke="#333"
          strokeWidth="2"
        />
        <text
          x={position.x}
          y={position.y}
          textAnchor="middle"
          dy=".3em"
          fill="#000"
        >
          {node.value}
        </text>

        {/* Recursively render children */}
        {node.left && renderNode(
          node.left,
          level + 1,
          startX,
          position.x
        )}
        {node.right && renderNode(
          node.right,
          level + 1,
          position.x,
          endX
        )}
      </g>
    );
  };

  return (
    <svg width={width} height={height}>
      <g transform={`translate(0, 20)`}>
        {nodes[0] && renderNode(nodes[0])}
      </g>
    </svg>
  );
};

export default TreeVisualizer;