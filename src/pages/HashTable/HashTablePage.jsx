// src/pages/HashTable/HashTablePage.jsx
import React, { useState } from 'react';
import HashTableVisualizer from '../../components/DataStructureVisualizer/HashTableVisualizer';
import CodeSnippet from '../../components/CodeSnippet/CodeSnippet';
import './HashTablePage.css';

const HashTablePage = () => {
  const [language, setLanguage] = useState('javascript');
  const [buckets, setBuckets] = useState({});
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [currentIndex, setCurrentIndex] = useState(null);
  const [highlightedKey, setHighlightedKey] = useState(null);
  const [size] = useState(10);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const hash = (key) => {
    let total = 0;
    for (let i = 0; i < key.length; i++) {
      total += key.charCodeAt(i);
    }
    return total % size;
  };

  const insert = async (key, value) => {
    if (!key || !value) return;

    const index = hash(key);
    setCurrentIndex(index);
    await sleep(1000);

    const newBuckets = { ...buckets };
    if (!newBuckets[index]) {
      newBuckets[index] = [];
    }

    // Update if key exists, otherwise add new entry
    const existingIndex = newBuckets[index].findIndex(item => item.key === key);
    if (existingIndex >= 0) {
      newBuckets[index][existingIndex].value = value;
    } else {
      newBuckets[index].push({ key, value });
    }

    setBuckets(newBuckets);
    setHighlightedKey(key);
    await sleep(1000);
    
    setCurrentIndex(null);
    setHighlightedKey(null);
    setKey('');
    setValue('');
  };

  const get = async (key) => {
    const index = hash(key);
    setCurrentIndex(index);
    await sleep(1000);

    if (buckets[index]) {
      const item = buckets[index].find(item => item.key === key);
      if (item) {
        setHighlightedKey(key);
        await sleep(1000);
      }
    }

    setCurrentIndex(null);
    setHighlightedKey(null);
  };

  const remove = async (key) => {
    const index = hash(key);
    setCurrentIndex(index);
    await sleep(1000);

    if (buckets[index]) {
      const newBuckets = { ...buckets };
      newBuckets[index] = newBuckets[index].filter(item => item.key !== key);
      if (newBuckets[index].length === 0) {
        delete newBuckets[index];
      }
      setBuckets(newBuckets);
    }

    setCurrentIndex(null);
    setKey('');
  };

  const hashTableImplementations = {
    javascript: `
class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    const WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const char = key[i];
      const value = char.charCodeAt(0) - 96;
      total = (total * WEIRD_PRIME + value) % this.keyMap.length;
    }
    return total;
  }

  set(key, value) {
    const index = this._hash(key);
    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }
    
    // Update if key exists
    const existingPair = this.keyMap[index].find(item => item[0] === key);
    if (existingPair) {
      existingPair[1] = value;
    } else {
      this.keyMap[index].push([key, value]);
    }
    
    return this;
  }

  get(key) {
    const index = this._hash(key);
    if (this.keyMap[index]) {
      const pair = this.keyMap[index].find(item => item[0] === key);
      return pair ? pair[1] : undefined;
    }
    return undefined;
  }

  keys() {
    const keys = [];
    for (let bucket of this.keyMap) {
      if (bucket) {
        for (let item of bucket) {
          keys.push(item[0]);
        }
      }
    }
    return keys;
  }

  values() {
    const values = [];
    for (let bucket of this.keyMap) {
      if (bucket) {
        for (let item of bucket) {
          if (!values.includes(item[1])) {
            values.push(item[1]);
          }
        }
      }
    }
    return values;
  }
}`,
    python: `
class HashTable:
    def __init__(self, size=53):
        self.key_map = [None] * size
    
    def _hash(self, key):
        total = 0
        WEIRD_PRIME = 31
        for i in range(min(len(key), 100)):
            char = key[i]
            value = ord(char) - 96
            total = (total * WEIRD_PRIME + value) % len(self.key_map)
        return total
    
    def set(self, key, value):
        index = self._hash(key)
        if not self.key_map[index]:
            self.key_map[index] = []
            
        # Update if key exists
        for item in self.key_map[index]:
            if item[0] == key:
                item[1] = value
                return self
                
        self.key_map[index].append([key, value])
        return self
    
    def get(self, key):
        index = self._hash(key)
        if self.key_map[index]:
            for item in self.key_map[index]:
                if item[0] == key:
                    return item[1]
        return None
    
    def keys(self):
        keys = []
        for bucket in self.key_map:
            if bucket:
                for item in bucket:
                    keys.append(item[0])
        return keys
    
    def values(self):
        values = []
        for bucket in self.key_map:
            if bucket:
                for item in bucket:
                    if item[1] not in values:
                        values.append(item[1])
        return values`
  };

  const HashTableExplanation = () => (
    <section className="explanation">
      <h2>Hash Table</h2>
      <p>
        A hash table is a data structure that implements an associative array abstract data type, 
        a structure that can map keys to values. It uses a hash function to compute an index into 
        an array of buckets or slots.
      </p>

      <div className="features">
        <h3>Key Characteristics:</h3>
        <ul>
          <li>Fast access for key-value pairs</li>
          <li>Uses hashing to compute index</li>
          <li>Handles collisions through chaining or open addressing</li>
          <li>Dynamic resizing for load balancing</li>
        </ul>

        <h3>Time Complexities:</h3>
        <ul>
          <li>Insert: O(1) average, O(n) worst</li>
          <li>Delete: O(1) average, O(n) worst</li>
          <li>Search: O(1) average, O(n) worst</li>
        </ul>

        <h3>Common Applications:</h3>
        <ul>
          <li>Database indexing</li>
          <li>Caching</li>
          <li>Symbol tables in compilers</li>
          <li>Associative arrays</li>
          <li>Counting frequencies</li>
        </ul>

        <h3>Collision Resolution:</h3>
        <ul>
          <li>Chaining (implemented here)</li>
          <li>Open Addressing
            <ul>
              <li>Linear Probing</li>
              <li>Quadratic Probing</li>
              <li>Double Hashing</li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );

  return (
    <div className="page-container">
      <h1>Hash Table Implementation</h1>

      <section className="visualization">
        <HashTableVisualizer
          buckets={buckets}
          currentIndex={currentIndex}
          highlightedKey={highlightedKey}
          size={size}
        />
        <div className="controls">
          <div className="input-group">
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Key"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Value"
            />
          </div>
          <div className="button-group">
            <button onClick={() => insert(key, value)}>Insert</button>
            <button onClick={() => get(key)}>Get</button>
            <button onClick={() => remove(key)}>Remove</button>
          </div>
        </div>
      </section>

      <HashTableExplanation />

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
          code={hashTableImplementations[language]}
        />
      </section>
    </div>
  );
};

export default HashTablePage;