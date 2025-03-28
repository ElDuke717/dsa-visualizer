import React, { useState } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css'; // Reusing general problem styles
// Consider creating a specific CSS if needed: import './BestTimeToBuyAndSellStockII.css';

const BestTimeToBuyAndSellStockII = () => {
  const [prices, setPrices] = useState([7, 1, 5, 3, 6, 4]);
  const [currentDay, setCurrentDay] = useState(-1);
  const [totalProfit, setTotalProfit] = useState(0);
  const [transactions, setTransactions] = useState([]); // To visualize buy/sell points
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState('javascript');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setCurrentDay(-1);
    setTotalProfit(0);
    setTransactions([]);
  };

  const handlePricesChange = (e) => {
    try {
      const newPrices = e.target.value.split(',').map(num => parseInt(num.trim()));
      if (newPrices.some(isNaN)) {
        return; // Don't update if any value is not a number
      }
      setPrices(newPrices);
      resetVisualization();
    } catch (error) {
      console.error('Invalid input:', error);
    }
  };

  const calculateTotalProfit = async () => {
    if (isRunning || prices.length < 2) return;
    setIsRunning(true);
    resetVisualization();

    let currentTotalProfit = 0;
    let currentTransactions = [];

    for (let i = 1; i < prices.length; i++) {
      setCurrentDay(i);
      await sleep(speed);

      // If today's price is higher than yesterday's, we can make a profit
      if (prices[i] > prices[i - 1]) {
        const profit = prices[i] - prices[i - 1];
        currentTotalProfit += profit;
        currentTransactions.push({ buy: i - 1, sell: i, profit: profit });
        setTotalProfit(currentTotalProfit);
        setTransactions([...currentTransactions]); // Update state for visualization
        await sleep(speed / 2);
      }
    }

    setCurrentDay(-1); // Indicate completion
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function maxProfit(prices) {
    let totalProfit = 0;
    for (let i = 1; i < prices.length; i++) {
        // Add profit if today's price is higher than yesterday's
        if (prices[i] > prices[i - 1]) {
            totalProfit += prices[i] - prices[i - 1];
        }
    }
    return totalProfit;
}`,
    python: `
from typing import List

def maxProfit(prices: List[int]) -> int:
    total_profit = 0
    for i in range(1, len(prices)):
        # Add profit if today's price is higher than yesterday's
        if prices[i] > prices[i-1]:
            total_profit += prices[i] - prices[i-1]
    return total_profit`
  };

  // Basic visualization showing prices and highlighting transaction days
  const renderChartBars = () => {
    const maxPrice = Math.max(...prices, 1); // Avoid division by zero
    return prices.map((price, idx) => {
      let barClass = 'price-bar';
      if (idx === currentDay) barClass += ' current';
      const isBuyDay = transactions.some(t => t.buy === idx);
      const isSellDay = transactions.some(t => t.sell === idx);
      if (isBuyDay) barClass += ' buy-day';
      if (isSellDay) barClass += ' sell-day';

      return (
        <div
          key={idx}
          className={barClass}
          style={{ height: `${(price / maxPrice) * 100}%` }}
        >
          <div className="price-label">{price}</div>
          <div className="day-label">Day {idx}</div>
        </div>
      );
    });
  };


  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Best Time to Buy and Sell Stock II</h1>
        <div className="problem-meta">
          <span className="difficulty medium">Medium</span>
          <span className="category">Greedy Algorithms</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          You are given an integer array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i</code>th day.
        </p>
        <p>
          On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day.
        </p>
        <p>
          Find and return the maximum profit you can achieve.
        </p>
        <p><strong>LeetCode #122</strong></p>
        <p>
          Example: For prices = [7, 1, 5, 3, 6, 4], the maximum profit is 7 (buy at 1, sell at 5, profit = 4; then buy at 3, sell at 6, profit = 3. Total profit = 4 + 3 = 7).
        </p>
      </section>

      <section className="visualization">
         {/* Basic Chart Visualization */}
         <div className="stock-visualization">
          <div className="stock-chart">
            <div className="chart-container">
              <div className="y-axis">
                {Math.max(...prices) > 0 &&
                  [...Array(Math.max(...prices) + 1)].map((_, idx) => (
                    <div key={idx} className="y-label">
                      {Math.max(...prices) - idx}
                    </div>
                  )).reverse() // Ensure labels go from 0 up
                }
              </div>
              <div className="chart-bars">
                {renderChartBars()}
              </div>
            </div>
          </div>
          <div className="stock-info">
            <div className="info-item">
              <div className="info-label">Total Profit:</div>
              <div className="info-value">{totalProfit}</div>
            </div>
             {/* Optional: Display transactions */}
             {transactions.length > 0 && (
              <div className="transactions-log">
                <h4>Transactions:</h4>
                <ul>
                  {transactions.map((t, index) => (
                    <li key={index}>Buy Day {t.buy} ({prices[t.buy]}), Sell Day {t.sell} ({prices[t.sell]}) = Profit {t.profit}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>


        <div className="controls">
          <div className="input-group">
            <label>Stock Prices (comma-separated):</label>
            <input
              type="text"
              value={prices.join(', ')}
              onChange={handlePricesChange}
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
            <button onClick={calculateTotalProfit} disabled={isRunning}>
              Calculate Total Profit
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
          <h3>Greedy Approach (Valley-Peak)</h3>
          <p>
            The key insight for this problem is that we can achieve the maximum profit by accumulating all the positive differences between consecutive days. This is equivalent to buying at every local minimum (valley) and selling at the next local maximum (peak).
          </p>
          <ol>
            <li>Initialize <code>totalProfit = 0</code>.</li>
            <li>Iterate through the prices starting from the second day (index 1).</li>
            <li>If the current day's price (<code>prices[i]</code>) is greater than the previous day's price (<code>prices[i-1]</code>), it means we can make a profit by buying on day <code>i-1</code> and selling on day <code>i</code>.</li>
            <li>Add this profit (<code>prices[i] - prices[i-1]</code>) to the <code>totalProfit</code>.</li>
            <li>Continue this process for all days.</li>
            <li>The final <code>totalProfit</code> will be the maximum possible profit.</li>
          </ol>

          <h3>Why does this work?</h3>
          <p>
            {'Consider a sequence like [a, b, c] where a < b < c. The total profit is (b - a) + (c - b) = c - a. This shows that summing consecutive positive differences is equivalent to buying at the start of an upward trend and selling at the end.'}
          </p>

          <h3>Time Complexity</h3>
          <p>O(n) where n is the number of days (length of prices array), as we make a single pass.</p>

          <h3>Space Complexity</h3>
          <p>O(1) - we only use a constant amount of extra space.</p>
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

export default BestTimeToBuyAndSellStockII;
