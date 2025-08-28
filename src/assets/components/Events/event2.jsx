import React from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from '@codesandbox/sandpack-react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
const GameContainer = styled.div`
  background-color: #0b0c10;
  color: #ffffff;
  font-family: 'Orbitron', sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  box-sizing: border-box;
`;

const Title = styled.h2`
  text-align: center;
  color: #00f2ff;
  text-shadow: 0 0 12px #00f2ff;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  letter-spacing: 1px;
`;

const QuestBox = styled.div`
  border: 2px solid #a64bf4;
  border-radius: 10px;
  padding: 1.2rem;
  background: rgba(166, 75, 244, 0.1);
  margin-bottom: 1.5rem;
  flex-shrink: 0;
  box-shadow: 0 0 10px rgba(166, 75, 244, 0.4);
`;

const EditorArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 242, 255, 0.15);
`;

const NextLevelButton = styled.button`
  background: linear-gradient(135deg, #00f2ff, #a64bf4);
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  color: #ffffff;
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  box-shadow: 0 0 20px rgba(0, 242, 255, 0.5);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(166, 75, 244, 0.7);
  }
`;

const EventQuestLevel2 = ({ onNextLevel }) => {
  const files = {
    '/index.html': {
      code: `
<!DOCTYPE html>
<html>
  <head>
    <title>Event Handler Challenge</title>
  </head>
  <body>
    <p id="demo">Click the button to change me!</p>
    <button id="btn">Click Me</button>
    <script src="index.js"></script>
  </body>
</html>
`
    },
    '/index.js': {
      code: '// Write your code here\n'
    }
  };

  const handleNextLevel = () => {
    if (onNextLevel) {
      onNextLevel();
    } else {
      alert("Next level coming soon!");
    }
  };

  return (
    <GameContainer>
      <Title>🎮 Code Quest - Level 2</Title>

      <QuestBox>
        <h3 style={{ color: '#a64bf4' }}>📝 Mission Objective</h3>
        <p>Write JavaScript code to change the paragraph text to <strong>"Hello World!"</strong> when the button is clicked.</p>
        <ul>
          <li>✨ Use the button's click event</li>
          <li>🎯 Update the paragraph with ID <code>"demo"</code></li>
          <li>📜 Write your code in <code>index.js</code></li>
        </ul>
      </QuestBox>

      <EditorArea>
        <SandpackProvider files={files} template="vanilla">
          <SandpackLayout style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <SandpackCodeEditor style={{ flex: 1 }} />
            <SandpackPreview style={{ flex: 1 }} />
          </SandpackLayout>
        </SandpackProvider>
      </EditorArea>

      <div style={{ textAlign: 'center', flexShrink: 0 }}>

      <Link to="/Events/event22">
  <NextLevelButton onClick={handleNextLevel}>➡️ Next Level</NextLevelButton>
</Link>      </div>
      
    </GameContainer>
  );
};

export default EventQuestLevel2;
