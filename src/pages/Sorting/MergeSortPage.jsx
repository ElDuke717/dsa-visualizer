// src/pages/Sorting/MergeSortPage.jsx
import React from 'react';
import BaseSortingPage from './BaseSortingPage';

const MergeSortPage = () => {
  const mergeSort = async (array, updateVisualization) => {
    const merge = async (left, right, startIdx) => {
      let result = [];
      let i = 0;
      let j = 0;
      
      while (i < left.length && j < right.length) {
        await updateVisualization(
          array,
          [startIdx + i, startIdx + left.length + j],
          [],
          [...sorted]
        );
        
        if (left[i] <= right[j]) {
          result.push(left[i]);
          i++;
        } else {
          result.push(right[j]);
          j++;
        }
      }
      
      result = [...result, ...left.slice(i), ...right.slice(j)];
      
      // Copy back to original array
      for (let k = 0; k < result.length; k++) {
        array[startIdx + k] = result[k];
        await updateVisualization(
          array,
          [],
          [startIdx + k],
          [...sorted]
        );
      }
    };

    const sorted = new Set();
    const sort = async (start, end) => {
      if (end - start <= 1) {
        sorted.add(start);
        return;
      }

      const mid = Math.floor((start + end) / 2);
      await sort(start, mid);
      await sort(mid, end);
      await merge(
        array.slice(start, mid),
        array.slice(mid, end),
        start
      );

      for (let i = start; i < end; i++) {
        sorted.add(i);
      }
    };

    await sort(0, array.length);
  };

  const implementations = {
    javascript: `
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const merge = (left, right) => {
    let result = [];
    let i = 0;
    let j = 0;
    
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }
    
    return [...result, ...left.slice(i), ...right.slice(j)];
  };

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}`,
    python: `
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
        
    def merge(left, right):
        result = []
        i = j = 0
        
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                result.append(left[i])
                i += 1
            else:
                result.append(right[j])
                j += 1
                
        result.extend(left[i:])
        result.extend(right[j:])
        return result
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)`
  };

  const MergeSortExplanation = () => (
    <section className="explanation">
      <h2>Merge Sort Algorithm</h2>
      <p>
        Merge Sort is a divide-and-conquer algorithm that recursively breaks down a problem 
        into smaller, more manageable subproblems until they become simple enough to solve directly.
      </p>

      <div className="features">
        <h3>How it Works:</h3>
        <ol>
          <li>Divide the array into two halves</li>
          <li>Recursively sort the two halves</li>
          <li>Merge the sorted halves to produce a sorted array</li>
        </ol>

        <h3>Key Characteristics:</h3>
        <ul>
          <li>Stable sorting algorithm</li>
          <li>Divide-and-conquer approach</li>
          <li>Not in-place sorting</li>
          <li>Predictable performance</li>
        </ul>

        <h3>Advantages:</h3>
        <ul>
          <li>Guaranteed O(n log n) time complexity</li>
          <li>Stable sorting algorithm</li>
          <li>Works well with linked lists</li>
          <li>Predictable performance</li>
        </ul>

        <h3>Disadvantages:</h3>
        <ul>
          <li>Requires O(n) extra space</li>
          <li>Not in-place sorting</li>
          <li>Overkill for small arrays</li>
        </ul>
      </div>
    </section>
  );

  return (
    <BaseSortingPage
      algorithmName="Merge Sort"
      sortFunction={mergeSort}
      explanation={<MergeSortExplanation />}
      implementations={implementations}
      timeComplexity={{
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)'
      }}
      spaceComplexity="O(n)"
      stable={true}
    />
  );
};

export default MergeSortPage;