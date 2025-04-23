import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderMenu.css';

// Import logo for navbar
import logoImage from '../../assets/img/logon.webp';
import spanishFlag from '../../assets/img/span.png';

const HeaderMenu = ({ isHomePage }) => {
  return (
    <nav className={isHomePage ? "home-navbar" : "header-navbar"}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/home">
            <img src={logoImage} alt="Numerana" />
          </Link>
        </div>
        
        <div className="navbar-links">
          <Link to="/home" className="nav-link">Inicio</Link>
          <Link to="#" className="nav-link">Sobre Nosotras</Link>
          <Link to="#" className="nav-link">Aprender</Link>
          <Link to="#" className="nav-link">Preguntas Frecuentes</Link>
        </div>
        
        <div className="language-selector">
          <button className="lang-button">
            ESP <img src={spanishFlag} alt="Spanish" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default HeaderMenu; 