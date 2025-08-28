import React, { useState } from 'react';
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

const ResultMessage = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  background: ${props => (props.success ? 'rgba(0, 255, 128, 0.2)' : 'rgba(255, 80, 80, 0.2)')};
  color: ${props => (props.success ? '#00ffcc' : '#ff5050')};
  border: 2px solid ${props => (props.success ? '#00ffcc' : '#ff5050')};
  box-shadow: 0 0 12px ${props => (props.success ? 'rgba(0, 255, 128, 0.4)' : 'rgba(255, 80, 80, 0.4)')};
`;

const EventQuestLevel22 = ({ onNextLevel }) => {
  const [checkResult, setCheckResult] = useState({ checked: false, success: false });

  const files = {
    '/index.html': {
      code: `
<!DOCTYPE html>
<html>
  <head>
    <title>Toggle Text Challenge</title>
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
    const iframe = document.querySelector('.sp-preview-iframe');
    if (!iframe) return;

    const iframeDocument = iframe.contentDocument;
    const demoElement = iframeDocument.getElementById('demo');
    const btnElement = iframeDocument.getElementById('btn');

    if (!demoElement || !btnElement) {
      setCheckResult({ checked: true, success: false });
      return;
    }

    const initialText = demoElement.textContent;
    btnElement.click();
    const toggledText = demoElement.textContent;
    btnElement.click();
    const toggledBackText = demoElement.textContent;

    const success = (
      toggledText === "Hello World!" &&
      toggledBackText === initialText &&
      toggledText !== initialText
    );

    setCheckResult({ checked: true, success });

    if (success && typeof onNextLevel === 'function') {
      onNextLevel();
    }
  };

  return (
    <GameContainer>
      <Title>🎮 Code Quest - Level 2</Title>

      <QuestBox>
        <h3 style={{ color: '#a64bf4' }}>📝 Mission Objective</h3>
        <p>
          Write JavaScript code to toggle the paragraph text between its original value and
          <strong> "Hello World!"</strong> every time the button is clicked.
        </p>
        <ul>
          <li>✨ Use the button's click event</li>
          <li>🔁 Toggle between the two texts</li>
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

      <Link to="/Events/event22">
  <NextLevelButton onClick={handleNextLevel}>➡️ Next Level</NextLevelButton>
</Link>
    </GameContainer>
  );
};

export default EventQuestLevel22;
