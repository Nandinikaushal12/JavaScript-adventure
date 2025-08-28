import React, { useState, useRef, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-dark.css';
import { Link } from 'react-router-dom';

const Level23 = ({ onComplete }) => {
  const [code, setCode] = useState(
// default code
`// Change the background color of the element with ID 'box' to blue.
// Write your code below:

`);
  const [output, setOutput] = useState('');
  const [success, setSuccess] = useState(false);
  const sandboxRef = useRef(null);

  const checkSolution = () => {
    try {
      const sandbox = sandboxRef.current;
      sandbox.innerHTML = '<div id="box" style="width: 100px; height: 100px; background-color: red; color: white; display: flex; align-items: center; justify-content: center;">Box</div>';
      new Function(code)();
      const box = sandbox.querySelector('#box');
      if (box && window.getComputedStyle(box).backgroundColor === 'rgb(0, 0, 255)') {
        setSuccess(true);
        setOutput('Great! The box turned blue! 🎉');
        onComplete && onComplete(10);
      } else {
        setOutput('Hmm, the background color isn\'t blue yet.');
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const resetCode = () => {
    setCode(`// Change the background color of the element with ID 'box' to blue.
// Write your code below:

`);
    setSuccess(false);
    setOutput('');
    if (sandboxRef.current) {
      sandboxRef.current.innerHTML = '<div id="box" style="width: 100px; height: 100px; background-color: red; color: white; display: flex; align-items: center; justify-content: center;">Box</div>';
    }
  };

  useEffect(() => {
    if (sandboxRef.current) {
      sandboxRef.current.innerHTML = '<div id="box" style="width: 100px; height: 100px; background-color: red; color: white; display: flex; align-items: center; justify-content: center;">Box</div>';
    }
  }, []);

  return (
    <div className="level-container">
      <h2>Level 2: Styling with JavaScript</h2>
      <div className="challenge-description">
        <p>Change the background color of the element with ID <code>'box'</code> to <b>blue</b>.</p>
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
        <button onClick={checkSolution} className="run-button">Run Code</button>
        <button onClick={resetCode} className="reset-button">Reset</button>
        {success && (
          <Link to ="/Dom/Dom24"  className="next-button">Next</Link>
        )}
      </div>
    </div>
  );
};

// Inject styles
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
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
}

.button-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
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
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.reset-button {
  background: linear-gradient(135deg, #6b7280, #4b5563);
}

.next-button {
  background: linear-gradient(135deg, #10b981, #059669);
}

.run-button:hover, .reset-button:hover, .next-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(59, 130, 246, 0.4);
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Level23;
