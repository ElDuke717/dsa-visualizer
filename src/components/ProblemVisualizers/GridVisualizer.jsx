// src/components/ProblemVisualizers/GridVisualizer.jsx
import React from 'react';
import './GridVisualizer.css';

const GridVisualizer = ({
  grid,
  visitedCells = new Set(),
  currentCell = null,
  width = 600,
  height = 400
}) => {
  const cellSize = Math.min(
    (width - 40) / grid[0].length,
    (height - 40) / grid.length
  );

  const getCellColor = (row, col) => {
    const isVisited = visitedCells.has(`${row},${col}`);
    const isCurrent = currentCell && currentCell[0] === row && currentCell[1] === col;
    const isLand = grid[row][col] === '1';

    if (isCurrent) return '#ff0000';
    if (isVisited) return '#4CAF50';
    return isLand ? '#2196F3' : '#fff';
  };

  return (
    <div className="grid-visualizer">
      <svg width={width} height={height}>
        <g transform={`translate(20, 20)`}>
          {grid.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
              <g key={`${rowIndex}-${colIndex}`}>
                <rect
                  x={colIndex * cellSize}
                  y={rowIndex * cellSize}
                  width={cellSize - 2}
                  height={cellSize - 2}
                  fill={getCellColor(rowIndex, colIndex)}
                  stroke="#333"
                  strokeWidth="1"
                />
                <text
                  x={colIndex * cellSize + cellSize / 2}
                  y={rowIndex * cellSize + cellSize / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={cell === '1' ? '#fff' : '#000'}
                  fontSize={cellSize * 0.4}
                >
                  {cell}
                </text>
              </g>
            ))
          ))}
        </g>
      </svg>
    </div>
  );
};

export default GridVisualizer;