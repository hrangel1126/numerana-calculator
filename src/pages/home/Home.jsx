import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu';

// Import logo for navbar
import logoImage from '../../assets/img/logon.webp';
import spanishFlag from '../../assets/img/span.png';

const Home = ({ setShowMenu }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Hide the default menu since we're creating a custom one for home
    setShowMenu(false);
    
    // Simulate loading time for animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [setShowMenu]);

  return (
    <div className="home-container">
      {loading && (
        <div className="loading">
          <div className="lds-ripple"><div></div><div></div></div>
        </div>
      )}
      
      {!loading && (
        <>
          {/* Use the reusable HeaderMenu component */}
          <HeaderMenu isHomePage={true} />
          
          {/* Main content with improved calculator cards */}
          <div className="calculator-cards">
            <div className="card-container">
              <h2 className="card-title">Personal Pináculo</h2>
              <div className="card" onClick={() => navigate('/single')}>
                <div className="card-icon">
                  <i className="bi bi-person-circle"></i>
                </div>
                <div className="card-label">Personal</div>
              </div>
            </div>
            
            <div className="card-container">
              <h2 className="card-title">Couple/Pareja Pináculo</h2>
              <div className="card" onClick={() => navigate('/couple')}>
                <div className="card-icon">
                  <i className="bi bi-people"></i>
                </div>
                <div className="card-label">Couple</div>
              </div>
            </div>
            
            <div className="card-container">
              <h2 className="card-title">Team/Equipo Pináculo</h2>
              <div className="card" onClick={() => navigate('/team')}>
                <div className="card-icon team-icon">
                  <i className="bi bi-people-fill"></i>
                  <span className="team-indicator">3+</span>
                </div>
                <div className="card-label">Team</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home; 