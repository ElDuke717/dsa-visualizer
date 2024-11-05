// src/pages/Sorting/InsertionSortPage.jsx
import React from 'react';
import BaseSortingPage from './BaseSortingPage';

const InsertionSortPage = () => {
  const insertionSort = async (array, updateVisualization) => {
    const sorted = new Set();
    sorted.add(0); // First element is initially sorted

    for (let i = 1; i < array.length; i++) {
      const current = array[i];
      let j = i - 1;

      // Highlight current element being inserted
      await updateVisualization(array, [i], [], [...sorted]);

      while (j >= 0 && array[j] > current) {
        // Highlight comparison
        await updateVisualization(array, [j], [j + 1], [...sorted]);
        
        array[j + 1] = array[j];
        j--;
      }

      array[j + 1] = current;
      sorted.add(i);
      
      // Show insertion
      await updateVisualization(array, [], [], [...sorted]);
    }
  };

  const implementations = {
    javascript: `
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = current;
  }
  
  return arr;
}`,
    python: `
def insertion_sort(arr):
    for i in range(1, len(arr)):
        current = arr[i]
        j = i - 1
        
        while j >= 0 and arr[j] > current:
            arr[j + 1] = arr[j]
            j -= 1
            
        arr[j + 1] = current
    
    return arr`
  };

  const InsertionSortExplanation = () => (
    <section className="explanation">
      <h2>Insertion Sort Algorithm</h2>
      <p>
        Insertion Sort is a simple sorting algorithm that builds the final sorted array 
        one item at a time. It works similarly to how most people sort playing cards in their hands.
      </p>

      <div className="features">
        <h3>How it Works:</h3>
        <ol>
          <li>Start with the first element as sorted portion</li>
          <li>Take next element and insert it into correct position in sorted portion</li>
          <li>Repeat until all elements are sorted</li>
          <li>Each iteration increases sorted portion by one element</li>
        </ol>

        <h3>Key Characteristics:</h3>
        <ul>
          <li>In-place sorting</li>
          <li>Stable sorting algorithm</li>
          <li>Adaptive: performs better for partially sorted arrays</li>
          <li>Online: can sort a list as it receives it</li>
        </ul>

        <h3>Advantages:</h3>
        <ul>
          <li>Simple implementation</li>
          <li>Efficient for small data sets</li>
          <li>Adaptive: O(n) time when nearly sorted</li>
          <li>In-place: O(1) extra space</li>
          <li>Online: can sort as it receives input</li>
          <li>Stable sorting algorithm</li>
        </ul>

        <h3>Disadvantages:</h3>
        <ul>
          <li>O(n²) time complexity in average and worst cases</li>
          <li>Not suitable for large datasets</li>
          <li>Generally performs worse than advanced algorithms</li>
        </ul>

        <h3>Use Cases:</h3>
        <ul>
          <li>Small datasets</li>
          <li>Nearly sorted arrays</li>
          <li>Online sorting (sorting as data arrives)</li>
          <li>When stable sort is needed</li>
          <li>When simplicity is preferred</li>
        </ul>
      </div>
    </section>
  );

  return (
    <BaseSortingPage
      algorithmName="Insertion Sort"
      sortFunction={insertionSort}
      explanation={<InsertionSortExplanation />}
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

export default InsertionSortPage;