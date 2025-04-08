import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StringVisualizer from '../../components/DataStructureVisualizer/StringVisualizer';
import CodeSnippet from '../../components/CodeSnippet/CodeSnippet';
import { stringImplementations } from '../../data/implementations/stringImplementations';
import './StringsPage.css';

const StringsPage = () => {
  const [language, setLanguage] = useState('javascript');
  const [inputString, setInputString] = useState('Hello, World!');
  const [operation, setOperation] = useState(null);
  const [result, setResult] = useState(null);
  const [highlightIndices, setHighlightIndices] = useState([]);

  const performOperation = (op) => {
    setOperation(op);
    
    switch (op) {
      case 'length':
        setResult(inputString.length);
        setHighlightIndices([]);
        break;
      case 'uppercase':
        setResult(inputString.toUpperCase());
        setHighlightIndices([]);
        break;
      case 'lowercase':
        setResult(inputString.toLowerCase());
        setHighlightIndices([]);
        break;
      case 'reverse':
        const reversed = inputString.split('').reverse().join('');
        setResult(reversed);
        setHighlightIndices([]);
        break;
      case 'first_char':
        setResult(inputString[0]);
        setHighlightIndices([0]);
        break;
      case 'last_char':
        setResult(inputString[inputString.length - 1]);
        setHighlightIndices([inputString.length - 1]);
        break;
      case 'substring':
        const start = 0;
        const end = Math.min(5, inputString.length);
        setResult(inputString.substring(start, end));
        setHighlightIndices([...Array(end - start).keys()]);
        break;
      case 'split':
        setResult(JSON.stringify(inputString.split(' ')));
        setHighlightIndices([]);
        break;
      default:
        setResult(null);
        setHighlightIndices([]);
    }
  };

  const handleInputChange = (e) => {
    setInputString(e.target.value);
    setOperation(null);
    setResult(null);
    setHighlightIndices([]);
  };

  return (
    <div className="overview-page-container">
      <h1>Strings</h1>
      
      <section className="overview-section">
        <h2>String Visualization</h2>
        <p>
          Strings are sequences of characters used to represent text. They are one of the most commonly used data types in programming.
          Use the interactive tool below to visualize different string operations.
        </p>
        
        <div className="string-demo">
          <div className="string-demo-controls">
            <input
              type="text"
              value={inputString}
              onChange={handleInputChange}
              placeholder="Enter a string"
              className="string-demo-input"
            />
          </div>
          
          <StringVisualizer
            inputString={inputString || ' '}
            highlightIndices={highlightIndices}
            operation={operation}
            result={result}
          />
          
          <div className="string-demo-controls">
            <button onClick={() => performOperation('length')} className="string-demo-button">Length</button>
            <button onClick={() => performOperation('uppercase')} className="string-demo-button">Uppercase</button>
            <button onClick={() => performOperation('lowercase')} className="string-demo-button">Lowercase</button>
            <button onClick={() => performOperation('reverse')} className="string-demo-button">Reverse</button>
            <button onClick={() => performOperation('first_char')} className="string-demo-button">First Char</button>
            <button onClick={() => performOperation('last_char')} className="string-demo-button">Last Char</button>
            <button onClick={() => performOperation('substring')} className="string-demo-button">Substring(0,5)</button>
            <button onClick={() => performOperation('split')} className="string-demo-button">Split by Space</button>
          </div>
        </div>
      </section>

      <section className="overview-section">
        <h2>Common String Operations</h2>
        <p>
          Strings support a variety of operations for manipulation, searching, and transformation.
          Here are some of the most commonly used string operations:
        </p>
        
        <div className="string-operations">
          <div className="operation-card">
            <h3>String Creation</h3>
            <p>Creating string literals using quotes or constructors.</p>
            <div className="code-example">
              const str = "Hello, World!";<br />
              const str2 = 'Single quotes';<br />
              const str3 = `Template literal`;
            </div>
          </div>
          
          <div className="operation-card">
            <h3>String Length</h3>
            <p>Getting the number of characters in a string.</p>
            <div className="code-example">
              const length = str.length; // 13
            </div>
          </div>
          
          <div className="operation-card">
            <h3>Accessing Characters</h3>
            <p>Accessing individual characters by index.</p>
            <div className="code-example">
              const firstChar = str[0]; // 'H'<br />
              const lastChar = str[str.length-1]; // '!'
            </div>
          </div>
          
          <div className="operation-card">
            <h3>Substring Extraction</h3>
            <p>Extracting portions of a string.</p>
            <div className="code-example">
              const sub = str.substring(0, 5); // "Hello"<br />
              const sub2 = str.slice(7, 12); // "World"
            </div>
          </div>
          
          <div className="operation-card">
            <h3>String Concatenation</h3>
            <p>Joining strings together.</p>
            <div className="code-example">
              const a = "Hello";<br />
              const b = "World";<br />
              const c = a + ", " + b + "!";
            </div>
          </div>
          
          <div className="operation-card">
            <h3>String Search</h3>
            <p>Finding substrings within a string.</p>
            <div className="code-example">
              const idx = str.indexOf("World"); // 7<br />
              const has = str.includes("Hello"); // true
            </div>
          </div>
          
          <div className="operation-card">
            <h3>Case Conversion</h3>
            <p>Converting between uppercase and lowercase.</p>
            <div className="code-example">
              const upper = str.toUpperCase();<br />
              const lower = str.toLowerCase();
            </div>
          </div>
          
          <div className="operation-card">
            <h3>String Replacement</h3>
            <p>Replacing parts of a string.</p>
            <div className="code-example">
              const newStr = str.replace("World", "JavaScript");
            </div>
          </div>
        </div>
      </section>

      <section className="overview-section">
        <h2>String Time Complexity</h2>
        <p>
          Understanding the time complexity of string operations is crucial for writing efficient code.
          Here's a summary of common string operations and their time complexities:
        </p>
        
        <table className="time-complexity-table">
          <thead>
            <tr>
              <th>Operation</th>
              <th>Time Complexity</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Access by Index</td>
              <td>O(1)</td>
              <td>Accessing a character at a specific index</td>
            </tr>
            <tr>
              <td>Length</td>
              <td>O(1)</td>
              <td>Getting the length of a string</td>
            </tr>
            <tr>
              <td>Concatenation</td>
              <td>O(n+m)</td>
              <td>Joining two strings of lengths n and m</td>
            </tr>
            <tr>
              <td>Substring</td>
              <td>O(n)</td>
              <td>Extracting a substring of length n</td>
            </tr>
            <tr>
              <td>indexOf/includes</td>
              <td>O(n*m)</td>
              <td>Searching for a pattern of length m in a string of length n</td>
            </tr>
            <tr>
              <td>split</td>
              <td>O(n)</td>
              <td>Splitting a string of length n into an array</td>
            </tr>
            <tr>
              <td>replace</td>
              <td>O(n)</td>
              <td>Replacing occurrences in a string of length n</td>
            </tr>
            <tr>
              <td>toLowerCase/toUpperCase</td>
              <td>O(n)</td>
              <td>Converting case for a string of length n</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="overview-section">
        <h2>String Implementation</h2>
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
          code={stringImplementations[language]}
        />
      </section>

      <section className="overview-section">
        <h2>Related Problems</h2>
        <p>
          Practice your string manipulation skills with these problems:
        </p>
        <div className="overview-links">
          <ul>
            <li><Link to="/problems/strings/reverse-string-ii">Reverse String II</Link> - Reverse the first k characters for every 2k characters.</li>
            <li><Link to="/problems/strings/find-and-replace">Find And Replace in String</Link> - Perform replacements based on indices, sources, and targets.</li>
            {/* Add links to other string problems here */}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default StringsPage;
