import React, { useState, useEffect } from "react";
import axios from "axios";
import "./functions.css";

// MCQ Questions
const mcqLevels = [
  {
    title: "Level 1: Function Declarations",
    description: "Learn about standard function declarations in JavaScript.",
    question: "What is the correct syntax for a function declaration?",
    options: [
      "function greet() {}",
      "let greet = => {};",
      "const greet = function;"
    ],
    answer: 0,
    exampleCode: `function greet() {\n  console.log('Hello!');\n}`
  },
  {
    title: "Level 2: Function Expressions",
    description: "Learn about function expressions assigned to variables.",
    question: "Which one is a function expression?",
    options: [
      "function greet() {}",
      "const greet = function() {};",
      "let greet => function() {}"
    ],
    answer: 1,
    exampleCode: `const greet = function() {\n  console.log('Hello!');\n}`
  },
  {
    title: "Level 3: Arrow Functions",
    description: "Arrow functions are a shorthand version of function expressions.",
    question: "Which one is an arrow function?",
    options: [
      "function greet() {}",
      "const greet = () => { console.log('Hi') };",
      "let greet = function();"
    ],
    answer: 1,
    exampleCode: `const greet = () => {\n  console.log('Hi');\n}`
  },
  {
    title: "Level 4: Anonymous Functions",
    description: "Functions without a name used directly in expressions.",
    question: "Anonymous functions are often used in which scenario?",
    options: [
      "Named function declaration",
      "setTimeout(() => {}, 1000)",
      "var x = greet()"
    ],
    answer: 1,
    exampleCode: `setTimeout(function() {\n  console.log('Anonymous');\n}, 1000);`
  },
  {
    title: "Level 5: IIFE",
    description: "Immediately Invoked Function Expressions are executed as soon as they are defined.",
    question: "What does IIFE stand for?",
    options: [
      "Internal Invoked Function Example",
      "Immediately Invoked Function Expression",
      "Inline Invoked Function Execution"
    ],
    answer: 1,
    exampleCode: `(function() {\n  console.log('IIFE');\n})();`
  },
  {
    title: "Level 6: Callback Functions",
    description: "Functions passed as arguments to other functions.",
    question: "Which one is a callback function usage?",
    options: [
      "setTimeout(() => console.log('Done'), 1000)",
      "function callback() {}",
      "let x = function() {}"
    ],
    answer: 0,
    exampleCode: `setTimeout(() => {\n  console.log('Callback executed');\n}, 1000);`
  },
  {
    title: "Level 7: Constructor Functions",
    description: "Functions used to create new objects using the new keyword.",
    question: "Which one is a constructor function?",
    options: [
      "function Person() {}",
      "const person = () => {};",
      "let Person = {}"
    ],
    answer: 0,
    exampleCode: `function Person(name) {\n  this.name = name;\n}\nconst user = new Person('John');`
  },
  {
    title: "Level 8: Generator Functions",
    description: "Functions that can pause and resume using yield.",
    question: "Which symbol indicates a generator function?",
    options: [
      "*",
      "&",
      "#"
    ],
    answer: 0,
    exampleCode: `function* gen() {\n  yield 1;\n  yield 2;\n}`
  },
  {
    title: "Level 9: Async/Await",
    description: "Async functions allow writing asynchronous code in a synchronous manner.",
    question: "What keyword is used with async functions to wait for a promise?",
    options: [
      "wait",
      "pause",
      "await"
    ],
    answer: 2,
    exampleCode: `async function fetchData() {\n  let res = await fetch('url');\n  let data = await res.json();\n}`
  }
];

// Coding Questions
const codingLevels = [
  {
    title: "Coding Level 1",
    question: "Create a function named greet that returns 'Hello!'.",
    expected: "function greet() { return 'Hello!'; }"
  },
  {
    title: "Coding Level 2",
    question: "Create an arrow function named add that adds two numbers.",
    expected: "const add = (a, b) => a + b;"
  },
  {
    title: "Coding Level 3",
    question: "Use an anonymous function inside setTimeout.",
    expected: "setTimeout(function() {}, 1000);"
  }
];

const FunctionsGame = () => {
  const [level, setLevel] = useState(0);
  const [codingPhase, setCodingPhase] = useState(false);
  const [selected, setSelected] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [correct, setCorrect] = useState(false);

  const totalLevels = codingPhase ? codingLevels.length : mcqLevels.length;
  const current = codingPhase ? codingLevels[level] : mcqLevels[level];

  const checkAnswer = () => {
    let isCorrect = false;
    if (!codingPhase) {
      isCorrect = selected === current.answer;
    } else {
      isCorrect = userCode.replace(/\s/g, '').includes(current.expected.replace(/\s/g, ''));
    }

    if (isCorrect) {
      setScore(prev => prev + 10);
      setCorrect(true);
      const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      user.totalScore = ( user.totalScore|| 0)+score;  // Update the user's score in the object
      localStorage.setItem('user', JSON.stringify(user));  // Save the updated user object
    }
    } else {
      setCorrect(false);
    }

    setShowAnswer(true);
  };

  const updateScoreInBackend = async () => {
    try {
      await axios.post("/api/score/update", {
        topic: "functions",
        score: 1,
      });
    } catch (error) {
      console.error("Failed to update score:", error);
    }
  };

  const nextLevel = () => {
    if (correct) {
      updateScoreInBackend();
    }

    setShowAnswer(false);
    setSelected(null);
    setUserCode("");
    setCorrect(false);

    if (level < totalLevels - 1) {
      setLevel(prev => prev + 1);
    } else if (!codingPhase) {
      setCodingPhase(true);
      setLevel(0);
    } else {
      setGameOver(true);
    }
  };

  if (gameOver) {
    return (
      <div className="game-container">
        <div className="score-bar">Final Score: {score}/12</div>
        <div className="level-card">
          <h2>🎉 Game Over!</h2>
          <p>Your score has been submitted!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="score-bar">Score: {score}</div>

      <div className="level-card">
        <h2>{current.title}</h2>
        {current.description && <p>{current.description}</p>}
        {current.exampleCode && <pre className="code-block">{current.exampleCode}</pre>}

        {!codingPhase ? (
          <>
            <h4>{current.question}</h4>
            <ul>
              {current.options.map((opt, i) => (
                <li
                  key={i}
                  className={`option ${selected === i ? "selected" : ""}`}
                  onClick={() => setSelected(i)}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h4>{current.question}</h4>
            <textarea
              className="code-input"
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              placeholder="Write your code here..."
            ></textarea>
          </>
        )}

        {!showAnswer ? (
          <button
            className="action-btn"
            onClick={checkAnswer}
            disabled={
              (!codingPhase && selected === null) ||
              (codingPhase && userCode.trim() === "")
            }
          >
            Submit Answer
          </button>
        ) : (
          <div className="result-box">
            {correct ? (
              <p className="correct">Correct! 🎯</p>
            ) : (
              <p className="wrong">Oops! Try again or see expected answer!</p>
            )}
            <button className="action-btn next-btn" onClick={nextLevel}>
              Next Level →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FunctionsGame;
