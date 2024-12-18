// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navigation/Navbar";
import BFSPage from "./pages/BFS/BFSPage";
import DFSPage from "./pages/DFS/DFSPage";
import SinglyLinkedListPage from "./pages/LinkedList/SinglyLinkedListPage";
import DoublyLinkedListPage from "./pages/LinkedList/DoublyLinkedListPage";
import BasicGraphPage from "./pages/Graph/BasicGraphPage";
import BinaryTreePage from "./pages/Tree/BinaryTreePage";
import HeapPage from "./pages/Tree/HeapPage";
import HashTablePage from "./pages/HashTable/HashTablePage";
import TreeTraversalPage from "./pages/Tree/TreeTraversalPage";
import {
  BubbleSortPage,
  InsertionSortPage,
  BucketSortPage,
  QuickSortPage,
  MergeSortPage,
  HeapSortPage,
  CountingSortPage,
  RadixSortPage,
} from "./pages/Sorting";
import SlidingWindowPage from "./pages/DynamicProgramming/SlidingWindowPage";
import TwoPointersPage from "./pages/DynamicProgramming/TwoPointersPage";
import BacktrackingPage from "./pages/DynamicProgramming/BacktrackingPage";
import TabulationPage from "./pages/DynamicProgramming/TabulationPage";
import MemoizationPage from "./pages/DynamicProgramming/MemoizationPage";
import NumberOfIslands from "./pages/Problems/Graphs/NumberOfIslands";
import MaxAreaIsland from "./pages/Problems/Graphs/MaxAreaIsland";
import EmployeeImportance from './pages/Problems/Graphs/EmployeeImportance';
import CloneGraph from './pages/Problems/Graphs/CloneGraph';
import SurroundedRegions from './pages/Problems/Graphs/SurroundedRegions';
import LevelOrderTraversal from "./pages/Problems/Trees/LevelOrderTraversal";
import MaximumDepth from "./pages/Problems/Trees/MaximumDepth";
import LowestCommonAncestor from "./pages/Problems/Trees/LowestCommonAncestor";
import LongestSubstring from "./pages/Problems/SlidingWindow/LongestSubstring";
import TwoSum from './pages/Problems/TwoPointers/TwoSum';
import Subsets from './pages/Problems/Backtracking/Subsets';
import ClimbingStairs from './pages/Problems/DP/ClimbingStairs';
import Cycle from './pages/Problems/LinkedLists/Cycle';
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/bfs" replace />} />

            <Route path="/graph/basic" element={<BasicGraphPage />} />
            <Route path="/graph/bfs" element={<BFSPage />} />
            <Route path="/graph/dfs" element={<DFSPage />} />
            <Route
              path="/linked-list/singly"
              element={<SinglyLinkedListPage />}
            />
            <Route
              path="/linked-list/doubly"
              element={<DoublyLinkedListPage />}
            />
            <Route path="/tree/binary" element={<BinaryTreePage />} />
            <Route path="/tree/heap" element={<HeapPage />} />
            <Route path="/tree/traversal" element={<TreeTraversalPage />} />
            <Route path="/hash-table" element={<HashTablePage />} />
            <Route path="/sorting/quick" element={<QuickSortPage />} />
            <Route path="/sorting/merge" element={<MergeSortPage />} />
            <Route path="/sorting/heap" element={<HeapSortPage />} />
            <Route path="/sorting/counting" element={<CountingSortPage />} />
            <Route path="/sorting/radix" element={<RadixSortPage />} />
            <Route path="/sorting/bubble" element={<BubbleSortPage />} />
            <Route path="/sorting/insertion" element={<InsertionSortPage />} />
            <Route path="/sorting/bucket" element={<BucketSortPage />} />
            <Route path="/dp/sliding-window" element={<SlidingWindowPage />} />
            <Route path="/dp/two-pointers" element={<TwoPointersPage />} />
            <Route path="/dp/backtracking" element={<BacktrackingPage />} />
            <Route path="/dp/tabulation" element={<TabulationPage />} />
            <Route path="/dp/memoization" element={<MemoizationPage />} />
            <Route
              path="/problems/graphs/number-of-islands"
              element={<NumberOfIslands />}
            />
            <Route
              path="/problems/graphs/max-area-island"
              element={<MaxAreaIsland />}
            />
            <Route path="/problems/graphs/employee-importance" element={<EmployeeImportance />} />
            <Route path="/problems/graphs/clone-graph" element={<CloneGraph />} />
            <Route path="/problems/graphs/surrounded-regions" element={<SurroundedRegions />} />
            <Route
              path="/problems/trees/level-order"
              element={<LevelOrderTraversal />}
            />
            <Route
              path="/problems/trees/max-depth"
              element={<MaximumDepth />}
            />
            <Route
              path="/problems/trees/lowest-common-ancestor"
              element={<LowestCommonAncestor />}
            />
            <Route
              path="problems/sliding-window/longest-substring"
              element={<LongestSubstring />}
            />
            <Route path="/problems/two-pointers/two-sum" element={<TwoSum />} />
            <Route path="/problems/backtracking/subsets" element={<Subsets />} />
            <Route path="/problems/dp/climbing-stairs" element={<ClimbingStairs />} />
            <Route path="/problems/linked-lists/cycle" element={<Cycle />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
