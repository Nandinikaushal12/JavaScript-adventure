import React, { useState, useRef, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-dark.css';
import { Link } from 'react-router-dom';
import './Game222.css'
const Level22 = ({ onComplete }) => {
  const [code, setCode] = useState(
// Starter code
`// Change the text of element with ID 'demo' to 'DOM Mastery Unlocked!'
// Write your code below:

document.getElementById('demo').textContent = 'DOM Mastery Unlocked!';`
  );
  const [output, setOutput] = useState('');
  const [success, setSuccess] = useState(false);
  const sandboxRef = useRef(null);

  const checkSolution = () => {
    try {
      const sandbox = sandboxRef.current;
      sandbox.innerHTML = '<div id="demo">Original Text</div>';

      // Run user's code in the sandbox context
      const userScript = new Function('document', code);
      userScript(sandbox);

      const demoElement = sandbox.querySelector('#demo');
      if (demoElement && demoElement.textContent === 'DOM Mastery Unlocked!') {
        setSuccess(true);
        setOutput('✅ Success! You\'ve mastered DOM manipulation!');
        onComplete && onComplete(10);
      } else {
        setOutput('❌ Not quite right. Try again!');
      }
    } catch (error) {
      setOutput(`🚫 Error: ${error.message}`);
    }
  };

  const resetCode = () => {
    setCode(`// Change the text of element with ID 'demo' to 'DOM Mastery Unlocked!'
// Write your code below:

document.getElementById('demo').textContent = 'DOM Mastery Unlocked!';`);
    setSuccess(false);
    setOutput('');
    if (sandboxRef.current) {
      sandboxRef.current.innerHTML = '<div id="demo">Original Text</div>';
    }
  };

  useEffect(() => {
    if (sandboxRef.current) {
      sandboxRef.current.innerHTML = '<div id="demo">Original Text</div>';
    }
  }, []);

  return (
    <div className="level-container">
      <h2>Level 2: DOM Manipulation Challenge</h2>
      <div className="challenge-description">
        <p>Change the text content of the element with ID <code>'demo'</code> to <b>"DOM Mastery Unlocked!"</b>.</p>
      </div>

      <div className="editor-container">
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={code => highlight(code, languages.javascript)}
          padding={10}
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
          <Link to="/Dom/Dom23" className="next-button">Next</Link>
        )}
      </div>
    </div>
  );
};

export default Level22;
