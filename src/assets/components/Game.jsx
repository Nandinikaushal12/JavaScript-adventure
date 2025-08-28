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
          correctAnswers, // Array of correct question IDs or labels
        }),
      });

      const data = await response.json();
      alert(`✅ Score submitted! 🧠 Total Score: ${data.totalScore}`);
    } catch (error) {
      console.error('Error submitting score:', error);
      alert('❌ Error submitting score. See console for details.');
    }
  };

  return (
    <div style={{ padding: '2rem', color: '#fff' }}>
      <h2>🧩 Test Quiz</h2>
      <p>Click below to simulate 3 correct answers.</p>
      <button
        onClick={() => {
          setCorrectAnswers(['q1', 'q2', 'q3']);
          handleSubmit();
        }}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Submit Score
      </button>
    </div>
  );
};

export default QuizGame;
