import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CodePalate.css';

const codeQuestions = [
  {
    question: "Extract the first 10 characters from 'JavaScript is Amazing!'\n\nlet str = 'JavaScript is Amazing!';\nlet result = str._____;",
    answer: "slice(0, 10)",
    hint: "Use .slice(start, end) to extract characters.",
  },
  {
    question: "Convert the string to lowercase:\n\nlet str = 'JavaScript is Amazing!';\nlet result = str._____;",
    answer: "toLowerCase()",
    hint: "Use .toLowerCase() to convert to lowercase.",
  },
  {
    question: "Find the index of 'is' in the string:\n\nlet str = 'JavaScript is Amazing!';\nlet result = str._____;",
    answer: "indexOf('is')",
    hint: "Use .indexOf() to find positions.",
  },
  {
    question: "Replace 'Amazing' with 'Awesome':\n\nlet str = 'JavaScript is Amazing!';\nlet result = str._____;",
    answer: "replace('Amazing', 'Awesome')",
    hint: "Only .replace() can do that.",
  },
  {
    question: "Check if the string includes 'JavaScript':\n\nlet str = 'JavaScript is Amazing!';\nlet result = str._____;",
    answer: "includes('JavaScript')",
    hint: ".includes() returns true/false.",
  },
  {
    question: "Trim spaces:\n\nlet str = ' Hello World! ';\nlet result = str._____;",
    answer: "trim()",
    hint: ".trim() removes spaces from both ends.",
  },
  {
    question: "Get the character at index 1:\n\nlet str = 'abc';\nlet result = str._____;",
    answer: "charAt(1)",
    hint: "Characters are indexed from 0.",
  },
  {
    question: "Convert to uppercase:\n\nlet str = 'abc';\nlet result = str._____;",
    answer: "toUpperCase()",
    hint: ".toUpperCase() capitalizes all letters.",
  },
  {
    question: "Repeat the string twice:\n\nlet str = 'abc';\nlet result = str._____;",
    answer: "repeat(2)",
    hint: ".repeat(n) repeats the string n times.",
  },
  {
    question: "Get substring from index 1 to 4:\n\nlet str = 'hello';\nlet result = str._____;",
    answer: "substring(1, 4)",
    hint: "substring(start, end) returns from start up to (but not including) end.",
  },
];

const StringCodePalateGame = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(codeQuestions.length).fill(''));
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);
  const navigate = useNavigate();

  const currentQ = codeQuestions[currentIndex];
  const isAnswered = userAnswers[currentIndex].trim() !== '';

  const handleInputChange = (e) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentIndex] = e.target.value;
    setUserAnswers(newAnswers);
  };

  const checkAnswer = () => {
    if (userAnswers[currentIndex].trim() === currentQ.answer) {
      setFeedback('✅ Correct!');
    } else {
      setFeedback('❌ Try again!');
    }
  };

  const nextQuestion = () => {
    if (currentIndex < codeQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFeedback('');
      setShowHint(false);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFeedback('');
      setShowHint(false);
    }
  };

  return (
    <div className="classroom" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/empty-school-classroom-interior-with-chalkboard_107791-631.jpg')" }}>
      <div className="score">Question {currentIndex + 1} of {codeQuestions.length}</div>

      {/* Blackboard for displaying the question */}
      <div className="blackboard">
        <h2>CodePalate Challenge</h2>
        <pre className="question-text">{currentQ.question}</pre>
      </div>

      {/* CodePalate input field below the blackboard */}
      <div className="code-palate">
        <textarea
          className="input-box"
          value={userAnswers[currentIndex]}
          onChange={handleInputChange}
          placeholder="Enter code here"
        />
        <div className="btn-row">
          <button onClick={checkAnswer} className="submit-btn">Check</button>
          <button onClick={() => setShowHint(true)} className="submit-btn">Hint</button>
        </div>
        {feedback && <div className="feedback">{feedback}</div>}
        {showHint && <div className="hint-box">💡 Hint: {currentQ.hint}</div>}
      </div>

      <div className="nav-buttons">
        <button onClick={prevQuestion} disabled={currentIndex === 0} className="submit-btn">⬅ Previous</button>
        <button
          onClick={nextQuestion}
          disabled={!isAnswered || currentIndex === codeQuestions.length - 1}
          className="submit-btn"
        >
          Next ➡
        </button>
      </div>

      {currentIndex === codeQuestions.length - 1 && isAnswered && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className="submit-btn" onClick={() => navigate('/')}>
            🔁 Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default StringCodePalateGame;
