import React, { useState, useEffect } from 'react';
import './eventIntro.css';
import {Link} from 'react-router-dom'
const DomVerseDashboard = () => {
  const [status, setStatus] = useState('');
  const [followers, setFollowers] = useState(0);
  const [hoverMessage, setHoverMessage] = useState('Hover to reveal secrets!');

  useEffect(() => {
    alert('⚡ Welcome to DomVerse! Become a master of the Web\'s hidden powers!');
  }, []);

  const handleGenreChange = (e) => {
    setStatus(`🎵 Now playing: ${e.target.value}`);
  };

  const handleBoostClick = () => {
    setFollowers(prev => prev + 100);
    setStatus('🚀 Boost Activated!');
  };

  const handleMouseOver = () => {
    setHoverMessage('🌟 You\'ve discovered the hover state!');
  };

  const handleMouseOut = () => {
    setHoverMessage('Hover to reveal secrets!');
  };

  const handleKeyDown = () => {
    setStatus('🎉 Status updated with superpower vibes!');
  };

  const goToNextLevel = () => {
    // Replace this with your actual route navigation or logic
    alert("🔥 Next Level Unlocked! (Route it as per your structure)");
  };

  return (
    <div className="domverse-container" onKeyDown={handleKeyDown} tabIndex="0">
      <h1 className="domverse-title">DomVerse Dashboard</h1>
      
      <div className="event-section">
        <h3>onChange Event</h3>
        <p>Triggers when a form element's value changes</p>
        <select onChange={handleGenreChange} className="genre-select">
          <option value="Lo-fi Chill">Lo-fi Chill</option>
          <option value="Cyberpunk Beats">Cyberpunk Beats</option>
          <option value="Future Bass">Future Bass</option>
          <option value="Synthwave">Synthwave</option>
        </select>
      </div>

      <div className="event-section">
        <h3>onClick Event</h3>
        <p>Triggers when an element is clicked</p>
        <button onClick={handleBoostClick} className="boost-button">
          Boost Followers ({followers})
        </button>
      </div>

      <div 
        className="hover-panel"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <h3>onMouseOver/onMouseOut Events</h3>
        <p>Trigger when mouse enters/leaves an element</p>
        <div className="hover-message">{hoverMessage}</div>
      </div>

      <div className="event-section">
        <h3>onKeyDown Event</h3>
        <p>Triggers when a key is pressed</p>
        <div className="key-message">
          Click here and press any key!
        </div>
      </div>

      <div className="status-display">
        <strong>Current Status:</strong> {status}
      </div>

      <div className="next-level-section">
        <button className="next-button"><Link to="/Events/event" >
          ➡️ Check Your Knowledge
        </Link></button>
      </div>
    </div>
  );
};

export default DomVerseDashboard;
