import React, { useState, useRef, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-dark.css';
import { Link } from 'react-router-dom';

const Level24 = ({ onComplete }) => {
  const [code, setCode] = useState(`// Add a paragraph inside the div with ID 'container'
// The paragraph should say: "You're getting good at this!"`);
  const [output, setOutput] = useState('');
  const [success, setSuccess] = useState(false);
  const sandboxRef = useRef(null);

  const checkSolution = () => {
    try {
      const sandbox = sandboxRef.current;
      sandbox.innerHTML = `<div id="container"></div>`;

      new Function(code)();

      const container = sandbox.querySelector('#container');
      const paragraph = container?.querySelector('p');

      if (
        container &&
        paragraph &&
        paragraph.textContent.trim() === "You're getting good at this!"
      ) {
        setSuccess(true);
        setOutput('Success! You added the paragraph correctly!');
        onComplete && onComplete(10);
      } else {
        setOutput('Hmm... the paragraph is missing or the text isn’t right.');
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const resetCode = () => {
    setCode(`// Add a paragraph inside the div with ID 'container'
// The paragraph should say: "You're getting good at this!"`);
    setSuccess(false);
    setOutput('');
    if (sandboxRef.current) {
      sandboxRef.current.innerHTML = '<div id="container"></div>';
    }
  };

  useEffect(() => {
    if (sandboxRef.current) {
      sandboxRef.current.innerHTML = '<div id="container"></div>';
    }
  }, []);

  return (
    <div className="level-container">
      <h2>Level 2: Add a Paragraph</h2>
      <div className="challenge-description">
        <p>
          Use JavaScript to add a <code>&lt;p&gt;</code> tag with the text{' '}
          <strong>"You're getting good at this!"</strong> inside the
          <code> &lt;div id="container"&gt;</code>.
        </p>
      </div>

      <div className="editor-container">
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => highlight(code, languages.javascript)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
          }}
          className="code-editor"
        />
      </div>

      <div className="sandbox-container" ref={sandboxRef}></div>

      <div className="output-container">
        <p className={`output ${success ? 'success' : ''}`}>{output}</p>
      </div>

      <div className="button-container">
        <button onClick={checkSolution} className="run-button">
          Run Code
        </button>
        <button onClick={resetCode} className="reset-button">
          Reset
        </button>
        {success && (
           <Link to="/CampaignSlider"  className="next-button">Next</Link>
        )}
      </div>
    </div>
  );
};

// Inject CSS styles
const styles = `
.level-container {
  background: linear-gradient(145deg, #1f2937, #1a1f2e);
  padding: 2rem;
  border-radius: 1.5rem;
  margin: 2rem 0;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}
.challenge-description {
  color: #3b82f6;
  margin-bottom: 1.5rem;
}
.editor-container {
  background: #111827;
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 1.5rem;
}
.code-editor {
  min-height: 200px;
  width: 100%;
  background: #111827 !important;
}
.sandbox-container {
  background: rgba(55, 65, 81, 0.7);
  padding: 1.5rem;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
  color: white;
}
.output-container {
  margin: 1rem 0;
}
.output {
  padding: 1rem;
  border-radius: 0.5rem;
  background: rgba(55, 65, 81, 0.7);
  color: white;
}
.output.success {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}
.button-container {
  display: flex;
  gap: 1rem;
}
.run-button, .reset-button, .next-button {
  padding: 0.75rem 1.5rem;
  border-radius: 1rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  color: white;
  transition: all 0.3s ease;
}
.run-button {
  background: linear-gradient(135deg, #e94560, #c23251);
}
.reset-button {
  background: linear-gradient(135deg, #533483, #4a2d7b);
}
.next-button {
  background: linear-gradient(135deg, #10b981, #059669);
}
.run-button:hover, .reset-button:hover, .next-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(233, 69, 96, 0.4);
}
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Level24;
