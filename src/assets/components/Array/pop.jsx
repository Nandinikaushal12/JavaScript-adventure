import React, { useState } from 'react';
import './pop.css'
import {Link} from 'react-router-dom'
const LevelCompletionPopup = () => {
  const [showPopup, setShowPopup] = useState(true);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      {
      showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>You have completed Array Game!</h2>
            <button  className="close-btn">
             <Link to="/CampaignSlider"></Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelCompletionPopup;
