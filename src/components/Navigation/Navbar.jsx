// src/components/Navigation/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Data Structures & Algorithms</div>
      <ul className="nav-links">
        <li className="dropdown">
          <span className="dropdown-title">Graph</span>
          <div className="dropdown-content">
            <NavLink to="/graph/basic">Basic Graph</NavLink>
            <NavLink to="/graph/bfs">BFS</NavLink>
            <NavLink to="/graph/dfs">DFS</NavLink>
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
          <NavLink to="/hash-table">Hash Table</NavLink>
        </li>
        <li className="dropdown">
        <span className="dropdown-title">Dynamic Programming</span>
        <div className="dropdown-content">
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
