// src/pages/Problems/BaseProblemPage.jsx
import React, { useState } from "react";
import CodeSnippet from "../../components/CodeSnippet/CodeSnippet";
import "./Problems.css";

const BaseProblemPage = ({
  title,
  difficulty,
  category,
  problemStatement,
  examples,
  constraints,
  approach,
  solution,
  visualization,
  implementations,
}) => {
  const [language, setLanguage] = useState("javascript");

  return (
    <div className="problem-page">
      <header className="problem-header">
        <h1>{title}</h1>
        <div className="problem-meta">
          <span className={`difficulty ${difficulty.toLowerCase()}`}>
            {difficulty}
          </span>
          <span className="category">{category}</span>
        </div>
      </header>

      <section className="problem-statement">
        <h2>Problem Statement</h2>
        {problemStatement}
      </section>

      <section className="examples">
        <h2>Examples</h2>
        {examples}
      </section>

      <section className="constraints">
        <h2>Constraints</h2>
        {constraints}
      </section>

      <section className="visualization">
        <h2>Visualization</h2>
        {visualization}
      </section>

      <section className="approach">
        <h2>Approach</h2>
        {approach}
      </section>

      <section className="implementation">
        <h2>Implementation</h2>
        <div className="language-selector">
          <button
            onClick={() => setLanguage("javascript")}
            className={`lang-button ${
              language === "javascript" ? "active" : ""
            }`}
          >
            JavaScript
          </button>
          <button
            onClick={() => setLanguage("python")}
            className={`lang-button ${language === "python" ? "active" : ""}`}
          >
            Python
          </button>
        </div>
        <CodeSnippet language={language} code={implementations[language]} />
      </section>

      <section className="solution">
        <h2>Solution Explanation</h2>
        {solution}
      </section>
    </div>
  );
};

export default BaseProblemPage;
