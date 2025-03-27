import React, { useState } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';
import './HouseRobber.css'; // Create this CSS file

const HouseRobber = () => {
  const [nums, setNums] = useState([1, 2, 3, 1]); // Example input for House Robber
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [dp, setDp] = useState([]); // DP array to store max money up to house i
  const [maxMoney, setMaxMoney] = useState(0);
  const [action, setAction] = useState(''); // 'Rob' or 'Skip'
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState('javascript');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setCurrentIndex(-1);
    setDp([]);
    setMaxMoney(0);
    setAction('');
  };

  const handleNumsChange = (e) => {
    try {
      const newNums = e.target.value.split(',').map(num => parseInt(num.trim()));
      if (newNums.some(isNaN) || newNums.some(n => n < 0)) {
        // Ensure numbers are non-negative as per problem constraints
        return; 
      }
      setNums(newNums);
      resetVisualization();
    } catch (error) {
      console.error('Invalid input:', error);
    }
  };

  // Placeholder for visualization logic
  const robHouses = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    const n = nums.length;
    if (n === 0) {
        setMaxMoney(0);
        setIsRunning(false);
        return;
    }
    if (n === 1) {
        setCurrentIndex(0);
        setAction('Rob');
        setDp([nums[0]]);
        setMaxMoney(nums[0]);
        await sleep(speed);
        setCurrentIndex(-1);
        setIsRunning(false);
        return;
    }

    let currentDp = new Array(n).fill(0);
    
    // Base case 1: Rob first house
    setCurrentIndex(0);
    setAction('Rob');
    currentDp[0] = nums[0];
    setDp([...currentDp]);
    setMaxMoney(currentDp[0]);
    await sleep(speed);

    // Base case 2: Decide for the second house
    setCurrentIndex(1);
    if (nums[1] > currentDp[0]) {
        setAction('Rob house 1, Skip house 0');
        currentDp[1] = nums[1];
    } else {
        setAction('Skip house 1, Keep house 0 max');
        currentDp[1] = currentDp[0];
    }
    setDp([...currentDp]);
    setMaxMoney(currentDp[1]);
    await sleep(speed);


    // Iterate from the third house
    for (let i = 2; i < n; i++) {
        setCurrentIndex(i);
        
        // Option 1: Rob current house (nums[i]) + max money from house i-2
        const robCurrent = nums[i] + currentDp[i-2];
        // Option 2: Skip current house, max money is the same as house i-1
        const skipCurrent = currentDp[i-1];

        if (robCurrent > skipCurrent) {
            setAction(`Rob house ${i} (Value: ${nums[i]}) + Max from house ${i-2} (${currentDp[i-2]})`);
            currentDp[i] = robCurrent;
        } else {
            setAction(`Skip house ${i}, Keep max from house ${i-1} (${currentDp[i-1]})`);
            currentDp[i] = skipCurrent;
        }
        
        setDp([...currentDp]);
        setMaxMoney(currentDp[i]);
        await sleep(speed);
    }

    setCurrentIndex(-1);
    setAction(`Final Max Money: ${currentDp[n-1]}`);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function rob(nums) {
    if (!nums || nums.length === 0) {
        return 0;
    }
    const n = nums.length;
    if (n === 1) {
        return nums[0];
    }
    
    // dp[i] = max money robbed up to house i
    const dp = new Array(n).fill(0);
    
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    
    for (let i = 2; i < n; i++) {
        // Max money is either:
        // 1. Rob current house (nums[i]) + max money from house i-2 (dp[i-2])
        // 2. Skip current house, max money is the same as house i-1 (dp[i-1])
        dp[i] = Math.max(nums[i] + dp[i-2], dp[i-1]);
    }
    
    return dp[n-1];
}`,
    python: `
def rob(nums: list[int]) -> int:
    if not nums:
        return 0
    n = len(nums)
    if n == 1:
        return nums[0]
    
    # dp[i] = max money robbed up to house i
    dp = [0] * n
    
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])
    
    for i in range(2, n):
        # Max money is either:
        # 1. Rob current house (nums[i]) + max money from house i-2 (dp[i-2])
        # 2. Skip current house, max money is the same as house i-1 (dp[i-1])
        dp[i] = max(nums[i] + dp[i-2], dp[i-1])
        
    return dp[n-1]`,
    java: `
public int rob(int[] nums) {
    if (nums == null || nums.length == 0) {
        return 0;
    }
    int n = nums.length;
    if (n == 1) {
        return nums[0];
    }
    
    // dp[i] = max money robbed up to house i
    int[] dp = new int[n];
    
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    
    for (int i = 2; i < n; i++) {
        // Max money is either:
        // 1. Rob current house (nums[i]) + max money from house i-2 (dp[i-2])
        // 2. Skip current house, max money is the same as house i-1 (dp[i-1])
        dp[i] = Math.max(nums[i] + dp[i-2], dp[i-1]);
    }
    
    return dp[n-1];
}`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>House Robber</h1>
        <div className="problem-meta">
          <span className="difficulty medium">Medium</span>
          <span className="category">Dynamic Programming</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that <strong>adjacent houses have security systems connected</strong> and <strong>it will automatically contact the police if two adjacent houses were broken into on the same night</strong>.
        </p>
        <p>
          Given an integer array <code>nums</code> representing the amount of money of each house, return <em>the maximum amount of money you can rob tonight <strong>without alerting the police</strong></em>.
        </p>
        <p>
          Example: For nums = [1, 2, 3, 1], the maximum amount you can rob is 4 (Rob house 0 with money 1 and house 2 with money 3).
        </p>
         <p>
          Example: For nums = [2, 7, 9, 3, 1], the maximum amount you can rob is 12 (Rob house 0 with money 2, house 2 with money 9 and house 4 with money 1).
        </p>
      </section>

      <section className="visualization">
        {/* Visualization specific to House Robber */}
        <div className="house-robber-visualization">
          <div className="houses-display">
            {nums.map((money, idx) => (
              <div 
                key={idx}
                className={`house-cell ${idx === currentIndex ? 'current' : ''} ${dp[idx] > (dp[idx-1] || 0) && idx === currentIndex ? 'robbed' : ''} ${dp[idx] === (dp[idx-1] || 0) && idx === currentIndex ? 'skipped' : ''}`}
                title={`House ${idx}: $${money}`}
              >
                <div className="house-roof"></div>
                <div className="house-body">{money}</div>
              </div>
            ))}
          </div>
          <div className="dp-array-display">
            <label>DP Array (Max money up to house i):</label>
            <div className="dp-cells">
              {dp.map((val, idx) => (
                <div key={idx} className={`dp-cell ${idx === currentIndex ? 'current-dp' : ''}`}>
                  {val}
                </div>
              ))}
              {/* Fill remaining DP cells if needed */}
              {Array(nums.length - dp.length).fill(0).map((_, idx) => (
                 <div key={dp.length + idx} className="dp-cell future">?</div>
              ))}
            </div>
          </div>

          <div className="robber-info">
            <div className="info-item">
              <div className="info-label">Current Action:</div>
              <div className="info-value action-text">{action || '-'}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Max Money So Far:</div>
              <div className="info-value">{maxMoney}</div>
            </div>
          </div>
        </div>

        <div className="controls">
          <div className="input-group">
            <label>House Money (comma-separated):</label>
            <input
              type="text"
              value={nums.join(', ')}
              onChange={handleNumsChange}
              disabled={isRunning}
            />
          </div>
          <div className="input-group">
            <label>Animation Speed (ms):</label>
            <input
              type="range"
              min="100"
              max="1500" // Increased max speed for potentially longer arrays
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
          </div>
          <div className="button-group">
            <button onClick={robHouses} disabled={isRunning}>
              Visualize Robbery
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
          <h3>Dynamic Programming</h3>
          <ol>
            <li>Define <code>dp[i]</code> as the maximum amount of money that can be robbed from the first <code>i</code> houses (0-indexed).</li>
            <li>Base Cases:
              <ul>
                <li>If there are no houses (n=0), max money is 0.</li>
                <li>If there is one house (n=1), max money is <code>nums[0]</code>. So, <code>dp[0] = nums[0]</code>.</li>
                <li>If there are two houses (n=2), max money is <code>max(nums[0], nums[1])</code>. So, <code>dp[1] = max(nums[0], nums[1])</code>.</li>
              </ul>
            </li>
            <li>Recurrence Relation: For house <code>i</code> (where <code>{'i'>= 2}</code>), the robber has two choices:
              <ul>
                <li><strong>Rob house <code>i</code></strong>: If they rob house <code>i</code>, they cannot rob house <code>i-1</code>. The maximum money they can get is <code>nums[i] + dp[i-2]</code> (money from house <code>i</code> plus the max money from houses up to <code>i-2</code>).</li>
                <li><strong>Skip house <code>i</code></strong>: If they skip house <code>i</code>, the maximum money they can get is the same as the maximum money from houses up to <code>i-1</code>, which is <code>dp[i-1]</code>.</li>
              </ul>
              Therefore, <code>dp[i] = max(nums[i] + dp[i-2], dp[i-1])</code>.
            </li>
            <li>The final answer is the maximum money that can be robbed from all <code>n</code> houses, which is <code>dp[n-1]</code>.</li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(n) - We iterate through the array once to fill the DP table.</p>
          
          <h3>Space Complexity</h3>
          <p>O(n) - We use a DP array of size n.</p>
          <p><em>Optimization:</em> This can be optimized to O(1) space by noticing that we only need the results from the previous two steps (<code>dp[i-1]</code> and <code>dp[i-2]</code>). We can use two variables instead of the full DP array.</p>

          <h3>Key Points:</h3>
          <ul>
            <li>The problem has optimal substructure and overlapping subproblems, making it suitable for DP.</li>
            <li>The core decision at each step is whether to rob the current house or not.</li>
            <li>The constraint is not robbing adjacent houses.</li>
          </ul>
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
          language={language}
          code={implementations[language]}
        />
      </section>
    </div>
  );
};

export default HouseRobber;
