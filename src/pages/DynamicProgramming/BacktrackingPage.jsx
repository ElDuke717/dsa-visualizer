// src/pages/DynamicProgramming/BacktrackingPage.jsx
import React, { useState } from "react";
import BacktrackingVisualizer from "../../components/DataStructureVisualizer/BacktrackingVisualizer";
import CodeSnippet from "../../components/CodeSnippet/CodeSnippet";
import "./DynamicProgramming.css";

const BacktrackingPage = () => {
  const [boardSize, setBoardSize] = useState(4);
  const [board, setBoard] = useState(
    Array(boardSize)
      .fill()
      .map(() => Array(boardSize).fill(0))
  );
  const [currentRow, setCurrentRow] = useState(null);
  const [currentCol, setCurrentCol] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [language, setLanguage] = useState("javascript");

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const resetBoard = () => {
    setBoard(
      Array(boardSize)
        .fill()
        .map(() => Array(boardSize).fill(0))
    );
    setCurrentRow(null);
    setCurrentCol(null);
  };

  const isSafe = (row, col) => {
    // Check row on left side
    for (let j = 0; j < col; j++) {
      if (board[row][j] === 1) return false;
    }

    // Check upper diagonal on left side
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 1) return false;
    }

    // Check lower diagonal on left side
    for (let i = row, j = col; i < boardSize && j >= 0; i++, j--) {
      if (board[i][j] === 1) return false;
    }

    return true;
  };

  const solveNQueens = async (col = 0) => {
    if (col >= boardSize) {
      return true;
    }

    for (let row = 0; row < boardSize; row++) {
      setCurrentRow(row);
      setCurrentCol(col);
      await sleep(speed);

      if (isSafe(row, col)) {
        // Place queen
        const newBoard = board.map((row) => [...row]);
        newBoard[row][col] = 1;
        setBoard(newBoard);
        await sleep(speed);

        if (await solveNQueens(col + 1)) {
          return true;
        }

        // If placing queen doesn't lead to solution, backtrack
        newBoard[row][col] = 0;
        setBoard(newBoard);
        await sleep(speed);
      }
    }

    return false;
  };

  const startSolving = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetBoard();
    await solveNQueens();
    setCurrentRow(null);
    setCurrentCol(null);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function solveNQueens(n) {
  const board = Array(n).fill().map(() => Array(n).fill(0));
  
  function isSafe(row, col) {
    // Check row on left side
    for (let j = 0; j < col; j++) {
      if (board[row][j] === 1) return false;
    }
    
    // Check upper diagonal
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 1) return false;
    }
    
    // Check lower diagonal
    for (let i = row, j = col; i < n && j >= 0; i++, j--) {
      if (board[i][j] === 1) return false;
    }
    
    return true;
  }
  
  function solveUtil(col) {
    if (col >= n) return true;
    
    for (let row = 0; row < n; row++) {
      if (isSafe(row, col)) {
        board[row][col] = 1;
        
        if (solveUtil(col + 1)) {
          return true;
        }
        
        // Backtrack
        board[row][col] = 0;
      }
    }
    
    return false;
  }
  
  if (solveUtil(0)) {
    return board;
  }
  return null;
}`,
    python: `
def solve_n_queens(n):
    board = [[0 for x in range(n)] for y in range(n)]
    
    def is_safe(row, col):
        # Check row on left side
        for j in range(col):
            if board[row][j] == 1:
                return False
        
        # Check upper diagonal
        for i, j in zip(range(row, -1, -1), 
                       range(col, -1, -1)):
            if board[i][j] == 1:
                return False
        
        # Check lower diagonal
        for i, j in zip(range(row, n, 1), 
                       range(col, -1, -1)):
            if board[i][j] == 1:
                return False
        
        return True
    
    def solve_util(col):
        if col >= n:
            return True
        
        for row in range(n):
            if is_safe(row, col):
                board[row][col] = 1
                
                if solve_util(col + 1):
                    return True
                    
                # Backtrack
                board[row][col] = 0
        
        return False
    
    if solve_util(0):
        return board
    return None`,
  };

  return (
    <div className="page-container">
      <h1>Backtracking Pattern</h1>
      <h2>N-Queens Problem</h2>
    <p>
      The N-Queens problem involves placing <strong>N</strong> queens on an <strong>N x N</strong> chessboard
      such that no two queens threaten each other. This means:
    </p>
    <ul>
      <li>No two queens can be in the same row.</li>
      <li>No two queens can be in the same column.</li>
      <li>No two queens can be on the same diagonal.</li>
    </ul>
    <h3>Objective:</h3>
    <p>
      Find all possible arrangements of the queens on the chessboard or determine if at least one solution
      exists for a given <strong>N</strong>.
    </p>
    <h3>Example:</h3>
    <pre>
      {`
        For N = 4, one possible solution is:
        . Q . .
        . . . Q
        Q . . .
        . . Q .
      `}
    </pre>
      <section className="visualization">
        <BacktrackingVisualizer
          board={board}
          currentRow={currentRow}
          currentCol={currentCol}
          size={boardSize}
        />
        <div className="controls">
          <div className="input-group">
            <label>Board Size:</label>
            <input
              type="number"
              min="4"
              max="8"
              value={boardSize}
              onChange={(e) => {
                const size = Number(e.target.value);
                setBoardSize(size);
                resetBoard();
              }}
              disabled={isRunning}
            />
          </div>
          <div className="input-group">
            <label>Animation Speed (ms):</label>
            <input
              type="range"
              min="100"
              max="2000"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              disabled={isRunning}
            />
          </div>
          <div className="button-group">
            <button onClick={startSolving} disabled={isRunning}>
              Solve N-Queens
            </button>
            <button onClick={resetBoard} disabled={isRunning}>
              Reset
            </button>
          </div>
        </div>
      </section>

      <section className="explanation">
        <h2>Backtracking Pattern</h2>
        <p>
          Backtracking is an algorithmic technique that considers searching
          every possible combination in order to solve a computational problem.
          It builds candidates to the solution incrementally and abandons each
          partial candidate ("backtracks") if it determines that the candidate
          cannot possibly be completed to a valid solution.
        </p>

        <div className="features">
          <h3>When to use Backtracking:</h3>
          <ul>
            <li>Finding all (or some) solutions to a computational problem</li>
            <li>Problems with constraints</li>
            <li>Optimization problems</li>
            <li>Decision problems</li>
          </ul>

          <h3>Common Problems:</h3>
          <ul>
            <li>N-Queens Problem</li>
            <li>Sudoku Solver</li>
            <li>Combination Sum</li>
            <li>Permutations</li>
            <li>Subset Sum</li>
          </ul>

          <h3>Key Concepts:</h3>
          <ul>
            <li>Choice: Deciding which option to explore</li>
            <li>Constraints: Rules that limit the choices</li>
            <li>Goal: The condition for a valid solution</li>
            <li>State Space Tree: Tree of possible states</li>
          </ul>

          <h3>Time Complexity:</h3>
          <ul>
            <li>Usually exponential O(b^d)</li>
            <li>b: branching factor (choices)</li>
            <li>d: maximum depth of tree</li>
          </ul>

          <h3>Implementation Steps:</h3>
          <ul>
            <li>1. Choose: Make a choice from available options</li>
            <li>2. Constraint: Check if the choice is valid</li>
            <li>3. Goal: Check if we've reached a solution</li>
            <li>4. Backtrack: Undo the choice if needed</li>
          </ul>
        </div>
      </section>

      <section className="implementation">
        <div className="language-selector">
          <button
            onClick={() => setLanguage("javascript")}
            className={`lang-button ${
              language === "javascript" ? "active" : ""
            }`}
          >
            JavaScript
          </button>
          <button
            onClick={() => setLanguage("python")}
            className={`lang-button ${language === "python" ? "active" : ""}`}
          >
            Python
          </button>
        </div>
        <CodeSnippet language={language} code={implementations[language]} />
      </section>
    </div>
  );
};

export default BacktrackingPage;
