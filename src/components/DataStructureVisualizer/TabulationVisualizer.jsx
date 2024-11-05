// src/components/DataStructureVisualizer/TabulationVisualizer.jsx
import React from 'react';
import './TabulationVisualizer.css';

const TabulationVisualizer = ({
  dpTable,
  currentIndex = null,
  width = 800,
  height = 200
}) => {
  const cellWidth = Math.min(60, (width - 100) / dpTable.length);
  const cellHeight = 60;

  return (
    <div className="tabulation-visualizer">
      <svg width={width} height={height}>
        {/* Draw DP table */}
        {dpTable.map((value, index) => {
          const x = 50 + index * cellWidth;
          const y = height - 100;
          const isCurrent = index === currentIndex;

          return (
            <g key={index}>
              {/* Cell rectangle */}
              <rect
                x={x}
                y={y}
                width={cellWidth - 4}
                height={cellHeight}
                fill={isCurrent ? '#4CAF50' : '#fff'}
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
                {value}
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

export default TabulationVisualizer;