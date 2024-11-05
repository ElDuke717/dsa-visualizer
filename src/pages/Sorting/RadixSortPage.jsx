// src/pages/Sorting/RadixSortPage.jsx
import React from 'react';
import BaseSortingPage from './BaseSortingPage';

const RadixSortPage = () => {
  const getMax = (arr) => {
    return Math.max(...arr);
  };

  const countingSortForRadix = async (array, exp, updateVisualization) => {
    const output = new Array(array.length).fill(0);
    const count = new Array(10).fill(0);
    const sorted = new Set();

    // Store count of occurrences
    for (let i = 0; i < array.length; i++) {
      const digit = Math.floor(array[i] / exp) % 10;
      count[digit]++;
      await updateVisualization(array, [i], [], [...sorted]);
    }

    // Change count[i] so that count[i] contains actual
    // position of this digit in output[]
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = array.length - 1; i >= 0; i--) {
      const digit = Math.floor(array[i] / exp) % 10;
      output[count[digit] - 1] = array[i];
      count[digit]--;
      await updateVisualization([...array], [], [i], [...sorted]);
    }

    // Copy the output array to array[]
    for (let i = 0; i < array.length; i++) {
      array[i] = output[i];
      if (exp >= getMax(array)) {
        sorted.add(i);
      }
      await updateVisualization(array, [], [], [...sorted]);
    }
  };

  const radixSort = async (array, updateVisualization) => {
    const max = getMax(array);

    // Do counting sort for every digit
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      await countingSortForRadix(array, exp, updateVisualization);
    }
  };

  const implementations = {
    javascript: `
function radixSort(arr) {
  const getMax = (arr) => {
    return Math.max(...arr);
  };

  const countingSort = (arr, exp) => {
    const output = new Array(arr.length).fill(0);
    const count = new Array(10).fill(0);

    // Store count of occurrences
    for (let i = 0; i < arr.length; i++) {
      count[Math.floor(arr[i] / exp) % 10]++;
    }

    // Change count[i] so that count[i] contains actual
    // position of this digit in output[]
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = arr.length - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10;
      output[count[digit] - 1] = arr[i];
      count[digit]--;
    }

    // Copy the output array to arr[]
    for (let i = 0; i < arr.length; i++) {
      arr[i] = output[i];
    }
  };

  const max = getMax(arr);

  // Do counting sort for every digit
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSort(arr, exp);
  }

  return arr;
}`,
    python: `
def radix_sort(arr):
    def get_max(arr):
        return max(arr)
    
    def counting_sort(arr, exp):
        n = len(arr)
        output = [0] * n
        count = [0] * 10
        
        # Store count of occurrences
        for i in range(n):
            digit = (arr[i] // exp) % 10
            count[digit] += 1
        
        # Change count[i] so that count[i] contains actual
        # position of this digit in output[]
        for i in range(1, 10):
            count[i] += count[i - 1]
        
        # Build the output array
        i = n - 1
        while i >= 0:
            digit = (arr[i] // exp) % 10
            output[count[digit] - 1] = arr[i]
            count[digit] -= 1
            i -= 1
        
        # Copy the output array to arr[]
        for i in range(n):
            arr[i] = output[i]
    
    # Find the maximum number to know number of digits
    max_num = get_max(arr)
    
    # Do counting sort for every digit
    exp = 1
    while max_num // exp > 0:
        counting_sort(arr, exp)
        exp *= 10
        
    return arr`
  };

  const RadixSortExplanation = () => (
    <section className="explanation">
      <h2>Radix Sort Algorithm</h2>
      <p>
        Radix Sort is a non-comparative integer sorting algorithm that sorts data with integer keys by 
        grouping the keys by individual digits that share the same significant position and value.
      </p>

      <div className="features">
        <h3>How it Works:</h3>
        <ol>
          <li>Find the maximum element to determine number of digits</li>
          <li>For each digit position (1s, 10s, 100s, etc.):
            <ul>
              <li>Sort numbers based on the current digit position</li>
              <li>Use counting sort as a subroutine</li>
            </ul>
          </li>
          <li>Repeat until all digits are processed</li>
        </ol>

        <h3>Key Characteristics:</h3>
        <ul>
          <li>Non-comparison based</li>
          <li>Stable algorithm</li>
          <li>Works with integers or strings</li>
          <li>Uses counting sort as a subroutine</li>
        </ul>

        <h3>Advantages:</h3>
        <ul>
          <li>Linear time complexity for fixed number of digits</li>
          <li>Stable sorting algorithm</li>
          <li>Works well with fixed-length integers</li>
          <li>Can be faster than comparison based sorts</li>
        </ul>

        <h3>Disadvantages:</h3>
        <ul>
          <li>Requires extra space</li>
          <li>Only works with discrete values</li>
          <li>Performance depends on digit count</li>
          <li>Not suitable for floating-point numbers</li>
        </ul>

        <h3>Time Complexity Analysis:</h3>
        <ul>
          <li>d = number of digits</li>
          <li>n = number of elements</li>
          <li>Each counting sort takes O(n + k) time where k is range of numbers</li>
          <li>Total time complexity: O(d(n + k))</li>
        </ul>
      </div>
    </section>
  );

  return (
    <BaseSortingPage
      algorithmName="Radix Sort"
      sortFunction={radixSort}
      explanation={<RadixSortExplanation />}
      implementations={implementations}
      timeComplexity={{
        best: 'O(nk)',
        average: 'O(nk)',
        worst: 'O(nk)'
      }}
      spaceComplexity="O(n + k)"
      stable={true}
    />
  );
};

export default RadixSortPage;