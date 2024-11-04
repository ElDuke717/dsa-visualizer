// src/components/DataStructureVisualizer/LinkedListVisualizer.jsx
import React from 'react';
import './LinkedListVisualizer.css';

const LinkedListVisualizer = ({ 
  nodes, 
  type = 'singly',
  currentNode = null,
  highlightedNodes = new Set(),
}) => {
  return (
    <div className="linked-list-container">
      {nodes.map((node, index) => (
        <div key={index} className="node-container">
          <div className={`node ${
            currentNode === index ? 'current' : 
            highlightedNodes.has(index) ? 'highlighted' : ''
          }`}>
            <div className="node-value">{node.value}</div>
            {type === 'doubly' && index > 0 && (
              <div className="prev-arrow">←</div>
            )}
            {index < nodes.length - 1 && (
              <div className="next-arrow">→</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LinkedListVisualizer;