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
          { title: "Lowest Common Ancestor", path: "/problems/trees/lowest-common-ancestor", difficulty: "Medium" }
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
          { title: "Valid Palindrome", path: "/problems/two-pointers/valid-palindrome", difficulty: "Easy" }
        ],
        Backtracking: [
          { title: "Subsets", path: "/problems/backtracking/subsets", difficulty: "Medium" }
        ],
        "Dynamic Programming": [
          { title: "Climbing Stairs", path: "/problems/dp/climbing-stairs", difficulty: "Easy" }
        ],
        "Linked Lists": [
          { title: "Linked List Cycle", path: "/problems/linked-lists/cycle", difficulty: "Easy" }
        ]
      };
  return (
    <nav className="navbar">
      <NavLink to="/home" className="navbar-brand">Data Structures & Algorithms</NavLink>
      <ul className="nav-links">
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
        <span className="dropdown-title">Sorting</span>
        <div className="dropdown-content">
            <NavLink to="/sorting/bubble">Bubble Sort</NavLink>
            <NavLink to="/sorting/insertion">Insertion Sort</NavLink>
            <NavLink to="/sorting/quick">Quick Sort</NavLink>
            <NavLink to="/sorting/merge">Merge Sort</NavLink>
            <NavLink to="/sorting/heap">Heap Sort</NavLink>
            <NavLink to="/sorting/counting">Counting Sort</NavLink>
            <NavLink to="/sorting/radix">Radix Sort</NavLink>
            <NavLink to="/sorting/bucket">Bucket Sort</NavLink>
        </div>
        </li>
        <li className="dropdown">
        <span className="dropdown-title">
          <NavLink to="/hash-table" className="nav-link">Hash Table</NavLink>
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
