// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import BFSPage from './pages/BFS/BFSPage';
import DFSPage from './pages/DFS/DFSPage';
import SinglyLinkedListPage from './pages/LinkedList/SinglyLinkedListPage';
import DoublyLinkedListPage from './pages/LinkedList/DoublyLinkedListPage';
import BasicGraphPage from './pages/Graph/BasicGraphPage';
import BinaryTreePage from './pages/Tree/BinaryTreePage';
import HeapPage from './pages/Tree/HeapPage';
import HashTablePage from './pages/HashTable/HashTablePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/bfs" replace />} />
          
            <Route path="/graph/basic" element={<BasicGraphPage />} />
            <Route path="/bfs" element={<BFSPage />} />
            <Route path="/dfs" element={<DFSPage />} />
            <Route path="/linked-list/singly" element={<SinglyLinkedListPage />} />
            <Route path="/linked-list/doubly" element={<DoublyLinkedListPage />} />
            <Route path="/tree/binary" element={<BinaryTreePage />} />
            <Route path="/tree/heap" element={<HeapPage/>} />
            <Route path="/hash-table" element={<HashTablePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;