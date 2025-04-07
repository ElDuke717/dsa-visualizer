import React from 'react';
import './StackVisualizer.css';

const StackVisualizer = ({ stack, currentOperation, isPopping, isPushing, newItem }) => {
  return (
    <div className="stack-visualizer">
      <div className="stack-container">
        <div className="stack-label">Top</div>
        <div className="stack-elements">
          {stack.length === 0 ? (
            <div className="empty-stack-message">Stack is empty</div>
          ) : (
            stack.map((item, index) => (
              <div 
                key={index} 
                className={`stack-element ${index === stack.length - 1 && isPopping ? 'popping' : ''} ${index === stack.length - 1 && currentOperation === 'peek' ? 'peeking' : ''}`}
              >
                {item}
              </div>
            ))
          )}
          {isPushing && newItem !== undefined && (
            <div className="stack-element pushing">{newItem}</div>
          )}
        </div>
        <div className="stack-base"></div>
      </div>
      
      <div className="stack-info">
        {currentOperation && (
          <div className="operation-info">
            <span className="operation-label">Operation:</span> 
            <span className="operation-value">{currentOperation.toUpperCase()}</span>
          </div>
        )}
        <div className="stack-size">
          <span className="size-label">Size:</span> 
          <span className="size-value">{stack.length}</span>
        </div>
      </div>
    </div>
  );
};

export default StackVisualizer;
