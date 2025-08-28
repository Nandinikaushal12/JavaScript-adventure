import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Game.css';
import hogwarts from './hogwarts.jpg';
import hermione from './hermione.png';

export default function ObjectsLevel2({ onLevelChange }) {

  console.log("Level 2 loaded!");

  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(true);

  const challenges = [
    {
      id: 1,
      title: "Create a Wizard Profile",
      description: "Create an object called 'wizard' with properties: name, house, and wand. The wand should be a nested object with properties wood and core.",
      startingCode: "// Create your wizard object here\nlet wizard = ",
      solution: "let wizard = {\n  name: 'Harry Potter',\n  house: 'Gryffindor',\n  wand: {\n    wood: 'Holly',\n    core: 'Phoenix feather'\n  }\n};",
      hint: "Remember that objects use curly braces {} and properties are defined with key-value pairs. For nested objects, use another set of curly braces.",
      testFunction: (code) => {
        try {
          code = code.replace(/\/\/.*$/gm, '');
          let result;
          eval(`result = ${code}`);
          if (typeof result !== 'object' || result === null) return false;
          if (!('name' in result) || !('house' in result) || !('wand' in result)) return false;
          if (typeof result.wand !== 'object' || result.wand === null) return false;
          if (!('wood' in result.wand) || !('core' in result.wand)) return false;
          return true;
        } catch (e) {
          return false;
        }
      }
    },
    {
      id: 2,
      title: "Spell Library Methods",
      description: "Add a method called 'cast' to the spell object that returns a string 'Casting: ' followed by the spell name.",
      startingCode: "let spell = {\n  name: 'Expelliarmus',\n  type: 'Defensive',\n  difficulty: 'Beginner'\n  // Add cast method below\n  \n};",
      solution: "let spell = {\n  name: 'Expelliarmus',\n  type: 'Defensive',\n  difficulty: 'Beginner',\n  cast: function() {\n    return 'Casting: ' + this.name;\n  }\n};",
      hint: "You can add methods to objects using either the function keyword or arrow function syntax. Remember to use 'this' to access the object's properties.",
      testFunction: (code) => {
        try {
          code = code.replace(/\/\/.*$/gm, '');
          eval(code);
          if (typeof spell !== 'object' || spell === null) return false;
          if (typeof spell.cast !== 'function') return false;
          const result = spell.cast();
          return result === 'Casting: Expelliarmus';
        } catch (e) {
          return false;
        }
      }
    },
    {
      id: 3,
      title: "Magical Items Inventory",
      description: "Create a function that adds a new item to the inventory object with the given name and quantity.",
      startingCode: "let inventory = {\n  wand: 1,\n  books: 3,\n  robes: 2\n};\n\nfunction addItem(itemName, quantity) {\n  // Write your code here\n  \n}",
      solution: "let inventory = {\n  wand: 1,\n  books: 3,\n  robes: 2\n};\n\nfunction addItem(itemName, quantity) {\n  inventory[itemName] = quantity;\n}",
      hint: "Use bracket notation (object[property]) to dynamically add properties to an object.",
      testFunction: (code) => {
        try {
          eval(code);
          if (typeof addItem !== 'function') return false;
          inventory = { wand: 1, books: 3, robes: 2 };
          addItem('cauldron', 1);
          return inventory.cauldron === 1;
        } catch (e) {
          return false;
        }
      }
    },
    {
      id: 4,
      title: "Hogwarts Houses Points",
      description: "Write a function that returns the house with the highest points.",
      startingCode: "let housePoints = {\n  Gryffindor: 287,\n  Hufflepuff: 352,\n  Ravenclaw: 426,\n  Slytherin: 391\n};\n\nfunction getLeadingHouse() {\n  // Write your code here\n  \n}",
      solution: "let housePoints = {\n  Gryffindor: 287,\n  Hufflepuff: 352,\n  Ravenclaw: 426,\n  Slytherin: 391\n};\n\nfunction getLeadingHouse() {\n  let highestPoints = 0;\n  let leadingHouse = '';\n  for (let house in housePoints) {\n    if (housePoints[house] > highestPoints) {\n      highestPoints = housePoints[house];\n      leadingHouse = house;\n    }\n  }\n  return leadingHouse;\n}",
      hint: "Use a for...in loop to iterate through the object. Keep track of the highest points and the house with those points.",
      testFunction: (code) => {
        try {
          eval(code);
          if (typeof getLeadingHouse !== 'function') return false;
          let leadingHouse = getLeadingHouse();
          return leadingHouse === 'Ravenclaw';
        } catch (e) {
          return false;
        }
      }
    }
  ];

  useEffect(() => {
    let intervalId;
    if (timerActive) {
      intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timerActive]);

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmitCode = () => {
    const challenge = challenges[currentChallenge];
    const isCorrect = challenge.testFunction(code);
    if (isCorrect) {
      setFeedback("Challenge completed successfully!");
      setCompletedChallenges(prev => [...prev, challenge.id]);
      setTimerActive(false);
    } else {
      setFeedback("Incorrect solution. Keep trying!");
    }
    setShowResult(true);
  };

  const handleNextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
      setCode(challenges[currentChallenge + 1].startingCode);
      setFeedback('');
      setShowHint(false);
      setShowResult(false);
      setTimer(0);
      setTimerActive(true);
    } else {
      setShowResult(true);
      setFeedback("Congratulations! You've completed all challenges!");
    }
  };

  const handleShowHint = () => {
    setShowHint(true);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="game-container slytherin-theme" style={{ backgroundImage: `url(${hogwarts})` }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="game-header">
          <h2 className="game-title parchment">JavaScript Objects Adventure - Level 2</h2>
          <div className="score-display">
            <span className="score-text">Timer: {formatTime(timer)}</span>
          </div>
        </div>

        {!showResult ? (
          <div className="challenge-container">
            <h3 className="challenge-title parchment">{challenges[currentChallenge].title}</h3>
            <p className="challenge-description parchment">{challenges[currentChallenge].description}</p>

            <motion.img
              src={hermione}
              className="character"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              alt="Hermione Granger"
            />

            <div className="code-editor">
              <textarea
                className="code-input"
                value={code}
                onChange={handleCodeChange}
                placeholder="Write your code here..."
              />
            </div>

            <div className="challenge-buttons">
              <motion.button
                className="submit-button magical-glow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSubmitCode}
              >
                Submit Code
              </motion.button>
              <motion.button
                className="hint-button magical-glow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleShowHint}
              >
                Show Hint
              </motion.button>
            </div>

            {showHint && (
              <motion.div className="hint-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <p className="hint-text parchment">{challenges[currentChallenge].hint}</p>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div className="feedback-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <p className="feedback parchment">{feedback}</p>
            <div className="end-game-buttons">
              {currentChallenge < challenges.length - 1 ? (
                <motion.button
                  className="next-button magical-glow"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNextChallenge}
                >
                  Next Challenge
                </motion.button>
              ) : (
                <motion.button
                  className="restart-button magical-glow"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onLevelChange(1)}
                >
                  Go Back to Level 1
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
