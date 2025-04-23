import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Couple.css';

const Couple = ({ setShowMenu }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Ensure menu is shown when this component is mounted
    setShowMenu(true);
  }, [setShowMenu]);

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