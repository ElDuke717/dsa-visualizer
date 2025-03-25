// src/pages/Problems/Backtracking/BinaryWatch.jsx
import React, { useState } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css';
import './BinaryWatch.css';

const BinaryWatch = () => {
  const [numLEDs, setNumLEDs] = useState(1);
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentLEDs, setCurrentLEDs] = useState([]);
  const [results, setResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [language, setLanguage] = useState('javascript');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetVisualization = () => {
    setCurrentHours(0);
    setCurrentMinutes(0);
    setCurrentLEDs([]);
    setResults([]);
  };

  // Convert decimal to binary array
  const toBinary = (num, bits) => {
    const result = [];
    for (let i = 0; i < bits; i++) {
      result.unshift((num >> i) & 1);
    }
    return result;
  };

  // Count number of 1s in binary representation
  const countBits = (num) => {
    let count = 0;
    while (num > 0) {
      count += num & 1;
      num >>= 1;
    }
    return count;
  };

  const readableTime = (h, m) => {
    return `${h}:${m < 10 ? '0' + m : m}`;
  };

  // Backtracking approach
  const findTimes = async () => {
    if (isRunning) return;
    setIsRunning(true);
    resetVisualization();

    const validTimes = [];
    const ledValues = [8, 4, 2, 1, 32, 16, 8, 4, 2, 1]; // Hour and minute values for each LED
    const ledState = Array(10).fill(0); // 0 = off, 1 = on

    const backtrack = async (index, ledsOn) => {
      // Base case: we've considered all LEDs
      if (index === 10) {
        // If we've used exactly the target number of LEDs
        if (ledsOn === numLEDs) {
          // Calculate hours and minutes from LED state
          let hours = 0;
          let minutes = 0;
          
          // First 4 LEDs represent hours
          for (let i = 0; i < 4; i++) {
            if (ledState[i] === 1) {
              hours += ledValues[i];
            }
          }
          
          // Last 6 LEDs represent minutes
          for (let i = 4; i < 10; i++) {
            if (ledState[i] === 1) {
              minutes += ledValues[i];
            }
          }
          
          // Check if time is valid (hours < 12 and minutes < 60)
          if (hours < 12 && minutes < 60) {
            // Update visualization
            setCurrentHours(hours);
            setCurrentMinutes(minutes);
            setCurrentLEDs(ledState);
            
            // Add to results
            const time = readableTime(hours, minutes);
            validTimes.push(time);
            setResults([...validTimes]);
            
            await sleep(speed);
          }
        }
        return;
      }
      
      // Try turning current LED on
      ledState[index] = 1;
      setCurrentLEDs([...ledState]);
      await sleep(speed / 2);
      await backtrack(index + 1, ledsOn + 1);
      
      // Backtrack: try turning current LED off
      ledState[index] = 0;
      setCurrentLEDs([...ledState]);
      await sleep(speed / 2);
      await backtrack(index + 1, ledsOn);
    };
    
    await backtrack(0, 0);
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
// Brute Force Approach
function readBinaryWatch(num) {
    const result = [];
    
    // Helper function to count bits
    const countBits = (n) => {
        let count = 0;
        while (n > 0) {
            count += n & 1;
            n >>= 1;
        }
        return count;
    };
    
    // Try all possible times
    for (let h = 0; h < 12; h++) {
        for (let m = 0; m < 60; m++) {
            // Count bits in hours and minutes
            const hourBits = countBits(h);
            const minuteBits = countBits(m);
            
            // If total bits matches our target
            if (hourBits + minuteBits === num) {
                // Format time as "h:mm"
                result.push(\`\${h}:\${m < 10 ? '0' + m : m}\`);
            }
        }
    }
    
    return result;
}

// Backtracking Approach
function readBinaryWatchBacktracking(num) {
    const result = [];
    
    // Backtracking function
    // index: current bit position (0-9)
    // count: number of bits turned on so far
    // hours: current hour value
    // minutes: current minute value
    const backtrack = (index, count, hours, minutes) => {
        // Base case: if hours or minutes exceed valid range, return
        if (hours >= 12 || minutes >= 60) return;
        
        // Base case: if we've used all turnedOn bits
        if (count === turnedOn) {
            // Format the time and add to result
            const time = \`\${hours}:\${minutes < 10 ? '0' + minutes : minutes}\`;
            result.push(time);
            return;
        }
        
        // Base case: if we've considered all bits
        if (index === 10) return;
        
        // Option 1: Turn on the current bit
        // Bits 0-3 represent hours (1, 2, 4, 8)
        // Bits 4-9 represent minutes (1, 2, 4, 8, 16, 32)
        if (index < 4) {
            // Add to hours (2^index)
            backtrack(index + 1, count + 1, hours + (1 << index), minutes);
        } else {
            // Add to minutes (2^(index-4))
            backtrack(index + 1, count + 1, hours, minutes + (1 << (index - 4)));
        }
        
        // Option 2: Don't turn on the current bit
        backtrack(index + 1, count, hours, minutes);
    };
    
    // Start backtracking from index 0
    backtrack(0, 0, 0, 0);
    
    return result;
};`,
    python: `
# Brute Force Approach
def read_binary_watch(num):
    result = []
    
    # Try all possible times
    for h in range(12):
        for m in range(60):
            # Count bits in hours and minutes
            hour_bits = bin(h).count('1')
            minute_bits = bin(m).count('1')
            
            # If total bits matches our target
            if hour_bits + minute_bits == num:
                # Format time as "h:mm"
                result.append(f"{h}:{m:02d}")
    
    return result

# Backtracking Approach
def read_binary_watch_backtracking(num):
    result = []
    led_values = [8, 4, 2, 1, 32, 16, 8, 4, 2, 1]  # Hour and minute values
    led_state = [0] * 10  # 0 = off, 1 = on
    
    def backtrack(index, leds_on):
        # Base case: we've considered all LEDs
        if index == 10:
            # If we've used exactly the target number of LEDs
            if leds_on == num:
                # Calculate hours and minutes from LED state
                hours = 0
                minutes = 0
                
                # First 4 LEDs represent hours
                for i in range(4):
                    if led_state[i] == 1:
                        hours += led_values[i]
                
                # Last 6 LEDs represent minutes
                for i in range(4, 10):
                    if led_state[i] == 1:
                        minutes += led_values[i]
                
                # Check if time is valid
                if hours < 12 and minutes < 60:
                    result.append(f"{hours}:{minutes:02d}")
            return
        
        # Try turning current LED on
        led_state[index] = 1
        backtrack(index + 1, leds_on + 1)
        
        # Backtrack: try turning current LED off
        led_state[index] = 0
        backtrack(index + 1, leds_on)
    
    backtrack(0, 0)
    return result`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Binary Watch</h1>
        <div className="problem-meta">
          <span className="difficulty easy">Easy</span>
          <span className="category">Backtracking</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          A binary watch has 4 LEDs on the top which represent the hours (0-11), and the 6 LEDs on the bottom represent the minutes (0-59).
          Each LED represents a zero or one, with the least significant bit on the right.
        </p>
        <p>
          Given a non-negative integer n which represents the number of LEDs that are currently on, return all possible times the watch could represent.
        </p>
        <p>
          Example: For n = 1, the output would be:
          ["0:01", "0:02", "0:04", "0:08", "0:16", "0:32", "1:00", "2:00", "4:00", "8:00"]
        </p>
      </section>

      <section className="visualization">
        <div className="binary-watch-container">
          <div className="binary-watch">
            <div className="watch-display">
              <div className="time-display">{readableTime(currentHours, currentMinutes)}</div>
              <div className="leds-container">
                <div className="hours-leds">
                  {currentLEDs.slice(0, 4).map((led, idx) => (
                    <div 
                      key={`hour-${idx}`} 
                      className={`led ${led ? 'led-on' : 'led-off'}`}
                      title={`${8 >> idx} hour`}
                    ></div>
                  ))}
                  <div className="led-label">Hours</div>
                </div>
                <div className="minutes-leds">
                  {currentLEDs.slice(4).map((led, idx) => (
                    <div 
                      key={`minute-${idx}`} 
                      className={`led ${led ? 'led-on' : 'led-off'}`}
                      title={`${32 >> idx} minute`}
                    ></div>
                  ))}
                  <div className="led-label">Minutes</div>
                </div>
              </div>
            </div>
          </div>

          <div className="results-container">
            <h3>Valid Times Found ({results.length}):</h3>
            <div className="times-grid">
              {results.map((time, idx) => (
                <div 
                  key={idx}
                  className={`time-item ${
                    time === readableTime(currentHours, currentMinutes) 
                      ? 'current-time' 
                      : ''
                  }`}
                >
                  {time}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="controls">
          <div className="input-group">
            <label>Number of LEDs turned on:</label>
            <input
              type="number"
              min="0"
              max="10"
              value={numLEDs}
              onChange={(e) => setNumLEDs(parseInt(e.target.value))}
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
            <button onClick={findTimes} disabled={isRunning}>
              Find Times
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
          <h3>Brute Force Solution</h3>
          <ol>
            <li>Try all possible hours (0-11) and minutes (0-59)</li>
            <li>For each time, count the number of 1s in the binary representation of both hours and minutes</li>
            <li>If the total number of 1s equals our target, add the time to our result</li>
          </ol>
          
          <h3>Backtracking Solution</h3>
          <p>
            While this problem can be solved with a brute force approach, it can also be approached with backtracking:
          </p>
          <ol>
            <li>Start with all LEDs turned off</li>
            <li>Try turning on each LED one by one</li>
            <li>Recursively try turning on more LEDs until we've turned on exactly n LEDs</li>
            <li>Check if the current configuration represents a valid time</li>
            <li>Backtrack by turning off the LED and try a different one</li>
          </ol>
          
          <h3>Time Complexity</h3>
          <p>O(1) - Since there are only 12 * 60 = 720 possible times</p>
          
          <h3>Space Complexity</h3>
          <p>O(1) - The output size is bounded by the number of possible times</p>
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

export default BinaryWatch;
