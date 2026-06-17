import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../utils/i18n/LanguageContext';
import { useMenuVisibility } from '../../utils/i18n/MenuVisibilityContext';
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu';
import './HomeNumerana.css';

const HomeNumerana = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showMenu } = useMenuVisibility();

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <main className="HomeNumerana-main">
      {showMenu && <HeaderMenu />}
      <div className="HomeNumerana-container">
        {/* Header Section */}
        <div className="HomeNumerana-header">
          <img 
            src={require('../../assets/img/beyond-numbers.png')} 
            alt="Beyond the Numbers" 
            className="HomeNumerana-headerImage"
          />
        </div>

        {/* Calculator Cards Grid */}
        <div className="HomeNumerana-cardsGrid">
          {/* Personal Card */}
          <div 
            className="HomeNumerana-card HomeNumerana-personalCard"
            onClick={() => handleNavigate('/single')}
            role="button"
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleNavigate('/single');
              }
            }}
          >
            <div className="HomeNumerana-cardImage">
              <img 
                src={require('../../assets/img/home-personal.png')} 
                alt="Personal Calculator" 
              />
            </div>
            <div className="HomeNumerana-cardContent">
              <h2 className="HomeNumerana-cardTitle">
                Personal
              </h2>
            </div>
          </div>

          {/* Couple Card */}
          <div 
            className="HomeNumerana-card HomeNumerana-coupleCard"
            onClick={() => handleNavigate('/couple')}
            role="button"
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleNavigate('/couple');
              }
            }}
          >
            <div className="HomeNumerana-cardImage">
              <img 
                src={require('../../assets/img/home-couple.png')} 
                alt="Couple Calculator" 
              />
            </div>
            <div className="HomeNumerana-cardContent">
              <h2 className="HomeNumerana-cardTitle">
                Couple
              </h2>
            </div>
          </div>

          {/* Group Card */}
          <div 
            className="HomeNumerana-card HomeNumerana-groupCard"
            onClick={() => handleNavigate('/team')}
            role="button"
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleNavigate('/team');
              }
            }}
          >
            <div className="HomeNumerana-cardImage">
              <img 
                src={require('../../assets/img/home-group.png')} 
                alt="Group Calculator" 
              />
            </div>
            <div className="HomeNumerana-cardContent">
              <h2 className="HomeNumerana-cardTitle">
                Group
              </h2>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeNumerana;
