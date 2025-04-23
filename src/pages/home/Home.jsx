import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ({ setShowMenu }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure menu is shown
    setShowMenu(true);
    
    // Simulate loading time for animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [setShowMenu]);

  return (
    <main className="main">
      {loading && (
        <div className="loading">
          <div className="lds-ripple"><div></div><div></div></div>
        </div>
      )}
      
      <div className="content" style={{ marginTop: '11vh' }}>
        {!loading && (
          <div className="bntcontain">
            <div className="row">
              <div className="col-12" style={{ textAlign: 'center', fontWeight: 500 }}>
                <span>Personal Pináculo</span>
              </div>
            </div>
            
            <div className="row">
              <div className="col-12">
                <div className="button-container-1">
                  <span className="mas">
                    <i className="bi bi-person-fill iconin"></i>
                  </span>
                  <button 
                    id="single" 
                    type="button" 
                    name="Hover" 
                    onClick={() => navigate('/single')}
                  >
                    <i className="bi bi-person icon"></i>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="row" style={{ marginTop: '1.5rem' }}>
              <div className="col-12" style={{ textAlign: 'center', fontWeight: 500 }}>
                <span>Couple/Pareja Pináculo</span>
              </div>
            </div>
            
            <div className="row">
              <div className="col-12">
                <div className="button-container-2">
                  <span className="mas">
                    <i className="bi bi-people-fill iconin"></i>
                  </span>
                  <button 
                    id="couple" 
                    type="button" 
                    name="Hover" 
                    onClick={() => navigate('/couple')}
                  >
                    <i className="bi bi-people icon"></i>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="row" style={{ marginTop: '1.5rem' }}>
              <div className="col-12" style={{ textAlign: 'center', fontWeight: 500 }}>
                <span>Team/Equipo Pináculo</span>
              </div>
            </div>
            
            <div className="row">
              <div className="col-12">
                <div className="button-container-3">
                  <span className="mas">
                    <i className="bi bi-people-fill iconin"></i>
                    <i className="bi bi-people-fill iconin" style={{ position: 'absolute', transform: 'scaleX(-1)', left: '9.5px', top: '-2px' }}></i>
                  </span>
                  <button 
                    id="team" 
                    type="button" 
                    name="Hover" 
                    onClick={() => navigate('/team')}
                  >
                    <i className="bi bi-people icon"></i>
                    <i className="bi bi-people icon" style={{ position: 'absolute', transform: 'scaleX(-1)', left: '9.5px', top: '-2px' }}></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home; 