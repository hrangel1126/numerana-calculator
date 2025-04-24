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
    <nav className="navbar" style={{ backgroundColor: isHomePage ? '#a862ff' : '#5b356c' }}>
      <div className="navbar-container">
        <div className="left-section">
          <Link className="navbar-brand" to="/">
            <img src={logoImage} alt="Numerana" />
          </Link>
          
          <div className="navbar-links">
            <Link to="/" className="nav-link">Inicio</Link>
            <Link to="#" className="nav-link">Sobre Nosotras</Link>
            <Link to="#" className="nav-link">Aprender</Link>
            <Link to="#" className="nav-link">Preguntas Frecuentes</Link>
          </div>
        </div>
        
        <div className="right-section">
          <Link to="#" className="btn-language">
            ESP <img src={spanishFlag} alt="Spanish" width="16" height="16" />
          </Link>
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
        </div>
      )}
    </nav>
  );
};

export default HeaderMenu; 