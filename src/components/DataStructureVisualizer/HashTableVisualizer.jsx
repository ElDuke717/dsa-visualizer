// src/components/DataStructureVisualizer/HashTableVisualizer.jsx
import React from 'react';
import './HashTableVisualizer.css';

const HashTableVisualizer = ({
  buckets,
  currentIndex = null,
  highlightedKey = null,
  size = 10,
  width = 800,
  height = 400
}) => {
  const bucketHeight = 60;
  const bucketWidth = width / size - 10;

  return (
    <div className="hash-table-visualizer">
      <svg width={width} height={height}>
        {Array(size).fill(null).map((_, index) => {
          const bucket = buckets[index] || [];
          const isHighlighted = currentIndex === index;
          
          return (
            <g key={index} transform={`translate(${(bucketWidth + 10) * index}, 10)`}>
              {/* Bucket container */}
              <rect
                width={bucketWidth}
                height={bucketHeight}
                fill={isHighlighted ? '#e3f2fd' : '#fff'}
                stroke="#333"
                strokeWidth="2"
              />
              
              {/* Index number */}
              <text
                x={bucketWidth / 2}
                y={25}
                textAnchor="middle"
                fill="#666"
                fontSize="12"
              >
                {index}
              </text>

              {/* Bucket items (for chaining) */}
              <g transform={`translate(5, 30)`}>
                {bucket.map((item, itemIndex) => (
                  <g 
                    key={itemIndex} 
                    transform={`translate(0, ${itemIndex * 25})`}
                  >
                    <rect
                      width={bucketWidth - 10}
                      height={20}
                      fill={item.key === highlightedKey ? '#4CAF50' : '#f5f5f5'}
                      stroke="#999"
                      rx="4"
                    />
                    <text
                      x={(bucketWidth - 10) / 2}
                      y={15}
                      textAnchor="middle"
                      fontSize="12"
                    >
                      {`${item.key}: ${item.value}`}
                    </text>
                  </g>
                ))}
              </g>

              {/* Chain overflow indicator */}
              {bucket.length > 2 && (
                <text
                  x={bucketWidth / 2}
                  y={bucketHeight + 20}
                  textAnchor="middle"
                  fill="#999"
                  fontSize="12"
                >
                  +{bucket.length - 2} more
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default HashTableVisualizer;