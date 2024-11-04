// src/components/CodeSnippet/CodeSnippet.jsx
import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeSnippet = ({ language, code }) => {
  return (
    <div className="code-snippet">
      <SyntaxHighlighter 
        language={language} 
        style={vscDarkPlus}
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSnippet;