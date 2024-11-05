// src/components/DataStructureVisualizer/BacktrackingVisualizer.jsx
import React from 'react';
import './BacktrackingVisualizer.css';

const BacktrackingVisualizer = ({
  board,
  currentRow = null,
  currentCol = null,
  size = 4,
  width = 400,
  height = 400
}) => {
  const cellSize = Math.min(width, height) / size;

  return (
    <div className="backtracking-visualizer">
      <svg width={width} height={height}>
        {/* Draw chessboard */}
        {Array.from({ length: size }, (_, row) => (
          Array.from({ length: size }, (_, col) => {
            const x = col * cellSize;
            const y = row * cellSize;
            const isCurrentCell = row === currentRow && col === currentCol;
            const hasQueen = board[row][col] === 1;
            const isDarkSquare = (row + col) % 2 === 1;

            return (
              <g key={`${row}-${col}`}>
                {/* Chess square */}
                <rect
                  x={x}
                  y={y}
                  width={cellSize}
                  height={cellSize}
                  fill={isDarkSquare ? '#b58863' : '#f0d9b5'}
                  stroke={isCurrentCell ? '#ff0000' : '#000'}
                  strokeWidth={isCurrentCell ? 2 : 0.5}
                />
                {/* Queen */}
                {hasQueen && (
                  <g transform={`translate(${x + cellSize/2}, ${y + cellSize/2})`}>
                    <circle
                      r={cellSize * 0.3}
                      fill={isDarkSquare ? '#000' : '#000'}
                      stroke="#fff"
                      strokeWidth="2"
                    />
                    <text
                      x="0"
                      y="2"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      fill="#fff"
                      fontSize={cellSize * 0.3}
                    >
                      ♕
                    </text>
                  </g>
                )}
              </g>
            );
          })
        ))}
      </svg>
    </div>
  );
};

export default BacktrackingVisualizer;