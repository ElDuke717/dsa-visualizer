// src/pages/Sorting/CountingSortPage.jsx
import React from 'react';
import BaseSortingPage from './BaseSortingPage';

const CountingSortPage = () => {
  const countingSort = async (array, updateVisualization) => {
    const max = Math.max(...array);
    const min = Math.min(...array);
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    const output = new Array(array.length);
    const sorted = new Set();

    // Count occurrences
    for (let i = 0; i < array.length; i++) {
      count[array[i] - min]++;
      await updateVisualization(array, [i], [], [...sorted]);
    }

    // Calculate cumulative count
    for (let i = 1; i < count.length; i++) {
      count[i] += count[i - 1];
    }

    // Build output array
    for (let i = array.length - 1; i >= 0; i--) {
      output[count[array[i] - min] - 1] = array[i];
      count[array[i] - min]--;
      await updateVisualization([...output], [], [i], [...sorted]);
    }

    // Copy output to original array
    for (let i = 0; i < array.length; i++) {
      array[i] = output[i];
      sorted.add(i);
      await updateVisualization(array, [], [], [...sorted]);
    }
  };

  const implementations = {
    javascript: `
function countingSort(arr) {
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(arr.length);

  // Count occurrences
  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;
  }

  // Calculate cumulative count
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  // Build output array
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
  }

  // Copy output to original array
  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
  }

  return arr;
}`,
    python: `
def counting_sort(arr):
    max_val = max(arr)
    min_val = min(arr)
    range_val = max_val - min_val + 1
    count = [0] * range_val
    output = [0] * len(arr)

    # Count occurrences
    for i in range(len(arr)):
        count[arr[i] - min_val] += 1

    # Calculate cumulative count
    for i in range(1, len(count)):
        count[i] += count[i - 1]

    # Build output array
    for i in range(len(arr) - 1, -1, -1):
        output[count[arr[i] - min_val] - 1] = arr[i]
        count[arr[i] - min_val] -= 1

    # Copy output to original array
    for i in range(len(arr)):
        arr[i] = output[i]

    return arr`
  };

  const CountingSortExplanation = () => (
    <section className="explanation">
      <h2>Counting Sort Algorithm</h2>
      <p>
        Counting Sort is a non-comparison-based sorting algorithm that works by counting the number
        of objects having distinct key values and using arithmetic to determine the positions
        of each key value in the output sequence.
      </p>

      <div className="features">
        <h3>How it Works:</h3>
        <ol>
          <li>Find the range of input</li>
          <li>Count occurrences of each element</li>
          <li>Modify count array to contain actual positions</li>
          <li>Build output array using count array</li>
        </ol>

        <h3>Key Characteristics:</h3>
        <ul>
          <li>Non-comparison based</li>
          <li>Stable algorithm</li>
          <li>Integer sorting algorithm</li>
          <li>Linear time complexity</li>
        </ul>

        <h3>Advantages:</h3>
        <ul>
          <li>O(n) time complexity when range is O(n)</li>
          <li>Stable sorting algorithm</li>
          <li>Works well with small ranges</li>
        </ul>

        <h3>Disadvantages:</h3>
        <ul>
          <li>Requires extra space</li>
          <li>Only works with integers</li>
          <li>Range affects space complexity</li>
        </ul>
      </div>
    </section>
  );

  return (
    <BaseSortingPage
      algorithmName="Counting Sort"
      sortFunction={countingSort}
      explanation={<CountingSortExplanation />}
      implementations={implementations}
      timeComplexity={{
        best: 'O(n + k)',
        average: 'O(n + k)',
        worst: 'O(n + k)'
      }}
      spaceComplexity="O(k)"
      stable={true}
    />
  );
};

export default CountingSortPage;