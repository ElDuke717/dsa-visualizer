// src/pages/Problems/Graphs/OpenTheLock.jsx
import React, { useState } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';

const OpenTheLock = () => {
  const [target, setTarget] = useState('0202');
  const [deadends, setDeadends] = useState(['0201', '0101', '0102', '1212', '2002']);
  const [currentState, setCurrentState] = useState('0000');
  const [visitedStates, setVisitedStates] = useState(new Set());
  const [path, setPath] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [language, setLanguage] = useState('javascript');
  const [steps, setSteps] = useState(0);
  const [result, setResult] = useState(null);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setCurrentState('0000');
    setVisitedStates(new Set());
    setPath([]);
    setSteps(0);
    setResult(null);
  };

  const generateRandomProblem = () => {
    // Generate random target
    let newTarget = '';
    for (let i = 0; i < 4; i++) {
      newTarget += Math.floor(Math.random() * 10);
    }
    
    // Generate random deadends (3-5 of them)
    const numDeadends = Math.floor(Math.random() * 3) + 3;
    const newDeadends = new Set();
    
    while (newDeadends.size < numDeadends) {
      let deadend = '';
      for (let i = 0; i < 4; i++) {
        deadend += Math.floor(Math.random() * 10);
      }
      if (deadend !== '0000' && deadend !== newTarget) {
        newDeadends.add(deadend);
      }
    }
    
    setTarget(newTarget);
    setDeadends(Array.from(newDeadends));
    resetVisualization();
  };

  const getNeighbors = (code) => {
    const neighbors = [];
    
    for (let i = 0; i < 4; i++) {
      const digit = parseInt(code[i]);
      
      // Turn digit up
      const up = (digit === 9) ? 0 : digit + 1;
      const upCode = code.substring(0, i) + up + code.substring(i + 1);
      neighbors.push(upCode);
      
      // Turn digit down
      const down = (digit === 0) ? 9 : digit - 1;
      const downCode = code.substring(0, i) + down + code.substring(i + 1);
      neighbors.push(downCode);
    }
    
    return neighbors;
  };

  const solveLock = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();
    
    const deadendSet = new Set(deadends);
    if (deadendSet.has('0000')) {
      setResult(-1);
      setIsRunning(false);
      return;
    }
    
    if (currentState === target) {
      setResult(0);
      setIsRunning(false);
      return;
    }
    
    const queue = [['0000', 0, ['0000']]]; // [code, steps, path]
    const visited = new Set(['0000']);
    setVisitedStates(new Set(visited));
    
    while (queue.length > 0) {
      const [code, moves, currentPath] = queue.shift();
      
      setCurrentState(code);
      setPath([...currentPath]);
      setSteps(moves);
      await sleep(speed);
      
      if (code === target) {
        setResult(moves);
        setIsRunning(false);
        return;
      }
      
      for (const neighbor of getNeighbors(code)) {
        if (!visited.has(neighbor) && !deadendSet.has(neighbor)) {
          visited.add(neighbor);
          setVisitedStates(new Set(visited));
          queue.push([neighbor, moves + 1, [...currentPath, neighbor]]);
        }
      }
    }
    
    setResult(-1);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function openLock(deadends, target) {
  const deadendSet = new Set(deadends);
  if (deadendSet.has('0000')) return -1;
  if (target === '0000') return 0;
  
  const queue = [['0000', 0]]; // [code, steps]
  const visited = new Set(['0000']);
  
  while (queue.length > 0) {
    const [code, moves] = queue.shift();
    
    if (code === target) return moves;
    
    // Generate all possible next states
    for (let i = 0; i < 4; i++) {
      const digit = parseInt(code[i]);
      
      // Turn digit up
      const up = (digit === 9) ? 0 : digit + 1;
      const upCode = code.substring(0, i) + up + code.substring(i + 1);
      
      // Turn digit down
      const down = (digit === 0) ? 9 : digit - 1;
      const downCode = code.substring(0, i) + down + code.substring(i + 1);
      
      // Check and add neighbors
      for (const neighbor of [upCode, downCode]) {
        if (!visited.has(neighbor) && !deadendSet.has(neighbor)) {
          visited.add(neighbor);
          queue.push([neighbor, moves + 1]);
        }
      }
    }
  }
  
  return -1; // If we can't reach the target
}`,
    python: `
def openLock(deadends, target):
    deadends = set(deadends)
    if '0000' in deadends:
        return -1
    if target == '0000':
        return 0
    
    queue = [('0000', 0)]  # (code, steps)
    visited = {'0000'}
    
    while queue:
        code, moves = queue.pop(0)
        
        if code == target:
            return moves
        
        # Generate all possible next states
        for i in range(4):
            digit = int(code[i])
            
            # Turn digit up
            up = 0 if digit == 9 else digit + 1
            up_code = code[:i] + str(up) + code[i+1:]
            
            # Turn digit down
            down = 9 if digit == 0 else digit - 1
            down_code = code[:i] + str(down) + code[i+1:]
            
            # Check and add neighbors
            for neighbor in [up_code, down_code]:
                if neighbor not in visited and neighbor not in deadends:
                    visited.add(neighbor)
                    queue.append((neighbor, moves + 1))
    
    return -1  # If we can't reach the target`
  };

  // Helper function to render a wheel
  const renderWheel = (position, value) => {
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const wheelRadius = 40;
    const digitRadius = 15;
    
    return (
      <g transform={`translate(${100 + position * 120}, 100)`}>
        {/* Wheel background */}
        <circle cx="0" cy="0" r={wheelRadius} fill="#f0f0f0" stroke="#333" strokeWidth="2" />
        
        {/* Digits around the wheel */}
        {digits.map((digit, i) => {
          const angle = (i * 36 - 90) * (Math.PI / 180);
          const x = Math.cos(angle) * wheelRadius;
          const y = Math.sin(angle) * wheelRadius;
          
          return (
            <g key={i} transform={`translate(${x}, ${y})`}>
              <circle 
                r={digitRadius} 
                fill={digit === parseInt(value) ? "#2196F3" : "#fff"}
                stroke="#333"
                strokeWidth="1"
              />
              <text 
                textAnchor="middle" 
                dominantBaseline="middle"
                fill={digit === parseInt(value) ? "#fff" : "#000"}
                fontSize="14"
              >
                {digit}
              </text>
            </g>
          );
        })}
        
        {/* Current value in the center */}
        <text 
          textAnchor="middle" 
          dominantBaseline="middle"
          fontSize="24"
          fontWeight="bold"
        >
          {value}
        </text>
      </g>
    );
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Open The Lock</h1>
        <div className="problem-meta">
          <span className="difficulty medium">Medium</span>
          <span className="category">Graph - BFS</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          You have a lock with 4 circular wheels. Each wheel has 10 slots: '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'.
          The wheels can rotate freely and wrap around: for example we can turn '9' to be '0', or '0' to be '9'.
          Each move consists of turning one wheel one slot.
        </p>
        <p>
          The lock initially starts at '0000', a string representing the state of the 4 wheels.
        </p>
        <p>
          You are given a list of deadends, meaning if the lock displays any of these codes, the wheels of the lock will stop turning and you will be unable to open it.
        </p>
        <p>
          Given a target representing the value of the wheels that will unlock the lock, return the minimum total number of turns required to open the lock, or -1 if it is impossible.
        </p>
      </section>

      <section className="examples">
        <h2>Examples</h2>
        <div className="example">
          <p><strong>Input:</strong> deadends = ["0201","0101","0102","1212","2002"], target = "0202"</p>
          <p><strong>Output:</strong> 6</p>
          <p><strong>Explanation:</strong> A sequence of valid moves would be "0000" → "1000" → "1100" → "1200" → "1201" → "1202" → "0202".</p>
        </div>
      </section>

      <section className="visualization">
        <div className="lock-visualization">
          <svg width="600" height="300" viewBox="0 0 600 300">
            {/* Render the 4 wheels */}
            {currentState.split('').map((digit, i) => renderWheel(i, digit))}
            
            {/* Display target */}
            <text x="300" y="220" textAnchor="middle" fontSize="16">
              Target: {target}
            </text>
            
            {/* Display deadends */}
            <text x="300" y="250" textAnchor="middle" fontSize="16">
              Deadends: {deadends.join(', ')}
            </text>
            
            {/* Display current path */}
            <text x="300" y="280" textAnchor="middle" fontSize="16">
              Path: {path.join(' → ')}
            </text>
          </svg>
        </div>

        <div className="controls">
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
            <button
              onClick={generateRandomProblem}
              disabled={isRunning}
            >
              Generate Random Problem
            </button>
            <button
              onClick={solveLock}
              disabled={isRunning}
            >
              Solve Lock
            </button>
            <button
              onClick={resetVisualization}
              disabled={isRunning}
            >
              Reset
            </button>
          </div>
          <div className="stats">
            {result !== null && (
              <div className="result">
                {result === -1 ? (
                  <span className="failure">Impossible to open the lock!</span>
                ) : (
                  <span className="success">Lock opened in {result} moves!</span>
                )}
              </div>
            )}
            <div>Steps: {steps}</div>
            <div>Visited States: {visitedStates.size}</div>
          </div>
        </div>
      </section>

      <section className="approach">
        <h2>Approach</h2>
        <div className="approach-content">
          <h3>BFS Solution</h3>
          <ol>
            <li>Start with the initial state "0000"</li>
            <li>Use BFS to explore all possible combinations by turning one wheel at a time</li>
            <li>Keep track of visited states to avoid cycles</li>
            <li>Skip any deadend combinations</li>
            <li>Return the minimum number of moves when we reach the target</li>
            <li>Return -1 if we can't reach the target</li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(N * A^N * D) where:</p>
          <ul>
            <li>N = 4 (number of wheels)</li>
            <li>A = 10 (number of digits 0-9)</li>
            <li>D is the size of deadends</li>
          </ul>
          <p>In the worst case, we might need to check all 10^4 = 10,000 possible combinations.</p>
          
          <h3>Space Complexity</h3>
          <p>O(A^N + D) for the queue and visited set</p>
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

export default OpenTheLock;
