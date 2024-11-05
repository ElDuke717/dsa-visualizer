// src/pages/Sorting/QuickSortPage.jsx
import React from 'react';
import BaseSortingPage from './BaseSortingPage';

const QuickSortPage = () => {
  const quickSort = async (array, updateVisualization) => {
    const partition = async (low, high) => {
      const pivot = array[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        await updateVisualization(array, [j, high], [], [...sorted]);
        if (array[j] < pivot) {
          i++;
          [array[i], array[j]] = [array[j], array[i]];
          await updateVisualization(array, [j, high], [i, j], [...sorted]);
        }
      }
      [array[i + 1], array[high]] = [array[high], array[i + 1]];
      await updateVisualization(array, [], [i + 1, high], [...sorted]);
      return i + 1;
    };

    const sorted = new Set();
    const sort = async (low, high) => {
      if (low < high) {
        const pi = await partition(low, high);
        sorted.add(pi);
        await sort(low, pi - 1);
        await sort(pi + 1, high);
      } else if (low === high) {
        sorted.add(low);
      }
    };

    await sort(0, array.length - 1);
  };

  const implementations = {
    javascript: `
function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const partition = (low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  };

  const sort = (low, high) => {
    if (low < high) {
      const pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    }
  };

  sort(0, arr.length - 1);
  return arr;
}`,
    python: `
def quick_sort(arr):
    def partition(low, high):
        pivot = arr[high]
        i = low - 1
        
        for j in range(low, high):
            if arr[j] < pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]
                
        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        return i + 1
    
    def sort(low, high):
        if low < high:
            pi = partition(low, high)
            sort(low, pi - 1)
            sort(pi + 1, high)
    
    sort(0, len(arr) - 1)
    return arr`
  };

  const QuickSortExplanation = () => (
    <section className="explanation">
      <h2>Quick Sort Algorithm</h2>
      <p>
        Quick Sort is a highly efficient, comparison-based sorting algorithm that uses 
        a divide-and-conquer strategy. It works by selecting a 'pivot' element and 
        partitioning the array around it.
      </p>

      <div className="features">
        <h3>How it Works:</h3>
        <ol>
          <li>Choose a pivot element from the array</li>
          <li>Partition the array around the pivot:
            <ul>
              <li>Move elements smaller than pivot to the left</li>
              <li>Move elements larger than pivot to the right</li>
            </ul>
          </li>
          <li>Recursively apply steps 1-2 to the sub-arrays</li>
        </ol>

        <h3>Key Characteristics:</h3>
        <ul>
          <li>In-place sorting</li>
          <li>Unstable sort</li>
          <li>Recursive algorithm</li>
          <li>Efficient for large datasets</li>
        </ul>

        <h3>Advantages:</h3>
        <ul>
          <li>Very fast in practice</li>
          <li>Low space complexity</li>
          <li>Cache friendly</li>
          <li>Can be implemented as in-place sort</li>
        </ul>

        <h3>Disadvantages:</h3>
        <ul>
          <li>Unstable sorting algorithm</li>
          <li>Poor performance on already sorted arrays (with last element as pivot)</li>
          <li>O(n²) worst case</li>
        </ul>
      </div>
    </section>
  );

  return (
    <BaseSortingPage
      algorithmName="Quick Sort"
      sortFunction={quickSort}
      explanation={<QuickSortExplanation />}
      implementations={implementations}
      timeComplexity={{
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n²)'
      }}
      spaceComplexity="O(log n)"
      stable={false}
    />
  );
};

export default QuickSortPage;