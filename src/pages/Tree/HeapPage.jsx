// src/pages/Tree/HeapPage.jsx
import React, { useState } from 'react';
import TreeVisualizer from '../../components/DataStructureVisualizer/TreeVisualizer';
import CodeSnippet from '../../components/CodeSnippet/CodeSnippet';
import './TreePage.css';

const HeapPage = () => {
  const [language, setLanguage] = useState('javascript');
  const [heapArray, setHeapArray] = useState([4, 8, 6, 9, 10, 15, 7]);
  const [newValue, setNewValue] = useState('');
  const [currentNode, setCurrentNode] = useState(null);
  const [highlightedNodes, setHighlightedNodes] = useState(new Set());
  const [isMinHeap, setIsMinHeap] = useState(true);

  // Convert array to tree structure for visualization
  const arrayToTree = (array, index = 0) => {
    if (index >= array.length) return null;

    return {
      value: array[index],
      left: arrayToTree(array, 2 * index + 1),
      right: arrayToTree(array, 2 * index + 2)
    };
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const heapifyUp = async (index) => {
    const array = [...heapArray];
    let currentIndex = index;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      
      setCurrentNode(array[currentIndex]);
      setHighlightedNodes(new Set([array[parentIndex]]));
      await sleep(1000);

      if ((isMinHeap && array[currentIndex] < array[parentIndex]) ||
          (!isMinHeap && array[currentIndex] > array[parentIndex])) {
        // Swap
        [array[currentIndex], array[parentIndex]] = 
        [array[parentIndex], array[currentIndex]];
        currentIndex = parentIndex;
      } else {
        break;
      }
      setHeapArray(array);
    }
    
    setCurrentNode(null);
    setHighlightedNodes(new Set());
  };

  const heapifyDown = async (index) => {
    const array = [...heapArray];
    let currentIndex = index;
    
    while (true) {
      let smallestOrLargest = currentIndex;
      const leftChild = 2 * currentIndex + 1;
      const rightChild = 2 * currentIndex + 2;

      setCurrentNode(array[currentIndex]);
      const highlightSet = new Set();
      if (leftChild < array.length) highlightSet.add(array[leftChild]);
      if (rightChild < array.length) highlightSet.add(array[rightChild]);
      setHighlightedNodes(highlightSet);
      await sleep(1000);

      if (isMinHeap) {
        if (leftChild < array.length && array[leftChild] < array[smallestOrLargest]) {
          smallestOrLargest = leftChild;
        }
        if (rightChild < array.length && array[rightChild] < array[smallestOrLargest]) {
          smallestOrLargest = rightChild;
        }
      } else {
        if (leftChild < array.length && array[leftChild] > array[smallestOrLargest]) {
          smallestOrLargest = leftChild;
        }
        if (rightChild < array.length && array[rightChild] > array[smallestOrLargest]) {
          smallestOrLargest = rightChild;
        }
      }

      if (smallestOrLargest !== currentIndex) {
        [array[currentIndex], array[smallestOrLargest]] = 
        [array[smallestOrLargest], array[currentIndex]];
        currentIndex = smallestOrLargest;
        setHeapArray(array);
      } else {
        break;
      }
    }

    setCurrentNode(null);
    setHighlightedNodes(new Set());
  };

  const insert = async (value) => {
    if (value === '') return;
    const newValue = parseInt(value);
    const newArray = [...heapArray, newValue];
    setHeapArray(newArray);
    await heapifyUp(newArray.length - 1);
    setNewValue('');
  };

  const extractRoot = async () => {
    if (heapArray.length === 0) return;

    const newArray = [...heapArray];
    const root = newArray[0];
    newArray[0] = newArray[newArray.length - 1];
    newArray.pop();
    setHeapArray(newArray);

    if (newArray.length > 0) {
      await heapifyDown(0);
    }

    return root;
  };

  const heapImplementations = {
    javascript: `
class MinHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = 
    [this.heap[index2], this.heap[index1]];
  }

  heapifyUp(index) {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      
      if (this.heap[index] < this.heap[parentIndex]) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  heapifyDown(index) {
    while (true) {
      let smallest = index;
      const leftChild = this.getLeftChildIndex(index);
      const rightChild = this.getRightChildIndex(index);

      if (leftChild < this.heap.length && 
          this.heap[leftChild] < this.heap[smallest]) {
        smallest = leftChild;
      }

      if (rightChild < this.heap.length && 
          this.heap[rightChild] < this.heap[smallest]) {
        smallest = rightChild;
      }

      if (smallest !== index) {
        this.swap(index, smallest);
        index = smallest;
      } else {
        break;
      }
    }
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    
    const min = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    
    if (this.heap.length > 0) {
      this.heapifyDown(0);
    }
    
    return min;
  }

  peek() {
    return this.heap[0];
  }
}`,
    python: `
class MinHeap:
    def __init__(self):
        self.heap = []
    
    def parent(self, index):
        return (index - 1) // 2
    
    def left_child(self, index):
        return 2 * index + 1
    
    def right_child(self, index):
        return 2 * index + 2
    
    def swap(self, index1, index2):
        self.heap[index1], self.heap[index2] = \
        self.heap[index2], self.heap[index1]
    
    def heapify_up(self, index):
        while index > 0:
            parent_idx = self.parent(index)
            
            if self.heap[index] < self.heap[parent_idx]:
                self.swap(index, parent_idx)
                index = parent_idx
            else:
                break
    
    def heapify_down(self, index):
        while True:
            smallest = index
            left = self.left_child(index)
            right = self.right_child(index)
            
            if left < len(self.heap) and \
               self.heap[left] < self.heap[smallest]:
                smallest = left
            
            if right < len(self.heap) and \
               self.heap[right] < self.heap[smallest]:
                smallest = right
            
            if smallest != index:
                self.swap(index, smallest)
                index = smallest
            else:
                break
    
    def insert(self, value):
        self.heap.append(value)
        self.heapify_up(len(self.heap) - 1)
    
    def extract_min(self):
        if not self.heap:
            return None
        
        min_val = self.heap[0]
        self.heap[0] = self.heap[-1]
        self.heap.pop()
        
        if self.heap:
            self.heapify_down(0)
        
        return min_val
    
    def peek(self):
        return self.heap[0] if self.heap else None`
  };

  const HeapExplanation = () => (
    <section className="explanation">
      <h2>{isMinHeap ? 'Min Heap' : 'Max Heap'}</h2>
      <p>
        A heap is a specialized tree-based data structure that satisfies the heap property. 
        In a min heap, for any given node I, the value of I is less than or equal to the values of its children.
        In a max heap, the value of I is greater than or equal to the values of its children.
      </p>

      <div className="features">
        <h3>Key Characteristics:</h3>
        <ul>
          <li>Complete binary tree</li>
          <li>Heap property (min or max)</li>
          <li>Efficient implementation using arrays</li>
          <li>Root is always the minimum (min heap) or maximum (max heap) element</li>
        </ul>

        <h3>Common Applications:</h3>
        <ul>
          <li>Priority Queues</li>
          <li>Heap Sort</li>
          <li>Finding kth largest/smallest element</li>
          <li>Scheduling algorithms</li>
        </ul>

        <h3>Time Complexities:</h3>
        <ul>
          <li>Insert: O(log n)</li>
          <li>Extract Min/Max: O(log n)</li>
          <li>Peek: O(1)</li>
          <li>Build Heap: O(n)</li>
        </ul>

        <h3>Array Implementation:</h3>
        <ul>
          <li>Parent: (i-1)/2</li>
          <li>Left Child: 2i + 1</li>
          <li>Right Child: 2i + 2</li>
        </ul>
      </div>
    </section>
  );

  return (
    <div className="page-container">
      <h1>Heap Implementation</h1>

      <section className="visualization">
        <div className="heap-controls">
          <button 
            onClick={() => setIsMinHeap(!isMinHeap)}
            className="heap-type-button"
          >
            Switch to {isMinHeap ? 'Max' : 'Min'} Heap
          </button>
        </div>
        <TreeVisualizer
          nodes={[arrayToTree(heapArray)]}
          currentNode={currentNode}
          highlightedNodes={highlightedNodes}
        />
        <div className="controls">
          <input
            type="number"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Enter value"
          />
          <button onClick={() => insert(newValue)}>Insert</button>
          <button onClick={extractRoot}>
            Extract {isMinHeap ? 'Min' : 'Max'}
          </button>
        </div>
      </section>

      <HeapExplanation />

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
          code={heapImplementations[language]}
        />
      </section>
    </div>
  );
};

export default HeapPage;