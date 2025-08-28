import React, { useState } from 'react';

const QuizGame = () => {
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const currentUserId = localStorage.getItem('userId'); // Or use your auth method

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/quiz/submit-game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUserId,
          game: 'quiz1',
          correctAnswers: correctAnswers, // Should be an array of correct ones
        }),
      });

      const data = await response.json();
      alert(`Score submitted! Total Score: ${data.totalScore}`);
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };

  return (
    <div style={{ padding: '2rem', color: '#fff' }}>
      <h2>Test Quiz</h2>
      <p>Click below to submit dummy score.</p>
      <button onClick={() => {
        // For demo: simulate 3 correct answers
        setCorrectAnswers(['q1', 'q2', 'q3']);
        handleSubmit();
      }}>
        Submit Score
      </button>
    </div>
  );
};

export default QuizGame;
