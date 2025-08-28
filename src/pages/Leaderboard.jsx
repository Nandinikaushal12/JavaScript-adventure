import React, { useEffect, useState } from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/user/leaderboard');
        const data = await res.json();
        setLeaders(data);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
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
      ...leaders.map((user, i) => [`#${i + 1}`, user.name, user.totalScore])
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
                <tr key={user._id}>
                  <td>{getBadge(index + 1)}</td>
                  <td className="user-cell">
                    <img
                      className="avatar"
                      src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.name}`}
                      alt="avatar"
                    />
                    {user.name}
                  </td>
                  <td>{user.totalScore}</td>
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
