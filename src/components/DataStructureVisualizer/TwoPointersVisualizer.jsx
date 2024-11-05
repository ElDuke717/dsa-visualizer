// src/components/DataStructureVisualizer/TwoPointersVisualizer.jsx
import React from 'react';
import './TwoPointersVisualizer.css';

const TwoPointersVisualizer = ({
  array,
  leftPointer,
  rightPointer,
  highlightedIndices = [],
  result = [],
  width = 800,
  height = 200
}) => {
  const elementWidth = Math.min(60, (width - 100) / array.length);
  const elementHeight = height - 80;

  return (
    <div className="two-pointers-visualizer">
      <svg width={width} height={height}>
        {/* Draw array elements */}
        {array.map((value, index) => {
          const x = 50 + index * elementWidth;
          const y = height - 60;
          const isHighlighted = highlightedIndices.includes(index);
          const isPointer = index === leftPointer || index === rightPointer;

          return (
            <g key={index}>
              {/* Element rectangle */}
              <rect
                x={x}
                y={y}
                width={elementWidth - 4}
                height={40}
                fill={isHighlighted ? '#4CAF50' : isPointer ? '#2196F3' : '#fff'}
                stroke="#333"
                strokeWidth="1"
              />
              {/* Element value */}
              <text
                x={x + (elementWidth - 4) / 2}
                y={y + 25}
                textAnchor="middle"
                fill={isHighlighted || isPointer ? '#fff' : '#000'}
              >
                {value}
              </text>
              
              {/* Pointer labels */}
              {index === leftPointer && (
                <text
                  x={x + (elementWidth - 4) / 2}
                  y={y + 60}
                  textAnchor="middle"
                  fill="#2196F3"
                  fontSize="12"
                >
                  Left
                </text>
              )}
              {index === rightPointer && (
                <text
                  x={x + (elementWidth - 4) / 2}
                  y={y + 60}
                  textAnchor="middle"
                  fill="#2196F3"
                  fontSize="12"
                >
                  Right
                </text>
              )}
            </g>
          );
        })}

        {/* Show current result */}
        <text x={50} y={30} fill="#666">
          Current Result: [{result.join(', ')}]
        </text>
      </svg>
    </div>
  );
};

export default TwoPointersVisualizer;