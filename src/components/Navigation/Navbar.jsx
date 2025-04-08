// src/components/Navigation/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [problemsDropdownOpen, setProblemsDropdownOpen] = useState(false);
  const [dpDropdownOpen, setDpDropdownOpen] = useState(false);
  const problemsDropdownRef = useRef(null);
  const dpDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (problemsDropdownRef.current && !problemsDropdownRef.current.contains(event.target)) {
        setProblemsDropdownOpen(false);
      }
      if (dpDropdownRef.current && !dpDropdownRef.current.contains(event.target)) {
        setDpDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleProblemsDropdown = (e) => {
    e.preventDefault();
    setProblemsDropdownOpen(!problemsDropdownOpen);
  };

  const toggleDpDropdown = (e) => {
    e.preventDefault();
    setDpDropdownOpen(!dpDropdownOpen);
  };
  const problems = {
    Graphs: [
      { title: "Number of Islands", path: "/problems/graphs/number-of-islands", difficulty: "Medium" },
      { title: "Max Area of Island", path: "/problems/graphs/max-area-island", difficulty: "Medium" },
      { title: "Employee Importance", path: "/problems/graphs/employee-importance", difficulty: "Medium" },
      { title: "Clone Graph", path: "/problems/graphs/clone-graph", difficulty: "Medium" },
      { title: "Surrounded Regions", path: "/problems/graphs/surrounded-regions", difficulty: "Medium" },
      { title: "Open The Lock", path: "/problems/graphs/open-the-lock", difficulty: "Medium" }
    ],
    Trees: [
      { title: "Level Order Traversal", path: "/problems/trees/level-order", difficulty: "Medium" },
      { title: "Maximum Depth", path: "/problems/trees/max-depth", difficulty: "Easy" },
      { title: "Lowest Common Ancestor", path: "/problems/trees/lowest-common-ancestor", difficulty: "Medium" },
      { title: "Binary Tree Paths", path: "/problems/trees/binary-tree-paths", difficulty: "Easy" }
    ],
    "Sliding Window": [
      { title: "Longest Substring", path: "/problems/sliding-window/longest-substring", difficulty: "Medium" },
      { title: "Maximum Vowels", path: "/problems/sliding-window/max-vowels", difficulty: "Medium" },
      { title: "Diet Plan Performance", path: "/problems/sliding-window/diet-plan-performance", difficulty: "Easy" },
      { title: "Maximum Average Subarray I", path: "/problems/sliding-window/maximum-average-subarray", difficulty: "Easy" },
      { title: "Contains Duplicate II", path: "/problems/sliding-window/contains-duplicate-ii", difficulty: "Easy" }
    ],
    "Two Pointers": [
      { title: "Two Sum II", path: "/problems/two-pointers/two-sum", difficulty: "Easy" },
      { title: "Move Zeroes", path: "/problems/two-pointers/move-zeroes", difficulty: "Easy" },
      { title: "Valid Palindrome", path: "/problems/two-pointers/valid-palindrome", difficulty: "Easy" },
      { title: "3Sum", path: "/problems/two-pointers/three-sum", difficulty: "Medium" },
      { title: "Sort Colors", path: "/problems/two-pointers/sort-colors", difficulty: "Medium" }
    ],
    Backtracking: [
      { title: "Subsets", path: "/problems/backtracking/subsets", difficulty: "Medium" },
      { title: "Binary Watch", path: "/problems/backtracking/binary-watch", difficulty: "Easy" },
      { title: "Letter Combinations", path: "/problems/backtracking/letter-combinations", difficulty: "Medium" },
      { title: "Permutations", path: "/problems/backtracking/permutations", difficulty: "Medium" },
      { title: "Combination Sum", path: "/problems/backtracking/combination-sum", difficulty: "Medium" }
    ],
    "Dynamic Programming": [
      { title: "Climbing Stairs", path: "/problems/dp/climbing-stairs", difficulty: "Easy" },
      { title: "Best Time to Buy and Sell Stock", path: "/problems/dp/best-time-to-buy-and-sell-stock", difficulty: "Easy" },
      { title: "Maximum Subarray", path: "/problems/dp/maximum-subarray", difficulty: "Medium" },
      { title: "House Robber", path: "/problems/dp/house-robber", difficulty: "Medium" },
      { title: "Coin Change", path: "/problems/dp/coin-change", difficulty: "Medium" } // Added Coin Change link
    ],
    "Linked Lists": [
      { title: "Linked List Cycle", path: "/problems/linked-lists/cycle", difficulty: "Easy" },
      { title: "Remove Elements", path: "/problems/linked-lists/remove-elements", difficulty: "Easy" },
      { title: "Intersection", path: "/problems/linked-lists/intersection", difficulty: "Easy" },
      { title: "Remove Nth From End", path: "/problems/linked-lists/remove-nth-from-end", difficulty: "Medium" },
      { title: "Design Linked List", path: "/problems/linked-lists/design", difficulty: "Medium" }
    ],
    "Hash Tables": [ // Add Hash Tables category
      { title: "Intersection of Two Arrays", path: "/problems/hash-tables/intersection-of-two-arrays", difficulty: "Easy" }, // Add LeetCode #349
      { title: "4Sum II", path: "/problems/hash-tables/4sum-ii", difficulty: "Medium" } // Add LeetCode #454
    ],
    "Greedy Algorithms": [ // Add Greedy Algorithms category
      { title: "Best Time to Buy and Sell Stock II", path: "/problems/greedy/best-time-to-buy-and-sell-stock-ii", difficulty: "Medium" }, // Add LeetCode #122
      { title: "Jump Game", path: "/problems/greedy/jump-game", difficulty: "Medium" } // Add LeetCode #55
    ],
    "Strings": [ // Add Strings category
      { title: "Reverse String II", path: "/problems/strings/reverse-string-ii", difficulty: "Easy" }, // Add LeetCode #541
      { title: "Find And Replace", path: "/problems/strings/find-and-replace", difficulty: "Medium" } // Add LeetCode #833
    ]
  };
  return (
    <nav className="navbar">
      <NavLink to="/home" className="navbar-brand">Data Structures & Algorithms</NavLink>
      <ul className="nav-links">
        <li className="dropdown">
          <span className="dropdown-title">
            <NavLink to="/data-structures-overview" className="nav-link">DS Overview</NavLink>
          </span>
        </li>
        <li className="dropdown">
          <span className="dropdown-title">Graph</span>
          <div className="dropdown-content">
            <NavLink to="/graph/basic">Basic Graph</NavLink>
            <NavLink to="/graph/bfs">BFS</NavLink>
            <NavLink to="/graph/dfs">DFS</NavLink>
            <NavLink to="/graph/dijkstra">Dijkstra's Algorithm</NavLink>
          </div>
        </li>
        <li className={`dropdown problems-dropdown ${problemsDropdownOpen ? 'active' : ''}`} ref={problemsDropdownRef}>
          <div className="dropdown-trigger" onClick={toggleProblemsDropdown}>
            <span className="dropdown-title">Problems Menu</span>
          </div>
          <div className={`dropdown-content ${problemsDropdownOpen ? 'show' : ''}`}>
            <div className="dropdown-inner">
              {Object.entries(problems).map(([category, problemList]) => (
                <div key={category} className="submenu">
                  <span className="submenu-title">{category}</span>
                  <div className="problem-category">
                    {problemList.map(problem => (
                      <NavLink
                        key={problem.path}
                        to={problem.path}
                        className="problem-link"
                      >
                        <span className="problem-title">{problem.title}</span>
                        <span className={`difficulty-tag ${problem.difficulty.toLowerCase()}`}>
                          {problem.difficulty}
                        </span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </li>
        <li className="dropdown">
          <span className="dropdown-title">Linked List</span>
          <div className="dropdown-content">
            <NavLink to="/linked-list/singly">Singly Linked</NavLink>
            <NavLink to="/linked-list/doubly">Doubly Linked</NavLink>
          </div>
        </li>
        <li className="dropdown">
          <span className="dropdown-title">Trees</span>
          <div className="dropdown-content">
            <NavLink to="/tree/binary">Binary Tree</NavLink>
            <NavLink to="/tree/heap">Heap</NavLink>
            <NavLink to="/tree/traversal">Tree Traversal</NavLink>
          </div>
        </li>
        <li className="dropdown">
          <span className="dropdown-title">
            <NavLink to="/sorting-algorithms-overview" className="nav-link">Sorting Algorithms</NavLink>
          </span>
        </li>
        <li className="dropdown">
          <span className="dropdown-title">
            <NavLink to="/algorithmic-patterns" className="nav-link">Algorithmic Patterns</NavLink>
          </span>
        </li>
        <li className="dropdown">
          <span className="dropdown-title">
            <NavLink to="/hash-table" className="nav-link">Hash Table</NavLink>
          </span>
        </li>
        {/* Add Strings Link */}
        <li className="dropdown">
          <span className="dropdown-title">
            <NavLink to="/strings" className="nav-link">Strings</NavLink>
          </span>
          {/* We can add a dropdown here later if needed */}
        </li>
        {/* Add Stack Link */}
        <li className="dropdown">
          <span className="dropdown-title">
            <NavLink to="/stack" className="nav-link">Stack</NavLink>
          </span>
        </li>
        {/* Add Queue Link */}
        <li className="dropdown">
          <span className="dropdown-title">
            <NavLink to="/queue" className="nav-link">Queue</NavLink>
          </span>
        </li>
        <li className={`dropdown dynamic-programming-dropdown ${dpDropdownOpen ? 'active' : ''}`} ref={dpDropdownRef}>
          <div className="dropdown-trigger" onClick={toggleDpDropdown}>
            <span className="dropdown-title">Dynamic Programming</span>
          </div>
          <div className={`dropdown-content ${dpDropdownOpen ? 'show' : ''}`}>
            <NavLink to="/dp/sliding-window">Sliding Window</NavLink>
            <NavLink to="/dp/two-pointers">Two Pointers</NavLink>
            <NavLink to="/dp/backtracking">Backtracking</NavLink>
            <NavLink to="/dp/tabulation">Tabulation</NavLink>
            <NavLink to="/dp/memoization">Memoization</NavLink>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
