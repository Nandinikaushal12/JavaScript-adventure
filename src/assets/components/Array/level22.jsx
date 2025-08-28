import React, { useState, useRef } from 'react';
import './level2css.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const DataDungeonLevel4 = ({ onNextLevel }) => {
  const [code, setCode] = useState(`// Brew your potion spells here
let potionBelt = ["Expired", "Invisibility", "Strength", "Spoiled"];

// Cleanse it here`);
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

      const result = new Function(`${code}; return potionBelt;`)();
      const expected = ["Invisibility", "Strength"];

      if (JSON.stringify(result) === JSON.stringify(expected)) {
        setOutput(result);
        setSuccess(true);
      } else {
        throw new Error("Your potionBelt still contains spoiled magic. Try again!");
      }
    } catch (err) {
      setError(err.message);
      setShowHint(true);
    }
  };

  const showHintHandler = () => setShowHint(true);

  const resetGame = () => {
    setCode(`// Brew your potion spells here
let potionBelt = ["Expired", "Invisibility", "Strength", "Spoiled"];

// Cleanse it here`);
    setOutput([]);
    setError('');
    setShowHint(false);
    setSuccess(false);
  };

  return (
    <div className="level-container">
      <h1>Data Dungeon - Level 2: Potion Purification</h1>

      <div className="challenge-description">
        <h2>🧪 The Potion Purifier’s Test</h2>
        <p>Transform <code>potionBelt</code> to contain only: ["Invisibility", "Strength"]</p>
        <h4>Remove the first item</h4>
        <h4>Remove the last item</h4>
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
            💡 Hint: Try <code>potionBelt.shift()</code> and <code>potionBelt.pop()</code> in order.
          </div>
        )}
        {success && (
          <div className="output success">
            <h3>💫 Perfect! The belt is now purified!</h3>
            <p>
              {output.map((potion, i) => (
                <span key={i}>🧴 {potion} </span>
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
         <button> <Link to="/Array/pop" className="run-button" >
         ➡ Next Level
       </Link></button>
        )}
      </div>
    </div>
  );
};

export default DataDungeonLevel4;
