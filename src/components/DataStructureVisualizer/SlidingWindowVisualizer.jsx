// src/components/DataStructureVisualizer/SlidingWindowVisualizer.jsx
import React from 'react';
import './SlidingWindowVisualizer.css';

const SlidingWindowVisualizer = ({
  array,
  windowStart,
  windowEnd,
  currentSum = null,
  maxSum = null,
  width = 800,
  height = 200
}) => {
  const elementWidth = Math.min(60, (width - 100) / array.length);
  const elementHeight = height - 80;

  return (
    <div className="sliding-window-visualizer">
      <svg width={width} height={height}>
        {/* Draw array elements */}
        {array.map((value, index) => {
          const x = 50 + index * elementWidth;
          const y = height - 60;
          const isInWindow = index >= windowStart && index <= windowEnd;

          return (
            <g key={index}>
              {/* Element rectangle */}
              <rect
                x={x}
                y={y}
                width={elementWidth - 4}
                height={40}
                fill={isInWindow ? '#4CAF50' : '#fff'}
                stroke="#333"
                strokeWidth="1"
              />
              {/* Element value */}
              <text
                x={x + (elementWidth - 4) / 2}
                y={y + 25}
                textAnchor="middle"
                fill={isInWindow ? '#fff' : '#000'}
              >
                {value}
              </text>
            </g>
          );
        })}

        {/* Draw window frame */}
        <rect
          x={50 + windowStart * elementWidth - 2}
          y={height - 65}
          width={(windowEnd - windowStart + 1) * elementWidth}
          height={50}
          fill="none"
          stroke="#ff0000"
          strokeWidth="2"
          strokeDasharray="5,5"
        />

        {/* Show current sum and max sum */}
        <text x={50} y={30} fill="#666">
          Current Sum: {currentSum !== null ? currentSum : '-'}
        </text>
        <text x={50} y={50} fill="#4CAF50">
          Max Sum: {maxSum !== null ? maxSum : '-'}
        </text>
      </svg>
    </div>
  );
};

export default SlidingWindowVisualizer;