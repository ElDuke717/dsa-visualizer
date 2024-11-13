// src/pages/Problems/Graphs/EmployeeImportance.jsx
import React, { useState } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';

const EmployeeImportance = () => {
  const [employees, setEmployees] = useState([
    { id: 1, importance: 5, subordinates: [2, 3] },
    { id: 2, importance: 3, subordinates: [] },
    { id: 3, importance: 3, subordinates: [] },
  ]);
  const [targetId, setTargetId] = useState(1);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [visited, setVisited] = useState(new Set());
  const [queue, setQueue] = useState([]);
  const [totalImportance, setTotalImportance] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [language, setLanguage] = useState('javascript');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setCurrentEmployee(null);
    setVisited(new Set());
    setQueue([]);
    setTotalImportance(0);
  };

  const getEmployeeById = (id) => {
    return employees.find(emp => emp.id === id);
  };

  const calculateImportance = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    let total = 0;
    const queue = [targetId];
    setQueue([...queue]);
    
    const visitedSet = new Set();

    while (queue.length > 0) {
      const currentId = queue.shift();
      setQueue([...queue]);
      
      if (visitedSet.has(currentId)) continue;
      
      const employee = getEmployeeById(currentId);
      if (!employee) continue;

      setCurrentEmployee(employee);
      visitedSet.add(currentId);
      setVisited(new Set(visitedSet));
      
      total += employee.importance;
      setTotalImportance(total);
      
      queue.push(...employee.subordinates);
      setQueue([...queue]);
      
      await sleep(speed);
    }

    setCurrentEmployee(null);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function getImportance(employees, id) {
    // Create employee map for O(1) lookup
    const empMap = new Map(
        employees.map(emp => [emp.id, emp])
    );
    
    let total = 0;
    const queue = [id];
    
    while (queue.length > 0) {
        const currId = queue.shift();
        const employee = empMap.get(currId);
        
        if (!employee) continue;
        
        total += employee.importance;
        queue.push(...employee.subordinates);
    }
    
    return total;
}`,
    python: `
def getImportance(employees: List['Employee'], id: int) -> int:
    # Create employee map for O(1) lookup
    emp_map = {emp.id: emp for emp in employees}
    
    total = 0
    queue = collections.deque([id])
    
    while queue:
        curr_id = queue.popleft()
        employee = emp_map.get(curr_id)
        
        if not employee:
            continue
            
        total += employee.importance
        queue.extend(employee.subordinates)
    
    return total`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Employee Importance</h1>
        <div className="problem-meta">
          <span className="difficulty medium">Medium</span>
          <span className="category">Graph - BFS</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          You have a data structure of employee information, including the employee's unique ID, 
          importance value, and direct subordinates' IDs. You are given an array of employees where:
        </p>
        <ul>
          <li>employees[i].id is the ID of the i-th employee</li>
          <li>employees[i].importance is the importance value of the i-th employee</li>
          <li>employees[i].subordinates is a list of the IDs of the direct subordinates</li>
        </ul>
        <p>
          Given an employee ID, return the total importance value of this employee and all their subordinates.
        </p>
      </section>

      <section className="visualization">
        <div className="employee-tree">
          {employees.map(emp => (
            <div 
              key={emp.id}
              className={`employee-node ${
                emp === currentEmployee ? 'current' :
                visited.has(emp.id) ? 'visited' :
                queue.includes(emp.id) ? 'queued' : ''
              }`}
            >
              <div className="employee-info">
                <div className="employee-id">ID: {emp.id}</div>
                <div className="employee-importance">Value: {emp.importance}</div>
              </div>
              {emp.subordinates.length > 0 && (
                <div className="subordinates">
                  Subordinates: [{emp.subordinates.join(', ')}]
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bfs-info">
          <div className="queue-display">
            Queue: [{queue.join(', ')}]
          </div>
          <div className="total-importance">
            Total Importance: {totalImportance}
          </div>
        </div>

        <div className="controls">
          <div className="input-group">
            <label>Target Employee ID:</label>
            <input
              type="number"
              value={targetId}
              onChange={(e) => setTargetId(Number(e.target.value))}
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
            />
          </div>
          <div className="button-group">
            <button onClick={calculateImportance} disabled={isRunning}>
              Calculate Importance
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
          <h3>BFS Solution</h3>
          <ol>
            <li>Create a map of employees for O(1) lookup</li>
            <li>Use a queue to process employees level by level</li>
            <li>For each employee:
              <ul>
                <li>Add their importance to total</li>
                <li>Add all subordinates to queue</li>
              </ul>
            </li>
            <li>Continue until queue is empty</li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(N) where N is the total number of employees in the tree</p>
          
          <h3>Space Complexity</h3>
          <p>O(W) where W is the maximum width of the tree</p>
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

export default EmployeeImportance;