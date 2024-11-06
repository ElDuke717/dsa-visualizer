// src/pages/Problems/Graphs/MaxAreaIsland.jsx
import React, { useState } from 'react';
import GridVisualizer from '../../../components/ProblemVisualizers/GridVisualizer';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';

const MaxAreaIsland = () => {
  const [grid, setGrid] = useState([
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
  ]);
  const [visitedCells, setVisitedCells] = useState(new Set());
  const [currentCell, setCurrentCell] = useState(null);
  const [currentIslandCells, setCurrentIslandCells] = useState(new Set());
  const [maxArea, setMaxArea] = useState(0);
  const [currentArea, setCurrentArea] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [language, setLanguage] = useState('javascript');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setVisitedCells(new Set());
    setCurrentIslandCells(new Set());
    setCurrentCell(null);
    setMaxArea(0);
    setCurrentArea(0);
  };

  const generateRandomGrid = () => {
    const rows = 8;
    const cols = 13;
    const newGrid = Array(rows).fill().map(() =>
      Array(cols).fill().map(() =>
        Math.random() > 0.7 ? 1 : 0
      )
    );
    setGrid(newGrid);
    resetVisualization();
  };

  const dfs = async (row, col, visited) => {
    if (
      row < 0 || row >= grid.length ||
      col < 0 || col >= grid[0].length ||
      grid[row][col] === 0 ||
      visited.has(`${row},${col}`)
    ) {
      return 0;
    }

    visited.add(`${row},${col}`);
    setVisitedCells(new Set(visited));
    setCurrentCell([row, col]);
    currentIslandCells.add(`${row},${col}`);
    setCurrentIslandCells(new Set(currentIslandCells));
    await sleep(speed);

    let area = 1;
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    for (const [dr, dc] of directions) {
      area += await dfs(row + dr, col + dc, visited);
    }

    return area;
  };

  const findMaxArea = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    const visited = new Set();
    let maxAreaFound = 0;

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (grid[row][col] === 1 && !visited.has(`${row},${col}`)) {
          setCurrentIslandCells(new Set());
          const area = await dfs(row, col, visited);
          setCurrentArea(area);
          maxAreaFound = Math.max(maxAreaFound, area);
          setMaxArea(maxAreaFound);
          await sleep(speed * 2);
        }
      }
    }

    setCurrentCell(null);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function maxAreaOfIsland(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let maxArea = 0;
  
  function dfs(row, col) {
    if (
      row < 0 || row >= rows ||
      col < 0 || col >= cols ||
      grid[row][col] === 0
    ) {
      return 0;
    }
    
    // Mark as visited
    grid[row][col] = 0;
    
    // Calculate area including adjacent cells
    return 1 + 
      dfs(row - 1, col) +
      dfs(row + 1, col) +
      dfs(row, col - 1) +
      dfs(row, col + 1);
  }
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 1) {
        maxArea = Math.max(maxArea, dfs(row, col));
      }
    }
  }
  
  return maxArea;
}`,
    python: `
def maxAreaOfIsland(grid):
    rows, cols = len(grid), len(grid[0])
    max_area = 0
    
    def dfs(row, col):
        if (row < 0 or row >= rows or
            col < 0 or col >= cols or
            grid[row][col] == 0):
            return 0
        
        # Mark as visited
        grid[row][col] = 0
        
        # Calculate area including adjacent cells
        return 1 + (
            dfs(row - 1, col) +
            dfs(row + 1, col) +
            dfs(row, col - 1) +
            dfs(row, col + 1)
        )
    
    for row in range(rows):
        for col in range(cols):
            if grid[row][col] == 1:
                max_area = max(max_area, dfs(row, col))
    
    return max_area`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Max Area of Island</h1>
        <div className="problem-meta">
          <span className="difficulty medium">Medium</span>
          <span className="category">Graph - DFS</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          You are given an m x n binary matrix grid. An island is a group of 1's 
          (representing land) connected 4-directionally (horizontal or vertical). 
          You may assume all four edges of the grid are surrounded by water.
        </p>
        <p>
          The area of an island is the number of cells with a value 1 in the island.
          Return the maximum area of an island in grid. If there is no island, return 0.
        </p>
      </section>

      <section className="examples">
        <h2>Examples</h2>
        <pre>
          {`Input: grid = [
  [0,0,1,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,1,1,0,1,0,0,0,0,0,0,0,0],
  [0,1,0,0,1,1,0,0,1,0,1,0,0],
  [0,1,0,0,1,1,0,0,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,1,1,0,0,0,0]
]
Output: 6
Explanation: The answer is not 11, because the island must be connected 4-directionally.`}
        </pre>
      </section>

      <section className="visualization">
        <div className="stats">
          <div>Current Island Area: {currentArea}</div>
          <div>Max Island Area: {maxArea}</div>
        </div>
        <GridVisualizer
          grid={grid}
          visitedCells={visitedCells}
          currentCell={currentCell}
          highlightedCells={currentIslandCells}
        />
        <div className="controls">
          <div className="input-group">
            <label>Animation Speed (ms):</label>
            <input
              type="range"
              min="50"
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
              onClick={findMaxArea}
              disabled={isRunning}
            >
              Find Max Area
            </button>
            <button
              onClick={resetVisualization}
              disabled={isRunning}
            >
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
            <li>Iterate through each cell in the grid</li>
            <li>When we find a '1' (land):
              <ul>
                <li>Use DFS to explore all connected land cells</li>
                <li>Count cells in current island</li>
                <li>Keep track of maximum area found</li>
                <li>Mark visited cells to avoid counting them again</li>
              </ul>
            </li>
            <li>Return the maximum area found</li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(m × n) where m is the number of rows and n is the number of columns</p>
          
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

export default MaxAreaIsland;