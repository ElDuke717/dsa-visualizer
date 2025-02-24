import React from "react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>DSA Visualizer</h4>
          <p>
            An interactive tool to help you understand data structures and
            algorithms through visualizations.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/home">Home</a></li>
            <li><a href="/graph/basic">Graphs</a></li>
            <li><a href="/linked-list/singly">Linked Lists</a></li>
            <li><a href="/tree/binary">Trees</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>
            <a href="mailto:dsa@nickhuemmer.me">dsa@nickhuemmer.me</a>
          </p>
          <p>Have questions or suggestions? Feel free to reach out!</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} DSA Visualizer. All rights reserved.</p>
        <p>
          Created by <a href="https://nickhuemmer.me" target="_blank" rel="noopener noreferrer">Nick Huemmer</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
