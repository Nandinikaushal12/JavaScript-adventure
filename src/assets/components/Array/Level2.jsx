import React, { useState, useRef } from 'react';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import './level2css.css'
const DataDungeonLevel2 = ({ onNextLevel }) => {
  const [code, setCode] = useState(`// Your magical code here
let potions = ["Health", "Mana", "Strength"];

// Write your spells (code) below`);
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

      const result = new Function(`${code}; return potions;`)();
      const expected = ["Health", "Wisdom", "Mana", "Strength"];

      if (JSON.stringify(result) === JSON.stringify(expected)) {
        setOutput(result);
        setSuccess(true);
      } else {
        throw new Error("Your potion array doesn't match the expected result. Try again!");
      }
    } catch (err) {
      setError(err.message);
      setShowHint(true);
    }
  };

  const showHintHandler = () => setShowHint(true);

  const resetGame = () => {
    setCode(`// Your magical code here
let potions = ["Health", "Mana", "Strength"];

// Write your spells (code) below`);
    setOutput([]);
    setError('');
    setShowHint(false);
    setSuccess(false);
  };

  return (
    <div className="level-container">
      <h1>Data Dungeon - Level 2: Array Manipulation</h1>

      <div className="challenge-description">
        <h2>🧙 Potion Master's Challenge</h2>
        <p>Transform the potions array to: ["Health", "Wisdom", "Mana", "Strength"]</p>
        
          <h4>Insert "Wisdom" at index <strong>1</strong></h4>
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
            💡 Hint: Use <code>array.splice(1, 0, "Wisdom")</code>
          </div>
        )}
        {success && (
          <div className="output success">
            <h3>🎉 Success! Your potion array is perfect!</h3>
            <p>
              {output.map((potion, i) => (
                <span key={i}>🧪 {potion} </span>
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
           <Link to="/Array/level21"className="run-button">
            ➡ Next Level
          </Link>
         </button>
        )}
      </div>
    </div>
  );
};

export default DataDungeonLevel2;
