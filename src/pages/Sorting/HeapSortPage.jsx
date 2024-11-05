// src/pages/Sorting/HeapSortPage.jsx
import React from 'react';
import BaseSortingPage from './BaseSortingPage';

const HeapSortPage = () => {
  const heapSort = async (array, updateVisualization) => {
    const heapify = async (n, i) => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      await updateVisualization(array, [largest, left, right], [], [...sorted]);

      if (left < n && array[left] > array[largest]) {
        largest = left;
      }

      if (right < n && array[right] > array[largest]) {
        largest = right;
      }

      if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];
        await updateVisualization(array, [], [i, largest], [...sorted]);
        await heapify(n, largest);
      }
    };

    const sorted = new Set();
    // Build max heap
    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
      await heapify(array.length, i);
    }

    // Extract elements from heap one by one
    for (let i = array.length - 1; i > 0; i--) {
      [array[0], array[i]] = [array[i], array[0]];
      sorted.add(i);
      await updateVisualization(array, [], [0, i], [...sorted]);
      await heapify(i, 0);
    }
    sorted.add(0);
  };

  const implementations = {
    javascript: `
function heapSort(arr) {
  const heapify = (n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(n, largest);
    }
  };

  // Build max heap
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr.length, i);
  }

  // Extract elements from heap
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(i, 0);
  }

  return arr;
}`,
    python: `
def heap_sort(arr):
    def heapify(n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2

        if left < n and arr[left] > arr[largest]:
            largest = left

        if right < n and arr[right] > arr[largest]:
            largest = right

        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            heapify(n, largest)

    # Build max heap
    for i in range(len(arr) // 2 - 1, -1, -1):
        heapify(len(arr), i)

    # Extract elements from heap
    for i in range(len(arr) - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(i, 0)

    return arr`
  };

  const HeapSortExplanation = () => (
    <section className="explanation">
      <h2>Heap Sort Algorithm</h2>
      <p>
        Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure.
        It first builds a max heap and then repeatedly extracts the maximum element to create a sorted array.
      </p>

      <div className="features">
        <h3>How it Works:</h3>
        <ol>
          <li>Build a max heap from the input array</li>
          <li>Repeatedly extract the maximum element:
            <ul>
              <li>Swap root with last element</li>
              <li>Reduce heap size by 1</li>
              <li>Heapify the root</li>
            </ul>
          </li>
        </ol>

        <h3>Key Characteristics:</h3>
        <ul>
          <li>In-place sorting algorithm</li>
          <li>Not stable</li>
          <li>Based on comparison</li>
          <li>Uses heap data structure</li>
        </ul>

        <h3>Advantages:</h3>
        <ul>
          <li>Guaranteed O(n log n) time complexity</li>
          <li>In-place sorting</li>
          <li>No extra space needed</li>
        </ul>

        <h3>Disadvantages:</h3>
        <ul>
          <li>Not stable</li>
          <li>Poor cache performance</li>
          <li>Usually slower than Quick Sort</li>
        </ul>
      </div>
    </section>
  );

  return (
    <BaseSortingPage
      algorithmName="Heap Sort"
      sortFunction={heapSort}
      explanation={<HeapSortExplanation />}
      implementations={implementations}
      timeComplexity={{
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)'
      }}
      spaceComplexity="O(1)"
      stable={false}
    />
  );
};

export default HeapSortPage;