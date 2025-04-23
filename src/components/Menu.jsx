import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';
import logoImage from '../assets/img/logon.webp';
import spanishFlag from '../assets/img/span.png';
import englishFlag from '../assets/img/eng.png';

const Menu = () => {
  const [language, setLanguage] = useState(true); // true for English, false for Spanish
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const navigate = useNavigate();

  const toggleLanguage = () => {
    setLanguage(!language);
  };

  const handleNavigateHome = () => {
    navigate('/home');
  };

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src={logoImage} alt="Numerana" />
        </a>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={handleNavCollapse}
          aria-controls="navbarResponsive" 
          aria-expanded={!isNavCollapsed} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarResponsive">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <a 
                className="nav-link" 
                style={{ color: 'var(--bs-white)', cursor: 'pointer' }} 
                onClick={handleNavigateHome}
              >
                {language ? 'Home' : 'Inicio'}
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                style={{ color: 'var(--bs-white)' }} 
                href={language ? 'https://numerana.com/' : 'https://numerana.com/es'}
              >
                {language ? 'About Us' : 'Sobre Nosotras'}
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                style={{ color: 'var(--bs-white)' }} 
                href={language ? 'https://numerana.com/pages/learn' : 'https://numerana.com/es/pages/learn'}
              >
                {language ? 'Learn' : 'Aprender'}
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                style={{ color: 'var(--bs-white)' }} 
                href={language ? 'https://numerana.com/pages/faq' : 'https://numerana.com/es/pages/preguntas-mas-frecuentes'}
              >
                {language ? 'FAQ\'s' : 'Preguntas Frecuentes'}
              </a>
            </li>
          </ul>
        </div>
        
        <button 
          onClick={toggleLanguage} 
          id="languatoggle" 
          type="button" 
          className="btn btn-primary btn-sm"
        >
          {language ? 'ENG' : 'ESP'}
          <img 
            src={language ? englishFlag : spanishFlag} 
            style={{ width: '16px', margin: '0px 4px', marginTop: '-5px' }} 
            alt={language ? 'English' : 'Spanish'}
          />
        </button>
      </div>
    </nav>
  );
};

export default Menu; 