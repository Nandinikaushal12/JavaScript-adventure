import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './GameIntro.css';

const GameIntro = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="briefing-container">
      <h1>🕵️ Agent Briefing: DOM Operations</h1>
      <p className="intro-text">
        Welcome, Agent. Your mission involves interacting with the <strong>Document Object Model (DOM)</strong>. 
        These operations will help you manipulate web pages, control elements, and dynamically change content.
      </p>

      <div className="scroller-wrapper">
        <button className="scroll-btn left" onClick={scrollLeft}>◀</button>

        <div className="info-grid" ref={scrollRef}>
          <div className="info-card">
            <h3>🎯 Selecting Elements</h3>
            <ul>
              <li><strong>getElementById()</strong> - Finds an element by ID</li>
              <li><strong>getElementsByClassName()</strong> - Finds elements by class</li>
              <li><strong>querySelector()</strong> - First match for a CSS selector</li>
              <li><strong>querySelectorAll()</strong> - All matches for a CSS selector</li>
            </ul>
          </div>

          <div className="info-card">
            <h3>✏️ Changing Content</h3>
            <ul>
              <li><strong>innerHTML</strong> - Sets/gets HTML content</li>
              <li><strong>textContent</strong> - Sets/gets plain text</li>
            </ul>
          </div>

          <div className="info-card">
            <h3>🔨 Creating & Modifying</h3>
            <ul>
              <li><strong>createElement()</strong> - Creates new elements</li>
              <li><strong>appendChild()</strong> - Adds a child to a parent</li>
              <li><strong>insertBefore()</strong> - Inserts before an element</li>
              <li><strong>replaceChild()</strong> - Replaces one child with another</li>
              <li><strong>removeChild()</strong> - Removes a child element</li>
            </ul>
          </div>

          <div className="info-card">
            <h3>🛠️ Attributes & Styles</h3>
            <ul>
              <li><strong>setAttribute()</strong> - Sets an attribute</li>
              <li><strong>removeAttribute()</strong> - Removes an attribute</li>
              <li><strong>style</strong> - Access inline styles</li>
              <li><strong>classList.toggle()</strong> - Adds/removes a class</li>
            </ul>
          </div>
        </div>

        <button className="scroll-btn right" onClick={scrollRight}>▶</button>
      </div>

      <div className="start-mission">
        <Link to="/Dom/game2" className="start-button">🚀 Begin Mission</Link>
      </div>
    </div>
  );
};

export default GameIntro;
