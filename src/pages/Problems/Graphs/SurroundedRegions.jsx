// src/pages/Problems/Graphs/SurroundedRegions.jsx
import React, { useState } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';

const SurroundedRegions = () => {
  const [board, setBoard] = useState([
    ['X', 'X', 'X', 'X'],
    ['X', 'O', 'O', 'X'],
    ['X', 'X', 'O', 'X'],
    ['X', 'O', 'X', 'X']
  ]);
  const [currentCell, setCurrentCell] = useState(null);
  const [visitedCells, setVisitedCells] = useState(new Set());
  const [borderConnected, setBorderConnected] = useState(new Set());
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState('javascript');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setCurrentCell(null);
    setVisitedCells(new Set());
    setBorderConnected(new Set());
  };

  const generateRandomBoard = () => {
    const rows = 6;
    const cols = 6;
    const newBoard = Array(rows).fill().map(() =>
      Array(cols).fill().map(() =>
        Math.random() > 0.7 ? 'O' : 'X'
      )
    );
    setBoard(newBoard);
    resetVisualization();
  };

  const dfs = async (row, col, visited, borderConnected) => {
    if (
      row < 0 || row >= board.length ||
      col < 0 || col >= board[0].length ||
      board[row][col] === 'X' ||
      visited.has(`${row},${col}`)
    ) {
      return false;
    }
  
    visited.add(`${row},${col}`);
    setVisitedCells(new Set(visited));
    setCurrentCell([row, col]);
  
    // Check if this is a border cell
    const isBorder = row === 0 || row === board.length - 1 || 
                    col === 0 || col === board[0].length - 1;
    
    if (isBorder) {
      borderConnected.add(`${row},${col}`);
    }
  
    await sleep(speed);
  
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let isConnectedToBorder = isBorder;
  
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      const result = await dfs(newRow, newCol, visited, borderConnected);
      isConnectedToBorder = isConnectedToBorder || result;
    }
  
    if (isConnectedToBorder) {
      borderConnected.add(`${row},${col}`);
    }
  
    setBorderConnected(new Set(borderConnected));
    return isConnectedToBorder;
  };
  
  const solveSurroundedRegions = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();
  
    const visited = new Set();
    const borderConnected = new Set();
  
    // First pass: mark all O's connected to border
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[0].length; col++) {
        if (board[row][col] === 'O' && !visited.has(`${row},${col}`)) {
          await dfs(row, col, visited, borderConnected);
        }
      }
    }
  
    // Second pass: flip non-border-connected O's to X's
    const tempBoard = board.map(row => [...row]);
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[0].length; col++) {
        if (tempBoard[row][col] === 'O' && !borderConnected.has(`${row},${col}`)) {
          tempBoard[row][col] = 'X';
          setBoard([...tempBoard]);
          await sleep(speed);
        }
      }
    }
  
    setCurrentCell(null);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function solve(board) {
  // Edge case - single cell board or empty board
  if (!board || !board.length) return;

  // Define board row and column variables.
  let m = board.length;
  let n = board[0].length;
  // Define directions to iterate through
  const directions = [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
  ];
  // Depth first search to pass through the board, marking surrounded "O"s
  const dfs = (row, col) => {
    if (row < 0 || row >= m || col < 0 || col >= n || board[row][col] !== 'O') {
      return;
    }
    // Mark the cell as visited
    board[row][col] = 'v';
    for (const [dx, dy] of directions) {
      dfs(row + dx, col + dy);
    }
  };
  // First pass - mark all surrounded "O"s
  // Iterate through the board, use dfs on border cells to find uncaptureable cells
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 || i === m - 1 || j === 0 || j === n - 1) {
        if (board[i][j] === 'O') {
          dfs(i, j);
        }
      }
    }
  }

  // Second pass: convert the remaining 'O's to 'X's and 'v' to 'O's
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 'O') {
        board[i][j] === 'X';
      } else if (board[i][j] === 'v') {
        board[i][j] = 'O';
      }
    }
  }
}`,
    python: `
def solve(self, board: List[List[str]]) -> None:
    if not board:
        return
        
    rows, cols = len(board), len(board[0])
    
    def dfs(row: int, col: int) -> None:
        if (row < 0 or row >= rows or 
            col < 0 or col >= cols or 
            board[row][col] != 'O'):
            return
        
        # Mark as visited
        board[row][col] = '#'
        
        # Check all 4 directions
        dfs(row + 1, col)
        dfs(row - 1, col)
        dfs(row, col + 1)
        dfs(row, col - 1)
    
    # Check borders
    for row in range(rows):
        dfs(row, 0)        # First column
        dfs(row, cols-1)   # Last column
    
    for col in range(cols):
        dfs(0, col)        # First row
        dfs(rows-1, col)   # Last row
    
    # Update board
    for row in range(rows):
        for col in range(cols):
            if board[row][col] == 'O':
                board[row][col] = 'X'    # Capture
            elif board[row][col] == '#':
                board[row][col] = 'O'    # Restore`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Surrounded Regions</h1>
        <div className="problem-meta">
          <span className="difficulty medium">Medium</span>
          <span className="category">Graph - DFS</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          Given an m x n matrix board containing 'X' and 'O', capture all regions 
          that are 4-directionally surrounded by 'X'. A region is captured by flipping 
          all 'O's into 'X's in that surrounded region.
        </p>
        <p>
          Note: Surrounded regions should not be on the border, which means that any 
          'O' on the border of the board are not flipped to 'X'.
        </p>
      </section>

      <section className="visualization">
        <div className="board-container">
          <div className="board">
            {board.map((row, rowIdx) => (
              <div key={rowIdx} className="board-row">
                {row.map((cell, colIdx) => (
                  <div 
                    key={`${rowIdx}-${colIdx}`}
                    className={`board-cell ${
                      currentCell && currentCell[0] === rowIdx && currentCell[1] === colIdx 
                        ? 'current' 
                        : borderConnected.has(`${rowIdx},${colIdx}`)
                        ? 'border-connected'
                        : visitedCells.has(`${rowIdx},${colIdx}`)
                        ? 'visited'
                        : ''
                    }`}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="controls">
          <div className="input-group">
            <label>Animation Speed (ms):</label>
            <input
              type="range"
              min="100"
              max="1000"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
          </div>
          <div className="button-group">
            <button onClick={generateRandomBoard} disabled={isRunning}>
              Generate Random Board
            </button>
            <button onClick={solveSurroundedRegions} disabled={isRunning}>
              Solve Board
            </button>
            <button onClick={resetVisualization} disabled={isRunning}>
              Reset
            </button>
          </div>
        </div>
      </section>

      <section className="approach">
        <h2>Approach</h2>
        <div className="approach-content">
          <h3>DFS Solution</h3>
          <ol>
            <li>Start from border 'O's and mark all connected 'O's</li>
            <li>These marked 'O's cannot be captured</li>
            <li>Convert remaining 'O's to 'X's</li>
            <li>Restore marked cells back to 'O's</li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(m × n) where m and n are the dimensions of the board</p>
          
          <h3>Space Complexity</h3>
          <p>O(m × n) for the recursion stack in worst case</p>
        </div>
      </section>

      <section className="implementation">
        <h2>Implementation</h2>
        <div className="language-selector">
          <button 
            onClick={() => setLanguage('javascript')}
            className={`lang-button ${language === 'javascript' ? 'active' : ''}`}
          >
            JavaScript
          </button>
          <button 
            onClick={() => setLanguage('python')}
            className={`lang-button ${language === 'python' ? 'active' : ''}`}
          >
            Python
          </button>
        </div>
        <CodeSnippet 
          language={language}
          code={implementations[language]}
        />
      </section>
    </div>
  );
};

export default SurroundedRegions;