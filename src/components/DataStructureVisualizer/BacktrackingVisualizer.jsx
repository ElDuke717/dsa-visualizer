// src/components/DataStructureVisualizer/BacktrackingVisualizer.jsx
import React from "react";
import "./BacktrackingVisualizer.css";

const BacktrackingVisualizer = ({ board, currentRow, currentCol, size }) => {
  // Add safety check to prevent errors when board is not properly initialized
  if (!board || board.length === 0 || board.length !== size) {
    // Return empty board with correct dimensions
    const emptyBoard = Array(size)
      .fill()
      .map(() => Array(size).fill(0));
      
    return (
      <div className="n-queens-board">
        {emptyBoard.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((_, colIndex) => (
              <div
                key={colIndex}
                className={`board-cell ${
                  (rowIndex + colIndex) % 2 === 0 ? "light" : "dark"
                }`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="n-queens-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`board-cell ${
                (rowIndex + colIndex) % 2 === 0 ? "light" : "dark"
              } ${rowIndex === currentRow && colIndex === currentCol ? "current" : ""}`}
            >
              {cell === 1 && <div className="queen">♕</div>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BacktrackingVisualizer;
