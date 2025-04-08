import React from 'react';
import './StringVisualizer.css';

const StringVisualizer = ({ inputString, highlightIndices, operation, result }) => {
  return (
    <div className="string-visualizer">
      <div className="string-container">
        <div className="string-label">Input String</div>
        <div className="string-characters">
          {inputString.split('').map((char, index) => (
            <div 
              key={index} 
              className={`string-char ${highlightIndices.includes(index) ? 'highlighted' : ''}`}
            >
              <div className="char-value">{char}</div>
              <div className="char-index">{index}</div>
            </div>
          ))}
        </div>
      </div>
      
      {operation && (
        <div className="operation-info">
          <div className="operation-name">{operation}</div>
          {result !== undefined && (
            <div className="operation-result">
              <span className="result-label">Result:</span>
              <span className="result-value">{typeof result === 'string' ? result : JSON.stringify(result)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StringVisualizer;
