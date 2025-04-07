import React from 'react';
import './QueueVisualizer.css';

const QueueVisualizer = ({ queue, currentOperation, isDequeuing, isEnqueuing, newItem }) => {
  return (
    <div className="queue-visualizer">
      <div className="queue-container">
        <div className="queue-labels">
          <div className="front-label">Front</div>
          <div className="rear-label">Rear</div>
        </div>
        <div className="queue-elements">
          {queue.length === 0 ? (
            <div className="empty-queue-message">Queue is empty</div>
          ) : (
            <div className="queue-items">
              {queue.map((item, index) => (
                <div 
                  key={index} 
                  className={`queue-element ${index === 0 && isDequeuing ? 'dequeuing' : ''} ${index === 0 && currentOperation === 'peek' ? 'peeking' : ''}`}
                >
                  {item}
                </div>
              ))}
              {isEnqueuing && newItem !== undefined && (
                <div className="queue-element enqueuing">{newItem}</div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="queue-info">
        {currentOperation && (
          <div className="operation-info">
            <span className="operation-label">Operation:</span> 
            <span className="operation-value">{currentOperation.toUpperCase()}</span>
          </div>
        )}
        <div className="queue-size">
          <span className="size-label">Size:</span> 
          <span className="size-value">{queue.length}</span>
        </div>
      </div>
    </div>
  );
};

export default QueueVisualizer;
