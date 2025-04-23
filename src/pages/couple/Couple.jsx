import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Couple.css';

const Couple = () => {
  const navigate = useNavigate();

  return (
    <main className="main">
      <div className="content">
        <div className="couple-container">
          <h1>Couple Calculator</h1>
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

export default Couple; 