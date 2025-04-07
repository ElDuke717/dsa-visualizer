import React, { useState } from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css'; // Reusing general problem styles

const ReverseStringII = () => {
  const [s, setS] = useState("abcdefg");
  const [k, setK] = useState(2);
  const [reversedS, setReversedS] = useState("");
  const [isRunning, setIsRunning] = useState(false); // Although no async operation, keep for consistency
  const [language, setLanguage] = useState('javascript');

  const resetVisualization = () => {
    setReversedS("");
  };

  const handleSChange = (e) => {
    setS(e.target.value);
    resetVisualization();
  };

  const handleKChange = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val > 0) {
      setK(val);
      resetVisualization();
    } else if (e.target.value === "") {
       setK(''); // Allow clearing the input
       resetVisualization();
    }
  };

  const reverseStr = () => {
    if (isRunning || !s || !k || k <= 0) return;
    setIsRunning(true); // Keep for consistency, though operation is synchronous

    let arr = s.split('');
    for (let i = 0; i < arr.length; i += 2 * k) {
      let start = i;
      // Calculate end index, ensuring it doesn't exceed array bounds
      // Also, only reverse the first k characters if less than 2k but >= k characters remain
      let end = Math.min(start + k - 1, arr.length - 1);
      
      // Reverse the segment [start, end]
      while (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]]; // Swap characters
        start++;
        end--;
      }
    }
    setReversedS(arr.join(''));
    setIsRunning(false);
  };

  const implementations = {
    javascript: `
function reverseStr(s, k) {
    const arr = s.split('');
    for (let i = 0; i < arr.length; i += 2 * k) {
        let start = i;
        // Reverse the first k characters for every 2k characters.
        // Handle cases where less than k or between k and 2k characters remain.
        let end = Math.min(start + k - 1, arr.length - 1);
        
        while (start < end) {
            [arr[start], arr[end]] = [arr[end], arr[start]];
            start++;
            end--;
        }
    }
    return arr.join('');
}`,
    python: `
def reverseStr(s: str, k: int) -> str:
    arr = list(s)
    for i in range(0, len(arr), 2 * k):
        start = i
        # Calculate end index, handle remaining characters correctly
        end = min(start + k - 1, len(arr) - 1)
        
        # Reverse the segment [start:end+1]
        # Python slicing makes this concise, but manual swap is clearer for visualization
        # arr[start:end+1] = arr[start:end+1][::-1] 
        
        # Manual swap for clarity
        l, r = start, end
        while l < r:
            arr[l], arr[r] = arr[r], arr[l]
            l += 1
            r -= 1
            
    return "".join(arr)`
  };

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>Reverse String II</h1>
        <div className="problem-meta">
          <span className="difficulty easy">Easy</span>
          <span className="category">Strings</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          Given a string <code>s</code> and an integer <code>k</code>, reverse the first <code>k</code> characters
          for every <code>2k</code> characters counting from the start of the string.
        </p>
        <p>
          If there are fewer than <code>k</code> characters left, reverse all of them. If there are less than <code>2k</code> but
          greater than or equal to <code>k</code> characters, then reverse the first <code>k</code> characters and leave the
          other as original.
        </p>
        <p><strong>LeetCode #541</strong></p>
        <p>
          Example 1: <code>s = "abcdefg", k = 2</code> → Output: <code>"bacdfeg"</code>
        </p>
         <p>
          Example 2: <code>s = "abcd", k = 2</code> → Output: <code>"bacd"</code>
        </p>
      </section>

      <section className="visualization">
        <h3>Input</h3>
        <div className="string-display"><strong>s:</strong> {s}</div>
        <div className="string-display"><strong>k:</strong> {k}</div>

        <h3>Result</h3>
        <div className="string-display result">
          <strong>Reversed s:</strong> {reversedS || "(Not run yet)"}
        </div>

        <div className="controls">
          <div className="input-group">
            <label>String s:</label>
            <input
              type="text"
              value={s}
              onChange={handleSChange}
              disabled={isRunning}
            />
          </div>
          <div className="input-group">
            <label>Integer k:</label>
            <input
              type="number"
              value={k}
              onChange={handleKChange}
              min="1"
              disabled={isRunning}
            />
          </div>
          <div className="button-group">
            <button onClick={reverseStr} disabled={isRunning || !s || !k || k <= 0}>
              Reverse String
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
          <h3>Iterative Reversal in Blocks</h3>
          <p>
            The problem asks us to reverse segments of the string based on the value of <code>k</code>. We can iterate through the string in steps of <code>2k</code> and reverse the appropriate sub-segment within each block.
          </p>
          <ol>
            <li>Convert the input string <code>s</code> into a mutable data structure, like an array of characters.</li>
            <li>Iterate through the character array with a step of <code>2k</code>. Let the starting index of the current block be <code>i</code>.</li>
            <li>For each block starting at <code>i</code>, determine the segment to reverse. The segment starts at <code>i</code>.</li>
            <li>The end index of the segment to reverse is <code>min(i + k - 1, length - 1)</code>. This handles cases where fewer than <code>k</code> characters remain.</li>
            <li>Reverse the characters within the calculated segment (from start index to end index) using a standard in-place reversal technique (e.g., two pointers swapping characters).</li>
            <li>After iterating through all blocks, join the characters in the array back into a string.</li>
          </ol>

          <h3>Time Complexity</h3>
          <p>O(n), where n is the length of the string <code>s</code>. Each character is involved in at most one swap operation during the reversal process.</p>

          <h3>Space Complexity</h3>
          <p>O(n) if we convert the string to a character array (common in languages like JavaScript where strings are immutable). O(1) if the string is mutable and reversal can be done in-place (like in C++).</p>
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

export default ReverseStringII;
