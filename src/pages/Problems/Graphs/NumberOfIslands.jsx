// src/pages/Problems/Graphs/NumberOfIslands.jsx
import React, { useState } from 'react';
import GridVisualizer from '../../../components/ProblemVisualizers/GridVisualizer';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';

const NumberOfIslands = () => {
  const [grid, setGrid] = useState([
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1']
  ]);
  const [visitedCells, setVisitedCells] = useState(new Set());
  const [currentCell, setCurrentCell] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState('javascript');
  const [islandCount, setIslandCount] = useState(0);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setVisitedCells(new Set());
    setCurrentCell(null);
    setIslandCount(0);
  };

  const generateRandomGrid = () => {
    const rows = 4;
    const cols = 5;
    const newGrid = Array(rows).fill().map(() =>
      Array(cols).fill().map(() =>
        Math.random() > 0.7 ? '1' : '0'
      )
    );
    setGrid(newGrid);
    resetVisualization();
  };

  const bfs = async (row, col, visited) => {
    const queue = [[row, col]];
    visited.add(`${row},${col}`);
    setVisitedCells(new Set(visited));

    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    while (queue.length > 0) {
      const [r, c] = queue.shift();
      setCurrentCell([r, c]);
      await sleep(speed);

      for (const [dr, dc] of directions) {
        const newRow = r + dr;
        const newCol = c + dc;
        const key = `${newRow},${newCol}`;

        if (
          newRow >= 0 && newRow < grid.length &&
          newCol >= 0 && newCol < grid[0].length &&
          grid[newRow][newCol] === '1' &&
          !visited.has(key)
        ) {
          queue.push([newRow, newCol]);
          visited.add(key);
          setVisitedCells(new Set(visited));
        }
      }
    }
  };

  const findIslands = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    const visited = new Set();
    let count = 0;

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (grid[row][col] === '1' && !visited.has(`${row},${col}`)) {
          await bfs(row, col, visited);
          count++;
          setIslandCount(count);
          await sleep(speed);
        }
      }
    }

    setCurrentCell(null);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  
  const rows = grid.length;
  const cols = grid[0].length;
  let islands = 0;
  
  function bfs(row, col) {
    const queue = [[row, col]];
    grid[row][col] = '0'; // mark as visited
    
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    while (queue.length > 0) {
      const [r, c] = queue.shift();
      
      for (const [dr, dc] of directions) {
        const newRow = r + dr;
        const newCol = c + dc;
        
        if (
          newRow >= 0 && newRow < rows &&
          newCol >= 0 && newCol < cols &&
          grid[newRow][newCol] === '1'
        ) {
          queue.push([newRow, newCol]);
          grid[newRow][newCol] = '0'; // mark as visited
        }
      }
    }
  }
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === '1') {
        islands++;
        bfs(row, col);
      }
    }
  }
  
  return islands;
}`,
    python: `
def numIslands(grid):
    if not grid:
        return 0
        
    rows, cols = len(grid), len(grid[0])
    islands = 0
    
    def bfs(row, col):
        queue = [(row, col)]
        grid[row][col] = '0'  # mark as visited
        
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        
        while queue:
            r, c = queue.pop(0)
            
            for dr, dc in directions:
                new_row = r + dr
                new_col = c + dc
                
                if (0 <= new_row < rows and 
                    0 <= new_col < cols and 
                    grid[new_row][new_col] == '1'):
                    queue.append((new_row, new_col))
                    grid[new_row][new_col] = '0'
    
    for row in range(rows):
        for col in range(cols):
            if grid[row][col] == '1':
                islands += 1
                bfs(row, col)
    
    return islands`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Number of Islands</h1>
        <div className="problem-meta">
          <span className="difficulty medium">Medium</span>
          <span className="category">Graph - BFS</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), 
          return the number of islands.
        </p>
        <p>
          An island is surrounded by water and is formed by connecting adjacent lands horizontally 
          or vertically. You may assume all four edges of the grid are all surrounded by water.
        </p>
      </section>

      <section className="visualization">
        <GridVisualizer
          grid={grid}
          visitedCells={visitedCells}
          currentCell={currentCell}
        />
        <div className="controls">
          <div className="input-group">
            <label>Animation Speed (ms):</label>
            <input
              type="range"
              min="100"
              max="1000"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              disabled={isRunning}
            />
          </div>
          <div className="button-group">
            <button
              onClick={generateRandomGrid}
              disabled={isRunning}
            >
              Generate Random Grid
            </button>
            <button
              onClick={findIslands}
              disabled={isRunning}
            >
              Find Islands
            </button>
            <button
              onClick={resetVisualization}
              disabled={isRunning}
            >
              Reset
            </button>
          </div>
          <div className="stats">
            Islands found: {islandCount}
          </div>
        </div>
      </section>

      <section className="approach">
        <h2>Approach</h2>
        <div className="approach-content">
          <h3>BFS Solution</h3>
          <ol>
            <li>Iterate through each cell in the grid</li>
            <li>When we find a '1' (land):
              <ul>
                <li>Increment island count</li>
                <li>Use BFS to explore all connected land cells</li>
                <li>Mark visited cells to avoid counting them again</li>
              </ul>
            </li>
            <li>Continue until all cells have been checked</li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(m × n) where m is the number of rows and n is the number of columns</p>
          
          <h3>Space Complexity</h3>
          <p>O(min(m, n)) for the queue in BFS</p>
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

export default NumberOfIslands;