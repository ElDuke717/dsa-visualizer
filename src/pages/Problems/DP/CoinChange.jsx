import React, { useState } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';
import './CoinChange.css';

const CoinChange = () => {
  const [coins, setCoins] = useState([1, 2, 5]); // Example coins
  const [amount, setAmount] = useState(11); // Example amount
  const [currentIndex, setCurrentIndex] = useState(-1); // Index for amount in DP array
  const [currentCoinIndex, setCurrentCoinIndex] = useState(-1); // Index for coin being considered
  const [dp, setDp] = useState([]); // DP array: dp[i] = min coins for amount i
  const [minCoins, setMinCoins] = useState(-1); // Final result
  const [action, setAction] = useState(''); // Description of the current step
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState('javascript');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setCurrentIndex(-1);
    setCurrentCoinIndex(-1);
    setDp([]);
    setMinCoins(-1);
    setAction('');
  };

  const handleCoinsChange = (e) => {
    try {
      const newCoins = e.target.value.split(',')
        .map(c => parseInt(c.trim()))
        .filter(c => !isNaN(c) && c > 0); // Ensure coins are positive integers
      // Remove duplicates and sort
      const uniqueSortedCoins = [...new Set(newCoins)].sort((a, b) => a - b);
      setCoins(uniqueSortedCoins);
      resetVisualization();
    } catch (error) {
      console.error('Invalid coins input:', error);
    }
  };

  const handleAmountChange = (e) => {
    try {
      const newAmount = parseInt(e.target.value);
      if (!isNaN(newAmount) && newAmount >= 0) {
        setAmount(newAmount);
        resetVisualization();
      }
    } catch (error) {
      console.error('Invalid amount input:', error);
    }
  };

  const calculateCoinChange = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    // Initialize DP array with Infinity, dp[0] = 0
    // dp[i] will store the minimum number of coins to make amount i
    let currentDp = new Array(amount + 1).fill(Infinity);
    currentDp[0] = 0;
    setDp([...currentDp]);
    await sleep(speed);

    // Iterate through each amount from 1 to amount
    for (let i = 1; i <= amount; i++) {
      setCurrentIndex(i);
      setAction(`Calculating min coins for amount ${i}`);
      await sleep(speed);

      // Iterate through each coin
      for (let j = 0; j < coins.length; j++) {
        const coin = coins[j];
        setCurrentCoinIndex(j);
        setAction(`Considering coin ${coin} for amount ${i}`);
        await sleep(speed / 2);

        if (coin <= i && currentDp[i - coin] !== Infinity) {
          // If the coin can be used and the subproblem (amount - coin) is solvable
          const potentialMin = currentDp[i - coin] + 1;
          if (potentialMin < currentDp[i]) {
             setAction(`Found better solution for amount ${i} using coin ${coin}: ${potentialMin} coins (prev: ${currentDp[i] === Infinity ? 'Inf' : currentDp[i]})`);
             currentDp[i] = potentialMin;
             setDp([...currentDp]);
             await sleep(speed);
          } else {
             setAction(`Using coin ${coin} doesn't improve min coins for amount ${i} (${potentialMin} >= ${currentDp[i] === Infinity ? 'Inf' : currentDp[i]})`);
             await sleep(speed / 2);
          }
        } else {
             setAction(`Coin ${coin} cannot be used or dp[${i-coin}] is Infinity`);
             await sleep(speed / 2);
        }
      }
      setCurrentCoinIndex(-1); // Reset coin highlight after checking all coins for amount i
       setAction(`Min coins for amount ${i} is ${currentDp[i] === Infinity ? 'Inf' : currentDp[i]}`);
       await sleep(speed);
    }

    const finalResult = currentDp[amount] === Infinity ? -1 : currentDp[amount];
    setMinCoins(finalResult);
    setCurrentIndex(-1); // Reset amount highlight
    setAction(`Final result for amount ${amount}: ${finalResult === -1 ? 'Not possible' : finalResult + ' coins'}`);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function coinChange(coins, amount) {
    // dp[i] will store the minimum number of coins needed for amount i
    // Initialize with a value larger than any possible number of coins (amount + 1)
    // or use Infinity. dp[0] is 0 because 0 coins are needed for amount 0.
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    // Iterate through all amounts from 1 to amount
    for (let i = 1; i <= amount; i++) {
        // For each amount, iterate through all coin denominations
        for (const coin of coins) {
            // If the coin value is less than or equal to the current amount i
            // and the subproblem dp[i - coin] is solvable (not Infinity)
            if (coin <= i && dp[i - coin] !== Infinity) {
                // Update dp[i] with the minimum of its current value or
                // the value of the subproblem plus one (for the current coin)
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    // If dp[amount] is still Infinity, it means the amount cannot be made up
    // by any combination of the coins. Otherwise, return the computed minimum coins.
    return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    python: `
import math

def coinChange(coins: list[int], amount: int) -> int:
    # dp[i] will store the minimum number of coins needed for amount i
    # Initialize with a value larger than any possible number of coins (amount + 1)
    # or use float('inf'). dp[0] is 0 because 0 coins are needed for amount 0.
    dp = [math.inf] * (amount + 1)
    dp[0] = 0

    # Iterate through all amounts from 1 to amount
    for i in range(1, amount + 1):
        # For each amount, iterate through all coin denominations
        for coin in coins:
            # If the coin value is less than or equal to the current amount i
            # and the subproblem dp[i - coin] is solvable (not infinity)
            if coin <= i and dp[i - coin] != math.inf:
                # Update dp[i] with the minimum of its current value or
                # the value of the subproblem plus one (for the current coin)
                dp[i] = min(dp[i], dp[i - coin] + 1)

    # If dp[amount] is still infinity, it means the amount cannot be made up
    # by any combination of the coins. Otherwise, return the computed minimum coins.
    return dp[amount] if dp[amount] != math.inf else -1
`,
    java: `
import java.util.Arrays;

public int coinChange(int[] coins, int amount) {
    // dp[i] will store the minimum number of coins needed for amount i
    // Initialize with a value larger than any possible number of coins (amount + 1).
    // dp[0] is 0 because 0 coins are needed for amount 0.
    int[] dp = new int[amount + 1];
    // Use amount + 1 as the initial "infinity" value
    Arrays.fill(dp, amount + 1); 
    dp[0] = 0;

    // Iterate through all amounts from 1 to amount
    for (int i = 1; i <= amount; i++) {
        // For each amount, iterate through all coin denominations
        for (int coin : coins) {
            // If the coin value is less than or equal to the current amount i
            // and the subproblem dp[i - coin] is solvable (not amount + 1)
            if (coin <= i && dp[i - coin] != amount + 1) {
                // Update dp[i] with the minimum of its current value or
                // the value of the subproblem plus one (for the current coin)
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    // If dp[amount] is still amount + 1, it means the amount cannot be made up
    // by any combination of the coins. Otherwise, return the computed minimum coins.
    return dp[amount] > amount ? -1 : dp[amount];
}`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Coin Change</h1>
        <div className="problem-meta">
          <span className="difficulty medium">Medium</span>
          <span className="category">Dynamic Programming</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          You are given an integer array <code>coins</code> representing coins of different denominations and an integer <code>amount</code> representing a total amount of money.
        </p>
        <p>
          Return <em>the fewest number of coins that you need to make up that amount</em>. If that amount of money cannot be made up by any combination of the coins, return <code>-1</code>.
        </p>
        <p>
          You may assume that you have an infinite number of each kind of coin.
        </p>
        <p>
          Example 1: For coins = [1, 2, 5], amount = 11, the fewest number of coins is 3 (5 + 5 + 1).
        </p>
        <p>
          Example 2: For coins = [2], amount = 3, the result is -1.
        </p>
         <p>
          Example 3: For coins = [1], amount = 0, the result is 0.
        </p>
      </section>

      <section className="visualization">
        {/* Visualization specific to Coin Change */}
        <div className="coin-change-visualization">
          <div className="coins-display">
            <label>Available Coins:</label>
            <div className="coin-items">
              {coins.map((coin, idx) => (
                <div 
                  key={idx}
                  className={`coin-item ${idx === currentCoinIndex ? 'current-coin' : ''}`}
                  title={`Coin: ${coin}`}
                >
                  {coin}
                </div>
              ))}
            </div>
          </div>

          <div className="dp-array-display-cc">
            <label>DP Array (Min coins for amount i):</label>
            <div className="dp-cells-cc">
              {dp.map((val, idx) => (
                <div key={idx} className={`dp-cell-cc ${idx === currentIndex ? 'current-dp-cc' : ''}`} title={`Amount ${idx}`}>
                  <div className="dp-index">{idx}</div>
                  <div className="dp-value">{val === Infinity ? 'Inf' : val}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="change-info">
             <div className="info-item">
              <div className="info-label">Target Amount:</div>
              <div className="info-value">{amount}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Current Action:</div>
              <div className="info-value action-text">{action || '-'}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Minimum Coins Needed:</div>
              {/* Apply conditional style directly */}
              <div 
                className="info-value result-text" 
                style={{ color: minCoins === -1 && !isRunning ? '#dc3545' : '#28a745' }}
              >
                {minCoins === -1 ? (isRunning ? 'Calculating...' : 'Not Possible') : minCoins}
              </div>
            </div>
          </div>
        </div>

        <div className="controls">
          <div className="input-group">
            <label>Coins (comma-separated, positive):</label>
            <input
              type="text"
              value={coins.join(', ')}
              onChange={handleCoinsChange}
              disabled={isRunning}
            />
          </div>
           <div className="input-group">
            <label>Target Amount (non-negative):</label>
            <input
              type="number"
              value={amount}
              min="0"
              onChange={handleAmountChange}
              disabled={isRunning}
            />
          </div>
          <div className="input-group">
            <label>Animation Speed (ms):</label>
            <input
              type="range"
              min="50" // Faster minimum speed
              max="1000" 
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
          </div>
          <div className="button-group">
            <button onClick={calculateCoinChange} disabled={isRunning}>
              Calculate Min Coins
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
          <h3>Dynamic Programming (Bottom-Up)</h3>
          <ol>
            <li>Create a DP array, <code>dp</code>, of size <code>amount + 1</code>. <code>dp[i]</code> will store the minimum number of coins required to make the amount <code>i</code>.</li>
            <li>Initialize all elements of <code>dp</code> to a value representing infinity (e.g., <code>amount + 1</code> or <code>Infinity</code>), except for <code>dp[0]</code> which should be 0 (0 coins are needed to make amount 0).</li>
            <li>Iterate through each amount <code>i</code> from 1 up to <code>amount</code>.</li>
            <li>For each amount <code>i</code>, iterate through each available coin denomination <code>coin</code> in the <code>coins</code> array.</li>
            <li>If a <code>coin</code> is less than or equal to the current amount <code>i</code> (i.e., <code>{`coin <= i`}</code>) and the subproblem for amount <code>i - coin</code> is solvable (i.e., <code>dp[i - coin]</code> is not infinity), then we can potentially use this <code>coin</code>.</li>
            <li>Update <code>dp[i]</code> with the minimum value between its current value and <code>dp[i - coin] + 1</code> (the minimum coins for the subproblem plus the current coin).
              <ul><li><code>dp[i] = min(dp[i], dp[i - coin] + 1)</code></li></ul>
            </li>
            <li>After iterating through all amounts and all coins, <code>dp[amount]</code> will contain the minimum number of coins required to make the target <code>amount</code>.</li>
            <li>If <code>dp[amount]</code> is still the initial infinity value, it means the amount cannot be formed using the given coins, so return -1. Otherwise, return <code>dp[amount]</code>.</li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(S * n) - Where S is the target amount and n is the number of coin denominations. We have nested loops: one iterating up to the amount and the inner one iterating through the coins.</p>
          
          <h3>Space Complexity</h3>
          <p>O(S) - We use a DP array of size S+1 to store the minimum coins for each amount up to S.</p>

          <h3>Key Points:</h3>
          <ul>
            <li>This is a classic unbounded knapsack-type problem solved using bottom-up dynamic programming.</li>
            <li>The state <code>dp[i]</code> represents the optimal solution (minimum coins) for the subproblem of making amount <code>i</code>.</li>
            <li>The transition relies on checking each coin and seeing if using it leads to a better solution based on previously computed optimal solutions for smaller amounts.</li>
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

export default CoinChange;
