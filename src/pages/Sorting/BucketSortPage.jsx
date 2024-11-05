// src/pages/Sorting/BucketSortPage.jsx
import React from 'react';
import BaseSortingPage from './BaseSortingPage';

const BucketSortPage = () => {
  const bucketSort = async (array, updateVisualization) => {
    if (array.length === 0) return;

    // Find min and max values
    const min = Math.min(...array);
    const max = Math.max(...array);
    
    // Number of buckets (using square root of length as a common choice)
    const bucketCount = Math.floor(Math.sqrt(array.length));
    const buckets = Array.from({ length: bucketCount }, () => []);
    const sorted = new Set();

    // Distribute elements into buckets
    const range = (max - min) / bucketCount;
    
    for (let i = 0; i < array.length; i++) {
      const bucketIndex = Math.floor((array[i] - min) / range);
      // Place in last bucket if it's the max value
      const targetBucket = bucketIndex === bucketCount ? bucketCount - 1 : bucketIndex;
      buckets[targetBucket].push(array[i]);
      
      // Highlight current element being distributed
      await updateVisualization(array, [i], [], [...sorted]);
    }

    // Sort individual buckets (using insertion sort)
    let currentIndex = 0;
    for (let bucket of buckets) {
      // Sort each bucket
      bucket.sort((a, b) => a - b);
      
      // Copy back to original array
      for (let item of bucket) {
        array[currentIndex] = item;
        sorted.add(currentIndex);
        await updateVisualization(array, [], [currentIndex], [...sorted]);
        currentIndex++;
      }
    }
  };

  const implementations = {
    javascript: `
function bucketSort(arr) {
  if (arr.length === 0) return arr;

  // Find min and max values
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  
  // Create buckets
  const bucketCount = Math.floor(Math.sqrt(arr.length));
  const buckets = Array.from(
    { length: bucketCount }, 
    () => []
  );
  
  // Distribute elements
  const range = (max - min) / bucketCount;
  for (let num of arr) {
    const index = Math.floor((num - min) / range);
    const targetBucket = index === bucketCount 
      ? bucketCount - 1 
      : index;
    buckets[targetBucket].push(num);
  }
  
  // Sort buckets and concatenate
  let currentIndex = 0;
  for (let bucket of buckets) {
    bucket.sort((a, b) => a - b);
    for (let item of bucket) {
      arr[currentIndex] = item;
      currentIndex++;
    }
  }
  
  return arr;
}`,
    python: `
def bucket_sort(arr):
    if not arr:
        return arr
        
    # Find min and max values
    min_val, max_val = min(arr), max(arr)
    
    # Create buckets
    bucket_count = int(math.sqrt(len(arr)))
    buckets = [[] for _ in range(bucket_count)]
    
    # Distribute elements
    range_val = (max_val - min_val) / bucket_count
    for num in arr:
        index = int((num - min_val) / range_val)
        # Place in last bucket if max value
        target_bucket = (bucket_count - 1 
                        if index == bucket_count 
                        else index)
        buckets[target_bucket].append(num)
    
    # Sort buckets and concatenate
    current_index = 0
    for bucket in buckets:
        bucket.sort()
        for item in bucket:
            arr[current_index] = item
            current_index += 1
            
    return arr`
  };

  const BucketSortExplanation = () => (
    <section className="explanation">
      <h2>Bucket Sort Algorithm</h2>
      <p>
        Bucket Sort is a distribution-based sorting algorithm that works by distributing 
        elements into a number of buckets, then sorting these buckets individually.
      </p>

      <div className="features">
        <h3>How it Works:</h3>
        <ol>
          <li>Create a number of buckets (usually sqrt(n))</li>
          <li>Distribute elements into buckets based on their values</li>
          <li>Sort individual buckets (using another sorting algorithm)</li>
          <li>Concatenate all buckets in order</li>
        </ol>

        <h3>Key Characteristics:</h3>
        <ul>
          <li>Distribution sort</li>
          <li>Not in-place</li>
          <li>Stable (if using stable sort for buckets)</li>
          <li>Parallel processing possible</li>
        </ul>

        <h3>Advantages:</h3>
        <ul>
          <li>O(n) average case when data is uniformly distributed</li>
          <li>Can be parallelized</li>
          <li>Works well with floating-point numbers</li>
          <li>Can be combined with other sorting algorithms</li>
        </ul>

        <h3>Disadvantages:</h3>
        <ul>
          <li>Requires extra space</li>
          <li>Performance depends on data distribution</li>
          <li>Not ideal for integers with large ranges</li>
          <li>Overhead of managing buckets</li>
        </ul>

        <h3>Use Cases:</h3>
        <ul>
          <li>Floating-point numbers</li>
          <li>Uniformly distributed data</li>
          <li>When extra memory is available</li>
          <li>When parallel processing is possible</li>
        </ul>
      </div>
    </section>
  );

  return (
    <BaseSortingPage
      algorithmName="Bucket Sort"
      sortFunction={bucketSort}
      explanation={<BucketSortExplanation />}
      implementations={implementations}
      timeComplexity={{
        best: 'O(n + k)',
        average: 'O(n + k)',
        worst: 'O(n²)'
      }}
      spaceComplexity="O(n + k)"
      stable={true}
    />
  );
};

export default BucketSortPage;