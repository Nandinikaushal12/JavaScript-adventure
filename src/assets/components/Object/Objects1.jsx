import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Game.css';
import hogwarts from './hogwarts.jpg';
import harry from './harry.png';

export default function ObjectsLevel1({ onLevelChange }) {
  const questionPool = [
    { question: "Help Harry define his wand!", task: "Choose the correct code snippet to create an object for Harry's wand with properties wood and core.", options: ["let wand = {};", "let wand = {wood: 'Holly', core: 'Phoenix feather'};", "let wand = [];", "let wand = new Object[];"], answer: "let wand = {wood: 'Holly', core: 'Phoenix feather'};" },
    { question: "The Marauder's Map needs its owner!", task: "Choose the correct way to add a property 'owner' to an existing object.", options: ["map.owner = 'Harry';", "map->owner = 'Harry';", "map:set('owner', 'Harry');", "map.add('owner', 'Harry');"], answer: "map.owner = 'Harry';" },
    { question: "Hermione wants to check the properties of a spell!", task: "Choose the correct method to get all keys of an object.", options: ["Object.values()", "Object.keys()", "Object.entries()", "Object.getKeys()"], answer: "Object.keys()" },
    { question: "Dumbledore's Army needs their list!", task: "Choose the correct way to loop through an object's properties.", options: ["for (let key in object) { }", "forEach(object) { }", "loop(object, key) { }", "Object.for(object) { }"], answer: "for (let key in object) { }" },
    { question: "Hagrid needs a new magical creature!", task: "Choose the correct way to create an object with a method.", options: ["let creature = {name: 'Buckbeak', fly: function() { return 'Flies high!'; }};", "let creature = {name = 'Buckbeak', fly: () => 'Flies high!'};", "let creature = {name: 'Buckbeak', fly() => 'Flies high!'};", "let creature = new Object('Buckbeak', 'Flies high!');"], answer: "let creature = {name: 'Buckbeak', fly: function() { return 'Flies high!'; }};" },
    { question: "Which object method is used to get all values of an object?", task: "Choose the correct method to retrieve all values.", options: ["Object.keys()", "Object.values()", "Object.entries()", "Object.get()"], answer: "Object.values()" },
    { question: "How do you delete a property from an object?", task: "Choose the correct syntax.", options: ["delete object.property;", "remove object.property;", "object.property = null;", "object.remove('property');"], answer: "delete object.property;" },
    { question: "What will 'Object.assign()' do?", task: "Choose the correct answer.", options: ["Merge objects", "Clone an object", "Delete properties", "Find object length"], answer: "Merge objects" },
    { question: "How do you check if a property exists in an object?", task: "Choose the correct method.", options: ["object.hasOwnProperty('property')", "object.includes('property')", "object.find('property')", "'property' in object"], answer: "'property' in object" },
    { question: "Which of these creates an object prototype?", task: "Choose the correct option.", options: ["Object.create(proto)", "new Object()", "Object.prototype()", "Object.new()"], answer: "Object.create(proto)" }
  ];

  const expandedPool = [...questionPool];
  while (expandedPool.length < 50) {
    expandedPool.push(...questionPool.slice(0, Math.min(10, 50 - expandedPool.length)));
  }

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [answerSelected, setAnswerSelected] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  
  useEffect(() => {
    const shuffled = [...expandedPool].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 10));
  }, []);

  function handleAnswer(option, index) {
    if (answerSelected) return;
    
    setSelectedOption(index);
    setAnswerSelected(true);
    
    const userAnswer = option.trim();
    const correctAnswer = questions[currentQuestion].answer.trim();
    
    if (userAnswer === correctAnswer) {
      setScore(prev => prev + 10);
      setFeedback("Correct! 🎉");
      setCorrectAnswer("");
      const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      user.totalScore = ( user.totalScore|| 0) +score;  // Update the user's score in the object
      localStorage.setItem('user', JSON.stringify(user));  // Save the updated user object
    }
    } else {
      setFeedback("Wrong! ❌");
      setCorrectAnswer(`Correct answer: ${questions[currentQuestion].answer}`);
    }
  }
  
  function handleNextQuestion() {
    setFeedback("");
    setCorrectAnswer("");
    setAnswerSelected(false);
    setSelectedOption(null);
    
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  }
  
  function restartGame() {
    const shuffled = [...expandedPool].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 10));
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setFeedback("");
    setCorrectAnswer("");
    setAnswerSelected(false);
    setSelectedOption(null);
  }

  return (
    <div className="game-container gryffindor-theme" style={{ backgroundImage: `url(${hogwarts})` }}>
      {!showResult ? (
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="game-header">
            <h2 className="game-title parchment">JavaScript Objects Adventure - Level 1</h2>
            <div className="score-display">
              <span className="score-text">Score: {score}/{questions.length}</span>
              <span className="question-counter">Question {currentQuestion + 1}/{questions.length}</span>
            </div>
          </div>
          
          <p className="game-task parchment">{questions[currentQuestion]?.task}</p>
          
          <motion.img 
            src={harry} 
            className="character" 
            animate={{ x: [0, 10, -10, 0] }} 
            transition={{ repeat: Infinity, duration: 1 }} 
            alt="Harry Potter" 
          />
          
          <div className="options-container">
            {questions[currentQuestion]?.options.map((option, index) => (
              <motion.button 
                key={index} 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                className={`option-button magical-glow ${selectedOption === index ? (option.trim() === questions[currentQuestion].answer.trim() ? 'correct-option' : 'wrong-option') : ''}`}
                onClick={() => handleAnswer(option, index)}
                disabled={answerSelected}
              >
                {option}
              </motion.button>
            ))}
          </div>
          
          {feedback && (
            <motion.div 
              className="feedback-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="feedback parchment">{feedback}</p>
              {correctAnswer && <p className="correct-answer parchment">{correctAnswer}</p>}
              
              {answerSelected && (
                <motion.button 
                  className="next-button magical-glow"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNextQuestion}
                >
                  {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
                </motion.button>
              )}
            </motion.div>
          )}
        </motion.div>
      ) : (
        <motion.div 
          className="game-over-container"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <h2 className="game-over parchment">Level 1 Complete!</h2>
          <p className="game-score parchment">Your Score: {score} / {questions.length}</p>
          
          {score === questions.length ? (
            <p className="perfect-score parchment">Perfect score! You're a JavaScript Objects master! ⚡</p>
          ) : score >= questions.length * 0.7 ? (
            <p className="good-score parchment">Great job! You're well on your way to mastering JavaScript Objects! 🧙‍♂️</p>
          ) : (
            <p className="try-again parchment">Keep practicing! You'll master JavaScript Objects soon! 📚</p>
          )}
          
          <div className="end-game-buttons">
            <motion.button 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
              className="restart-button magical-glow" 
              onClick={restartGame}
            >
              Play Again
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
              className="level-button magical-glow" 
              onClick={() => onLevelChange(2)}
            >
              Advance to Level 2
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
