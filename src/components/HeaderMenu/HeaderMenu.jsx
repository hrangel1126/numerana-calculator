import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HeaderMenu.css';
import { useTranslation } from '../../utils/i18n/LanguageContext';

// Import logo for navbar
import logoImage from '../../assets/img/logon.webp';
import spanishFlag from '../../assets/img/span.png';
import englishFlag from '../../assets/img/eng.png'; // Assuming you have an English flag image

const HeaderMenu = ({ isHomePage = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language, setLanguage } = useTranslation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = () => {
    // Toggle between English and Spanish
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  // Determine which flag to show based on current language
  const currentFlag = language === 'en' ? englishFlag : spanishFlag;
  const flagAlt = language === 'en' ? 'English' : 'Spanish';
  const languageText = t(`language_selector.${language}`);

  return (
    <nav className="navbar" style={{ backgroundColor: '#5b356c' }}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">
            <img src={logoImage} alt="Numerana" className="navbar-logo" />
          </Link>
        </div>
          
        <div className="navbar-links">
          <Link to="/" className="nav-link">{t('nav.home')}</Link>
          <Link to="#" className="nav-link">{t('nav.about')}</Link>
          <Link to="#" className="nav-link">{t('nav.learn')}</Link>
          <Link to="#" className="nav-link">{t('nav.faq')}</Link>
        </div>
        
        <div className="language-selector" onClick={handleLanguageChange} style={{ cursor: 'pointer' }}>
          <span className="language-text">{languageText}</span>
          <img src={currentFlag} alt={flagAlt} className="language-flag" />
        </div>
      </div>
      
      <button className="navbar-toggler" type="button" onClick={toggleMenu}>
        <span className="navbar-toggler-icon"></span>
      </button>
      
      {isOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-link">{t('nav.home')}</Link>
          <Link to="#" className="mobile-link">{t('nav.about')}</Link>
          <Link to="#" className="mobile-link">{t('nav.learn')}</Link>
          <Link to="#" className="mobile-link">{t('nav.faq')}</Link>
          <div className="mobile-language" onClick={handleLanguageChange} style={{ cursor: 'pointer' }}>
            <span>{languageText}</span>
            <img src={currentFlag} alt={flagAlt} className="language-flag-mobile" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default HeaderMenu; 