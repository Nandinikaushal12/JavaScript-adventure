// HomeScreen.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const FloatingElements = () => {
  useEffect(() => {
    const container = document.querySelector('.floating-elements');
    const createdElements = [];

    for (let i = 0; i < 10; i++) {
      const element = document.createElement('div');
      element.className = 'floating-element';
      element.style.width = Math.random() * 30 + 20 + 'px';
      element.style.height = element.style.width;
      element.style.left = Math.random() * 100 + '%';
      element.style.top = Math.random() * 100 + '%';
      element.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(element);
      createdElements.push(element);
    }

    return () => {
      createdElements.forEach(el => container.removeChild(el));
    };
  }, []);

  return <div className="floating-elements"></div>;
};

const HomeScreen = () => (
  <div className="hero full-height">
    <FloatingElements />
    <h1>JavaScript Adventures</h1>
    <p>Learn JavaScript Through Interactive Gaming</p>

    <Link to="/GameCardSlider" className="cta-button">
      Start Your Adventure
    </Link>
  </div>
);

export default HomeScreen;
