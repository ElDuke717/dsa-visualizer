// src/pages/Sorting/BaseSortingPage.jsx
import React, { useState } from 'react';
import SortingVisualizer from '../../components/DataStructureVisualizer/SortingVisualizer';
import CodeSnippet from '../../components/CodeSnippet/CodeSnippet';
import './SortingPage.css';

const BaseSortingPage = ({
  algorithmName,
  sortFunction,
  explanation,
  implementations,
  timeComplexity,
  spaceComplexity,
  stable = false,
}) => {
  const [array, setArray] = useState([]);
  const [comparing, setComparing] = useState([]);
  const [swapping, setSwapping] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const [arraySize, setArraySize] = useState(20);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const generateRandomArray = () => {
    const newArray = Array(arraySize).fill(0).map(() => 
      Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    setSorted([]);
  };

  const updateVisualization = async (
    currentArray,
    comparingIndices = [],
    swappingIndices = [],
    sortedIndices = []
  ) => {
    setArray([...currentArray]);
    setComparing(comparingIndices);
    setSwapping(swappingIndices);
    setSorted(sortedIndices);
    await sleep(100); // Adjust speed here
  };

  const runSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    await sortFunction(array, updateVisualization);
    setSorted(Array.from(array.keys()));
    setComparing([]);
    setSwapping([]);
    setIsSorting(false);
  };

  return (
    <div className="page-container">
      <h1>{algorithmName}</h1>

      <section className="visualization">
        <SortingVisualizer
          array={array}
          comparing={comparing}
          swapping={swapping}
          sorted={sorted}
        />
        <div className="controls">
          <div className="input-group">
            <label>Array Size:</label>
            <input
              type="range"
              min="5"
              max="50"
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
              disabled={isSorting}
            />
            <span>{arraySize}</span>
          </div>
          <div className="button-group">
            <button 
              onClick={generateRandomArray}
              disabled={isSorting}
            >
              Generate New Array
            </button>
            <button 
              onClick={runSort}
              disabled={isSorting || array.length === 0}
            >
              Sort
            </button>
          </div>
        </div>
      </section>

      <section className="complexity-info">
        <div className="complexity-item">
          <h3>Time Complexity</h3>
          <p>Best: {timeComplexity.best}</p>
          <p>Average: {timeComplexity.average}</p>
          <p>Worst: {timeComplexity.worst}</p>
        </div>
        <div className="complexity-item">
          <h3>Space Complexity</h3>
          <p>{spaceComplexity}</p>
        </div>
        <div className="complexity-item">
          <h3>Stability</h3>
          <p>{stable ? 'Stable' : 'Not Stable'}</p>
        </div>
      </section>

      {explanation}

      <section className="implementation">
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

export default BaseSortingPage;