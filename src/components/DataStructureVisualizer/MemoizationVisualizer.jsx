// src/components/DataStructureVisualizer/MemoizationVisualizer.jsx
import React from 'react';
import './MemoizationVisualizer.css';

const MemoizationVisualizer = ({
  memoTable,
  callStack = [],
  currentCall = null,
  width = 800,
  height = 300
}) => {
  const cellWidth = Math.min(60, (width - 100) / memoTable.length);
  const cellHeight = 60;

  return (
    <div className="memoization-visualizer">
      <div className="call-stack">
        <h4>Call Stack</h4>
        <div className="stack-frames">
          {callStack.map((call, index) => (
            <div 
              key={index}
              className={`stack-frame ${call === currentCall ? 'current' : ''}`}
            >
              fib({call})
            </div>
          ))}
        </div>
      </div>
      
      <svg width={width} height={height - 100}>
        {/* Draw Memo table */}
        {memoTable.map((value, index) => {
          const x = 50 + index * cellWidth;
          const y = height - 200;
          const isCurrent = index === currentCall;

          return (
            <g key={index}>
              {/* Cell rectangle */}
              <rect
                x={x}
                y={y}
                width={cellWidth - 4}
                height={cellHeight}
                fill={isCurrent ? '#4CAF50' : value !== null ? '#e3f2fd' : '#fff'}
                stroke="#333"
                strokeWidth="1"
              />
              {/* Value */}
              <text
                x={x + (cellWidth - 4) / 2}
                y={y + cellHeight / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isCurrent ? '#fff' : '#000'}
              >
                {value !== null ? value : '-'}
              </text>
              {/* Index */}
              <text
                x={x + (cellWidth - 4) / 2}
                y={y + cellHeight + 20}
                textAnchor="middle"
                fontSize="12"
                fill="#666"
              >
                {index}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default MemoizationVisualizer;