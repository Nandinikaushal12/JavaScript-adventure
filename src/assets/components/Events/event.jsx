import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './event.css';

const allQuestions = [
  {
    question: "Which method is used to attach an event handler in JavaScript?",
    options: ["addEvent()", "attachEventListener()", "addEventListener()", "onEventListener()"],
    answer: "addEventListener()",
  },
  {
    question: "Which of the following is NOT a valid event type for addEventListener()?",
    options: ["click", "hover", "keydown", "submit"],
    answer: "hover",
  },
  {
    question: "What event is triggered when you click a button?",
    options: ["onChange", "onClick", "onHover", "onLoad"],
    answer: "onClick",
  },
  {
    question: "What event is used for keyboard input?",
    options: ["onKeyDown", "onFocus", "onInput", "onHover"],
    answer: "onKeyDown",
  },
  {
    question: "What will happen if you add two click event listeners to the same element?",
    options: ["Only the first one runs", "Only the second one runs", "Both run in order they were added", "JavaScript throws an error"],
    answer: "Both run in order they were added",
  },
  {
    question: "Which method is used to remove an event listener?",
    options: [" detachEventListener()", "removeEventListener()", "cancelEventListener()", "deleteEventListener()"],
    answer: "removeEventListener()",
  },
  {
    question: "Which event phase does the event reach after capture phase but before it bubbles up?",
    options: ["Capture phase", "Target phase", "Bubble phase", "Initiation phase"],
    answer: " Target phase",
  },
  {
    question: "Which object property holds information about the target element that triggered the event?",
    options: ["event.source", "event.target", "event.caller", "event.handler"],
    answer: "event.target",
  },
  {
    question: "How do you listen to an event in JavaScript?",
    options: ["addEventListener", "onEvent", "listenTo", "subscribe"],
    answer: "addEventListener",
  },
  {
    question: "What event occurs when the mouse enters an element?",
    options: ["onClick", "onLoad", "onMouseOver", "onKeyDown"],
    answer: "onMouseOver",
  },
  {
    question: "What happens if you use an anonymous function as an event listener and then try to remove it?",
    options: ["It will be removed successfully", "It will remove all anonymous listeners", "It will not be removed", "It will throw a runtime error"],
    answer: "It will not be removed",
  },
  {
    question: "What is the default behavior of useCapture in addEventListener()?",
    options: ["true", "false", "null", "It depends on the event type"],
    answer: "false",
  },
  {
    question: "Which of the following methods can be used to prevent an event from bubbling up the DOM tree?",
    options: ["stopPropagation()", "preventDefault()", "stopBubbling()", "cancelBubble()"],
    answer: "stopPropagation()",
  },
  {
    question: "Which of the following best describes the event bubbling model?",
    options: ["The event is captured by the outermost element and propagated inward", "The event starts from the target element and propagates outward", "The event skips the target and only occurs on parents", "The event propagates randomly in the DOM"],
    answer: "The event starts from the target element and propagates outward",
  },
  {
    question: "Which of the following is not a valid DOM event?",
    options: ["onSubmit", "onEnter", "onClick", "onLoad"],
    answer: "onEnter",
  },
  {
    question: "What is the correct syntax to add a click event to a button with id myBtn?",
    options: ["myBtn.addEventListener('click', myFunction);", "document.getElementById('myBtn').addEventListener('click', myFunction);", "addEventListener('click', myFunction);", "myFunction('click', myBtn);"],
    answer: "document.getElementById('myBtn').addEventListener('click', myFunction);",
  },
  {
    question: "What is the purpose of the 'preventDefault()' method?",
    options: ["Stops form submission", "Changes text color", "Adds new element", "Triggers alert"],
    answer: "Stops form submission",
  },
  {
    question: "What is once: true used for in the addEventListener() options object?",
    options: ["Runs the event handler only once", "Removes all listeners after one fires", "Forces the capture phase", "Enables the listener only once per refresh"],
    answer: "Runs the event handler only once",
  },
  {
    question: "Which event is triggered when the page finishes loading?",
    options: ["onReady", "onStart", "onLoad", "onInit"],
    answer: "onLoad",
  },
  {
    question: "Which of the following can be passed as the second argument to addEventListener?",
    options: [" A string", "A number", "An Object", "A Function"],
    answer: "A Function",
  }
];

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5).slice(0, 10);
};

const DomVerseMCQ = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setQuestions(shuffle(allQuestions));
  }, []);

  const handleAnswer = (selected) => {
    if (selected === questions[current].answer) {
      setScore(score + 10);
    }
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      user.totalScore = ( user.totalScore|| 0)+score;  // Update the user's score in the object
      localStorage.setItem('user', JSON.stringify(user));  // Save the updated user object
    }

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="mcq-container">
      <h2>🧠 Event MCQ Challenge</h2>
      {showResult ? (
        <div className="result-section">
          <h3>Your Score: {score} / 100</h3>
          <Link to="/Events/event2" className="next-button">
            🔥 Go to Next Level
          </Link>
        </div>
      ) : (
        <div className="question-box">
          <h3>Q{current + 1}: {questions[current]?.question}</h3>
          <div className="options">
            {questions[current]?.options.map((opt, idx) => (
              <button key={idx} onClick={() => handleAnswer(opt)} className="option-btn">
                {opt}
              </button>
            ))}
          </div>
          <p>Score: {score}</p>
        </div>
      )}
    </div>
  );
};

export default DomVerseMCQ;
