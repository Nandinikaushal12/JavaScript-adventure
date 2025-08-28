import React, { useState, useRef } from 'react';
import './level2css.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const DataDungeonLevel3 = ({ onNextLevel }) => {
  const [code, setCode] = useState(`// Cast your code below
let scrolls = ["Invisibility", "Teleportation"];

// Enchant it here!`);
  const [output, setOutput] = useState([]);
  const [error, setError] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [success, setSuccess] = useState(false);
  const sandboxRef = useRef(null);

  const runCode = () => {
    try {
      setError('');
      setOutput([]);
      setSuccess(false);
      setShowHint(false);

      const sandbox = sandboxRef.current;
      sandbox.innerHTML = '';

      const result = new Function(`${code}; return scrolls;`)();
      const expected = ["Stealth", "Invisibility", "Teleportation", "Shield"];

      if (JSON.stringify(result) === JSON.stringify(expected)) {
        setOutput(result);
        setSuccess(true);
      } else {
        throw new Error("Hmm, your scrolls don't match the spell. Try again!");
      }
    } catch (err) {
      setError(err.message);
      setShowHint(true);
    }
  };

  const showHintHandler = () => setShowHint(true);

  const resetGame = () => {
    setCode(`// Cast your code below
let scrolls = ["Invisibility", "Teleportation"];

// Enchant it here!`);
    setOutput([]);
    setError('');
    setShowHint(false);
    setSuccess(false);
  };

  return (
    <div className="level-container">
      <h1>Data Dungeon - Level 2: Scroll Insertion</h1>

      <div className="challenge-description">
        <h2>📜 Scroll of the Ancient Mage</h2>
        <p>Transform the scrolls array to: ["Stealth", "Invisibility", "Teleportation", "Shield"]</p>
        <h4>Add "Stealth" at the beginning</h4>
        <h4>Add "Shield" at the end</h4>
      </div>

      <div className="editor-container">
        <textarea 
          className="code-editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      <div ref={sandboxRef} style={{ display: 'none' }}></div>

      <div className="output-container">
        {error && <div className="output">{error}</div>}
        {showHint && (
          <div className="output">
            💡 Hint: Add "Stealth" first with <code>scrolls.unshift("Stealth")</code> and then add "Shield"
          </div>
        )}
        {success && (
          <div className="output success">
            <h3>✨ Bravo! Your scroll collection is complete!</h3>
            <p>
              {output.map((scroll, i) => (
                <span key={i}>📜 {scroll} </span>
              ))}
            </p>
          </div>
        )}
      </div>

      <div className="button-container">
        <button className="run-button" onClick={runCode}>Test Solution</button>
        <button className="reset-button" onClick={resetGame}>Reset</button>
        <button className="reset-button" onClick={showHintHandler}>Show Hint</button>
        {success && (
          <button>
            <Link to="/Array/level22"className="run-button">
            ➡ Next Level
          </Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default DataDungeonLevel3;
