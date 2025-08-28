import React, { useState, useEffect } from "react";
import "./Level1.css";
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

const allQuestions = [
    { question: "Which array method adds elements to the end of an array?", options: ["push()", "pop()", "shift()", "unshift()"], correct: 0 },
    { question: "To remove the last element from an array, which method is used?", options: ["slice()", "pop()", "splice()", "shift()"], correct: 1 },
    { question: "Which method adds an element at the start of an array?", options: ["push()", "pop()", "unshift()", "shift()"], correct: 2 },
    { question: "What method removes the first element from an array?", options: ["pop()", "shift()", "unshift()", "splice()"], correct: 1 },
    { question: "Which method removes a specific index from an array?", options: ["splice()", "slice()", "pop()", "map()"], correct: 0 },
    { question: "Which method returns a new array without modifying the original?", options: ["slice()", "splice()", "push()", "pop()"], correct: 0 },
    { question: "What method checks if an element exists in an array?", options: ["includes()", "find()", "filter()", "some()"], correct: 0 },
    { question: "Which method sorts an array in place?", options: ["sort()", "map()", "reduce()", "filter()"], correct: 0 },
    { question: "Which method creates a new array with the results of calling a provided function on every element?", options: ["map()", "forEach()", "filter()", "reduce()"], correct: 0 },
    { question: "Which method returns the first element that satisfies a given condition?", options: ["find()", "filter()", "some()", "map()"], correct: 0 }
];

const getRandomQuestions = () => {
    return allQuestions.sort(() => 0.5 - Math.random()).slice(0, 5);
};

const DataDungeon = () => {
    const [health, setHealth] = useState(100);
    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState(getRandomQuestions());
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [inventory, setInventory] = useState(["Health Potion", "Mana Crystal"]);
    const [message, setMessage] = useState("");
    const [levelCompleted, setLevelCompleted] = useState(false);

    useEffect(() => {
        if (health <= 0) {
            setMessage("💀 Game Over!");
            setHealth(100);
            setScore(0);
            setInventory(["Health Potion", "Mana Crystal"]);
            setQuestions(getRandomQuestions());
            setCurrentQuestion(0);
        }
    }, [health]);

    const checkAnswer = (selectedIndex) => {
        if (levelCompleted) return;
        
        const correct = questions[currentQuestion].correct === selectedIndex;
        if (correct) {
        const newScore = score + 10;
        setScore(newScore);
        setHealth(Math.min(100, health + 10));

        const newPower = ["Shield of Wisdom", "Fire Scroll", "Lightning Wand"][Math.floor(Math.random() * 3)];
        setInventory([...inventory, newPower]);

        setMessage(`✅ Correct! You gain +10 HP and found a ${newPower}!`);

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      user.totalScore = ( user.totalScore || 0) + score;  // Update the user's score in the object
      localStorage.setItem('user', JSON.stringify(user));  // Save the updated user object
      }

        
        } else {
            setHealth(health - 20);
            setInventory(inventory.slice(0, -1));
            setMessage("❌ Wrong! A monster attacked! -20 HP!");
        }
        
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setLevelCompleted(true);
            setMessage("🎉 Congratulations! You have completed this level!");
        }
    };

    const nextLevel = () => {
        setLevelCompleted(false);
        setCurrentQuestion(0);
        setMessage("");
        setScore(score + 50);
        setQuestions(getRandomQuestions());
    };

    return (
        <div className="game-container">
            <h1>🧙‍♂️ Data Dungeon 🏰</h1>
            <div className="stats">
                <div className="health">Health: <span>{health}</span>❤️</div>
                <div className="score">Score: <span>{score}</span>✨</div>
            </div>
            <div className="inventory">
                <h3>Magical Inventory:</h3>
                <div>{inventory.map((item, index) => <span key={index} className="spell-item">{item}</span>)}</div>
            </div>
            {message && <div className="message">{message}</div>}
            {levelCompleted ? (
              <button className="next-level">
              <Link to="/Array/Level2">➡️ Next Level</Link>
            </button>
            ) : (
                <>
                    <div className="question">{questions[currentQuestion].question}</div>
                    <div className="options">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button key={index} className="option" onClick={() => checkAnswer(index)}>{option}</button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default DataDungeon;
