// src/components/Navigation/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        Data Structures & Algorithms
      </div>
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
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;