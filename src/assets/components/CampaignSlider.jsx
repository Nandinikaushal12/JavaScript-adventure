import { React,useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dragon from "./dragon.png";
import harry from "./Object/harry.png";
import teacher from "./teacher.png";
import functionimg from "./function.png";
import dom from "./dom.png";
import events from "./events.png";

function GameCardSlider() {
  // Game data with one game per topic
  const games = [
    { 
      id: 1, 
      topic: "Arrays", 
      name: "Array Explorer", 
      description: "Explore array methods through puzzle solving",
      image: dragon,
      path: "/Array/intro"
    },
    {
      id: 2,
      topic: "Strings",
      name: "String Puzzles",
      description: "Solve puzzles using string manipulation",
      image: teacher,
      path: "/strings"
    },    
    { 
      id: 3, 
      topic: "Objects", 
      name: "Object Builder", 
      description: "Learn to create and modify JavaScript objects",
      image: harry,
      path: "/Object/Objects1"
    },
    { 
      id: 4, 
      topic: "Functions", 
      name: "Function Factory", 
      description: "Create functions to solve puzzles",
      image: functionimg,
      path: "/Function/functions"
    },
    { 
      id: 5, 
      topic: "DOM", 
      name: "DOM Explorer", 
      description: "Explore the DOM tree through interactive challenges",
      image: dom,
      path: "/Dom/Game2Intro"
    },
    { 
      id: 6, 
      topic: "Events", 
      name: "Event Playground", 
      description: "Learn event handling in a playground environment",
      image: events,
      path: "/Events/eventsIntro"
    }
  ];

  const scrollContainerRef = useRef(null);
  
  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Ensure proper rendering and layout
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      // Force horizontal layout
      container.style.display = 'flex';
      container.style.flexDirection = 'row';
      container.style.overflowX = 'auto';
      container.style.scrollbarWidth = 'none';
      // Apply MS overflow style with setAttribute for TypeScript compatibility
      container.setAttribute('style', container.getAttribute('style') + '-ms-overflow-style: none;');

      // Hide scrollbar for Chrome, Safari and Opera
      const style = document.createElement('style');
      style.textContent = `
        .game-slider-container::-webkit-scrollbar {
          display: none;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '32px 16px',
      boxSizing: 'border-box'
    }}>
      <h1 style={{
        fontSize: '1.875rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '32px'
      }}>
        JavaScript Adventures
      </h1>
      
      <div style={{ position: 'relative' }}>
        {/* Left Navigation Button */}
        <button 
          onClick={scrollLeft}
          style={{
            position: 'absolute',
            left: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: '10',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '8px',
            borderRadius: '50%',
            border: 'none',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            cursor: 'pointer'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        {/* Game Cards Container */}
        <div 
          ref={scrollContainerRef}
          className="game-slider-container"
          style={{
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'auto',
            gap: '24px',
            padding: '16px 48px',
            scrollBehavior: 'smooth',
          }}
        >
          {games.map((game) => (
            <Link 
              key={game.id}
              to={game.path}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: '300px',
                  height: '400px',
                  position: 'relative',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backgroundImage: `url(${game.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.3s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {/* Gradient overlay for text readability */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)',
                  padding: '120px 16px 16px',
                  color: 'white',
                }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#9b87f5',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    display: 'block',
                    marginBottom: '8px'
                  }}>
                    {game.topic}
                  </span>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    color: 'white'
                  }}>
                    {game.name}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255,255,255,0.9)',
                    margin: 0
                  }}>
                    {game.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Right Navigation Button */}
        <button 
          onClick={scrollRight}
          style={{
            position: 'absolute',
            right: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: '10',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '8px',
            borderRadius: '50%',
            border: 'none',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            cursor: 'pointer'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}
 export default GameCardSlider;