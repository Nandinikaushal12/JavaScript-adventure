import React, { useEffect, useState } from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateLeaderboard = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const score = parseInt(localStorage.getItem('score')) || 0;

      if (!user || !user.name) {
        console.warn('No user logged in.');
        setLoading(false);
        return;
      }

      const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

      const existingIndex = leaderboard.findIndex(entry => entry.name === user.name);

      if (existingIndex !== -1) {
        // Update only if new score is higher
        if (score > leaderboard[existingIndex].score) {
          leaderboard[existingIndex].score = score;
        }
      } else {
        leaderboard.push({ name: user.name, score });
      }

      // Sort by score descending
      leaderboard.sort((a, b) => b.score - a.score);

      // Store updated leaderboard
      localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
      setLeaders(leaderboard);
      setLoading(false);
    };

    updateLeaderboard();
  }, []);

  const getBadge = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const exportCSV = () => {
    const csv = [
      ['Rank', 'Name', 'Score'],
      ...leaders.map((user, i) => [`#${i + 1}`, user.name, user.score])
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'leaderboard.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">🏆 Leaderboard</h1>
      <button className="export-btn" onClick={exportCSV}>⬇️ Export CSV</button>
      {loading ? (
        <p>Loading...</p>
      ) : leaders.length === 0 ? (
        <p>No scores yet.</p>
      ) : (
        <div className="table-wrapper">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaders.map((user, index) => (
                <tr key={user.name}>
                  <td>{getBadge(index + 1)}</td>
                  <td className="user-cell">
                    <img
                      className="avatar"
                      src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.name}`}
                      alt="avatar"
                    />
                    {user.name}
                  </td>
                  <td>{user.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
