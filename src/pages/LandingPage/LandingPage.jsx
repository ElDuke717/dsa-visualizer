import React from "react";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Data Structures & Algorithms Visualizer</h1>
        <p className="subtitle">
          Interactive visualizations to help you understand DSA concepts
        </p>
      </header>

      <section className="app-description">
        <h2>About This Application</h2>
        <p>
          Welcome to the Data Structures & Algorithms Visualizer! This
          interactive tool is designed to help you understand complex DSA
          concepts through visual representations and animations. Whether you're
          a student, a job seeker preparing for technical interviews, or a
          professional looking to refresh your knowledge, this application
          provides an intuitive way to explore and learn.
        </p>
        <p>
          Each visualization comes with explanations, code implementations, and
          interactive controls that allow you to see algorithms in action and
          understand how data structures work behind the scenes.
        </p>
      </section>

      <section className="features">
        <h2>Key Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Data Structure Visualizations</h3>
            <p>
              Interactive visualizations for common data structures including
              linked lists, trees, graphs, and hash tables.
            </p>
          </div>
          <div className="feature-card">
            <h3>Algorithm Animations</h3>
            <p>
              Step-by-step animations of algorithms like BFS, DFS, sorting
              algorithms, and dynamic programming techniques.
            </p>
          </div>
          <div className="feature-card">
            <h3>Problem Solving</h3>
            <p>
              Visualizations of common coding interview problems with
              explanations and solutions.
            </p>
          </div>
          <div className="feature-card">
            <h3>Code Implementation</h3>
            <p>
              Real code implementations that you can study and adapt for your own
              projects.
            </p>
          </div>
        </div>
      </section>

      <section className="lesson-plan">
        <h2>Learning Path</h2>
        <p>
          Follow this recommended learning path to get the most out of this
          application:
        </p>

        <div className="learning-path">
          <div className="path-item">
            <h3>1. Basic Data Structures</h3>
            <ul>
              <li>Linked Lists (Singly and Doubly)</li>
              <li>Hash Tables</li>
              <li>Trees (Binary Trees and Heaps)</li>
              <li>Graphs</li>
            </ul>
          </div>

          <div className="path-item">
            <h3>2. Basic Algorithms</h3>
            <ul>
              <li>Tree Traversals</li>
              <li>Graph Traversals (BFS, DFS)</li>
              <li>Sorting Algorithms</li>
            </ul>
          </div>

          <div className="path-item">
            <h3>3. Advanced Techniques</h3>
            <ul>
              <li>Dynamic Programming</li>
              <li>Two Pointers</li>
              <li>Sliding Window</li>
              <li>Backtracking</li>
            </ul>
          </div>

          <div className="path-item">
            <h3>4. Practice Problems</h3>
            <ul>
              <li>Graph Problems</li>
              <li>Tree Problems</li>
              <li>Dynamic Programming Problems</li>
              <li>And more...</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="getting-started">
        <h2>Getting Started</h2>
        <p>
          To begin your learning journey, select a topic from the navigation bar
          above. Each visualization includes:
        </p>
        <ul>
          <li>An interactive visualization area</li>
          <li>Controls to manipulate the visualization</li>
          <li>Explanations of the underlying concepts</li>
          <li>Code implementations</li>
        </ul>
        <p>
          Start with basic data structures if you're new to DSA, or jump directly
          to a specific topic you want to explore!
        </p>
      </section>
    </div>
  );
};

export default LandingPage;
