import React from 'react';
import { Link } from 'react-router-dom';
// Consider adding a CSS file if needed: import './StringsPage.css';

const StringsPage = () => {
  return (
    <div className="overview-page-container"> {/* Reusing overview page style */}
      <h1>Strings</h1>
      
      <section className="overview-section"> {/* Reusing overview section style */}
        <h2>String Operations and Concepts</h2>
        <p>
          This section provides an overview of common string operations, concepts, and related problems.
          Strings are fundamental data types representing sequences of characters.
        </p>
        {/* Add more content about string concepts here later */}
      </section>

      <section className="overview-section">
        <h2>Related Problems</h2>
        <div className="overview-links">
          <ul>
            <li><Link to="/problems/strings/reverse-string-ii">Reverse String II</Link></li>
            {/* Add links to other string problems here */}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default StringsPage;
