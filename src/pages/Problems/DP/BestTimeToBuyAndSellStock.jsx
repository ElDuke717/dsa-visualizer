// src/pages/Problems/DP/BestTimeToBuyAndSellStock.jsx
import React, { useState } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';
import './BestTimeToBuyAndSellStock.css';

const BestTimeToBuyAndSellStock = () => {
  const [prices, setPrices] = useState([7, 1, 5, 3, 6, 4]);
  const [currentDay, setCurrentDay] = useState(-1);
  const [minPrice, setMinPrice] = useState(null);
  const [maxProfit, setMaxProfit] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState('javascript');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setCurrentDay(-1);
    setMinPrice(null);
    setMaxProfit(0);
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

  const calculateMaxProfit = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    let currentMinPrice = prices[0];
    let currentMaxProfit = 0;
    
    setMinPrice(currentMinPrice);
    setMaxProfit(currentMaxProfit);
    setCurrentDay(0);
    await sleep(speed);

    for (let i = 1; i < prices.length; i++) {
      setCurrentDay(i);
      await sleep(speed);

      // Update max profit if we can get a better profit
      const potentialProfit = prices[i] - currentMinPrice;
      if (potentialProfit > currentMaxProfit) {
        currentMaxProfit = potentialProfit;
        setMaxProfit(currentMaxProfit);
        await sleep(speed / 2);
      }

      // Update min price if we find a lower price
      if (prices[i] < currentMinPrice) {
        currentMinPrice = prices[i];
        setMinPrice(currentMinPrice);
        await sleep(speed / 2);
      }
    }

    setCurrentDay(-1);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function maxProfit(prices) {
    if (prices.length <= 1) return 0;
    
    let minPrice = prices[0];
    let maxProfit = 0;
    
    for (let i = 1; i < prices.length; i++) {
        // Update max profit if we can get a better profit
        const potentialProfit = prices[i] - minPrice;
        maxProfit = Math.max(maxProfit, potentialProfit);
        
        // Update min price if we find a lower price
        minPrice = Math.min(minPrice, prices[i]);
    }
    
    return maxProfit;
}`,
    python: `
def maxProfit(prices: list[int]) -> int:
    if len(prices) <= 1:
        return 0
        
    min_price = prices[0]
    max_profit = 0
    
    for i in range(1, len(prices)):
        # Update max profit if we can get a better profit
        potential_profit = prices[i] - min_price
        max_profit = max(max_profit, potential_profit)
        
        # Update min price if we find a lower price
        min_price = min(min_price, prices[i])
    
    return max_profit`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Best Time to Buy and Sell Stock</h1>
        <div className="problem-meta">
          <span className="difficulty easy">Easy</span>
          <span className="category">Dynamic Programming</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i</code>th day.
        </p>
        <p>
          You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
        </p>
        <p>
          Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
        </p>
        <p>
          Example: For prices = [7, 1, 5, 3, 6, 4], the maximum profit is 5 (buy at price 1, sell at price 6).
        </p>
      </section>

      <section className="visualization">
        <div className="stock-visualization">
          <div className="stock-chart">
            <div className="chart-container">
              <div className="y-axis">
                {Math.max(...prices) > 0 && 
                  [...Array(Math.max(...prices) + 1)].map((_, idx) => (
                    <div key={idx} className="y-label">
                      {Math.max(...prices) - idx}
                    </div>
                  ))
                }
              </div>
              <div className="chart-bars">
                {prices.map((price, idx) => (
                  <div 
                    key={idx}
                    className={`price-bar ${idx === currentDay ? 'current' : ''} ${price === minPrice ? 'min-price' : ''}`}
                    style={{ height: `${(price / Math.max(...prices)) * 100}%` }}
                  >
                    <div className="price-label">{price}</div>
                    <div className="day-label">Day {idx}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="stock-info">
            <div className="info-item">
              <div className="info-label">Current Min Price:</div>
              <div className="info-value">{minPrice !== null ? minPrice : '-'}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Current Max Profit:</div>
              <div className="info-value">{maxProfit}</div>
            </div>
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
            <button onClick={calculateMaxProfit} disabled={isRunning}>
              Calculate Max Profit
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
          <h3>One-Pass Solution</h3>
          <ol>
            <li>Initialize variables:
              <ul>
                <li>minPrice = first price</li>
                <li>maxProfit = 0</li>
              </ul>
            </li>
            <li>Iterate through the prices starting from the second day:
              <ul>
                <li>Calculate potential profit if we sell today: currentPrice - minPrice</li>
                <li>Update maxProfit if this potential profit is greater</li>
                <li>Update minPrice if we find a lower price</li>
              </ul>
            </li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(n) where n is the number of days (length of prices array)</p>
          
          <h3>Space Complexity</h3>
          <p>O(1) - we only use a constant amount of extra space</p>

          <h3>Key Points:</h3>
          <ul>
            <li>We only need to make a single pass through the array</li>
            <li>We're always buying at the minimum price seen so far</li>
            <li>We're always considering selling at the current price</li>
            <li>This is a classic example of the "greedy" approach</li>
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
        </div>
        <CodeSnippet 
          language={language}
          code={implementations[language]}
        />
      </section>
    </div>
  );
};

export default BestTimeToBuyAndSellStock;
