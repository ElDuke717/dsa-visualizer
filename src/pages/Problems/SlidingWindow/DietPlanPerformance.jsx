import React, { useState } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';

const DietPlanPerformance = () => {
  const [calories, setCalories] = useState("1,2,3,4,5");
  const [k, setK] = useState(2);
  const [lower, setLower] = useState(3);
  const [upper, setUpper] = useState(8);
  const [currentWindow, setCurrentWindow] = useState([]);
  const [currentSum, setCurrentSum] = useState(0);
  const [points, setPoints] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState('javascript');
  const [windowResults, setWindowResults] = useState([]);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setCurrentWindow([]);
    setCurrentSum(0);
    setPoints(0);
    setCurrentIndex(-1);
    setWindowResults([]);
  };

  const parseCalories = () => {
    return calories.split(',').map(cal => parseInt(cal.trim())).filter(cal => !isNaN(cal));
  };

  const evaluateDietPlan = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();
    
    const caloriesArray = parseCalories();
    let totalPoints = 0;
    let windowSum = 0;
    const results = [];
    
    // Calculate sum for the first window
    for (let i = 0; i < Math.min(k, caloriesArray.length); i++) {
      setCurrentIndex(i);
      windowSum += caloriesArray[i];
      const currentCals = caloriesArray.slice(0, i + 1);
      setCurrentWindow(currentCals);
      setCurrentSum(windowSum);
      
      await sleep(speed);
    }
    
    // Evaluate the first window
    let pointChange = 0;
    if (windowSum < lower) {
      pointChange = -1;
    } else if (windowSum > upper) {
      pointChange = 1;
    }
    
    totalPoints += pointChange;
    setPoints(totalPoints);
    
    results.push({
      window: caloriesArray.slice(0, k),
      sum: windowSum,
      pointChange,
      totalPoints
    });
    setWindowResults([...results]);
    
    // Slide the window
    for (let i = k; i < caloriesArray.length; i++) {
      setCurrentIndex(i);
      
      // Remove the leftmost element from the sum
      windowSum -= caloriesArray[i - k];
      
      // Add the rightmost element to the sum
      windowSum += caloriesArray[i];
      
      const currentCals = caloriesArray.slice(i - k + 1, i + 1);
      setCurrentWindow(currentCals);
      setCurrentSum(windowSum);
      
      // Evaluate the current window
      pointChange = 0;
      if (windowSum < lower) {
        pointChange = -1;
      } else if (windowSum > upper) {
        pointChange = 1;
      }
      
      totalPoints += pointChange;
      setPoints(totalPoints);
      
      results.push({
        window: [...currentCals],
        sum: windowSum,
        pointChange,
        totalPoints
      });
      setWindowResults([...results]);
      
      await sleep(speed);
    }
    
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
/**
 * @param {number[]} calories
 * @param {number} k
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
function dietPlanPerformance(calories, k, lower, upper) {
    let points = 0;
    let windowSum = 0;
    
    // Calculate sum for the first window
    for (let i = 0; i < k; i++) {
        windowSum += calories[i];
    }
    
    // Evaluate the first window
    if (windowSum < lower) {
        points -= 1;
    } else if (windowSum > upper) {
        points += 1;
    }
    
    // Slide the window
    for (let i = k; i < calories.length; i++) {
        // Remove the leftmost element from the sum
        windowSum -= calories[i - k];
        
        // Add the rightmost element to the sum
        windowSum += calories[i];
        
        // Evaluate the current window
        if (windowSum < lower) {
            points -= 1;
        } else if (windowSum > upper) {
            points += 1;
        }
    }
    
    return points;
}`,
    python: `
def dietPlanPerformance(calories, k, lower, upper):
    points = 0
    window_sum = 0
    
    # Calculate sum for the first window
    for i in range(k):
        window_sum += calories[i]
    
    # Evaluate the first window
    if window_sum < lower:
        points -= 1
    elif window_sum > upper:
        points += 1
    
    # Slide the window
    for i in range(k, len(calories)):
        # Remove the leftmost element from the sum
        window_sum -= calories[i - k]
        
        # Add the rightmost element to the sum
        window_sum += calories[i]
        
        # Evaluate the current window
        if window_sum < lower:
            points -= 1
        elif window_sum > upper:
            points += 1
    
    return points`,
    java: `
class Solution {
    public int dietPlanPerformance(int[] calories, int k, int lower, int upper) {
        int points = 0;
        int windowSum = 0;
        
        // Calculate sum for the first window
        for (int i = 0; i < k; i++) {
            windowSum += calories[i];
        }
        
        // Evaluate the first window
        if (windowSum < lower) {
            points -= 1;
        } else if (windowSum > upper) {
            points += 1;
        }
        
        // Slide the window
        for (int i = k; i < calories.length; i++) {
            // Remove the leftmost element from the sum
            windowSum -= calories[i - k];
            
            // Add the rightmost element to the sum
            windowSum += calories[i];
            
            // Evaluate the current window
            if (windowSum < lower) {
                points -= 1;
            } else if (windowSum > upper) {
                points += 1;
            }
        }
        
        return points;
    }
}`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Diet Plan Performance</h1>
        <div className="problem-meta">
          <span className="difficulty easy">Easy</span>
          <span className="category">Sliding Window</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          A dieter consumes calories[i] calories on the i-th day. 
        </p>
        <p>
          Given an integer k, for every consecutive sequence of k days (calories[i], calories[i+1], ..., calories[i+k-1] for all 0 ≤ i ≤ n-k), they look at T, the total calories consumed during that sequence of k days (calories[i] + calories[i+1] + ... + calories[i+k-1]):
        </p>
        <ul>
          <li>If T &lt; lower, they performed poorly on their diet and lose 1 point;</li>
          <li>If T &gt; upper, they performed well on their diet and gain 1 point;</li>
          <li>Otherwise, they performed normally and there is no change in points.</li>
        </ul>
        <p>
          Return the total number of points the dieter has after all calories[i] are consumed.
        </p>
      </section>

      <section className="examples">
        <h2>Examples</h2>
        <pre>
          {`Example 1:
Input: calories = [1,2,3,4,5], k = 1, lower = 3, upper = 3
Output: 0
Explanation: calories[0] = 1, calories[1] = 2, calories[2] = 3, calories[3] = 4, calories[4] = 5
T = 1, points = -1
T = 2, points = -1
T = 3, points = 0
T = 4, points = 1
T = 5, points = 1
Total points = -1 - 1 + 0 + 1 + 1 = 0

Example 2:
Input: calories = [3,2], k = 2, lower = 0, upper = 1
Output: 1
Explanation: calories[0] + calories[1] = 3 + 2 = 5, T = 5
Since T > upper, points = 1
Total points = 1`}
        </pre>
      </section>

      <section className="visualization">
        <div className="string-visualizer">
          {parseCalories().map((cal, idx) => (
            <span 
              key={idx}
              className={`char ${
                idx === currentIndex ? 'current' :
                currentWindow.includes(cal) ? 'in-window' : ''
              }`}
            >
              {cal}
            </span>
          ))}
        </div>
        
        <div className="window-display">
          <div>Current Window: {currentWindow.join(', ')} (Sum: {currentSum})</div>
          <div>Total Points: {points}</div>
        </div>

        <div className="window-results">
          <h3>Window Evaluations</h3>
          <div className="results-container">
            {windowResults.map((result, idx) => (
              <div key={idx} className="result-item">
                <div>Window {idx + 1}: [{result.window.join(', ')}]</div>
                <div>Sum: {result.sum}</div>
                <div>Points: {result.pointChange > 0 ? '+' + result.pointChange : result.pointChange}</div>
                <div>Total: {result.totalPoints}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="controls">
          <div className="input-group">
            <label>Calories (comma-separated):</label>
            <input
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              disabled={isRunning}
            />
          </div>
          <div className="input-group">
            <label>Window Size (k):</label>
            <input
              type="number"
              min="1"
              value={k}
              onChange={(e) => setK(parseInt(e.target.value) || 1)}
              disabled={isRunning}
            />
          </div>
          <div className="input-group">
            <label>Lower Threshold:</label>
            <input
              type="number"
              value={lower}
              onChange={(e) => setLower(parseInt(e.target.value) || 0)}
              disabled={isRunning}
            />
          </div>
          <div className="input-group">
            <label>Upper Threshold:</label>
            <input
              type="number"
              value={upper}
              onChange={(e) => setUpper(parseInt(e.target.value) || 0)}
              disabled={isRunning}
            />
          </div>
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
            <button onClick={evaluateDietPlan} disabled={isRunning}>
              Evaluate Diet Plan
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
          <h3>Sliding Window Solution</h3>
          <ol>
            <li>Initialize a variable to track total points</li>
            <li>Calculate the sum of calories for the first window of size k</li>
            <li>Evaluate the first window against the lower and upper thresholds</li>
            <li>Slide the window through the array:
              <ul>
                <li>Remove the leftmost calorie from the sum</li>
                <li>Add the rightmost calorie to the sum</li>
                <li>Evaluate the current window against the thresholds</li>
                <li>Update the total points accordingly</li>
              </ul>
            </li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(n) where n is the length of the calories array</p>
          
          <h3>Space Complexity</h3>
          <p>O(1) as we only use a fixed amount of space regardless of input size</p>
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
          <button 
            onClick={() => setLanguage('java')}
            className={`lang-button ${language === 'java' ? 'active' : ''}`}
          >
            Java
          </button>
        </div>
        <CodeSnippet 
          language={language === 'java' ? 'java' : language}
          code={implementations[language]}
        />
      </section>
    </div>
  );
};

export default DietPlanPerformance;
