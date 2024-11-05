// src/components/DataStructureVisualizer/SortingVisualizer.jsx
import React from 'react';
import './SortingVisualizer.css';

const SortingVisualizer = ({
  array,
  comparing = [],
  swapping = [],
  sorted = [],
  pivot = null,
  width = 800,
  height = 400
}) => {
  const barWidth = Math.floor((width - 100) / array.length);
  const maxValue = Math.max(...array);

  return (
    <div className="sorting-visualizer">
      <svg width={width} height={height}>
        {array.map((value, index) => {
          const barHeight = (value / maxValue) * (height - 50);
          const x = 50 + index * barWidth;
          const y = height - barHeight;

          let color = '#4CAF50'; // Default color
          if (swapping.includes(index)) {
            color = '#ff0000'; // Red for swapping
          } else if (comparing.includes(index)) {
            color = '#FFC107'; // Yellow for comparing
          } else if (sorted.includes(index)) {
            color = '#2196F3'; // Blue for sorted
          }
          if (index === pivot) {
            color = '#9C27B0'; // Purple for pivot
          }

          return (
            <g key={index}>
              <rect
                x={x}
                y={y}
                width={barWidth - 1}
                height={barHeight}
                fill={color}
              />
              <text
                x={x + barWidth / 2}
                y={height - 10}
                textAnchor="middle"
                fontSize="12"
              >
                {value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default SortingVisualizer;