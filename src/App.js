// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Footer/Footer";
import LandingPage from "./pages/LandingPage/LandingPage";
import DataStructuresOverviewPage from "./pages/DataStructuresOverview/DataStructuresOverviewPage";
import SortingAlgorithmsOverviewPage from "./pages/SortingAlgorithmsOverview/SortingAlgorithmsOverviewPage";
import AlgorithmicPatternsPage from "./pages/AlgorithmicPatterns/AlgorithmicPatternsPage";
import BFSPage from "./pages/BFS/BFSPage";
import DFSPage from "./pages/DFS/DFSPage";
import DijkstraPage from "./pages/Graph/DijkstraPage";
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
import OpenTheLock from './pages/Problems/Graphs/OpenTheLock';
import LevelOrderTraversal from "./pages/Problems/Trees/LevelOrderTraversal";
import MaximumDepth from "./pages/Problems/Trees/MaximumDepth";
import LowestCommonAncestor from "./pages/Problems/Trees/LowestCommonAncestor";
import BinaryTreePaths from "./pages/Problems/Trees/BinaryTreePaths";
import LongestSubstring from "./pages/Problems/SlidingWindow/LongestSubstring";
import MaxVowels from "./pages/Problems/SlidingWindow/MaxVowels";
import DietPlanPerformance from "./pages/Problems/SlidingWindow/DietPlanPerformance";
import MaximumAverageSubarray from "./pages/Problems/SlidingWindow/MaximumAverageSubarray";
import ContainsDuplicateII from "./pages/Problems/SlidingWindow/ContainsDuplicateII";
import TwoSum from './pages/Problems/TwoPointers/TwoSum';
import MoveZeroes from './pages/Problems/TwoPointers/MoveZeroes';
import ValidPalindrome from './pages/Problems/TwoPointers/ValidPalindrome';
import ThreeSum from './pages/Problems/TwoPointers/ThreeSum';
import SortColors from './pages/Problems/TwoPointers/SortColors';
import Subsets from './pages/Problems/Backtracking/Subsets';
import BinaryWatch from './pages/Problems/Backtracking/BinaryWatch';
import LetterCombinations from './pages/Problems/Backtracking/LetterCombinations';
import Permutations from './pages/Problems/Backtracking/Permutations';
import CombinationSum from './pages/Problems/Backtracking/CombinationSum';
import ClimbingStairs from './pages/Problems/DP/ClimbingStairs';
import BestTimeToBuyAndSellStock from './pages/Problems/DP/BestTimeToBuyAndSellStock';
import MaximumSubarray from './pages/Problems/DP/MaximumSubarray';
import HouseRobber from './pages/Problems/DP/HouseRobber';
import CoinChange from './pages/Problems/DP/CoinChange';
import Cycle from './pages/Problems/LinkedLists/Cycle';
import RemoveElements from './pages/Problems/LinkedLists/RemoveElements';
import IntersectionOfTwoLinkedLists from './pages/Problems/LinkedLists/IntersectionOfTwoLinkedLists';
import RemoveNthNodeFromEnd from './pages/Problems/LinkedLists/RemoveNthNodeFromEnd';
import DesignLinkedList from './pages/Problems/LinkedLists/DesignLinkedList';
import IntersectionOfTwoArrays from './pages/Problems/HashTables/IntersectionOfTwoArrays'; // Add import for the new problem
import BestTimeToBuyAndSellStockII from './pages/Problems/Greedy/BestTimeToBuyAndSellStockII'; // Add import for the new greedy problem
import JumpGame from './pages/Problems/Greedy/JumpGame'; // Add import for Jump Game
import FourSumII from './pages/Problems/HashTables/FourSumII'; // Add import for 4Sum II
import StringsPage from './pages/Strings/StringsPage'; // Add import for Strings page
import ReverseStringII from './pages/Problems/Strings/ReverseStringII'; // Add import for Reverse String II problem
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/data-structures-overview" element={<DataStructuresOverviewPage />} />
            <Route path="/sorting-algorithms-overview" element={<SortingAlgorithmsOverviewPage />} />
            <Route path="/algorithmic-patterns" element={<AlgorithmicPatternsPage />} />

            <Route path="/graph/basic" element={<BasicGraphPage />} />
            <Route path="/graph/bfs" element={<BFSPage />} />
            <Route path="/graph/dfs" element={<DFSPage />} />
            <Route path="/graph/dijkstra" element={<DijkstraPage />} />
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
            <Route path="/strings" element={<StringsPage />} /> {/* Add route for Strings page */}
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
            <Route path="/problems/graphs/open-the-lock" element={<OpenTheLock />} />
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
              path="/problems/trees/binary-tree-paths"
              element={<BinaryTreePaths />}
            />
            <Route
              path="problems/sliding-window/longest-substring"
              element={<LongestSubstring />}
            />
            <Route
              path="problems/sliding-window/max-vowels"
              element={<MaxVowels />}
            />
            <Route
              path="problems/sliding-window/diet-plan-performance"
              element={<DietPlanPerformance />}
            />
            <Route
              path="problems/sliding-window/maximum-average-subarray"
              element={<MaximumAverageSubarray />}
            />
            <Route
              path="problems/sliding-window/contains-duplicate-ii"
              element={<ContainsDuplicateII />}
            />
            <Route path="/problems/two-pointers/two-sum" element={<TwoSum />} />
            <Route path="/problems/two-pointers/move-zeroes" element={<MoveZeroes />} />
            <Route path="/problems/two-pointers/valid-palindrome" element={<ValidPalindrome />} />
            <Route path="/problems/two-pointers/three-sum" element={<ThreeSum />} />
            <Route path="/problems/two-pointers/sort-colors" element={<SortColors />} />
            <Route path="/problems/backtracking/subsets" element={<Subsets />} />
            <Route path="/problems/backtracking/binary-watch" element={<BinaryWatch />} />
            <Route path="/problems/backtracking/letter-combinations" element={<LetterCombinations />} />
            <Route path="/problems/backtracking/permutations" element={<Permutations />} />
            <Route path="/problems/backtracking/combination-sum" element={<CombinationSum />} />
            <Route path="/problems/dp/climbing-stairs" element={<ClimbingStairs />} />
            <Route path="/problems/dp/best-time-to-buy-and-sell-stock" element={<BestTimeToBuyAndSellStock />} />
            <Route path="/problems/dp/maximum-subarray" element={<MaximumSubarray />} />
            <Route path="/problems/dp/house-robber" element={<HouseRobber />} />
            <Route path="/problems/dp/coin-change" element={<CoinChange />} /> {/* Add CoinChange route */}
            <Route path="/problems/linked-lists/cycle" element={<Cycle />} />
            <Route path="/problems/linked-lists/remove-elements" element={<RemoveElements />} />
            <Route path="/problems/linked-lists/intersection" element={<IntersectionOfTwoLinkedLists />} />
            <Route path="/problems/linked-lists/remove-nth-from-end" element={<RemoveNthNodeFromEnd />} />
            <Route path="/problems/linked-lists/design" element={<DesignLinkedList />} />
            {/* Add route for the new Hash Table problem */}
            <Route path="/problems/hash-tables/intersection-of-two-arrays" element={<IntersectionOfTwoArrays />} />
            {/* Add route for the new Greedy problem */}
            <Route path="/problems/greedy/best-time-to-buy-and-sell-stock-ii" element={<BestTimeToBuyAndSellStockII />} />
            {/* Add route for Jump Game */}
            <Route path="/problems/greedy/jump-game" element={<JumpGame />} />
            {/* Add route for 4Sum II */}
            <Route path="/problems/hash-tables/4sum-ii" element={<FourSumII />} />
            {/* Add route for Reverse String II */}
            <Route path="/problems/strings/reverse-string-ii" element={<ReverseStringII />} />

          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
