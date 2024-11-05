// src/pages/Sorting/BubbleSortPage.jsx
import React from 'react';
import BaseSortingPage from './BaseSortingPage';

const BubbleSortPage = () => {
  const bubbleSort = async (array, updateVisualization) => {
    const sorted = new Set();
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      
      for (let j = 0; j < n - i - 1; j++) {
        // Highlight current comparison
        await updateVisualization(array, [j, j + 1], [], [...sorted]);
        
        if (array[j] > array[j + 1]) {
          // Highlight swap
          await updateVisualization(array, [], [j, j + 1], [...sorted]);
          
          // Swap elements
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          swapped = true;
        }
      }
      
      // Mark last element as sorted
      sorted.add(n - i - 1);
      
      // If no swapping occurred, array is sorted
      if (!swapped) {
        // Mark remaining elements as sorted
        for (let k = 0; k < n - i - 1; k++) {
          sorted.add(k);
        }
        break;
      }
    }
    
    sorted.add(0); // Mark first element as sorted
  };

  const implementations = {
    javascript: `
function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    
    // If no swapping occurred, array is sorted
    if (!swapped) break;
  }
  
  return arr;
}`,
    python: `
def bubble_sort(arr):
    n = len(arr)
    
    for i in range(n - 1):
        swapped = False
        
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # If no swapping occurred, array is sorted
        if not swapped:
            break
    
    return arr`
  };

  const BubbleSortExplanation = () => (
    <section className="explanation">
      <h2>Bubble Sort Algorithm</h2>
      <p>
        Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, 
        compares adjacent elements and swaps them if they are in the wrong order.
      </p>

      <div className="features">
        <h3>How it Works:</h3>
        <ol>
          <li>Compare adjacent elements</li>
          <li>Swap them if they are in wrong order</li>
          <li>Repeat for each pair in unsorted portion</li>
          <li>After each pass, largest unsorted element "bubbles up" to its correct position</li>
        </ol>

        <h3>Key Characteristics:</h3>
        <ul>
          <li>In-place sorting</li>
          <li>Stable sorting algorithm</li>
          <li>Simple implementation</li>
          <li>Good for educational purposes</li>
        </ul>

        <h3>Advantages:</h3>
        <ul>
          <li>Simple to understand and implement</li>
          <li>Requires no additional memory space</li>
          <li>Stable sorting algorithm</li>
          <li>Adaptive: O(n) when nearly sorted</li>
        </ul>

        <h3>Disadvantages:</h3>
        <ul>
          <li>O(n²) time complexity</li>
          <li>Not suitable for large datasets</li>
          <li>Not very efficient in practice</li>
        </ul>

        <h3>Use Cases:</h3>
        <ul>
          <li>Educational purposes</li>
          <li>Small datasets</li>
          <li>When simplicity is preferred</li>
          <li>When stable sorting is needed</li>
        </ul>
      </div>
    </section>
  );

  return (
    <BaseSortingPage
      algorithmName="Bubble Sort"
      sortFunction={bubbleSort}
      explanation={<BubbleSortExplanation />}
      implementations={implementations}
      timeComplexity={{
        best: 'O(n)',
        average: 'O(n²)',
        worst: 'O(n²)'
      }}
      spaceComplexity="O(1)"
      stable={true}
    />
  );
};

export default BubbleSortPage;