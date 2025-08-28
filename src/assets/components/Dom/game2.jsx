import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import './game22.css';

const allQuestions = [
  {
    question: 'What does getElementById() do?',
    options: [
      'Returns elements by class name',
      'Returns elements by tag name',
      'Returns element with the specified ID',
      'Returns all matching elements'
    ],
    answer: 'Returns element with the specified ID'
  },
  {
    question: 'Which method returns a collection of elements by class name?',
    options: [
      'getElementById()',
      'getElementsByClassName()',
      'querySelector()',
      'textContent'
    ],
    answer: 'getElementsByClassName()'
  },
  {
    question: 'What does querySelectorAll() return?',
    options: [
      'First matching element',
      'Collection of all matching elements',
      'Element by ID',
      'Element by tag name'
    ],
    answer: 'Collection of all matching elements'
  },
  {
    question: 'Which property sets or gets the text content of an element?',
    options: ['innerHTML', 'textContent', 'value', 'getText()'],
    answer: 'textContent'
  },
  {
    question: 'Which method adds a new child node?',
    options: ['appendChild()', 'removeChild()', 'replaceChild()', 'createElement()'],
    answer: 'appendChild()'
  },
  {
    question: 'What does setAttribute() do?',
    options: [
      'Removes attribute',
      'Gets attribute value',
      'Sets attribute value',
      'None of these'
    ],
    answer: 'Sets attribute value'
  },
  {
    question: 'Which property accesses inline styles?',
    options: ['classList', 'style', 'css', 'font'],
    answer: 'style'
  },
  {
    question: 'How to create a new HTML element in DOM?',
    options: ['appendChild()', 'createElement()', 'insertBefore()', 'querySelector()'],
    answer: 'createElement()'
  },
  {
    question: 'Which method removes an attribute from an element?',
    options: ['setAttribute()', 'getAttribute()', 'removeAttribute()', 'deleteAttribute()'],
    answer: 'removeAttribute()'
  },
  {
    question: 'What does classList.toggle() do?',
    options: [
      'Adds class always',
      'Removes class always',
      'Adds or removes class',
      'Replaces class'
    ],
    answer: 'Adds or removes class'
  },
  {
    question: 'What method removes a child node from its parent?',
    options: ['appendChild()', 'removeChild()', 'replaceChild()', 'createElement()'],
    answer: 'removeChild()'
  },
  {
    question: 'Which method replaces one child node with another?',
    options: ['appendChild()', 'removeChild()', 'replaceChild()', 'createElement()'],
    answer: 'replaceChild()'
  },
  {
    question: 'Which method returns the first element that matches a CSS selector?',
    options: ['querySelector()', 'querySelectorAll()', 'getElementById()', 'getElementsByTagName()'],
    answer: 'querySelector()'
  },
  {
    question: 'What method adds a new child element before an existing one?',
    options: ['insertBefore()', 'appendChild()', 'createElement()', 'replaceChild()'],
    answer: 'insertBefore()'
  },
  {
    question: 'Which method creates a new HTML element?',
    options: ['createElement()', 'setAttribute()', 'removeAttribute()', 'querySelector()'],
    answer: 'createElement()'
  },
  {
    question: 'What does innerHTML do?',
    options: [
      'Sets or gets the inner HTML of an element',
      'Sets or gets the text content',
      'Adds an attribute',
      'None of the above'
    ],
    answer: 'Sets or gets the inner HTML of an element'
  }
];


const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5).slice(0, 10);
};

const Game2 = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    setQuestions(shuffleArray(allQuestions));
  }, []);

  const handleAnswer = (option) => {
  if (option === questions[currentQuestion].answer) {
    const newScore = score + 10;  // Increase score by 10 for correct answers
    setScore(newScore);  // Update the state
    // Update the score in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      user.totalScore = (user.totalScore||0) + newScore;  // Update the user's score in the object
      localStorage.setItem('user', JSON.stringify(user));  // Save the updated user object
    }
  }};

  return (
    <div className="agent-container">
      <h1 className="title">🕵️‍♂️ Agent DOM Mission</h1>
      {showScore ? (
        <div className="score-section">
        Mission Complete! 🔎<br />
        Power Acquired: {score} 🔋
        <div className="next-button-wrapper">
          <Link to="/Dom/Dom22" className="start-button">Next Level</Link>
        </div>
      </div>
      
      ) : (
        <div className="question-box">
          <h2>Clue {currentQuestion + 1}:</h2>
          <p>{questions[currentQuestion]?.question}</p>
          <div className="options">
            {questions[currentQuestion]?.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className="option-button"
              >
                {option}
              </button>
            ))}
          </div>
          <p className="power-display">Power: {score} 🔋</p>
          
        </div>
      )}
    </div>
  );
};

export default Game2
