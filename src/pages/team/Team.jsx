import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Team.css';

const Team = () => {
  const navigate = useNavigate();

  return (
    <main className="main">
      <div className="content">
        <div className="team-container">
          <h1>Team Calculator</h1>
          <p>This component will be implemented in the future.</p>
          <button 
            className="back-button" 
            onClick={() => navigate('/home')}
          >
            Back to Home
          </button>
        </div>
      </div>
    </main>
  );
};

export default Team; 