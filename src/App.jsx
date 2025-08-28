import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './index.css';

import Navbar from './assets/components/Navbar';
import HomeScreen from './assets/components/HomeScreen.jsx';
import GameCardSlider from './assets/components/CampaignSlider';
import ArrayQuest from './assets/components/Array/Intro';
import DataDungeon from './assets/components/Array/Level1';
import DataDungeonLevel2 from './assets/components/Array/Level2';
import DataDungeonLevel3 from './assets/components/Array/level21';
import DataDungeonLevel4 from './assets/components/Array/level22';
import LevelCompletionPopup from './assets/components/Array/pop';
import GameIntro from './assets/components/Dom/Game2Intro';
import Game2 from './assets/components/Dom/game2';
import Level22 from './assets/components/Dom/Dom22';
import Level23 from './assets/components/Dom/Dom23';
import Level24 from './assets/components/Dom/Dom24';
import FunctionsGame from './assets/components/Function/functions';
import DomVerseDashboard from './assets/components/Events/eventsIntro';
import DomVerseMCQ from './assets/components/Events/event';
import StringGame from './assets/components/Strings/StringMCQGame.jsx';
import CodePalateGame from './assets/components/Strings/CodePalateGame.jsx';
import ObjectsLevel1 from './assets/components/Object/Objects1.jsx';
import ObjectsLevel2 from './assets/components/Object/Objects2.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import EventQuestLevel22 from './assets/components/Events/event22.jsx';
import Profile from './pages/Profile.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import Game from './assets/components/Game'; // Import the Game component

function App() {
  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <Navbar />
      <div style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/GameCardSlider" element={<GameCardSlider />} />
          <Route path="/Array/Intro" element={<ArrayQuest />} />
          <Route path="/Array/Level1" element={<DataDungeon />} />
          <Route path="/Array/Level2" element={<DataDungeonLevel2 />} />
          <Route path="/Array/level21" element={<DataDungeonLevel3 />} />
          <Route path="/Array/level22" element={<DataDungeonLevel4 />} />
          <Route path="/Array/pop" element={<LevelCompletionPopup />} />
          <Route path="/Dom/Game2Intro" element={<GameIntro />} />
          <Route path="/Dom/game2" element={<Game2 />} />
          <Route path="/Dom/Dom22" element={<Level22 />} />
          <Route path="/Dom/Dom23" element={<Level23 />} />
          <Route path="/Dom/Dom24" element={<Level24 />} />
          <Route path="/Function/functions" element={<FunctionsGame />} />
          <Route path="/Events/eventsIntro" element={<DomVerseDashboard />} />
          <Route path="/Events/event" element={<DomVerseMCQ />} />
          <Route path="/strings" element={<StringGame />} />
          <Route path="/strings/codepalate" element={<CodePalateGame />} />
          <Route path="/Object/Objects1" element={<ObjectsLevel1 />} />
          <Route path="/Object/Objects2" element={<ObjectsLevel2 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/EventQuestLevel22" element={<EventQuestLevel22 />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          
          {/* New route for the Game component */}
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
