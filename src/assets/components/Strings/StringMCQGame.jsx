import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StringGame.css';

const mcqQuestions = [
  {
    question: "What is the output of this code?\n'JavaScript is Amazing!'.slice(0, 10)",
    options: ["JavaScript", "Java Script", "JavaScript is", "JavaScript i"],
    answer: "JavaScript",
    hint: "Use `.slice(start, end)` to extract characters.",
  },
  {
    question: "What does this return?\n'JavaScript is Amazing!'.toLowerCase()",
    options: [
      "JavaScript is Amazing!",
      "javascript is amazing!",
      "JAVASCRIPT IS AMAZING!",
      "JavaScript Is Amazing!",
    ],
    answer: "javascript is amazing!",
    hint: "`.toLowerCase()` returns all lowercase characters.",
  },
  {
    question: "What is the index of 'is' in 'JavaScript is Amazing!'?",
    options: ["0", "4", "11", "15"],
    answer: "11",
    hint: "Use `.indexOf()` to find positions.",
  },
  {
    question: "Which method replaces 'Amazing' with 'Awesome'?",
    options: [
      "replace('Amazing', 'Awesome')",
      "swap('Amazing', 'Awesome')",
      "switch('Amazing', 'Awesome')",
      "change('Amazing', 'Awesome')",
    ],
    answer: "replace('Amazing', 'Awesome')",
    hint: "Only `.replace()` can do that.",
  },
  {
    question: "What does this return?\n'JavaScript is Amazing!'.includes('JavaScript')",
    options: ["false", "undefined", "true", "'JavaScript'"],
    answer: "true",
    hint: "`.includes()` returns true/false.",
  },
  {
    question: "' Hello World! '.trim() will return?",
    options: [
      "'Hello World!'",
      "' Hello World! '",
      "'HelloWorld!'",
      "'Hello World! '"
    ],
    answer: "'Hello World!'",
    hint: "`.trim()` removes spaces from both ends.",
  },
  {
    question: "'abc'.charAt(1) returns?",
    options: ["a", "b", "c", "1"],
    answer: "b",
    hint: "Characters are indexed from 0.",
  },
  {
    question: "'abc'.toUpperCase() returns?",
    options: ["ABC", "abc", "Abc", "aBc"],
    answer: "ABC",
    hint: "`.toUpperCase()` capitalizes all letters.",
  },
  {
    question: "'abc'.repeat(2) returns?",
    options: ["abcabc", "abc", "ab", "aabbcc"],
    answer: "abcabc",
    hint: "`.repeat(n)` repeats string n times.",
  },
  {
    question: "'hello'.substring(1, 4) returns?",
    options: ["ell", "hel", "hello", "llo"],
    answer: "ell",
    hint: "`substring(start, end)` returns from start up to (but not including) end.",
  },
];

const StringMCQGame = () => {
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackColor, setFeedbackColor] = useState('green');
  const [answered, setAnswered] = useState(false);

  const currentQ = mcqQuestions[questionIndex];
  const navigate = useNavigate();

  const handleOptionClick = (selectedOption) => {
    if (answered) return;

    const isCorrect = selectedOption === currentQ.answer;

    if (isCorrect) {
      setScore(score + 10);
      setFeedback('Correct! 🎉');
      setFeedbackColor('#4CAF50');
      const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      user.totalScore = ( user.totalScore|| 0)+score;  // Update the user's score in the object
      localStorage.setItem('user', JSON.stringify(user));  // Save the updated user object
    }
    } else {
      setFeedback('Wrong Answer! 😕');
      setFeedbackColor('#ff0000');
    }

    setAnswered(true);
  };

  const handleNext = () => {
    if (!answered || questionIndex >= mcqQuestions.length - 1) return;
    setFeedback('');
    setQuestionIndex(questionIndex + 1);
    setAnswered(false);
  };

  const handlePrevious = () => {
    if (questionIndex === 0) return;
    setFeedback('');
    setQuestionIndex(questionIndex - 1);
    setAnswered(false);
  };

  return (
    <div className="classroom" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/empty-school-classroom-interior-with-chalkboard_107791-631.jpg')" }}>
      <div className="score">Score: <span>{score}</span></div>

      <div className="blackboard">
        <h2>MCQ Challenge</h2>
        <p style={{ whiteSpace: 'pre-line' }}>{currentQ.question}</p>
        <p><strong>Hint:</strong> {currentQ.hint}</p>
      </div>

      <div className="code-box">
        {currentQ.options.map((option, idx) => (
          <button
            key={idx}
            className="submit-btn"
            onClick={() => handleOptionClick(option)}
            style={{ display: 'block', margin: '6px auto', width: '90%' }}
            disabled={answered}
          >
            {option}
          </button>
        ))}

        {feedback && (
          <div className="feedback" style={{ color: feedbackColor }}>{feedback}</div>
        )}

        <div className="nav-buttons">
          <button className="submit-btn" onClick={handlePrevious} disabled={questionIndex === 0}>
            ⬅ Previous
          </button>
          <button className="submit-btn" onClick={handleNext} disabled={!answered || questionIndex === mcqQuestions.length - 1}>
            Next ➡
          </button>
        </div>

        {questionIndex === mcqQuestions.length - 1 && answered && (
          <div style={{ textAlign: 'center', marginTop: '8px' }}>
            <button
              className="submit-btn"
              onClick={() => navigate('/strings/codepalate')}
            >
              🚀 Go to Level 2
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StringMCQGame;
