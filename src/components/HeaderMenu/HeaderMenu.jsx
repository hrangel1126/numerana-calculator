import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HeaderMenu.css';

// Import logo for navbar
import logoImage from '../../assets/img/logon.webp';
import spanishFlag from '../../assets/img/span.png';

const HeaderMenu = ({ isHomePage = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar" style={{ backgroundColor: '#5b356c' }}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">
            <img src={logoImage} alt="Numerana" className="navbar-logo" />
          </Link>
        </div>
          
        <div className="navbar-links">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="#" className="nav-link">Sobre Nosotras</Link>
          <Link to="#" className="nav-link">Aprender</Link>
          <Link to="#" className="nav-link">Preguntas Frecuentes</Link>
        </div>
        
        <div className="language-selector">
          <span className="language-text">ESP</span>
          <img src={spanishFlag} alt="Spanish" className="language-flag" />
        </div>
      </div>
      
      <button className="navbar-toggler" type="button" onClick={toggleMenu}>
        <span className="navbar-toggler-icon"></span>
      </button>
      
      {isOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-link">Inicio</Link>
          <Link to="#" className="mobile-link">Sobre Nosotras</Link>
          <Link to="#" className="mobile-link">Aprender</Link>
          <Link to="#" className="mobile-link">Preguntas Frecuentes</Link>
          <div className="mobile-language">
            <span>ESP</span>
            <img src={spanishFlag} alt="Spanish" className="language-flag-mobile" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default HeaderMenu; 